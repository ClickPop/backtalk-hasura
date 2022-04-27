INSERT INTO response_tokens (survey_id, contract_address, wallet, tokens, chain)
SELECT
    survey_responses.id,
    contracts.address,
    survey_responses.wallet,
    survey_responses.token_count,
    contracts.chain
FROM survey_responses
    JOIN contracts ON survey_responses.id = contracts.survey_id
WHERE
    survey_responses.token_count IS NOT NULL;
