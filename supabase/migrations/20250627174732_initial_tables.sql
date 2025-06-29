create table "public"."profiles" (
    "id" uuid not null,
    "username" text not null
);


alter table "public"."profiles" enable row level security;

create table "public"."readings" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "expires_at" timestamp with time zone not null,
    "user_id" uuid not null,
    "card_name" text not null,
    "words" jsonb not null,
    "variations" jsonb default '[]'::jsonb,
    "alternate_art" text
);


alter table "public"."readings" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX readings_pkey ON public.readings USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."readings" add constraint "readings_pkey" PRIMARY KEY using index "readings_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."readings" add constraint "readings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."readings" validate constraint "readings_user_id_fkey";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant references on table "public"."readings" to "anon";

grant select on table "public"."readings" to "anon";

grant trigger on table "public"."readings" to "anon";

grant truncate on table "public"."readings" to "anon";

grant references on table "public"."readings" to "authenticated";

grant select on table "public"."readings" to "authenticated";

grant trigger on table "public"."readings" to "authenticated";

grant truncate on table "public"."readings" to "authenticated";

grant delete on table "public"."readings" to "service_role";

grant insert on table "public"."readings" to "service_role";

grant references on table "public"."readings" to "service_role";

grant select on table "public"."readings" to "service_role";

grant trigger on table "public"."readings" to "service_role";

grant truncate on table "public"."readings" to "service_role";

grant update on table "public"."readings" to "service_role";

create policy "Public can read all profiles"
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their profile"
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update their own profile"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Public can read all readings"
on "public"."readings"
as permissive
for select
to public
using (true);



