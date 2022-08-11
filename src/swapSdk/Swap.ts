import { aggregator } from "../asset/abi/aggregator";
import { ReqSwapVo } from "../api/vo/RequestVo";
import { chains } from "../config/Chains";
import { Transaction } from "@solana/web3.js";
import { LCDClient, MsgExecuteContract } from "@terra-money/terra.js";
import { utils } from "ontology-ts-sdk";


import { client } from "@ont-dev/ontology-dapi";
import { NotoMobile } from "./NotoMobile";
const axios = require('axios');
const bs58 = require("bs58");
client.registerClient({});

export { ReqSwapVo }
export class Swap {
  private getDataCallback: Function = () => { }
  private errorCallback: Function = () => { }
  private transactionHashCallback: Function = () => { }
  private receiptCallback: Function = () => { }
  private successCallback: Function = () => { }
  contract: any
  res: any
  wallet: any
  chain: any
  isNew: boolean

  constructor(res: any, wallet: any, chain: any, isNew?: boolean) {
    this.res = res
    this.wallet = wallet
    this.chain = chain
  }

  send() {
    setTimeout(() => {
      switch (this.chain.compiler) {
        case 'EVM':
          if (this.isNew) {
            this.sendEthTransactionNew()
          } else {
            this.sendEthTransaction()
          }
          break
        case 'SOL':
          this.sendSolanaTransaction()
          break
        case 'TRON':
          this.sendTronTransaction()
          break
        case 'TERRA':
          this.sendTerraTransaction()
          break
        case 'ONT':
          this.sendONTTransaction()
          break
      }
    }, 200);
    return this
  }
  getGas() {
    return new Promise((r, j) => {
      setTimeout(async () => {
        switch (this.chain.compiler) {
          case 'EVM':
            if (this.isNew) {
              r(await this.getGasNew())
            } else {
              r(await this.getGasOld())
            }
            break
        }
      }, 200);
    })

  }

