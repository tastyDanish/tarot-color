export type TarotCard = {
  name: string;
  image: string;
  description: string;
  reversed: string;
};

export const TAROT_CARDS: TarotCard[] = [
  {
    name: "Ace Of Cups",
    image: "cards/ace-of-cups.jpg",
    description:
      "Offering, Nourishment, Overflow, Blessing, Invitation, Hospitatlity, Feast, Abundance, Receptivity, Openness, Emotion, Love, Affection, Grace, Vessel, Sacred, Beginning",
    reversed:
      "Guarded, Disconnnected, Tender, Vulnerable, Introspective, Drained, Sensitive",
  },
  {
    name: "Ace Of Pentacles",
    image: "cards/ace-of-pentacles.jpg",
    description:
      "Opportunity, Foundation, Seed, Growth, Stabiilty, Prosperity, Security, Blessing, Abundance, Wealth, Health, Gift, Tangible, Realization, Manifestation",
    reversed:
      "Missed, Cracked, Instability, Delay, Withheld, Hollow, Risk, Mirage, Slipped, Unfounded, Erosion, Scarcity, Unsown, Untethered, Lost, Unrooted, Dissonance",
  },
  {
    name: "Ace Of Swords",
    image: "cards/ace-of-swords.jpg",
    description:
      "Clarity, Insight, Sharpness, Precision, Intellect, Epiphany, Idea, Judgement, Communication, Decision, Awakening, Revelation",
    reversed:
      "Muddled, Obscured, Doubt, Misfire, Distortion, Static, Hesitation, Clouded, Overthinking, Fragment, Miscommunication, Noise, Blunt, Reversal, Fog, Cutoff",
  },
  {
    name: "Ace Of Wands",
    image: "cards/ace-of-wands.jpg",
    description:
      "Drive, Energy, Ambition, Creativity, Desire, Courage, Potential, Vision, Action, Ignition, Impulse, Momentum",
    reversed:
      "Burnout, Delay, Doubt, Blocked, Flicker, Scattered, Unfocused, Fizzled, Cold Start, Hesitation, Misfire, Repressed, Unlit, Friction, Restlessness, Distraction, Snuffed",
  },
  {
    name: "Death",
    image: "cards/death.jpg",
    description:
      "Transformation, Ending, Release, Rebirth, Shedding, Closure, Transition, Metamorphosis, Threshold, Cycle, Change, Unraveling, Renewal",
    reversed:
      "Relief, Mercy, Lightness, Acceptance, Easing, Closure, Grace, Breakthrough, Unbinding, Recovery, Turning Point, Peace, Forgiveness, Softness, Renewal, Integration",
  },
  {
    name: "Eight Of Cups",
    image: "cards/eight-of-cups.jpg",
    description:
      "Departure, Letting go, Withdrawal, Disenchantment, Transition, Search, Longing, Release, Journey, Emptiness, Moving on",
    reversed:
      "Return, Reunion, Reconnection, Homecoming, Rediscovery, Resolution, Arrival, Integration, Anchoring, Reengagement, Restoration, Settled",
  },
  {
    name: "Eight Of Pentacles",
    image: "cards/eight-of-pentacles.jpg",
    description:
      "Skill, Practice, Focus, Mastery, Improvement, Commitment, Apprenticeship, Work Ethic, Patience, Precision, Building, Method, Progress, Perseverance",
    reversed:
      "Flow, Improvisation, Rest, Intuition, Breakthrough, Pause, Redirection, Trust, Instict, Reset, Flexibility",
  },
  {
    name: "Eight Of Swords",
    image: "cards/eight-of-swords.jpg",
    description:
      "Trapped, Paralysis, Fear, Doubt, Confusion, Limitation, Stuck, Isolation, Powerlessness, Restriction, Constraint, Blindfold, Hesitation, Indecision, Pressure",
    reversed:
      "Liberation, Clarity, Awakening, Release, Breakthrough, Perspective, Shift, Self-Belief, Empowerment, Detachment, Honest, Lightness",
  },
  {
    name: "Eight Of Wands",
    image: "cards/eight-of-wands.jpg",
    description:
      "Movement, Momentum, Speed, Progress, Flow, Launch, Direction, Clarity, Flight, Rush, Unfolding, Swift, Rapid, Action, Journey, Surge, Velocity",
    reversed:
      "Delay, Slowdown, Pause, Miscommunication, Jumbled, Redirect, Stalled, Disruption, Confusion, Recalibration, Hesitation, Overwhelm",
  },
  {
    name: "Five Of Cups",
    image: "cards/five-of-cups.jpg",
    description:
      "Grief, Regret, Longing, Dwelling, Letting go, Attachment, Remorse, Reflection, Perspective, Sorrow, Disappointment, Isolation, Bitterness, Nostalgia, Wounded, Setback, Tears, Reflection",
    reversed:
      "Acceptance, Healing, Forgiveness, Renewal, Optimism, Hope, Closure, Recovery, Gratitude, Peace, Balance",
  },
  {
    name: "Five Of Pentacles",
    image: "cards/five-of-pentacles.jpg",
    description:
      "Hardship, Isolation, Scarcity, Vulnerability, Struggle, Survival, Need, Insecurity, Cold, Crisis, Need, Crisis, Desperation, Lack, Testing",
    reversed:
      "Recovery, Support, Resilience, Renewal, Community, Hope, Healing, Improvement, Shelter, Stability, Strength, Regeneration, Resourcefulness",
  },
  {
    name: "Five Of Swords",
    image: "cards/five-of-swords.jpg",
    description:
      "Conflict, Defeat, Tension, Ego, Manipulation, Regret, Fallout, Isolation, Self-sabotage, Disappointment, Dishonor, Grudge, Cruelty, Friction",
    reversed:
      "Resolution, Reconciliation, Forgiveness, Peace Offering, Maturity, Clarity, Letting Go, Humility, Empathy, Inner Peace, Reflection",
  },
  {
    name: "Five Of Wands",
    image: "cards/five-of-wands.jpg",
    description:
      "Challenge, Debate, Group, Passion, Energy, Chaos, Friction, Tension, Hustle, Scattered",
    reversed:
      "Cooperation, Harmony, Alignment, Compromise, Resolution, Integration, Understanding, Group, Refinement, Focus, Shared Vision",
  },
  {
    name: "Four Of Cups",
    image: "cards/four-of-cups.jpg",
    description:
      "Discontent, Apathy, Indifference, Boredom, Introspection, Contemplation, Restlessness, Stagnation, Dissatisfaction, Disconnection, Unfulfilled, Ennui, Jaded",
    reversed:
      "Renewal, Awareness, Reconnection, Openness, Motivation, Inspiration, Gratitude, Awakening, Receptivity, Invitation",
  },
  {
    name: "Four Of Pentacles",
    image: "cards/four-of-pentacles.jpg",
    description:
      "Possession, Control, Guarded, Caution, Boundaries, Conservation, Clinging, Resistance, Attachment, Reserved",
    reversed:
      "Greed, Loss, Materialism, Letting Go, Fear of Change, Hoarding, Mismanagement, Overcompensation, Insecurity",
  },
  {
    name: "Four Of Swords",
    image: "cards/four-of-swords.jpg",
    description:
      "Rest, Recovery, Retreat, Pause, Healing, Solitude, Respite, Repose, Withdrawal, Quiet, Meditation, Recuperation, Stillness, Space",
    reversed:
      "Recovery, Resilience, Transition, Stirring, Reflection, Mindfulness, Reawakening, Rebalance",
  },
  {
    name: "Four Of Wands",
    image: "cards/four-of-wands.jpg",
    description:
      "Celebration, Joy, Harmony, Community, Milestone, Stability, Gathering, Success, Comfort, Peace, Gratitude, Support, Foundation",
    reversed:
      "Disruption, Recalibration, Transition, Reflection, Adjustment, Redirection, Threshold, Freedom, Reset, Empowerment",
  },
  {
    name: "Judgement",
    image: "cards/judgement.jpg",
    description:
      "Awakening, Reckoning, Renewal, Transformation, Clarity, Rebirth, Redemption, Decision, Realization, Release, Truth, Resolution, Decision, Forgiveness, Acceptance",
    reversed:
      "Introspection, Review, Pause, Healing, Clarity, Reconnection, Emergence, Discovery, Integration, Healing",
  },
  {
    name: "Justice",
    image: "cards/justice.jpg",
    description:
      "Balance, Fairness, Truth, Integrity, Ethics, Responsibility, Judgement, Honesty, Transparency, Law, Equilibrium, Clarity, Accountability",
    reversed:
      "Dishonesty, Corruption, Injustice, Bias, Unfairness, Avoidance, Manipulation, Imbalance, Partiality, Guilt, Evasion, Deception",
  },
  {
    name: "King Of Cups",
    image: "cards/king-of-cups.jpg",
    description:
      "Compassion, Wisdom, Empathy, Patience, Diplomacy, Integrity, Maturity, Kindness, Nurturing",
    reversed:
      "Stability, Detachment, Containement, Maturity, Emotionality, Restraint, Composure, Boundaries, Compassion",
  },
  {
    name: "King Of Pentacles",
    image: "cards/king-of-pentacles.jpg",
    description:
      "Abundance, Stewardship, Leadership, Dependability, Entrepreneurship, Resourcefulness, Patience, Comfort, Success, Wisdom, Control, Generosity",
    reversed:
      "Humility, Mindfulness, Awareness, Discipline, Clarification, Restructure, Grounding, Reevaluation",
  },
  {
    name: "King Of Swords",
    image: "cards/king-of-swords.jpg",
    description:
      "Clear thinking, Authority, Truth, Rationality, Objectivity, Strategy, Integrity, Discipline, Wisdom, Leadership, Mental clarity, Justice",
    reversed:
      "Truthfulness, Balance, Perspective, Refinement, Awareness, Integrity, Honesty, Discernment, Reflection",
  },
  {
    name: "King Of Wands",
    image: "cards/king-of-wands.jpg",
    description:
      "Visionary, Passion, Leadership, Charisma, Courage, Drive, Initiative, Innocation, Energy, Trailblazer, Compassion, Empathy, Diplomacy, Generosity",
    reversed:
      "Temperence, Intention, Restraint, Purpose, Leadership, Reflection, Presence, Authenticity",
  },
  {
    name: "Knight Of Cups",
    image: "cards/knight-of-cups.jpg",
    description:
      "Invitation, Proposal, Approach, Charm, Dreamer, Tenderness, Intuition, Empathy, Hope, Opening, Offer, Romance, Creativity, Inspiration, Vision",
    reversed:
      "Moodiness, Manipulation, Immaturity, Escapism, Flakiness, Self-Pity, Disappointment",
  },
  {
    name: "Knight Of Pentacles",
    image: "cards/knight-of-pentacles.jpg",
    description:
      "Steadfast, Reliable, Diligent, Patient, Grounded, Cautious, Thorough, Dependable, Endurance, Commitment, Trustworthy, Methodical, Persistent, Consistent",
    reversed:
      "Steadiness, Patience, Reflection, Consistency, Focus, Diligence, Persistence",
  },
  {
    name: "Knight Of Swords",
    image: "cards/knight-of-swords.jpg",
    description:
      "Decisive, Bold, Energistic, Direct, Driven, Intellectual, Unwavering, Strategic, Assertive, Determined, Fearless, Quick-Thinking, Ambitious, Focused, Swift, Analytical, Competitive",
    reversed:
      "Boldness, Courage, Drive, Passion, Energy, Momentum, Initiative, Growth, Learning",
  },
  {
    name: "Knight Of Wands",
    image: "cards/knight-of-wands.jpg",
    description:
      "Adventure, Energy, Passion, Boldness, Movement, Action, Courage, Travel, Exploration, Confidence, Drive, Restlessness, Momentum, Enthusiasm, Initiative, Bravery",
    reversed:
      "Reflection, Patience, Adaptability, Recalibration, Adaptation, Intent, Recovery, Control, Rest, Grounding, Growth",
  },
  {
    name: "Nine Of Cups",
    image: "cards/nine-of-cups.jpg",
    description:
      "Contentment, Joy, Satisfaction, Gratitude, Success, Happiness, Comfort, Celebration, Delight, Harmony, Bliss, Reward, Confidence, Enjoyment, Fulfillment, Abundance, Pleasure",
    reversed:
      "Moderation, Fulfillment, Patience, Restraint, Mindfulness, Balance, Gratitude, Humility",
  },
  {
    name: "Nine Of Pentacles",
    image: "cards/nine-of-pentacles.jpg",
    description:
      "Independence, Abundance, Luxury, Comfort, Enjoyment, Prosperity, Discipline, Reward, Elegance, Freedom, Growth, Security, Accomplishment, Confidence, Grace, Success",
    reversed:
      "Reflection, Patience, Humility, Learning, Growth, Balance, Adaptation, Flexibility, Grounding, Letting-Go, Recovery, Insight",
  },
  {
    name: "Nine Of Swords",
    image: "cards/nine-of-swords.jpg",
    description:
      "Anxiety, Worry, Guilt, Insomnia, Regret, Dread, Fear, Panic, Shame, Rumination, Doubt, Nightmares, Stress, Distress, Despair",
    reversed:
      "Release, Recovery, Healing, Denial, Avoidance, Mental Block, Escapism, Inner Conflict",
  },
  {
    name: "Nine Of Wands",
    image: "cards/nine-of-wands.jpg",
    description:
      "Defense, Courage, Boundaries, Persistence, Perseverance, Resilience, Endurance, Vigilance, Wariness, Recovery, Experience, Tenacity, Grit, Fortitude, Caution, Strength",
    reversed:
      "Caution, Hesitation, Reflection, Vulnerability, Adaptation, Guardedness, Awareness",
  },
  {
    name: "Page Of Cups",
    image: "cards/page-of-cups.jpg",
    description:
      "Imagination, Creativity, Curiosity, Emotion, Wonder, Inspiration, Dreaminess, Affection, Surprise, Intuition, Sentiment, Tenderness, Message, Openness",
    reversed:
      "Blockage, Stagnation, Insecurity, Resistance, Confusion, Restart, Avoidance, Reawakening, New Beginning, Self-Doubt, Overthinking",
  },
  {
    name: "Page Of Pentacles",
    image: "cards/page-of-pentacles.jpg",
    description:
      "Learning, Focus, Dedication, Effort, Potential, Initiative, Curiosity, Planning, Sturdy, Grounding, Discipline, Investment, Growth, Reliability, Exploration",
    reversed:
      "Exploration, Potential, Reflection, Focus, Discovery, Persistence, Curiosity, Flexibility",
  },
  {
    name: "Page Of Swords",
    image: "cards/page-of-swords.jpg",
    description:
      "Curiosity, Awareness, Observation, Cleverness, Ideas, Questioning, Debate, Opinion, Wit, Boldness, Inquisitiveness, Insight, Alertness, Communication",
    reversed:
      "Introspection, Confidence, Presence, Acceptance, Centering, Calm, Clarity, Stability",
  },
  {
    name: "Page Of Wands",
    image: "cards/page-of-wands.jpg",
    description:
      "Exploration, Wanderlust, Curiosity, Spark, Adventure, Impulse, Freedom, Boldness, Discovery, Courage, Originality, Restlessness, Playfulness, Inspiration",
    reversed:
      "Preperation, Persistence, Reflection, Vision, Composure, Poise, Strategy",
  },
  {
    name: "Queen Of Cups",
    image: "cards/queen-of-cups.jpg",
    description:
      "Compassion, Empathy, Nurturing, Intuition, Dreaminess, Sensitivity, Healing, Reflection, Creativity, Imagination, Supportive, Gentle, Caring",
    reversed:
      "Dependency, Manipulation, Withdrawal, Jealousy, Codependency, Insecurity, Avoidance, Reflection, Awareness, Boundaries, Intuition, Limits",
  },
  {
    name: "Queen Of Pentacles",
    image: "cards/queen-of-pentacles.jpg",
    description:
      "Stability, Generosity, Nurture, Security, Comfort, Devotion, Earthiness, Abundance, Responsibility, Resourcefulness, Reliability, Care, Support, Warmth",
    reversed:
      "Recovery, Release, Renewal, Prioritization, Empowerment, Strength, Resilience, Boundaries, Rebuilding",
  },
  {
    name: "Queen Of Swords",
    image: "cards/queen-of-swords.jpg",
    description:
      "Clarity, Independence, Truth, Boundaries, Wit, Insight, Precision, Integrity, Directness",
    reversed:
      "Intellect, Honesty, Empathy, Openness, Resilience, Insight, Compassion, Vulnerability",
  },
  {
    name: "Queen Of Wands",
    image: "cards/queen-of-wands.jpg",
    description:
      "Confidence, Charisma, Creativity, Warmth, Courage, Leadership, Optimism, Magnetism, Determination, Generosity, Honour, Sociability, Spontaneity",
    reversed:
      "Jealousy, Domineering, Insecurity, Implsiveness, Selfishness, Burnout, Repression, Negativity, Overwhelm, Control, Empathy",
  },
  {
    name: "Seven Of Cups",
    image: "cards/seven-of-cups.jpg",
    description:
      "Imagination, Dreams, Choices, Illusion, Fantasy, Desires, Temptation, Options, Indecision, Hope, Delusion, Soul, Spirit, Reflection, Potential",
    reversed:
      "Clarity, Focus, Realism, Decision, Avoidance, Escapism, Overwhelm, Grounding, Commitment, Practicality",
  },
  {
    name: "Seven Of Pentacles",
    image: "cards/seven-of-pentacles.jpg",
    description:
      "Patience, Investment, Assessment, Waiting, Progress, Growth, Harvest, Reflection, Sustainability, Persistence, Yield, Evaluation, Care, Reward",
    reversed:
      "Reflection, Recalibration, Adjustment, Hesitation, Caution, Waiting, Frustation",
  },
  {
    name: "Seven Of Swords",
    image: "cards/seven-of-swords.jpg",
    description:
      "Trickery, Evasion, Craftiness, Strategy, Deception, Disguise, Greed, Secrecy, Risk, Cleverness, Diplomacy",
    reversed:
      "Exposure, Confession, Accountability, Truth, Redemption, Regret, Confrontation, Guilt, Repentance, Consequences, Restitution, Forgiveness, Revelation, Justice",
  },
  {
    name: "Seven Of Wands",
    image: "cards/seven-of-wands.jpg",
    description:
      "Defense, Challenge, Courage, Resistance, Persistence, Negotiation, Debate, Conflict, Struggle, Advocacy, Boldness, Dispute, Firmness, Resolve",
    reversed:
      "Overwhelmed, Exhaustion, Surrender, Avoidance, Hesitation, Passive, Fear, Strengthen",
  },
  {
    name: "Six Of Cups",
    image: "cards/six-of-cups.jpg",
    description:
      "Nostalgia, Memory, Reflection, Recollection, Childhood, Innocence, Warmth, Legacy, Fondness, Reunion, Generosity, Kindness, Timelessness",
    reversed:
      "Naivety, Clinging, Avoidance, Grudge, Baggage, Memory, Letting Go, Release, Accept",
  },
  {
    name: "Six Of Pentacles",
    image: "cards/six-of-pentacles.jpg",
    description:
      "Generosity, Charity, Balance, Fairness, Support, Equity, Aid, Altruism, Gratitude, Philanthropy, Reciprocity",
    reversed:
      "Debt, Inequality, Exploitation, Imbalance, Greed, Resentment, Dependence, Give, Receive, Trust, Accountability, Reciprocity",
  },
  {
    name: "Six Of Swords",
    image: "cards/six-of-swords.jpg",
    description:
      "Transition, Journey, Passage, Change, Progress, Travel, Healing, Recovery, Guidance, Relocation, Movement, Adaptation, Improvement",
    reversed:
      "Stagnation, Resistance, Delay, Avoidance, Unwillingness, Confusion",
  },
  {
    name: "Six Of Wands",
    image: "cards/six-of-wands.jpg",
    description:
      "Victory, Recognition, Success, Achievement, Triumph, Celebration, Confidence, Progress, Leadership, Honors, Praise, Milestone, Momentum, Validation",
    reversed:
      "Doubt, Obstacles, Crticism, Discouragement, Momentum, Rejection, Persist",
  },
  {
    name: "Strength",
    image: "cards/strength.jpg",
    description:
      "Resilience, Courage, Perseverance, Patience, Determination, Endurance, Confidence, Bravery, Fortitude, Willpower, Steadfastness, Compassion, Balance, Calm",
    reversed:
      "Weakness, Insecurity, Impatience, Fear, Burnout, Overwhelm, Exhaustion, Frustation, Empower, Support, Accept, Strengthen",
  },
  {
    name: "Temperance",
    image: "cards/temperance.jpg",
    description:
      "Balance, Harmony, Moderation, Patience, Restraint, Adaptability, Calm, Integration, Healing, Flow, Compromise, Blending, Mindfulness, Cooperation, Synthesis, Diplomacy",
    reversed:
      "Imbalance, Excess, Discord, Conflict, Frustation, Impatience, Chaos, Extremes, Misalignment, Moderate",
  },
  {
    name: "Ten Of Cups",
    image: "cards/ten-of-cups.jpg",
    description:
      "Harmony, Joy, Family, Togetherness, Peace, Love, Bliss, Gratitude, Celebration, Connection, Fulfillment, Unity, Wholeness, Contentment",
    reversed:
      "Tension, Disconnection, Misalignment, Isolation, Fragmentation, Disillusionment, Empathize, Reconnect",
  },
  {
    name: "Ten Of Pentacles",
    image: "cards/ten-of-pentacles.jpg",
    description:
      "Legacy, Wealth, Inheritance, Abundance, Prosperity, Heritage, Estate, Success, Comfort, Assets, Stability, Roots, Tradition, Foundation",
    reversed:
      "Loss, Instability, Greed, Disruption, Isolation, Mismanagement, Conflict, Rebuild, Secure, Repair, Align",
  },
  {
    name: "Ten Of Swords",
    image: "cards/ten-of-swords.jpg",
    description:
      "Endings, Closure, Transformation, Release, Finality, Recovery, Renewal, Acceptance, Regeneration, Collapse",
    reversed:
      "Healing, Recovery, Resillience, Rebuilding, Avoidance, Hope, Rise",
  },
  {
    name: "Ten Of Wands",
    image: "cards/ten-of-wands.jpg",
    description:
      "Burden, Stress, Resonsibility, Pressure, Commitment, Fatigue, Perseverance, Obligation, Struggle, Exhaustion, Duty, Persistence, Endurance",
    reversed:
      "Release, Recovery, Rest, Support, Unburdening, Respite, Awareness, Delegation, Reprioritization",
  },
  {
    name: "The Chariot",
    image: "cards/the-chariot.jpg",
    description:
      "Determination, Willpower, Drive, Focus, Control, Victory, Triumph, Ambition, Progress, Momentum, Confidence, Mastery, Direction, Achievement, Resolve, Purpose, Movement",
    reversed:
      "Obstacles, Inaction, Hesitation, Frustation, Doubt, Overwhelm, Control, Prioritize, Persist",
  },
  {
    name: "The Devil",
    image: "cards/the-devil.jpg",
    description:
      "Temptation, Contract, Obsession, Desire, Bond, Vice, Power, Dependency, Control, Facade, Enticement, Manipulation, Illusion, Cost, Leverage, Pact, Seduction, Chains, Indulgence",
    reversed:
      "Release, Freedom, Detachment, Independence, Awareness, liberation, Recovery, Awakening, Empowerment",
  },
  {
    name: "The Emperor",
    image: "cards/the-emperor.jpg",
    description:
      "Leadership, Authority, Structure, Foundation, Stability, Responsibility, Security, Confidence, Guidance, Order, Support, Reliability, Governance, Control, Discipline, Framework, Backbone",
    reversed:
      "Domination, Rigidity, Tyranny, Inflexibility, Chaos, Stubborness, Resistance, Oppression, Mismanagement",
  },
  {
    name: "The Empress",
    image: "cards/the-empress.jpg",
    description:
      "Creativity, Growth, Abundance, Nature, Intuition, Mystery, Secrets, Veil, Embrace, Transformation, Depth, Beauty, Harmony",
    reversed:
      "Neglect, Smothering, Dependence, Overprotectiveness, Burnout, Indulgence, Boundaries, Restriction, Depletion",
  },
  {
    name: "The Fool",
    image: "cards/the-fool.jpg",
    description:
      "Spontaneity, Adventure, Curiosity, Innocence, Naivety, Enthusiam, Playfulness, Freedom, Unpredictability, Openness, Recklessness, Wonder, Boldness, Experimentation, Passion, Unconventional",
    reversed:
      "Naivety, Recklessness, Hesitation, Indecision, Risk, Chaos, Distraction, Immaturity, Insecurity, Caution, Steady, Plan",
  },
  {
    name: "The Hanged Man",
    image: "cards/the-hanged-man.jpg",
    description:
      "Reflection, Suspension, Surrender, Insight, Stillness, Acceptance, Contemplation, Waiting, Resilience, Deliberation, Observation, Forethought",
    reversed:
      "Stagnation, Resistence, Impatience, Confusion, Frustation, Indecision, Martyrdom",
  },
  {
    name: "The Hermit",
    image: "cards/the-hermit.jpg",
    description:
      "Solitude, Reflection, Introspection, Mindfulness, Meditation, Wisdom, Clarity, Focus, Retreat, Contemplation, Insight",
    reversed:
      "Loneliness, Withdrawal, Isolation, Stubborness, Lost, Darkness, Reclusion, Overthinking, Detached",
  },
  {
    name: "The Hierophant",
    image: "cards/the-hierophant.jpg",
    description:
      "Tradition, Ritual, Initiation, Order, Doctrine, Code, Belief, Conviction, Structure, Mentor, Sanction, Custom, Instruction, Symbol, Hierarchy",
    reversed:
      "Rebellion, Challenge, Restriction, Rigidity, Restrained, Isolation, Restriction, Skepticism, Questioning, Rebel, Innovate, Question, Experiment, Explore, Free",
  },
  {
    name: "The High Priestess",
    image: "cards/the-high-priestess.jpg",
    description:
      "Intuition, Mystery, Secrets, Subconcious, Reflection Dreams, Receptivity, Meditation, Trust, Hidden, Insight, Silence, Wisdom, Veil, Awareness, Enigma, Knowledge",
    reversed:
      "Blocked, Deception, Distruct, Ignorance, Repression, Denial, Reveal, Question, Listen, Seek, Confront",
  },
  {
    name: "The Lovers",
    image: "cards/the-lovers.jpg",
    description:
      "Connection, Union, Choice, Harmony, Attraction, Bond, Affinity, Trust, Balance, Commitment, Synergy, Understanding, Collaboration, Affinity, Duality, Integration",
    reversed:
      "Conflict, Disharmony, Imbalance, Distance, Regret, Temptation, Confusion, Hesitation, Boundaries",
  },
  {
    name: "The Magician",
    image: "cards/the-magician.jpg",
    description:
      "Infinity, Potential, Initiation, Willpower, Focus, Concentration, Craft, Channel, Flow, Toolset, Direction, Coherence, Interface",
    reversed:
      "Manipulation, Deception, Distraction, Confusion, Blocks, Trickery, Illusion, Falsehood",
  },
  {
    name: "The Moon",
    image: "cards/the-moon.jpg",
    description:
      "Illusion, Dream, Mystery, Instinct, Subconscious, Enigma, Delirium, Whispers, Symbol, Refraction, Myth, Intuition, Secrets, Pull, Cycle, Myth, Mirage, Fog",
    reversed:
      "Clarity, Truth, Exposure, Anxiety, Deception, Unveiling, Misunderstanding, Release, Awakening, Distrust, Understand, Confront, Illuminate, Reveal, Dispel",
  },
  {
    name: "The Star",
    image: "cards/the-star.jpg",
    description:
      "Hope, Inspiration, Guidance, Healing, Renewal, Grace, Serenity, Clarity, Blessing, Vision, Light, Dream, Peace, Flow, Calm, Radiance, Stillness, Trust",
    reversed:
      "Acceptance, Closure, Peace, Reflection, Gratitude, Serenity, Understanding, Integration",
  },
  {
    name: "The Sun",
    image: "cards/the-sun.jpg",
    description:
      "Brightness, Clarity, Growth, Revelation, Energy, Warmth, Illumination, Insight, Vitality, Optimism, Enlightenment, Joy, Hope, Discovery, Confidence",
    reversed:
      "Cloudiness, Confusion, Pessimism, Exhaustion, SHadow, Obstruction, Isolation, Frustration",
  },
  {
    name: "The Tower",
    image: "cards/the-tower.jpg",
    description:
      "Collapse, Upheaval, Disruption, Shock, Breakdown, Truth, Awakening, Revelation, Fracture, Shatter, Flashpoint, Catalyst, Exposure, Clarity, Rebuilding, Renewal, Change",
    reversed:
      "Resistance, Denial, Collapse, Hesitation, Fragility, Concealment, Suppression, Embrace, Transform, Rebuild, Reflect",
  },
  {
    name: "The Wheel Of Fortune",
    image: "cards/the-wheel-of-fortune.jpg",
    description:
      "luck, happiness, joy, bliss, improvement, prosperity, bonus, blessing, benefits, graces, favors, goods, wealth, profits, lot, fate, destiny, adventure, entropy, probability",
    reversed:
      "Setback, Resistance, Destiny, Loss, Instability, Blockage, Prepare, Observe, Watch, Persist, Reversal, Unpredictability",
  },
  {
    name: "The World",
    image: "cards/the-world.jpg",
    description:
      "Journey, Voyage, Pilgrimage, Travel, migration, Exploration, Transition, Movement, Rotation, Circulation, Progress, Change, Flow, Adventure, Passage, Discovery, Expansion",
    reversed:
      "Stagnation, Delay, Fragmentation, Frustation, Inertia, Avoidance, Limitation, Unrealized, Unfinished, Persist, Complete, Anchor, Secure, Center, Settle",
  },
  {
    name: "Three Of Cups",
    image: "cards/three-of-cups.jpg",
    description:
      "Achievement, success, accomplishment, happy outcome, victory, healing, cure, relief, perfection, Joy, Union, Friendship, Teamwork",
    reversed:
      "Gossip, Conflict, Isolation, Disconnection, Drama, Exclusion, Imbalance, Drama, Detachment",
  },
  {
    name: "Three Of Pentacles",
    image: "cards/three-of-pentacles.jpg",
    description:
      "Prestige, Renown, Excellence, Quality, Grandeur, Importance, Fame, Distinction, Influence, Honor, Generosity, Integrity, Mastery, Skill, Impact",
    reversed:
      "Mediocrity, Neglect, Ego, Conflict, Pride, Arrogance, Overconfidence, Incompletion, Improve, Repair",
  },
  {
    name: "Three Of Swords",
    image: "cards/three-of-swords.jpg",
    description:
      "Loss, Grief, Separation, Disappointment, Betrayal, Conflict, Division, Breakup, Rejection, Hurt, Fracture, Discord, Regret, Sorrow",
    reversed:
      "Healing, Forgiveness, Recovery, Release, Acceptance, Renewal, Closure, Relief, Hope, Understanding, Compassion, Growth, Peace",
  },
  {
    name: "Three Of Wands",
    image: "cards/three-of-wands.jpg",
    description:
      "Initiative, Beginnings, Enterprise, Ambition, Boldness, Vision, Exploration, Opportunity, Resourcefulness, Drive, Determination, Innovation, Pioneering, Fearlessness",
    reversed:
      "Obstacles, Hesitation, Frustation, Caution, Indecision, Overextension",
  },
  {
    name: "Two Of Cups",
    image: "cards/two-of-cups.jpg",
    description:
      "Passion, Affinity, Attraction, Sympathy, Friendship, Connection, Harmony, Affection, Attachment, Goodwill, Partnership, Bond, Unity, Trust, Respect, Chivalry, Gallantry",
    reversed:
      "Imbalance, Conflict, Distrust, Distance, Rejection, Tension, Discord, Neglect, Reconcile, Apologize, Forgive",
  },
  {
    name: "Two Of Pentacles",
    image: "cards/two-of-pentacles.jpg",
    description:
      "Predicament, Obstacle, Blockage, Congestion, Obstruction, Confusion, Muddled, Trouble, Agitation, Unease, Perplexity, Instability, Balance, Fluctuation, Adjustment, Juggling, Tension, Uncertainty",
    reversed:
      "Control, Adaptability, Poise, Agility, Efficiency, Flexibility, Composure, Mastery",
  },
  {
    name: "Two Of Swords",
    image: "cards/two-of-swords.jpg",
    description:
      "Conflict, Stalemate, Dilemma, Indecision, Opposition, Balance, Tension, Impasse, Choice, Division, Compromise, Reflection, Deliberation",
    reversed:
      "Decision, Clarity, Release, Vulnerability, Courage, Insight, Flow, Embrace, Decide",
  },
  {
    name: "Two Of Wands",
    image: "cards/two-of-wands.jpg",
    description:
      "Planning, Strategy, Vision, Choice, Ambition, Goals, Preparation, Prospect, Possibility, Exploration, Opportunity, Direction, Intent, Leadership, Initiative",
    reversed:
      "Patience, Flow, Acceptance, Ease, Calm, Trust, Observation, Waiting, Stillness, Peace, Receptivity",
  },
];
