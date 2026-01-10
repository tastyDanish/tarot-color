import { choose } from "@/lib/utils";

const LOCAL_INTRO_KEY = "fortuneIntro";

export type IntroType = {
	intro: string | null;
	expiration: string; // ISO string
};

export const useDailyIntro = (intros: string[]) => {
	const now = Date.now();

	const stored = localStorage.getItem(LOCAL_INTRO_KEY);
	let parsed: IntroType | null = null;

	if (stored) {
		try {
			parsed = JSON.parse(stored);
		} catch {
			parsed = null;
		}
	}

	const isExpired = !parsed ||
		!parsed.expiration ||
		new Date(parsed.expiration).getTime() < now;

	if (isExpired) {
		const intro = choose(intros);
		const expiration = new Date(now + 24 * 60 * 60 * 1000).toISOString();

		const newValue: IntroType = { intro, expiration };
		localStorage.setItem(LOCAL_INTRO_KEY, JSON.stringify(newValue));
		return intro;
	}

	return parsed?.intro;
};
