alter table "public"."contracts"
  add constraint "contracts_token_type_fkey"
  foreign key ("token_type")
  references "public"."token_types"
  ("token_type") on update no action on delete no action;
