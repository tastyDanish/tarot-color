revoke delete on table "public"."readings" from "anon";

revoke insert on table "public"."readings" from "anon";

revoke update on table "public"."readings" from "anon";

revoke delete on table "public"."readings" from "authenticated";

revoke insert on table "public"."readings" from "authenticated";

revoke update on table "public"."readings" from "authenticated";

alter table "public"."readings" add column "card_image" text not null;