  async sendONTTransaction() {
    const { approve, swap, transaction, inAmount, inToken } = this.res;
    if (this.wallet.key === "OntoMobile") {
      const instance = new NotoMobile(approve ? approve : swap);
      let account = await new Promise((r, q) => {
        instance.$on('close', (result: any, action: any, account: any) => {
          if (action === 'login' && result === 'success') {
            r(account)
          } else {
            q(action)
          }
        })
      })
      this.transactionHashCallback(account)
    } else {
      if (approve) {
        this.approveOnt(transaction, inAmount, inToken);
      } else {
        this.sendOntTransactionSdk(transaction);
      }
    }
  }
  async sendSolanaTransaction() {
    const res = this.res;
    try {
      if (res.dex == "jupiter") {
        let { setupTransaction, swapTransaction, cleanupTransaction } = JSON.parse(res.transaction)
        let list = [setupTransaction, swapTransaction, cleanupTransaction].filter(Boolean)

        let recentBlock = await this.wallet.connection.getLatestBlockhash();
        const transactions = list.map((tx) => {
          let transaction = Transaction.from(Buffer.from(tx, "base64"));
          transaction.recentBlockhash = recentBlock.blockhash
          return transaction
        });

        await await this.wallet.sdk.signAllTransactions(transactions);

        let i = 0
        for (let transaction of transactions) {
          i++
          const txid = await this.wallet.connection.sendRawTransaction(
            transaction.serialize({ requireAllSignatures: false })
          );
          if (i < list.length) {
            await this.wallet.connection.confirmTransaction(txid);
          } else {
            this.transactionHashCallback(txid)
          }
        }
        return
      }
      const transaction: any = Transaction.from(Buffer.from(res.transaction, res.dex == "jupiter" ? "base64" : "hex"));

      let signed: any = null;
      let signature: any = null;

      if (this.wallet.sdk.isCoin98) {
        const result = await this.wallet.sdk.request({
          method: 'sol_sign',
          params: [transaction]
        });
        console.log("Got signature, submitting transaction");
        const bytes = bs58.decode(result.signature);
        transaction.signatures[0].signature = bytes;
        transaction.feePayer = this.wallet.customPublicKey;
        signed = transaction;
      } else if (this.wallet.sdk.isSlopeWallet) {
        const { msg, data } = await this.wallet.sdk.signTransaction(bs58.encode(transaction.serializeMessage()))
        if (msg !== 'ok') return;
        const bytes = bs58.decode(data.signature);
        transaction.signatures[0].signature = bytes;
        transaction.feePayer = this.wallet.customPublicKey;
        signed = transaction;
      } else {
        signed = await this.wallet.sdk.signTransaction(transaction);
      }
      signature = await this.wallet.connection.sendRawTransaction(
        signed.serialize({ requireAllSignatures: false })
      );
      // this.receiptCallback(signature)
      this.transactionHashCallback(signature)
    } catch (e: any) {
      this.errorCallback(e.message)
    }
  }
  async getGasOld() {
    const {
      inToken,
      inAmount,
      data,
      to
    } = this.res;
    const gas = await this.wallet.sdk.eth.estimateGas({
      from: this.wallet.address,
      to,
      data,
      value: chains.isNativeToken(this.chain.key, inToken.address) ? inAmount : 0
    })
    return Math.ceil(gas * 1.15);
  }
  async getGasNew() {

    const {
      inToken,
      inAmount,
      outAmount,
      outToken,
      data,
      to
    } = this.res;
    const myWallet = this.wallet.sdk;
    const contract = new myWallet.eth.Contract(aggregator, chains.getProxyContract(this.chain.key));
    const invitee = this.wallet.address;
    const path = [inToken.address, outToken.address];
    const amounts = [inAmount, outAmount];
    const swapAddr = to;
    const swapExtraData = data;
    const gas = await contract.methods
      .swap(invitee, path, amounts, swapAddr, swapExtraData)
      .estimateGas({
        from: this.wallet.address,
        value: chains.isNativeToken(this.chain.key, inToken.address) ? inAmount : 0
      });
    return Math.ceil(gas * 1.5);
  }
  async sendEthTransactionNew() {
    const {
      inToken,
      inAmount,
      outAmount,
      outToken,
      data,
      to,
      ethGasPrice,
      gasPrice
    } = this.res;
    const myWallet = this.wallet.sdk;
    const contract = new myWallet.eth.Contract(aggregator, chains.getProxyContract(this.chain.key));
    const invitee = this.wallet.address;
    const path = [inToken.address, outToken.address];
    const amounts = [inAmount, outAmount];
    const swapAddr = to;
    const swapExtraData = data;

    let swapParams: any = {
      from: this.wallet.address,
      gas: await this.getGasNew(),
      to,
      data
    }

    if (ethGasPrice) {
      const { maxFeePerGas, maxPriorityFeePerGas } = ethGasPrice;
      if (maxFeePerGas && maxPriorityFeePerGas) {
        swapParams.maxFeePerGas = +maxFeePerGas;
        swapParams.maxPriorityFeePerGas = +maxPriorityFeePerGas;
      }
    } else {
      swapParams.gasPrice = +gasPrice;
    }

    if (chains.isNativeToken(this.chain.key, inToken.address)) {
      swapParams.value = inAmount;
    }

    contract.methods
      .swap(invitee, path, amounts, swapAddr, swapExtraData)
      .send(swapParams)
      .on('error', (error: any) => {
        this.errorCallback(error)
      })
      .on('transactionHash', (transactionHash: any) => {
        this.transactionHashCallback(transactionHash)
      })
      .on('receipt', (receipt: any) => {
        this.receiptCallback(receipt)
        // this.getSuccess()
      })
  }
  async sendEthTransaction() {
    const {
      inToken,
      inAmount,
      data,
      to,
      ethGasPrice,
      gasPrice,
    } = this.res;

    let swapParams: any = {
      from: this.wallet.address,
      to,
      data
    }

    if (chains.isNativeToken(this.chain.key, inToken.address)) {
      swapParams.value = inAmount;
    }
    if (this.wallet.key === "GnosisSafeWallet") {
      try {
        const { safeTxHash } = await this.wallet.sdk.txs.send({
          txs: [
            {
              to: swapParams.to,
              value: swapParams.value || '0',
              data: swapParams.data,
            },
          ],
        });
        this.getGnosisSafeTransaction(safeTxHash);
      } catch (e: any) {
        this.errorCallback((e && e.message) || e);
      }
      return;
    }
    try {
      let gas = await this.getGasOld()
      swapParams.gas = gas
    } catch (e: any) {
      if (e && e.message.indexOf('JSON-RPC error.') != -1) {
        e = JSON.parse(e.message.split('JSON-RPC error.')[1])
      }
      this.errorCallback((e && e.message) || e)
    }
    if (ethGasPrice) {
      const { maxFeePerGas, maxPriorityFeePerGas } = ethGasPrice;
      if (maxFeePerGas && maxPriorityFeePerGas) {
        swapParams.maxFeePerGas = +maxFeePerGas;
        swapParams.maxPriorityFeePerGas = +maxPriorityFeePerGas;
      }
    } else {
      swapParams.gasPrice = +gasPrice;
    }
    this.wallet.sdk.eth.sendTransaction(swapParams)
      .on('error', (error: any) => {
        this.errorCallback(error)
      })
      .on('transactionHash', (transactionHash: any) => {
        this.transactionHashCallback(transactionHash)
      })
      .on('receipt', (receipt: any) => {
        this.receiptCallback(receipt)
        // this.getSuccess()
      })
  }
  async getGnosisSafeTransaction(safeTxHash: string) {
    const { txHash } = await this.wallet.sdk.txs.getBySafeTxHash(safeTxHash);
    console.log('safeTxHash', safeTxHash, txHash);
    if (txHash) {
      this.transactionHashCallback(txHash);
    } else {
      setTimeout(async () => {
        await this.getGnosisSafeTransaction(safeTxHash);
      }, 2000);
    }
  }
  async sendTronTransaction() {
    const {
      inToken,
      outToken,
      inAmount,
      outAmount,
      minOutAmount,
      addresses,
      calldata,
      offsets,
      gasLimitsAndValues,
    } = this.res;
    // const { abi, contract } = res2;
    let { data }: any = await axios.get(`https://ethapi.openocean.finance/v1/tron/exchange`);
    const _contract = await this.wallet.sdk.contract(data.abi, data.contract);
    // const _contract = await this.wallet.sdk.contract(aggregator, chains.getProxyContract(this.chain.key));
    
    let swapParams: any = {
      feeLimit: 300000000,
    };
    if (inToken.toLowerCase() === "t9yd14nj9j7xab4dbgeix9h8unkkhxuwwb") {
      swapParams.callValue = inAmount;
    }
    try {
      _contract.methods
        .swap(
          inToken,
          outToken,
          inAmount,
          minOutAmount,
          outAmount, // guaranteedAmount
          "0x0000000000000000000000000000000000000000", // referrer
          addresses,
          calldata,
          offsets,
          gasLimitsAndValues
        )
        .send(swapParams, (result: any, txHash: any) => {
          console.log("state.multicall.methods.swap", result);
          if (result) {
            this.errorCallback(result.message || result)
          } else {
            this.transactionHashCallback(txHash)
          }
        });
    } catch (e: any) {
      this.errorCallback(e || e.message)
    }
  }

