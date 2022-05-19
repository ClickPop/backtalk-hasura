require('module-alias/register');
import { Wallet } from 'ethers';
import { gql } from 'graphql-request';
import { client } from 'src/lib/graphql';
import { faker } from '@faker-js/faker';
import {
  Questions,
  Question_Type_Enum,
  Responses_Insert_Input,
  Surveys_Insert_Input,
  Users_Insert_Input,
} from 'src/schema/schema.g';

const createUsers = gql`
  mutation InsertUsers($users: [users_insert_input!]!) {
    insert_users(objects: $users) {
      affected_rows
    }
  }
`;

const createSurveys = gql`
  mutation InsertSurveys($surveys: [surveys_insert_input!]!) {
    insert_surveys(objects: $surveys) {
      affected_rows
    }
  }
`;

const createResponses = gql`
  mutation InsertResponses($responses: [responses_insert_input!]!) {
    insert_responses(objects: $responses) {
      affected_rows
    }
  }
`;

const getQuestions = gql`
  query GetQuestions {
    questions {
      id
      options {
        id
        content
      }
    }
  }
`;

function getRandomNumBounded(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getWallets(): Users_Insert_Input[] {
  const users: Users_Insert_Input[] = [];
  for (let i = 0; i < 25; i++) {
    users.push({ wallet: Wallet.createRandom().address });
  }
  return users;
}

function getSurveys(users: Users_Insert_Input[]): Surveys_Insert_Input[] {
  const surveys: Surveys_Insert_Input[] = [];
  for (let i = 0; i < 10; i++) {
    const question = getRandomNumBounded(0, 1)
      ? {
          prompt: 'freeform',
          is_required: true,
          question_type: Question_Type_Enum.FreeResponse,
        }
      : {
          prompt: 'multi-choice',
          is_required: true,
          question_type: Question_Type_Enum.MultipleChoice,
          options: {
            data: [
              {
                content: 'option 1',
              },
              {
                content: 'option 2',
              },
              {
                content: 'option 3',
              },
              {
                content: 'option 4',
              },
            ],
          },
        };
    surveys.push({
      title: faker.lorem.words(getRandomNumBounded(3, 6)),
      description: faker.lorem.lines(getRandomNumBounded(1, 3)),
      owner: users[getRandomNumBounded(0, users.length - 1)].wallet,
      max_responses: getRandomNumBounded(0, 1)
        ? getRandomNumBounded(10, 1000)
        : undefined,
      is_active: true,
      questions: {
        data: [question],
      },
    });
  }
  return surveys;
}

function getResponses(
  users: Users_Insert_Input[],
  questions: Questions[],
): Responses_Insert_Input[] {
  const responses: Responses_Insert_Input[] = [];
  for (const question of questions) {
    const numResponses = getRandomNumBounded(10, users.length - 1);
    const rand = getRandomNumBounded(0, users.length - numResponses - 1);
    const wallets = users.slice(rand, rand + numResponses).map((u) => u.wallet);
    for (const wallet of wallets) {
      const option = question.options.length
        ? question.options[getRandomNumBounded(0, question.options.length - 1)]
        : null;
      responses.push({
        wallet,
        question_id: question.id,
        ...(option
          ? {
              response_content: option.content,
              response_option_id: option.id,
            }
          : {
              response_content: faker.lorem.words(getRandomNumBounded(3, 6)),
            }),
      });
    }
  }
  return responses;
}

async function main() {
  try {
    const users = getWallets();
    const surveys = getSurveys(users);
    await client.request(createUsers, { users });
    await client.request(createSurveys, { surveys });
    const resp = await client.request(getQuestions);
    const responses = getResponses(users, resp.questions);
    await client.request(createResponses, { responses });
  } catch (err) {
    console.error(err);
  }
}

main();
