import { TAROT_CARDS } from "@/cards/tarot-cards";
import type { Database, Json } from "@/lib/database.types";
import type { Reading } from "@/stores/use-reading-store";
import type { TripleSaved } from "@/stores/use-triple-store";

type DbTripleRow = Database["public"]["Tables"]["triple_readings"]["Row"];

type DbPhase = {
	title: string;
	card_name: string;
	reversed: boolean;
	foil: boolean;
	deprived: boolean;
	words: string[];
	color: string;
};

const parsePhases = (phases: Json): DbPhase[] | null =>
	Array.isArray(phases) ? (phases as unknown as DbPhase[]) : null;

export const mapDbTripleToReadings = (row: DbTripleRow): Reading[] => {
	const phases = parsePhases(row.phases);
	if (!phases) return []; // malformed row: skip it rather than break the collection

	return phases.flatMap((p, i) => {
		if (!row.flipped[i]) return [];

		const card = TAROT_CARDS.find((c) => c.name === p.card_name);
		if (!card) return [];

		return [{
			id: `${row.id}-${i}`,
			card,
			words: p.words.map((word) => ({ word, color: p.color })),
			expiration: new Date(row.expires_at),
			reversed: p.reversed,
			foil: p.foil,
			deprived: p.deprived,
			flipped: true,
			alternateArt: "goblin",
		}];
	});
};

export const mapDbTripleToSaved = (row: DbTripleRow): TripleSaved => {
	const phases = parsePhases(row.phases);
	if (!phases) throw new Error(`Malformed phases on triple ${row.id}`);

	return {
		id: row.id,
		spreadName: row.spread_name,
		expiration: new Date(row.expires_at),
		flipped: row.flipped,
		readingPhases: phases.map((p) => {
			const card = TAROT_CARDS.find((c) => c.name === p.card_name);
			if (!card) throw new Error(`Unknown card: ${p.card_name}`);
			return {
				title: p.title,
				words: p.words,
				color: p.color,
				drawn: {
					card,
					reversed: p.reversed,
					foil: p.foil,
					deprived: p.deprived,
				},
			};
		}),
	};
};

export const mapSavedToDbPayload = (r: TripleSaved) => ({
	spread_name: r.spreadName,
	flipped: r.flipped,
	expiration: r.expiration.toISOString(),
	phases: r.readingPhases.map((p): DbPhase => ({
		title: p.title,
		card_name: p.drawn.card.name,
		reversed: p.drawn.reversed,
		foil: p.drawn.foil,
		deprived: p.drawn.deprived,
		words: p.words,
		color: p.color,
	})),
});
