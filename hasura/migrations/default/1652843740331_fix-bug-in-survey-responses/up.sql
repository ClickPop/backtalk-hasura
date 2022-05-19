CREATE OR REPLACE VIEW "public"."survey_responses" AS 
 SELECT
  responses.wallet,
  json_object_agg(
    responses.question_id,
    json_build_object(
      'response',
      responses.response_content,
      'option_id',
      responses.response_option_id,
      'option',
      options.content
    )
  ) AS question_responses,
  surveys.id,
  max(responses.created_at) AS created_at,
  json_object_agg(
    CASE
        WHEN response_tokens.contract_address IS NOT NULL
        THEN response_tokens.contract_address
        ELSE 'none'
    END,
    response_tokens.tokens
  ) AS token_count
FROM
  (
    (
      (
        (
          surveys
          JOIN questions ON ((surveys.id = questions.survey_id))
        )
        JOIN responses ON ((questions.id = responses.question_id))
      )
      LEFT JOIN options ON ((responses.response_option_id = options.id))
    )
    LEFT JOIN response_tokens ON ((surveys.id = response_tokens.survey_id))
  )
GROUP BY
  responses.wallet,
  surveys.id
ORDER BY
  (max(responses.created_at));
