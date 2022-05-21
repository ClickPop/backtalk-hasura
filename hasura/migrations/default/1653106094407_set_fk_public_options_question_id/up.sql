alter table "public"."options" drop constraint "fk_options_question_id",
  add constraint "options_question_id_fkey"
  foreign key ("question_id")
  references "public"."questions"
  ("id") on update cascade on delete cascade;
