alter table "public"."questions" drop constraint "fk_questions_survey_id",
  add constraint "questions_survey_id_fkey"
  foreign key ("survey_id")
  references "public"."surveys"
  ("id") on update cascade on delete cascade;
