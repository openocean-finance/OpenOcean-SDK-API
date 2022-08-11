

import { utils } from "./../utils";
import { chains } from "./../config/Chains";
import { ERC20_abi } from "./../config";

export async function getAllowance(account: string, tokenAddress: string, decimals: number, chainName: string, approveContract: string, myWallet: any): Promise<string> {

  let contract = null;
  if (chainName === 'ont' || chainName === 'solana' || chainName === 'osmosis' || chainName === 'sifchain') {
    return '-1'
  } else if (chainName === 'terra') {
    return '1000000000000000'
  } else if (chainName === 'tron') {
    if (tokenAddress.toLowerCase() === "t9yd14nj9j7xab4dbgeix9h8unkkhxuwwb") {
      return '-1'
    }
    try {
      contract = await myWallet.contract().at(tokenAddress);

      let approve = await contract.methods
        .allowance(account, approveContract)
        .call();
      approve = (approve && approve.approve) || approve || 0;

      return utils.getFixed(utils.decimals2Amount(approve || 0, decimals), 6)
    } catch (e) {
      console.log("triggerConfirmedConstantContract", e);
      return '-1'
    }
  }

  if (chains.isNativeToken(chainName, tokenAddress)) {
    return '-1'
  } else {
    try {
      contract = new myWallet.eth.Contract(ERC20_abi, tokenAddress);
      const approve = await contract.methods
        .allowance(account, approveContract)
        .call();
      return utils.getFixed(utils.decimals2Amount(approve || 0, decimals), 6)
    } catch (e) {
      return '-1'
    }
  }

}


