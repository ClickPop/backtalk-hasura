CREATE OR REPLACE VIEW "public"."survey_responses" AS 
    SELECT 
        responses.wallet,
        jsonb_object_agg(responses.question_id, responses.response_content) AS question_responses,
        jsonb_object_agg(responses.question_id, responses.response_option_id) as multiple_choice_option_ids,
        surveys.id,
        max(responses.created_at) AS created_at,
        max(responses.token_count) AS token_count
    FROM ((surveys
        RIGHT JOIN questions ON ((surveys.id = questions.survey_id)))
        RIGHT JOIN responses ON ((questions.id = responses.question_id)))
    GROUP BY responses.wallet, surveys.id
    ORDER BY (max(responses.created_at));
