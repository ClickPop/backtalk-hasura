import { errorHandler } from 'src/errors/errorHandler';
import { sdk } from 'src/lib/graphql';
import { GetQuestionsMiddleware } from 'src/types';

const { getQuestionsById } = sdk;

export const getQuestionsMiddleware: GetQuestionsMiddleware = async (
  req,
  res,
  next,
) => {
  const question_ids = req.body.input.input.map((r) => r.question_id);
  const { questions } = await getQuestionsById({ question_ids });
  if (questions.length > 0) {
    res.locals.questions = questions;
    return next();
  }

  return errorHandler(res, {
    code: 404,
    msg: `no questions found with ids ${question_ids}`,
  });
};
