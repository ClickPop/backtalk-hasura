alter table "public"."response_tokens" drop constraint "response_tokens_contract_address_survey_id_chain_fkey",
  add constraint "response_tokens_chain_contract_address_survey_id_fkey"
  foreign key ("chain", "contract_address", "survey_id")
  references "public"."contracts"
  ("chain", "address", "survey_id") on update cascade on delete cascade;
