alter table "public"."response_tokens" drop constraint "response_tokens_chain_contract_address_survey_id_fkey",
  add constraint "response_tokens_contract_address_survey_id_chain_fkey"
  foreign key ("survey_id", "contract_address", "chain")
  references "public"."contracts"
  ("survey_id", "address", "chain") on update no action on delete no action;