  async sendTerraTransaction() {

    try {
      let { data }: any = await axios.get(`https://ethapi.openocean.finance/v1/terra/exchange`);
      const address = this.wallet.address; //state.default_account;
      const gasPrices = await axios.get("https://ethapi.openocean.finance/v1/terra/gas-price", { cache: true });
      const msg = await this.getTerraMsgExecuteContract(this.res, data, address, gasPrices.data);
      const { fee, accountInfo }: any = await this.getTerraFee(address, msg, gasPrices.data);
      await this.wallet.sdk.post({
        msgs: [msg],
        gasAdjustment: 1.5,
        waitForConfirmation: true,
        fee,
        account_number: accountInfo.account_number,
        sequence: accountInfo.sequence,
        purgeQueue: true,
      });
      this.wallet.sdk.on("onPost", (data: any) => {
        const { result, success } = data || {};
        if (success) {
          const { txhash } = result || {};
          this.transactionHashCallback(txhash)
        } else {
          this.errorCallback('Transaction failed')
        }
      });
    } catch (e: any) {
      this.errorCallback(e.message || e)
    }
  }

  private async approveOnt(transaction: any, _amount: any, inToken: string) {

    try {
      const { scriptHash, operation, gasLimit, args } = transaction;
      const params: any = {
        contract: inToken,
        operation: "approve",
        args: [
          {
            type: "Address",
            value: this.wallet.address,
          },
          {
            type: "ByteArray",
            value: utils.reverseHex(scriptHash),
          },
          {
            type: "ByteArray",
            value: utils.bigIntToBytes(_amount + ""),
          },
        ],
        gasPrice: 2500,
        gasLimit: 40000,
      };
      const result = await client.api.smartContract.invoke(params);
      console.log("approveOnt params, result", params, result);
      this.sendOntTransactionSdk(transaction);
    } catch (e: any) {
      // tslint:disable-next-line:no-console
      console.log("onScCall error:", e);
      this.errorCallback((e && e.message) || e)
    }
  }
  private async sendOntTransactionSdk(transaction: any) {
    try {
      const { scriptHash, operation, gasLimit, args } = transaction;
      const params = {
        scriptHash,
        operation,
        args: args.map((item: any) => {
          const { type } = item;
          if (["Long", "Integer"].indexOf(type) >= 0) {
            item.value = Number(item.value);
          }
          return item;
        }),
        gasPrice: 2500,
        gasLimit: 60000,
        requireIdentity: false,
      };
      const result = await client.api.smartContract.invoke(params);
      if (result && (result.transaction)) {
        this.transactionHashCallback(result.transaction)
      } else {
        this.errorCallback('Progress transactions submitted.')
      }
    } catch (e: any) {
      this.errorCallback((e && e.message) || e)
    }
  }

