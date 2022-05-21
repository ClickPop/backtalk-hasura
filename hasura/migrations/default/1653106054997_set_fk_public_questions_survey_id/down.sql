alter table "public"."questions" drop constraint "questions_survey_id_fkey",
  add constraint "fk_questions_survey_id"
  foreign key ("survey_id")
  references "public"."surveys"
  ("id") on update no action on delete no action;
