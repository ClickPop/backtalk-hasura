alter table "public"."options" drop constraint "options_question_id_fkey",
  add constraint "fk_options_question_id"
  foreign key ("question_id")
  references "public"."questions"
  ("id") on update no action on delete no action;
