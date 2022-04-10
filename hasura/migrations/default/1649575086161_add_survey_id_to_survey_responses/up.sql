CREATE OR REPLACE VIEW survey_responses AS
SELECT public."responses".wallet, array_agg(public."responses".question_id) AS question_ids, array_agg(public."responses".response_content) AS response_values, public."surveys".id
FROM public."surveys"
LEFT JOIN public."questions"
ON public."surveys".id=public."questions".survey_id
LEFT JOIN public."responses"
ON public."questions".id=public."responses".question_id
GROUP BY (public."responses".wallet,public."surveys".id);
