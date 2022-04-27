alter table "public"."surveys" drop constraint "surveys_contract_address_fkey",
  add constraint "fk_surveys_contact_address"
  foreign key ("contract_address")
  references "public"."contracts"
  ("address") on update no action on delete no action;
