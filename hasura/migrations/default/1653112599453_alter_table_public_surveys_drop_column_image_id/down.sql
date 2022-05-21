alter table "public"."surveys" alter column "image_id" drop not null;
alter table "public"."surveys" add column "image_id" text;
