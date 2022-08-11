import { ReqApproveVo } from "./RequestVo";
import Web3 from "web3";
export class Approve {
  errorCallback: Function = () => { }
  transactionHashCallback: Function = () => { }
  receiptCallback: Function = () => { }
  successCallback: Function = () => { }
  contract: any
  contractAddress: string
  tokenAddress: string
  account: string
  amount: string
  key: number
  wallet: any

  constructor(contract: any, wallet: any) {
    this.contract = contract;
    this.wallet = wallet;
  }

  async send(reqApproveVo: ReqApproveVo, address: string) {
    this.account = address
    this.key = 0
    this.contractAddress = reqApproveVo.contractAddress
    this.tokenAddress = reqApproveVo.tokenAddress

    if (this.wallet.key === "GnosisSafeWallet") {
      const web3 = new Web3();
      const data = web3.eth.abi.encodeFunctionCall({
        "inputs": [
          {
            "name": "spender",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "type": "function"
      }, [this.contractAddress, reqApproveVo.amount]);
      console.log('data', this.contractAddress, reqApproveVo.amount, data);
      try {
        const { safeTxHash } = await this.wallet.sdk.txs.send({
          txs: [
            {
              to: this.tokenAddress,
              value: 0,
              data
            },
          ],
        });
        console.log('safeTxHash', safeTxHash);
        setTimeout(() => {
          console.log('successCallback');
          this.successCallback(1);
        }, 3000);
      } catch(e:any) {
        setTimeout(() => {
          this.errorCallback(e);
        }, 500);
      }
    } else {
      if (!reqApproveVo.amount) {
        reqApproveVo.amount = await this.contract.methods.totalSupply().call()
      }
      this.amount = reqApproveVo.amount + ''
  
      let gasAmount = '80000'
      try {
        gasAmount = await this.contract.methods
          .approve(this.contractAddress, this.amount)
          .estimateGas({
            from: this.account,
          });
  
      } catch (error) {
        setTimeout(() => {
          this.errorCallback(error)
        }, 500);
        return
      }
  
      let json: any = {
        from: address,
      }
  
      if (reqApproveVo.gasPrice) {
        json.gasPrice = reqApproveVo.gasPrice
      }
      try {
        this.contract.methods.approve(this.contractAddress, this.amount)
          .send(json, (err: any, data: any) => {
            if (err) {
            } else {
            }
          })
          .on('error', (error: any) => {
            this.errorCallback(error)
          })
          .on('transactionHash', (transactionHash: any) => {
            this.transactionHashCallback(transactionHash)
          })
          .on('receipt', (receipt: any) => {
            this.receiptCallback(receipt)
            this.getSuccess()
          })
          .then((receipt: any) => {
          })
          .catch((err: any) => {
          })
      } catch (error) {
        this.errorCallback(error)
      }  
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
    }
    return this
  }
  async getSuccess() {
    const balance = await this.contract.methods.allowance(this.account, this.contractAddress).call();
    this.key++
    if (this.key > 20) return
    if (balance >= Number(this.amount)) {
      this.successCallback(balance)
    } else {
      setTimeout(() => {
        this.getSuccess()
      }, 2000);
    }
  }
}