alter table "public"."surveys"
  add constraint "surveys_contract_address_fkey"
  foreign key ("contract_address")
  references "public"."contracts"
  ("address") on update cascade on delete cascade;
