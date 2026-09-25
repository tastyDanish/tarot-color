// factsGenerator.ts
//
// TypeScript port of the facts generator. Produces a flat list of
// independent "fact" objects describing what's happening in the sky
// for a given date — illumination, motion/retrograde, peak events,
// and aspects — for a caller to pick from however they like (e.g.
// seeded random selection).

import { getRandomItem } from "@/lib/random-utils";
import * as A from "astronomy-engine";

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

type ZodiacSign = typeof ZODIAC_SIGNS[number];

// Bodies we track, typed against astronomy-engine's real Body enum —
// NOT bare strings. This is the main thing that changes vs. the JS
// version: TRACKED_BODIES is A.Body[], so every lookup is type-checked.
const TRACKED_BODIES: A.Body[] = [
  A.Body.Sun,
  A.Body.Moon,
  A.Body.Mercury,
  A.Body.Venus,
  A.Body.Mars,
  A.Body.Jupiter,
  A.Body.Saturn,
  A.Body.Uranus,
  A.Body.Neptune,
  A.Body.Pluto,
];

interface MagnitudeRange {
  brightest: number;
  dimmest: number;
}

// Sourced from published planetary magnitude references (Mallama &
// Hilton's Astronomical Almanac formulas, standard observing guides).
// Sun is intentionally excluded — its brightness varies by only ~0.1
// magnitude over the year, not a meaningful bright/dim signal here.
const MAGNITUDE_RANGE: Partial<Record<A.Body, MagnitudeRange>> = {
  [A.Body.Moon]: { brightest: -12.7, dimmest: -2.5 },
  [A.Body.Mercury]: { brightest: -2.6, dimmest: 5.7 },
  [A.Body.Venus]: { brightest: -4.92, dimmest: -3.0 },
  [A.Body.Mars]: { brightest: -2.94, dimmest: 1.8 },
  [A.Body.Jupiter]: { brightest: -2.94, dimmest: -1.6 },
  [A.Body.Saturn]: { brightest: -0.55, dimmest: 1.2 },
  [A.Body.Uranus]: { brightest: 5.5, dimmest: 6.0 },
  [A.Body.Neptune]: { brightest: 7.8, dimmest: 8.0 },
  [A.Body.Pluto]: { brightest: 13.65, dimmest: 15.5 },
};

const SAMPLE_WINDOW_DAYS: Partial<Record<A.Body, number>> = {
  [A.Body.Mercury]: 0.5,
  [A.Body.Venus]: 0.5,
  [A.Body.Mars]: 1,
  [A.Body.Jupiter]: 4,
  [A.Body.Saturn]: 6,
  [A.Body.Uranus]: 10,
  [A.Body.Neptune]: 14,
  [A.Body.Pluto]: 14,
};

// --- Shared fact shape ---
// All fact types share these; specific categories add their own fields.
interface BaseFact {
  category: "illumination" | "motion" | "peak_event" | "aspect";
  headline: string;
  detail: string;
}

export interface IlluminationFact extends BaseFact {
  category: "illumination";
  body: A.Body;
  magnitude: number;
  brightnessPct: number | null;
  bucket: string;
}

export interface MotionFact extends BaseFact {
  category: "motion";
  subtype?: "elongation";
  body: A.Body;
  retrograde?: boolean;
  dailyMotionDeg?: number;
  sign?: ZodiacSign;
  degreeInSign?: number;
  elongationDegrees?: number;
  visibility?: "morning" | "evening";
}

export interface PeakEventFact extends BaseFact {
  category: "peak_event";
  subtype: "max_elongation" | "peak_brightness";
  body: A.Body;
  daysAway: number;
  date: string;
  visibility?: "morning" | "evening";
  elongationDegrees?: number;
  magnitude?: number;
}

export interface AspectFact extends BaseFact {
  category: "aspect";
  bodies: [A.Body, A.Body];
  aspect: string;
  exactAngle: number;
  currentSeparation: number;
  orb: number;
}

export type Fact = IlluminationFact | MotionFact | PeakEventFact | AspectFact;

function zodiacSign(
  elonDegrees: number,
): { sign: ZodiacSign; degreeInSign: number } {
  const norm = ((elonDegrees % 360) + 360) % 360;
  return {
    sign: ZODIAC_SIGNS[Math.floor(norm / 30)],
    degreeInSign: +(norm % 30).toFixed(2),
  };
}

function eclipticLongitude(body: A.Body, astroTime: A.AstroTime): number {
  return A.Ecliptic(A.GeoVector(body, astroTime, true)).elon;
}

function angleDelta(a: number, b: number): number {
  let d = b - a;
  while (d > 180) d -= 360;
  while (d <= -180) d += 360;
  return d;
}

function angleSeparation(a: number, b: number): number {
  return Math.abs(angleDelta(a, b));
}

