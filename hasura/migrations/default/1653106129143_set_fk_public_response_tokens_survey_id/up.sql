alter table "public"."response_tokens" drop constraint "response_tokens_survey_id_fkey",
  add constraint "response_tokens_survey_id_fkey"
  foreign key ("survey_id")
  references "public"."surveys"
  ("id") on update cascade on delete cascade;
