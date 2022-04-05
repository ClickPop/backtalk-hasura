alter table "public"."contracts" add column "created_at" timestamptz
 not null default now();
