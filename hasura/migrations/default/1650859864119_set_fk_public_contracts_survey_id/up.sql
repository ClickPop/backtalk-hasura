alter table "public"."contracts"
  add constraint "contracts_survey_id_fkey"
  foreign key ("survey_id")
  references "public"."surveys"
  ("id") on update cascade on delete cascade;
