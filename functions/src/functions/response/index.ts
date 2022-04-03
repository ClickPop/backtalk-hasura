import { getContractByAddressAndTokenType } from 'src/lib/ethersService';
import { app } from 'src/lib/express';
import { sdk } from 'src/lib/graphql';
import { errorHandler } from 'src/errors/errorHandler';
import { getQuestionMiddleware } from 'src/middleware/getQuestion';
import { NewResponseHandler, Token_Types_Enum } from 'src/types';

const { upsertResponse } = sdk;

const createNewResponse: NewResponseHandler = async (req, res) => {
  const { response_content, response_option_id, question_id } =
    req.body.input.input;
  const wallet = req.body.session_variables['x-hasura-user-id'];
  const question = res.locals.question;
  const contractInfo = question.survey.contract;
  if (contractInfo?.token_type !== Token_Types_Enum.Erc721) {
    return errorHandler(res, {
      msg: 'token type on contract not supported',
      code: 400,
    });
  }

  const contract = getContractByAddressAndTokenType(
    contractInfo.address,
    contractInfo.token_type,
  );

  const balance = await contract.balanceOf(wallet);

  if (balance < 1) {
    return errorHandler(res, { msg: 'not enough tokens owned', code: 400 });
  }

  const response = await upsertResponse({
    input: {
      wallet,
      response_content,
      question_id,
      response_option_id,
    },
  });

  return res.json(response.insert_responses_one);
};

app.post('/new-response', getQuestionMiddleware, createNewResponse);
