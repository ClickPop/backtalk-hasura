CREATE FUNCTION response_count(survey_row surveys)
RETURNS BIGINT AS $$
  SELECT COUNT(DISTINCT public."responses".wallet)
  FROM public."surveys"
  LEFT JOIN public."questions"
  ON public."surveys".id=public."questions".survey_id
  LEFT JOIN public."responses"
  ON public."questions".id=public."responses".question_id
  WHERE public."surveys".id = survey_row.id;
$$ LANGUAGE sql STABLE;
