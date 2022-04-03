
comment on TABLE "public"."users" is E'NULL';

alter table "public"."users" drop column "name";

alter table "public"."surveys" drop constraint "surveys_owner_fkey";

alter table "public"."surveys" drop column "owner";

alter table "public"."questions" drop constraint "questions_question_type_fkey";

DELETE FROM "public"."question_type" WHERE "question_type" = 'multipleChoice';

DELETE FROM "public"."question_type" WHERE "question_type" = 'freeResponse';

alter table "public"."question_type" drop column "friendly_name";

DROP TABLE "public"."question_type";

alter table "public"."contracts" drop constraint "contracts_token_type_fkey";

DELETE FROM "public"."token_types" WHERE "token_type" = 'erc1155';

DELETE FROM "public"."token_types" WHERE "token_type" = 'erc721';

DELETE FROM "public"."token_types" WHERE "token_type" = 'erc20';

DROP TABLE "public"."token_types";

DROP TABLE "users" CASCADE;

DROP TABLE "surveys" CASCADE;

DROP TABLE "questions" CASCADE;

DROP TABLE "responses" CASCADE;

DROP TABLE "options" CASCADE;

DROP TABLE "contracts" CASCADE;