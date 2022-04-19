import { errorHandler } from 'src/errors/errorHandler';
import { sdk } from 'src/lib/graphql';
import { GetQuestionsMiddleware } from 'src/types';

const { getQuestionsBySurveyId } = sdk;

export const getQuestionsMiddleware: GetQuestionsMiddleware = async (
  req,
  res,
  next,
) => {
  const { questions } = await getQuestionsBySurveyId({
    survey_id: req.body.input.input.survey_id,
  });
  if (questions.length > 0) {
    res.locals.questions = questions;
    return next();
  }

  return errorHandler(res, {
    code: 404,
    msg: 'no questions found',
  });
};
