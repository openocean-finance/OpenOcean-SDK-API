import { wallets } from "../config/Wallets";
import { utils } from "../utils";
import { Connection, PublicKey } from "@solana/web3.js";
import { chains } from "../config/Chains";
import { NotoMobile } from "./NotoMobile";

const axios = require('axios');

export class ConnectWallet {

  static async isChainIdEq(wallet: any, chainId: string, utilsEht: any, k?: number): Promise<any> {
    let key: number = k || 0
    await utils.sleep(1000)
    let chainIdNow = utilsEht.hexToNumber(wallet.sdk.currentProvider.chainId)
    if (chainId == chainIdNow) {
      wallet.chainId = chainId
      return true
    } else {
      if (key < 3) {
        return await this.isChainIdEq(wallet, chainId, utilsEht, key + 1)
      } else {
        throw new Error('User rejected the request.')
      }
    }
  }
  static async link(reqConnectWalletVo: any): Promise<any> {
    let wallet = wallets.walletObj[reqConnectWalletVo.walletName]
    if (!wallet) wallet = wallets.walletList.find(item => item.name == reqConnectWalletVo.walletName)

    const chain: any = chains.chainObj[reqConnectWalletVo.chain]
    if (!chain) throw new Error('Chain error.')
    const chainId: string = chain.chainId
    const selectedChain: string = chain.key
    try {
      if (wallet.type === 'WalletConnect') {
        wallet.infuraId = '2c7c4d86c2c746c89de722551b606119';
        await wallet.requestConnect(chainId)
      }
      else if (wallet.key === 'OntoMobile') {
        const qrData = await axios.get('https://ethapi.openocean.finance/v1/ont/login');
        wallet.qrData = qrData.data
        const instance = new NotoMobile(qrData.data);

        let account = await new Promise((r, q) => {
          instance.$on('close', (result: any, action: any, account: any) => {
            if (action === 'login' && result === 'success') {
              r(account)
            } else {
              q(action)
            }
          })
        })

        wallet.address = account;
      }
      else if (selectedChain === 'terra') {
        if (!wallet.sdk) {
          const res = await wallet.requestTerraConnect()
          if (res) {
            // this.connect(wallet);
          } else {
            // const message = {
            //   'XDEFI Wallet': 'wallet_message_40018',
            //   'Terra Station': 'wallet_message_40015'
            // }[wallet.name];
            // showToast(this.$t(message));
          }
        }
      } else if (selectedChain === "solana") {
        const res = await wallet.requestSolanaConnect();
        wallet.customPublicKey = new PublicKey(res);

        // "https://api.mainnet-beta.solana.com"
        // "https://solana-mainnet.phantom.tech"
        // "https://rpc.ankr.com/solana"
        // https://solana-api.projectserum.com
        // https://mercuria-fronten-1cd8.mainnet.rpcpool.com/
        wallet.connection = new Connection(
          "https://solana-api.projectserum.com"
        );
        if (res) {
          // this.connect(wallet);
        } else {
          // const message = {
          //   'Sollet': 'wallet_message_40010',
          //   'Coin98 Wallet': 'wallet_message_40011',
          //   'Phantom': 'wallet_message_40013',
          //   'Clover Wallet': 'wallet_message_40017',
          //   'Slope Wallet': 'wallet_message_40019',
          //   'Solflare Wallet': 'wallet_message_40020',
          // };
          // return {
          //   code: 401,
          //   message: message
          // }
        }
      } else if (selectedChain === 'tron') {
        let account = window.tronWeb.defaultAddress.base58
        if (!account) {
          await utils.sleep(1000)
          return await this.link(reqConnectWalletVo)
        }
        const res = await wallet.requestConnect();
        console.log('wallet.requestConnect', res, wallet);
      } else {
        const res = chainId ? await wallet.requestConnect(chainId) : await wallet.requestConnect();
        console.log('wallet.requestConnect', res, wallet);
        await utils.sleep(200)
        if (res) {
          // this.connect(wallet);
        }
      }

      return { chain, wallet }
    } catch (e: any) {
      const { message } = e;
      const { currentProvider, utils: utilsEht } = wallet.sdk || {};

      if (message === "40006" && currentProvider) {
        return await this.linkAddOrSwitch(reqConnectWalletVo, wallet, chain)
      } else {
        throw new Error(/^\d+$/.test(message) ? "wallet_message_" + message : message)
      }
    }
  }
  static async linkAddOrSwitch(reqConnectWalletVo: any, wallet: any, chain: any) {
    const { currentProvider, utils: utilsEht } = wallet.sdk || {};
    const chainId: string = chain.chainId
    const params = chains.ethereumChainParams[reqConnectWalletVo.chain];

    if (params) {
      await currentProvider.request({
        method: "wallet_addEthereumChain",
        params
      })

      if (await this.isChainIdEq(wallet, chainId, utilsEht)) {
        if (wallet.type === 'WalletConnect') {
          const [address] = await wallet.sdk.eth.getAccounts()
          wallet.address = address
        } else {
          const [address] = await wallet.sdk.eth.requestAccounts()
          wallet.address = address
        }
        return { chain, wallet }
      }

    } else if (chainId == '1' || chainId == '3' || chainId == '4') {
      await currentProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: utilsEht.toHex(chainId)
        }],
      });
      if (await this.isChainIdEq(wallet, chainId, utilsEht)) {
        if (wallet.type === 'WalletConnect') {
          const [address] = await wallet.sdk.eth.getAccounts()
          wallet.address = address
        } else {
          const [address] = await wallet.sdk.eth.requestAccounts()
          wallet.address = address
        }
        return { chain, wallet }
      }
    } else {
      throw new Error('Network error')
    }
  }
}

