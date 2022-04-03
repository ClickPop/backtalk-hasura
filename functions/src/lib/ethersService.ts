import { ethers } from 'ethers';
import { POLYGON_URL } from 'src/config/env';
import { Token_Types_Enum } from 'src/types';

const getAbi = (token_type: Token_Types_Enum): ethers.ContractInterface => {
  switch (token_type) {
    case Token_Types_Enum.Erc721:
      return ['function balanceOf(address owner) view returns (uint)'];
    default:
      return [];
  }
};

export const provider = new ethers.providers.JsonRpcProvider(POLYGON_URL);

export const getContractByAddressAndTokenType = (
  token_address: string,
  token_type: Token_Types_Enum,
) => {
  const abi = getAbi(token_type);
  return new ethers.Contract(token_address, abi, provider);
};
