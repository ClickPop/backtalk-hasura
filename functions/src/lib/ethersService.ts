import { ethers } from 'ethers';
import { POLYGON_URL } from 'src/config/env';

const abi = [
  'function ownerOf(uint tokenId) view returns (address)',
  'function tokenURI(uint tokenId) view returns (string memory)',
];

export const provider = new ethers.providers.JsonRpcProvider(POLYGON_URL);
