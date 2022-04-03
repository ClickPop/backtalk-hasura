alter table "public"."surveys"
  add constraint "surveys_owner_fkey"
  foreign key ("owner")
  references "public"."users"
  ("wallet") on update no action on delete no action;