  private async getTerraFee(address: string, msg: any, gasPrices: any) {
    try {
      const terra = new LCDClient({
        chainID: "columbus-5",
        URL: "https://lcd.terra.dev",
        gasPrices,
        gasAdjustment: 1.75,
      });
      const accountInfo: any = await terra.auth.accountInfo(address);
      const fee = await terra.tx.estimateFee(
        [
          {
            sequenceNumber: accountInfo.sequence,
            publicKey: accountInfo.public_key,
          },
        ],
        {
          msgs: [msg],
          feeDenoms: ["uusd"],
        }
      );
      return {
        fee,
        accountInfo,
      };
    } catch (e) {
      return null;
    }
  }
  private getTerraMsgExecuteContract(res: any, res2: any, sender: any, gasPrices: any) {
    try {
      const { inToken, inAmount, data } = res;
      let dataObj: any = data.msgs.map((item: any) => {
        return JSON.parse(item)
      })
      let execute_swap_operations = dataObj[0].execute_msg.execute_swap_operations

      const { contract } = res2;
      const { address } = inToken;
      let msg = null;

      if (gasPrices[address]) {
        const coins: any = {};
        coins[address] = +inAmount;
        msg = new MsgExecuteContract(
          sender,
          contract,
          {
            execute_swap_operations,
          },
          coins
        );
      } else {
        msg = new MsgExecuteContract(
          sender,
          address,
          {
            send: {
              contract,
              amount: inAmount,
              msg: btoa(JSON.stringify({ execute_swap_operations })),
            },
          },
          []
        );
      }
      return msg;
    } catch (e) {
      return null;
    }
  }

  on(events: string, callback: Function) {
    if (events === 'error') {
      this.errorCallback = callback
    } else if (events === 'transactionHash') {
      this.transactionHashCallback = callback
    } else if (events === 'receipt') {
      this.receiptCallback = callback
    } else if (events === 'success') {
      this.successCallback = callback
    } else if (events === 'getDataSuccess') {
      this.getDataCallback = callback
    }

    return this
  }
}
