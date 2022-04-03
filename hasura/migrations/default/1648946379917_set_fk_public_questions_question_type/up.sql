alter table "public"."questions"
  add constraint "questions_question_type_fkey"
  foreign key ("question_type")
  references "public"."question_type"
  ("question_type") on update no action on delete no action;
