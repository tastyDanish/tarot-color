CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gist";  -- needed for the exclusion constraint below

CREATE TABLE triple_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL,

    user_id UUID NOT NULL REFERENCES auth.users(id),
    spread_name TEXT NOT NULL,                -- e.g. "Past · Present · Future"

    -- array of { title, card_name, reversed, foil, deprived, words: string[], color }
    phases JSONB NOT NULL,
    -- parallel to phases, e.g. [true, false, false]
    flipped BOOLEAN[] NOT NULL,

    CONSTRAINT phases_is_array CHECK (jsonb_typeof(phases) = 'array'),
    CONSTRAINT flipped_matches_phases
        CHECK (cardinality(flipped) = jsonb_array_length(phases)),
    CONSTRAINT expires_after_created CHECK (expires_at > created_at),

    -- One active reading per user: no two rows for the same user
    -- may have overlapping [created_at, expires_at) windows.
    CONSTRAINT one_active_triple_per_user
        EXCLUDE USING gist (
            user_id WITH =,
            tstzrange(created_at, expires_at) WITH &&
        )
);

CREATE INDEX triple_readings_user_expires_idx
    ON triple_readings (user_id, expires_at DESC);

ALTER TABLE triple_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read all triple readings"
ON triple_readings
FOR SELECT
USING (true);

REVOKE ALL ON TABLE public.triple_readings FROM anon, authenticated;
GRANT SELECT ON TABLE public.triple_readings TO anon, authenticated;
GRANT ALL ON TABLE public.triple_readings TO service_role;

CREATE OR REPLACE FUNCTION public.set_triple_phase_flipped(
    p_user_id UUID, p_reading_id UUID, p_index INT
) RETURNS VOID
LANGUAGE sql
SET search_path = public
AS $$
    UPDATE triple_readings
    SET flipped[p_index + 1] = true  -- Postgres arrays are 1-indexed
    WHERE id = p_reading_id AND user_id = p_user_id;
$$;

REVOKE EXECUTE ON FUNCTION public.set_triple_phase_flipped(UUID, UUID, INT)
    FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.set_triple_phase_flipped(UUID, UUID, INT)
    TO service_role;