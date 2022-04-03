
CREATE TABLE "users" (
  "wallet" text PRIMARY KEY,
  "email" text
);

CREATE TABLE "surveys" (
  "id" serial PRIMARY KEY,
  "title" text,
  "description" text,
  "is_active" boolean,
  "is_public" boolean,
  "contract_address" text
);

CREATE TABLE "questions" (
  "id" serial PRIMARY KEY,
  "survey_id" int NOT NULL,
  "is_required" boolean,
  "prompt" text NOT NULL,
  "question_type" text NOT NULL
);

CREATE TABLE "responses" (
  "question_id" int,
  "wallet" text,
  "response_content" text NOT NULL,
  "response_option_id" int,
  PRIMARY KEY ("question_id", "wallet")
);

CREATE TABLE "options" (
  "id" serial PRIMARY KEY,
  "question_id" int,
  "content" text NOT NULL
);

CREATE TABLE "contracts" (
  "address" text PRIMARY KEY,
  "token_type" text NOT NULL,
  "token_ids" JSONB
);

ALTER TABLE "surveys" ADD CONSTRAINT "fk_surveys_contact_address" FOREIGN KEY ("contract_address") REFERENCES "contracts" ("address");

ALTER TABLE "questions" ADD CONSTRAINT "fk_questions_survey_id" FOREIGN KEY ("survey_id") REFERENCES "surveys" ("id");

ALTER TABLE "responses" ADD CONSTRAINT "fk_responses_wallet" FOREIGN KEY ("wallet") REFERENCES "users" ("wallet");

ALTER TABLE "options" ADD CONSTRAINT "fk_options_question_id" FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "responses" ADD CONSTRAINT "fk_responses_response_option_id" FOREIGN KEY ("response_option_id") REFERENCES "options" ("id");

ALTER TABLE "responses" ADD CONSTRAINT "fk_responses_question_id" FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

CREATE TABLE "public"."token_types" ("token_type" text NOT NULL, PRIMARY KEY ("token_type") );

INSERT INTO "public"."token_types"("token_type") VALUES (E'erc20');

INSERT INTO "public"."token_types"("token_type") VALUES (E'erc721');

INSERT INTO "public"."token_types"("token_type") VALUES (E'erc1155');

alter table "public"."contracts"
  add constraint "contracts_token_type_fkey"
  foreign key ("token_type")
  references "public"."token_types"
  ("token_type") on update no action on delete no action;

CREATE TABLE "public"."question_type" ("question_type" text NOT NULL, PRIMARY KEY ("question_type") );

alter table "public"."question_type" add column "friendly_name" text
 null;

INSERT INTO "public"."question_type"("question_type", "friendly_name") VALUES (E'freeResponse', E'Free Response');

INSERT INTO "public"."question_type"("question_type", "friendly_name") VALUES (E'multipleChoice', E'Multiple Choice');

alter table "public"."questions"
  add constraint "questions_question_type_fkey"
  foreign key ("question_type")
  references "public"."question_type"
  ("question_type") on update no action on delete no action;

alter table "public"."surveys" add column "owner" text
 not null;

alter table "public"."surveys"
  add constraint "surveys_owner_fkey"
  foreign key ("owner")
  references "public"."users"
  ("wallet") on update no action on delete no action;

alter table "public"."users" add column "name" text
 null;

comment on TABLE "public"."users" is E'AKA wallets';
