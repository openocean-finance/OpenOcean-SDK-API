const axios = require('axios');
import { utils } from "./../utils";
import { LCDClient } from "@terra-money/terra.js";
import Web3 from "web3";
import { ERC20_abi } from "./../config";
import { PublicKey } from "@solana/web3.js";
import { chains } from "./../config/Chains";


export async function getBalance(account: string, tokenAddressOrSymbol: string, decimals: number, chainName: string, myWallet: any): Promise<any> {

  let balanceObj = {
    short: 0,
    long: 0,
    decimals,
    tokenAddress: tokenAddressOrSymbol
  }
  let balance: any = 0;
  let contract = null;
  if (chainName === 'ont') {
    balance = await axios.get(
      `https://ethapi.openocean.finance/v1/ont/token-balance?account=${account}&token=${tokenAddressOrSymbol}`
    );
    if (balance.data && balance.data[tokenAddressOrSymbol]) {
      balanceObj.short = balance.data[tokenAddressOrSymbol].balance
      balanceObj.long = balance.data[tokenAddressOrSymbol].balance * (10 ** decimals)
    }
  } else if (chainName === 'solana') {
    if (tokenAddressOrSymbol === "So11111111111111111111111111111111111111112") {
      balance = await myWallet.connection.getBalance(new PublicKey(account));
    } else {
      balance = await myWallet.connection.getParsedTokenAccountsByOwner(
        new PublicKey(account),
        {
          mint: new PublicKey(tokenAddressOrSymbol),
        }
      );
      let sum = 0;
      const { value = [] } = balance || {};
      value.forEach((item: any) => {
        const { account } = item || {};
        const { data } = account || {};
        const { parsed } = data || {};
        const { info } = parsed || {};
        const { tokenAmount } = info || {};
        const { amount = 0 } = tokenAmount || {};
        sum += +amount;
      });
      balance = sum
    }
    balanceObj.long = balance
    balanceObj.short = +utils.toFixed(utils.decimals2Amount(balance || 0, decimals), 6)

  } else if (chainName === 'terra') {
    const terra = new LCDClient({
      URL: "https://lcd.terra.dev",
      chainID: "columbus-5",
    });
    const result: any = await terra.bank.balance(account);
    const _symbol: any = {
      'luna': 'uluna',
      'ust': 'uusd',
    }[tokenAddressOrSymbol.toLowerCase()] || tokenAddressOrSymbol.toLowerCase();
    const token = result[0]._coins[_symbol];
    let amount = 0;
    if (token) {
      amount = token.amount.toNumber();
    } else {
      try {
        const res = await axios.get(
          `https://fcd.terra.dev/wasm/contracts/${tokenAddressOrSymbol}/store`,
          {
            params: {
              query_msg: {
                balance: {
                  address: account,
                },
              },
            },
            cache: false,
          }
        );
        amount = +(res.result.balance || 0);
      } catch (e) {
        console.log('terra balanceOf', e);
      }
    }
    balanceObj.long = amount
    balanceObj.short = +utils.toFixed(utils.decimals2Amount(amount || 0, decimals), 6)
  } else if (chainName === 'tron') {
    if (tokenAddressOrSymbol.toLowerCase() === "t9yd14nj9j7xab4dbgeix9h8unkkhxuwwb") {
      balance = await myWallet.sdk.trx.getBalance(account);
      balanceObj.long = myWallet.sdk.fromSun(balance) * (10 ** decimals)
      balanceObj.short = myWallet.sdk.fromSun(balance)
    }
    try {
      contract = await myWallet.sdk.contract().at(tokenAddressOrSymbol);

      balance = await contract.balanceOf(account).call();
      const balanceDecimals = Web3.utils.hexToNumberString(balance || 0);
      if (balanceDecimals) {
        balanceObj.long = Number(balanceDecimals)
        balanceObj.short = +utils.toFixed(utils.decimals2Amount(balanceDecimals, decimals), 6)
      }

    } catch (e) {
      console.log("triggerConfirmedConstantContract", e);
    }
  } else if (chainName === 'osmosis' || chainName === 'sifchain') {
    const { result = [] } = await myWallet.lcdClient.bank.balances(account);
    result.forEach((item: any) => {
      const { amount, denom } = item;
      if (denom === tokenAddressOrSymbol) {
        balance = amount
      }
    });
    balanceObj.long = balance
    balanceObj.short = +utils.toFixed(utils.decimals2Amount(balance, decimals), 6)
  } else {
    if (chains.isNativeToken(chainName, tokenAddressOrSymbol)) {
      console.log('myWallet', myWallet);
      if (myWallet.key === "GnosisSafeWallet") {
        balance = await myWallet.sdk.eth.getBalance([account, "latest"]);
      } else {
        balance = await myWallet.sdk.eth.getBalance(account);
      }
    } else {
      try {
        contract = new myWallet.sdk.eth.Contract(ERC20_abi, tokenAddressOrSymbol);
        balance = await contract.methods.balanceOf(account).call();
      } catch (e) {
      }
    }
    if (balance) {
      balanceObj.long = balance
      balanceObj.short = +utils.toFixed(utils.decimals2Amount(balance, decimals), 6)
    }
  }

  return balanceObj
}

