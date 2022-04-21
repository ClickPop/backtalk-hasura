import { errorHandler } from 'src/errors/errorHandler';
import { sdk } from 'src/lib/graphql';
import { GetQuestionsMiddleware } from 'src/types';

const { getSurveyById } = sdk;

export const getQuestionsMiddleware: GetQuestionsMiddleware = async (
  req,
  res,
  next,
) => {
  const { surveys_by_pk } = await getSurveyById({
    survey_id: req.body.input.input.survey_id,
  });
  if (!surveys_by_pk) {
    return errorHandler(res, {
      code: 400,
      msg: `survey with id ${req.body.input.input.survey_id} does not exist`,
    });
  }
  const { questions } = surveys_by_pk;
  if (questions.length > 0) {
    res.locals.survey = surveys_by_pk;
    return next();
  }

  return errorHandler(res, {
    code: 404,
    msg: 'no questions found',
  });
};
