import { getContractByAddressAndTokenType } from 'src/lib/ethersService';
import { app } from 'src/lib/express';
import { sdk } from 'src/lib/graphql';
import { errorHandler } from 'src/errors/errorHandler';
import { getQuestionsMiddleware } from 'src/middleware/getQuestions';
import { NewResponseHandler, Token_Types_Enum } from 'src/types';

const { upsertResponses } = sdk;

const createNewResponse: NewResponseHandler = async (req, res) => {
  const responseData = req.body.input.input;
  const wallet = req.body.session_variables['x-hasura-user-id'];
  const questions = res.locals.questions;
  const responsesCount = Math.max(
    ...questions.map((q) => q.responses_aggregate?.aggregate?.count ?? 0),
  );
  const isActive = questions.reduce<boolean>(
    (acc, curr) => (acc || curr.survey.is_active) ?? false,
    false,
  );

  if (!isActive) {
    return errorHandler(res, { msg: 'survey is not active', code: 400 });
  }
  let tokenCount = 0;
  for (const question of questions) {
    if (
      question?.survey?.max_responses &&
      responsesCount >= question.survey.max_responses
    ) {
      return errorHandler(res, {
        msg: 'max amount of responses reached',
        code: 500,
      });
    }
    const contractInfo = question.survey.contract;
    if (contractInfo) {
      if (contractInfo.token_type !== Token_Types_Enum.Erc721) {
        return errorHandler(res, {
          msg: 'token type on contract not supported',
          code: 400,
        });
      }

      const contract = getContractByAddressAndTokenType(
        contractInfo.address,
        contractInfo.token_type,
        contractInfo.chain,
      );

      const balance = await contract.balanceOf(wallet);

      if (balance < 1) {
        return errorHandler(res, { msg: 'not enough tokens owned', code: 400 });
      }

      tokenCount = balance.toString();
    }
  }

  const responses = await upsertResponses({
    input: responseData.map((r) => ({
      ...r,
      wallet,
      token_count: tokenCount > 0 ? tokenCount : undefined,
    })),
  });

  if (!responses.insert_responses) {
    return errorHandler(res, { code: 500, msg: 'no responses upserted' });
  }

  return res.json(responses.insert_responses?.returning);
};

app.post('/new-response', getQuestionsMiddleware, createNewResponse);
