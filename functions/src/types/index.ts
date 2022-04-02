import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export enum Roles_Enum {
  Admin = 'admin',
  Anonymous = 'anonymous',
  User = 'user',
}

/**
 * Hasura
 * */

type HasuraSessionVariables = {
  'x-hasura-user-id'?: string;
  'x-hasura-role': Roles_Enum;
};

// These are the basic shapes of the request body coming in from Hasura into an action or trigger handler
export type HasuraActionReqBody = {
  action: {
    name: string;
  };
  input: Record<string, unknown>;
  session_variables: HasuraSessionVariables;
  request_query: string;
};

// These are generic types used for the hasura actions/triggers
export type HasuraActionHandler<
  ResponseBody,
  RequestBody = HasuraActionReqBody,
  QueryParams = qs.ParsedQs,
  ResponseLocals = Record<string, unknown>,
> = RequestHandler<
  ParamsDictionary,
  ResponseBody,
  RequestBody,
  QueryParams,
  ResponseLocals
>;

//Auth Hook Response handler
export type HasuraAuthHookReponseBody = HasuraSessionVariables | { error: any };

// Auth hook handler
export type HasuraAuthHook = RequestHandler<
  ParamsDictionary,
  HasuraAuthHookReponseBody,
  {},
  qs.ParsedQs,
  { auth: string }
>;

// Login action handler using the action handler generic
export type HasuraLoginHandler = HasuraActionHandler<
  HasuraSessionVariables | { error: unknown },
  { action: { name: 'login' }; input: { wallet: string; msg: string } }
>;

export interface ErrorObj {
  code: number;
  msg: string;
  error?: Error;
}
