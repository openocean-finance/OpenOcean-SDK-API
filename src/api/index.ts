
import { get, post } from "../utils/ajx";
import { config } from "../config";
import { NftSignVo, NftSellVo, NftBuyVo, AssetsVo, CollectionsVo, TxsVo, TransactionVo, ChainName, ReqSwapVo, ReqBanlanceVo, ReqAllowanceVo, ReqTokenInfoVo, ReqQuoteVo, ReqGetTokenVo } from "./vo/RequestVo";
const axios = require('axios');

export class Api {
  public baseUrl: string = 'https://open-api.openocean.finance/v3'
  public baseUrlNft: string = 'http://10.17.130.161:7104/v1'
  public baseUrlV1: string = 'https://open-api.openocean.finance/v1'
  constructor(baseUrl?: string) {
    if (baseUrl) this.baseUrl = baseUrl
  }

  @setChainId
  public collections(option: CollectionsVo) {
    return get(`${this.baseUrlNft}/${option.chain}/${option.market}/collections`, option, CollectionsVo)
  }

  @setChainId
  public assets(option: AssetsVo) {
    return get(`${this.baseUrlNft}/${option.chain}/${option.market}/assets`, option, AssetsVo)
  }

  @setChainId
  public buy(option: NftBuyVo) {
    return post(`${this.baseUrlNft}/${option.chain}/${option.market}/buy`, option, NftBuyVo)
  }

  @setChainId
  public sell(option: NftSellVo) {
    return post(`${this.baseUrlNft}/${option.chain}/${option.market}/sell`, option, NftSellVo)
  }

  @setChainId
  public sign(option: NftSignVo) {
    return post(`${this.baseUrlNft}/${option.chain}/${option.market}/sign`, option, NftSignVo)
  }


  @setChainId
  public quote(option: ReqQuoteVo) {
    return get(`${this.baseUrl}/${option.chain}/quote`, option, ReqQuoteVo)
  }

  @setChainId
  public swapQuote(option: ReqSwapVo) {
    return get(`${this.baseUrl}/${option.chain}/swap_quote`, option, ReqSwapVo)
  }

  @setChainId
  public getGasPrice(option: any) {
    return get(`${this.baseUrl}/${option.chain}/gasPrice`, option, ChainName)
  }

  @setChainId
  public getTransaction(option: TransactionVo) {
    return get(`${this.baseUrl}/${option.chain}/getTransaction`, option, TransactionVo)
  }

  @setChainId
  public getTokenList(option: ChainName) {
    return get(`${this.baseUrl}/${option.chain}/tokenList`, option, ChainName)
  }

  @setChainId
  public dexList(option: ChainName) {
    return get(`${this.baseUrl}/${option.chain}/dexList`, option, ChainName)
  }

  @setChainId
  public getTxs(option: TxsVo) {
    return get(`${this.baseUrl}/${option.chain}/getTxs`, option, TxsVo)
  }

  public getTokenPrice(id: string) {
    return axios.get(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${id}`)
  }

  @setChainId
  public getBalance(option: ReqBanlanceVo) {
    return get(`${this.baseUrl}/cross/getBalance`, option, ReqBanlanceVo)
  }

  @setChainId
  public getAllowance(option: ReqAllowanceVo) {
    return get(`${this.baseUrlV1}/cross/getAllowance`, option, ReqAllowanceVo)
  }

  @setChainId
  public createWallet(option: ChainName) {
    return get(`${this.baseUrl}/${option.chain}/createWallet`, option, ChainName)
  }

}



function setChainId(target: any, method: string, descriptor: PropertyDescriptor) {
  const oldMethod = descriptor.value
  descriptor.value = function (...args: any[]) {
    args = args.map((item, i) => {
      if (item && item.chain) {
        item.chain = item.chain.toLowerCase()
        if (config.chains.chainObj[item.chain] && config.chains.chainObj[item.chain].chainId) {
          item.chainId = config.chains.chainObj[item.chain].chainId + ''
        }
      }
      return item
    })
    return oldMethod.apply(this, args)
  }
}

