-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE FUNCTION latest_response(survey_row surveys)
-- RETURNS timestamptz as $$
--     SELECT public."responses".created_at
--     FROM public."surveys"
--     LEFT JOIN public."questions"
--     ON public."surveys".id=public."questions".survey_id
--     LEFT JOIN public."responses"
--     ON public."questions".id=public."responses".question_id
--     WHERE public."surveys".id = survey_row.id
--     ORDER BY public."responses".created_at DESC
--     LIMIT 1;
-- $$ LANGUAGE sql STABLE;