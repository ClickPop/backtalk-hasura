import {
  hashPersonalMessage,
  fromRpcSig,
  ecrecover,
  bufferToHex,
  publicToAddress,
} from 'ethereumjs-util';
import { SIGNER_MESSAGE } from 'src/config/env';

export const decodeSignedMessage = (msg: string) => {
  try {
    const data = SIGNER_MESSAGE;
    const sig = hashPersonalMessage(Buffer.from(data));
    const sigParams = fromRpcSig(msg);
    const publicKey = ecrecover(sig, sigParams.v, sigParams.r, sigParams.s);
    return bufferToHex(publicToAddress(publicKey));
  } catch (err) {
    console.error(err);
    return null;
  }
};
