alter table "public"."responses" drop constraint "fk_responses_question_id",
  add constraint "responses_question_id_fkey"
  foreign key ("question_id")
  references "public"."questions"
  ("id") on update cascade on delete cascade;
