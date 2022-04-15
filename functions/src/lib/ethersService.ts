import { ethers } from 'ethers';
import { ETH_URL, POLYGON_URL } from 'src/config/env';
import { Supported_Chains_Enum, Token_Types_Enum } from 'src/types';

const getAbi = (token_type: Token_Types_Enum): ethers.ContractInterface => {
  switch (token_type) {
    case Token_Types_Enum.Erc721:
      return ['function balanceOf(address owner) view returns (uint)'];
    default:
      return [];
  }
};

const getProvider = (chain: Supported_Chains_Enum) => {
  switch (chain) {
    case Supported_Chains_Enum.Ethereum:
      return new ethers.providers.JsonRpcProvider(ETH_URL);
    case Supported_Chains_Enum.Polygon:
      return new ethers.providers.JsonRpcProvider(POLYGON_URL);
    default:
      break;
  }
};

export const getContractByAddressAndTokenType = (
  token_address: string,
  token_type: Token_Types_Enum,
  chain: Supported_Chains_Enum,
) => {
  const abi = getAbi(token_type);
  return new ethers.Contract(token_address, abi, getProvider(chain));
};
