create extension if not exists "btree_gist" with schema "public";

create table "public"."triple_readings" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "expires_at" timestamp with time zone not null,
    "user_id" uuid not null,
    "spread_name" text not null,
    "phases" jsonb not null,
    "flipped" boolean[] not null,

    constraint "triple_readings_pkey" primary key ("id"),
    constraint "triple_readings_user_id_fkey"
        foreign key ("user_id") references auth.users(id),
    constraint "expires_after_created" check (expires_at > created_at),
    constraint "phases_is_array" check (jsonb_typeof(phases) = 'array'),
    constraint "flipped_matches_phases"
        check (cardinality(flipped) = jsonb_array_length(phases)),
    constraint "one_active_triple_per_user" exclude using gist (
        user_id with =,
        tstzrange(created_at, expires_at) with &&
    )
);

create index "triple_readings_user_expires_idx"
    on "public"."triple_readings" using btree (user_id, expires_at desc);

alter table "public"."triple_readings" enable row level security;

create policy "Public can read all triple readings"
    on "public"."triple_readings"
    as permissive for select to public using (true);

-- Browsers can read; only the service role (Netlify functions) can write.
revoke all on table "public"."triple_readings" from "anon", "authenticated";
grant select on table "public"."triple_readings" to "anon", "authenticated";
grant all on table "public"."triple_readings" to "service_role";

create or replace function public.set_triple_phase_flipped(
    p_user_id uuid, p_reading_id uuid, p_index integer
) returns void
language sql
set search_path = public
as $$
    update triple_readings
    set flipped[p_index + 1] = true  -- Postgres arrays are 1-indexed
    where id = p_reading_id and user_id = p_user_id;
$$;

revoke execute on function public.set_triple_phase_flipped(uuid, uuid, integer)
    from public, "anon", "authenticated";
grant execute on function public.set_triple_phase_flipped(uuid, uuid, integer)
    to "service_role";