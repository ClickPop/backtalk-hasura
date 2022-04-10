CREATE OR REPLACE VIEW "public"."survey_responses" AS 
 SELECT responses.wallet,
    array_agg(responses.question_id) AS question_ids,
    array_agg(responses.response_content) AS response_values,
    surveys.id,
    responses.created_at
   FROM ((surveys
     LEFT JOIN questions ON ((surveys.id = questions.survey_id)))
     LEFT JOIN responses ON ((questions.id = responses.question_id)))
  GROUP BY responses.wallet, surveys.id, responses.created_at;
