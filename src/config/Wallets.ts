

import {
  MetaMask,
  BscWallet,
  WalletConnect,
  CoinbaseWallet,
  BitKeepWallet,
  Cyano,
  TronLink,
  Sollet,
  SolflareWallet,
  OntoMobile,
  TrustWallet,
  MathWallet,
  TokenPocket,
  SafePalWallet,
  OntoWallet,
  Coin98,
  ImTokenWallet,
  Phantom,
  TerraStation,
  GnosisSafeWallet,
  CloverWallet,
  CryptoCom,
  BraveWallet,
  XDEFIWallet,
  MetaXWallet,
  SlopeWallet,
  KeplrWallet,
} from "@openocean.finance/wallet";


export enum WalletNames {
  'MetaMask',
  'WalletConnect',
  'BscWallet',
  'Cyano',
  'OntoMobile',
  'TronLink',
  'Sollet',
  'SolflareWallet',
  'TrustWallet',
  'MathWallet',
  'TokenPocket',
  'SafePalWallet',
  'OntoWallet',
  'Coin98Wallet',
  'ImTokenWallet',
  'Phantom',
  'TerraStation',
  'CoinbaseWallet',
  'GnosisSafeWallet',
  'BitKeepWallet',
  'CloverWallet',
  'CryptoCom',
  'BraveWallet',
  'XDEFIWallet',
  'MetaXWallet',
  'SlopeWallet',
  'KeplrWallet',
}

const WalletObj: any = {
  MetaMask: new MetaMask(),
  TrustWallet: new TrustWallet(),
  BraveWallet: new BraveWallet(),
  BscWallet: new BscWallet(),
  WalletConnect: new WalletConnect(),
  CoinbaseWallet: new CoinbaseWallet(),
  SafePalWallet: new SafePalWallet(),
  BitKeepWallet: new BitKeepWallet(),
  XDEFIWallet: new XDEFIWallet(),
  OntoWallet: new OntoWallet(),
  Coin98Wallet: new Coin98(),
  TokenPocket: new TokenPocket(),
  CloverWallet: new CloverWallet(),
  ImTokenWallet: new ImTokenWallet(),
  MetaXWallet: new MetaXWallet(),
  MathWallet: new MathWallet(),
  CryptoCom: new CryptoCom(),
  Cyano: new Cyano(),
  OntoMobile: new OntoMobile(),
  TronLink: new TronLink(),
  Sollet: new Sollet(),
  SolflareWallet: new SolflareWallet(),
  Phantom: new Phantom(),
  TerraStation: new TerraStation(),
  GnosisSafeWallet: new GnosisSafeWallet(),
  SlopeWallet: new SlopeWallet(),
  KeplrWallet: new KeplrWallet(),
};

export class Wallets {
  walletObj: any = {}
  walletList: any[] = []
  constructor() {
    WalletObj.MetaMask.supportChains.push('rinkeby')
    WalletObj.MetaMask.supportChains.push('ropsten')
    this.walletObj = WalletObj
    this.walletList = Object.keys(WalletObj).map((key: string) => {
      WalletObj[key].key = key
      return WalletObj[key]
    })
  }
}

export const wallets = new Wallets()