function getDailyMotion(body: A.Body, now: A.AstroTime): number {
  const windowDays = SAMPLE_WINDOW_DAYS[body] ?? 1;
  const t1 = now.AddDays(-windowDays / 2);
  const t2 = now.AddDays(windowDays / 2);
  const delta = angleDelta(
    eclipticLongitude(body, t1),
    eclipticLongitude(body, t2),
  );
  return delta / windowDays;
}

// --- 1. ILLUMINATION FACTS ---
function getIlluminationFacts(now: A.AstroTime): IlluminationFact[] {
  const facts: IlluminationFact[] = [];

  for (const body of TRACKED_BODIES) {
    if (body === A.Body.Sun) continue; // not meaningful — see MAGNITUDE_RANGE comment

    let mag: number;
    try {
      mag = A.Illumination(body, now).mag;
    } catch {
      continue;
    }

    const range = MAGNITUDE_RANGE[body];
    let pctBright: number | null = null;
    let bucket = "typical brightness";
    if (range) {
      const span = range.dimmest - range.brightest;
      pctBright = span !== 0
        ? Math.min(1, Math.max(0, (range.dimmest - mag) / span))
        : 0.5;
      if (pctBright >= 0.85) bucket = "burns radiantly in the sky";
      else if (pctBright >= 0.6) bucket = "glows steadily above";
      else if (pctBright >= 0.4) continue;
      else if (pctBright >= 0.15) bucket = "fades toward shadow";
      else bucket = "hides low in the gloom";
    }

    facts.push({
      category: "illumination",
      body,
      magnitude: +mag.toFixed(2),
      brightnessPct: pctBright !== null ? +(pctBright * 100).toFixed(0) : null,
      bucket,
      headline: `${body === "Moon" ? "The " : ""}${body} ${bucket}`,
      detail:
        `${body === "Moon" ? "The " : ""}${body} has an apparent magnitude of ${
          mag.toFixed(2)
        }` +
        (pctBright !== null
          ? `, which is ${
            (pctBright * 100).toFixed(0)
          }% of the way toward its brightest possible appearance.`
          : "."),
    });
  }

  return facts;
}

// --- 2. MOTION FACTS (retrograde / rising) ---
// Direct = the planet's "normal" forward motion — steady, unremarkable, confirming.
// Retrograde = apparent backward motion — the classic astrological omen of
// delay, reversal, things needing review.
const MOTION_PHRASES: Record<
  "direct" | "retrograde",
  (b: string, sign: string) => string[]
> = {
  direct: (b, sign) => [
    `${b} moves forward, direct in ${sign}`,
    `${b} strides onward through ${sign}`,
    `${b} advances steadily through ${sign}`,
    `${b}'s path runs true in ${sign}`,
  ],
  retrograde: (b, sign) => [
    `${b} turns retrograde in ${sign}`,
    `${b} slips into shadow, retrograde in ${sign}`,
    `${b} walks backward through ${sign}`,
    `${b}'s path reverses in ${sign}`,
  ],
};

// Morning star = visible before sunrise, rising ahead of the Sun.
// Evening star = visible after sunset, lingering low as the Sun sets.
const ELONGATION_PHRASES: Record<
  "morning" | "evening",
  (b: string) => string[]
> = {
  morning: (b) => [
    `${b} rises as a morning star`,
    `${b} climbs ahead of the dawn`,
    `${b} heralds the sunrise`,
  ],
  evening: (b) => [
    `${b} lingers as an evening star`,
    `${b} glows low in the dusk`,
    `${b} settles into the evening sky`,
  ],
};

function getMotionFacts(now: A.AstroTime): MotionFact[] {
  const facts: MotionFact[] = [];

  for (const body of [A.Body.Mercury, A.Body.Venus]) {
    const dailyMotion = getDailyMotion(body, now);
    const retrograde = dailyMotion < 0;
    const elon = eclipticLongitude(body, now);
    const { sign, degreeInSign } = zodiacSign(elon);
    const name = body === "Moon" ? "The Moon" : body;

    facts.push({
      category: "motion",
      body,
      retrograde,
      dailyMotionDeg: +dailyMotion.toFixed(4),
      sign,
      degreeInSign,
      headline: getRandomItem(
        MOTION_PHRASES[retrograde ? "retrograde" : "direct"](name, sign),
      ),
      detail: `${name} is moving at ${
        dailyMotion.toFixed(3)
      }°/day, positioned at ${degreeInSign}° ${sign}.`,
    });

    try {
      const elongInfo = A.Elongation(body, now);
      const visibility = elongInfo.visibility as "morning" | "evening";
      facts.push({
        category: "motion",
        subtype: "elongation",
        body,
        elongationDegrees: +elongInfo.elongation.toFixed(2),
        visibility,
        headline: getRandomItem(ELONGATION_PHRASES[visibility](name)),
        detail: `${name} is currently ${
          elongInfo.elongation.toFixed(1)
        }° from the Sun in the sky, making it visible in the ${visibility}.`,
      });
    } catch {
      // elongation not computable for this date — skip
    }
  }

  for (
    const body of [
      A.Body.Mars,
      A.Body.Jupiter,
      A.Body.Saturn,
      A.Body.Uranus,
      A.Body.Neptune,
      A.Body.Pluto,
    ]
  ) {
    const dailyMotion = getDailyMotion(body, now);
    const retrograde = dailyMotion < 0;
    const elon = eclipticLongitude(body, now);
    const { sign, degreeInSign } = zodiacSign(elon);
    const name = body === "Moon" ? "The Moon" : body;

    facts.push({
      category: "motion",
      body,
      retrograde,
      dailyMotionDeg: +dailyMotion.toFixed(4),
      sign,
      degreeInSign,
      headline: getRandomItem(
        MOTION_PHRASES[retrograde ? "retrograde" : "direct"](name, sign),
      ),
      detail: `${name} is moving at ${
        dailyMotion.toFixed(3)
      }°/day, positioned at ${degreeInSign}° ${sign}.`,
    });
  }

  return facts;
}

