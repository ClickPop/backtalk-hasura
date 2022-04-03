import { Response } from 'express';
import { ErrorObj } from 'src/types';

export const errorHandler = (res: Response, err?: ErrorObj) => {
  console.error(err?.error ?? `${err?.code}: ${err?.msg}`);
  return res.status(err?.code ?? 500).json({
    message: err?.msg ?? 'an unexpected error occurred',
    extensions: {
      code: err?.code ?? 500,
      error: err?.error,
    },
  });
};
