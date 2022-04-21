import { getContractByAddressAndTokenType } from 'src/lib/ethersService';
import { app } from 'src/lib/express';
import { sdk } from 'src/lib/graphql';
import { errorHandler } from 'src/errors/errorHandler';
import { getQuestionsMiddleware } from 'src/middleware/getQuestions';
import {
  NewResponseHandler,
  Question_Type_Enum,
  Token_Types_Enum,
} from 'src/types';

const { upsertResponses } = sdk;

const createNewResponse: NewResponseHandler = async (req, res) => {
  const responseData = req.body.input.input.responses;
  const wallet = req.body.session_variables['x-hasura-user-id'];
  const survey = res.locals.survey;
  const { questions } = survey;
  if (!survey.is_active) {
    return errorHandler(res, { msg: 'survey is not active', code: 400 });
  }

  if (
    typeof survey?.max_responses === 'number' &&
    typeof survey?.response_count === 'number' &&
    survey.response_count >= survey.max_responses
  ) {
    return errorHandler(res, {
      msg: 'max amount of responses reached',
      code: 500,
    });
  }
  let tokenCount = 0;
  const contractInfo = survey.contract;
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
  for (const question of questions) {
    if (
      question.is_required &&
      !responseData.find((r) => r.question_id === question.id)
    ) {
      return errorHandler(res, {
        msg: `missing required response for question id ${question.id}`,
        code: 400,
      });
    }
    const response = responseData.find((r) => r.question_id === question.id)!;

    if (!response.response_content) {
      return errorHandler(res, {
        msg: `invalid response content for question id: ${question.id}`,
        code: 400,
      });
    }

    if (question.question_type === Question_Type_Enum.MultipleChoice) {
      const option = question.options.find(
        (o) => o.id === response.response_option_id,
      );
      if (!option) {
        return errorHandler(res, {
          msg: `invalid option id: ${response.response_option_id} for question id: ${question.id}`,
          code: 400,
        });
      }

      if (option.content !== response.response_content) {
        return errorHandler(res, {
          msg: `invalid response content of: ${response.response_content} for option id: ${response.response_option_id} and question id: ${question.id}`,
          code: 400,
        });
      }
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