// --- 4. ASPECT FACTS ---
interface AspectDef {
  name: string;
  angle: number;
  orb: number;
}

const MAJOR_ASPECTS: AspectDef[] = [
  { name: "Conjunction", angle: 0, orb: 8 },
  { name: "Sextile", angle: 60, orb: 6 },
  { name: "Square", angle: 90, orb: 8 },
  { name: "Trine", angle: 120, orb: 8 },
  { name: "Opposition", angle: 180, orb: 8 },
];

// Each aspect gets its own phrasing pool, tuned to what the aspect actually means:
// Conjunction = merging/intensifying, Sextile/Trine = harmonious flow,
// Square = tension/friction, Opposition = polarity/confrontation
const ASPECT_PHRASES: Record<string, (b1: string, b2: string) => string[]> = {
  Conjunction: (b1, b2) => [
    `${b1} merges in conjunction with ${b2}`,
    `${b1} draws close in conjunction with ${b2}`,
    `${b1} intensifies, conjunct ${b2}`,
  ],
  Sextile: (b1, b2) => [
    `${b1} opens a sextile toward ${b2}`,
    `${b1} finds an easy sextile with ${b2}`,
    `${b1} sparks opportunity, sextile ${b2}`,
  ],
  Square: (b1, b2) => [
    `${b1} strains in square against ${b2}`,
    `${b1} clashes in square with ${b2}`,
    `${b1} meets friction, square ${b2}`,
  ],
  Trine: (b1, b2) => [
    `${b1} flows in trine with ${b2}`,
    `${b1} finds harmony in trine with ${b2}`,
    `${b1} moves in easy trine with ${b2}`,
  ],
  Opposition: (b1, b2) => [
    `${b1} stands in opposition to ${b2}`,
    `${b1} faces ${b2} in opposition`,
    `${b1} confronts ${b2} across the sky`,
  ],
};

function getAspectFacts(now: A.AstroTime): AspectFact[] {
  const facts: AspectFact[] = [];

  for (let i = 0; i < TRACKED_BODIES.length; i++) {
    for (let j = i + 1; j < TRACKED_BODIES.length; j++) {
      const b1 = TRACKED_BODIES[i];
      const b2 = TRACKED_BODIES[j];
      const sep = angleSeparation(
        eclipticLongitude(b1, now),
        eclipticLongitude(b2, now),
      );

      for (const asp of MAJOR_ASPECTS) {
        const orbDiff = Math.abs(sep - asp.angle);
        if (orbDiff <= asp.orb) {
          const name1 = b1 === "Moon" ? "The Moon" : b1;
          const name2 = b2 === "Moon" ? "The Moon" : b2;

          facts.push({
            category: "aspect",
            bodies: [b1, b2],
            aspect: asp.name,
            exactAngle: asp.angle,
            currentSeparation: +sep.toFixed(2),
            orb: +orbDiff.toFixed(2),
            headline: getRandomItem(ASPECT_PHRASES[asp.name](name1, name2)),
            detail: `${name1} and ${name2} are in ${asp.name.toLowerCase()}, ${
              sep.toFixed(1)
            }° apart (${
              orbDiff.toFixed(1)
            }° from an exact ${asp.angle}° angle).`,
          });
        }
      }
    }
  }

  return facts;
}

export function generateFacts(
  date: Date = new Date(),
): Fact[] {
  const now = new A.AstroTime(date);

  return [
    ...getIlluminationFacts(now),
    ...getMotionFacts(now),
    ...getAspectFacts(now),
  ];
}

export { getAspectFacts, getIlluminationFacts, getMotionFacts };
