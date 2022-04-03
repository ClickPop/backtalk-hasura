CREATE TABLE "users" (
  "wallet" text PRIMARY KEY,
  "email" text
);

CREATE TABLE "surveys" (
  "id" int PRIMARY KEY,
  "title" text,
  "description" text,
  "is_active" boolean,
  "is_public" boolean,
  "contract_address" text
);

CREATE TABLE "questions" (
  "id" int PRIMARY KEY,
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
  "id" int PRIMARY KEY,
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