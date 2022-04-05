alter table "public"."questions" add column "created_at" timestamptz
 not null default now();
