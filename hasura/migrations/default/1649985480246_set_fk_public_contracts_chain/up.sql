alter table "public"."contracts"
  add constraint "contracts_chain_fkey"
  foreign key ("chain")
  references "public"."supported_chains"
  ("chain_name") on update no action on delete no action;
