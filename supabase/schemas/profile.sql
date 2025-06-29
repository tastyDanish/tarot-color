CREATE EXTENSION IF NOT EXISTS "pgcrypto"; 


CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read any profile (for public viewing)
CREATE POLICY "Public can read all profiles"
ON profiles
FOR SELECT
USING (true);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their profile"
ON profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON profiles
FOR UPDATE
USING (auth.uid() = id);
