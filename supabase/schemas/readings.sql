CREATE EXTENSION IF NOT EXISTS "pgcrypto"; 

CREATE TABLE readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL,

    user_id UUID NOT NULL,                    -- Supabase auth.user ID
    card_name TEXT NOT NULL,                  -- name of the card
    card_image TEXT NOT NULL,                  -- base image path of the card
    card_suit TEXT NOT NULL,
    card_order INT NOT NULL,
    words JSONB NOT NULL,                     -- array of { word, color }

    variations JSONB DEFAULT '[]'::jsonb,     -- e.g. ["reversed", "foil"]
    alternate_art TEXT,                        -- optional, overrides default image path
    is_flipped BOOLEAN NULL,

    FOREIGN KEY (user_id) REFERENCES auth.users(id)  -- optional, but recommended
);

ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read all readings"
ON readings
FOR SELECT
USING (true);

REVOKE INSERT, UPDATE, DELETE ON readings FROM anon;
REVOKE INSERT, UPDATE, DELETE ON readings FROM authenticated;
