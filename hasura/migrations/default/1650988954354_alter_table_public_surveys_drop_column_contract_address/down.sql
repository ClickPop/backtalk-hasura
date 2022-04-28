alter table "public"."surveys" alter column "contract_address" drop not null;
alter table "public"."surveys" add column "contract_address" text;
