import { decodeSignedMessage } from 'src/utils/decodeSignedMessage';
import { authMiddleware } from 'src/middleware/auth';
import { app } from 'src/lib/express';
import {
  HasuraActionHandler,
  HasuraAuthHook,
  HasuraAuthHookReponseBody,
  HasuraLoginHandler,
  Roles_Enum,
} from 'src/types';
import { sdk } from 'src/lib/graphql';
const { upsertUser } = sdk;
const authHook: HasuraAuthHook = async (_, res) => {
  try {
    const wallet = res.locals.auth;
    const role: Roles_Enum = wallet ? Roles_Enum.User : Roles_Enum.Anonymous;
    const result: HasuraAuthHookReponseBody = {
      'x-hasura-user-id': wallet,
      'x-hasura-role': role,
    };
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

const authCheck: HasuraActionHandler<{
  id: string | null;
  role: Roles_Enum;
}> = async (req, res) => {
  const wallet = req.body.session_variables['x-hasura-user-id'];
  const role = req.body.session_variables['x-hasura-role'];
  const result = {
    id: wallet ?? null,
    role: role,
  };
  return res.json(result);
};

const login: HasuraLoginHandler = async (req, res) => {
  try {
    const { wallet, msg } = req.body.input;
    const signer = decodeSignedMessage(msg);
    if (signer && signer === wallet.toLowerCase()) {
      res.cookie('wallet', wallet, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'prod',
        httpOnly: true,
        signed: true,
      });
      return res.send({
        'x-hasura-user-id': signer,
        'x-hasura-role': Roles_Enum.User,
      });
    }
    return res.status(401).send({ error: 'Invalid login' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

app.post('/auth/login', login);
app.get('/auth', authMiddleware, authHook);
app.post('/auth-check', authCheck);
