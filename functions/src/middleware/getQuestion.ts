import { errorHandler } from 'src/errors/errorHandler';
import { sdk } from 'src/lib/graphql';
import { GetQuestionMiddleware } from 'src/types';

const { getQuestionById } = sdk;

export const getQuestionMiddleware: GetQuestionMiddleware = async (
  req,
  res,
  next,
) => {
  const { question_id } = req.body.input.input;
  const question = await getQuestionById({ question_id });
  if (question.questions_by_pk) {
    res.locals.question = question.questions_by_pk;
    return next();
  }

  return errorHandler(res, {
    code: 404,
    msg: `question with id ${question_id} now found`,
  });
};
