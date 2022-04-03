import { app } from 'src/lib/express';
import { sdk } from 'src/lib/graphql';
import { authMiddleware } from 'src/middleware/auth';
import { getQuestionMiddleware } from 'src/middleware/getQuestion';
import { NewResponseHandler } from 'src/types';

const { getQuestionById } = sdk;

const createNewResponse: NewResponseHandler = async (req, res) => {
  const { response_content, response_option_id } = req.body.input;
  const question = res.locals.question;
  return res.json({ error: 'not implemented' });
};

app.post(
  '/new-response',
  authMiddleware,
  getQuestionMiddleware,
  createNewResponse,
);
