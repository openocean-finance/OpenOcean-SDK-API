import { NftSignVo, NftSellVo, NftBuyVo, AssetsVo, CollectionsVo, TxsVo, TransactionVo, ChainName, ReqSwapVo, ReqBanlanceVo, ReqAllowanceVo, ReqQuoteVo } from "./vo/RequestVo";
export declare class Api {
    baseUrl: string;
    baseUrlNft: string;
    baseUrlV1: string;
    constructor(baseUrl?: string);
    collections(option: CollectionsVo): Promise<any>;
    assets(option: AssetsVo): Promise<any>;
    buy(option: NftBuyVo): Promise<any>;
    sell(option: NftSellVo): Promise<any>;
    sign(option: NftSignVo): Promise<any>;
    quote(option: ReqQuoteVo): Promise<any>;
    swapQuote(option: ReqSwapVo): Promise<any>;
    getGasPrice(option: any): Promise<any>;
    getTransaction(option: TransactionVo): Promise<any>;
    getTokenList(option: ChainName): Promise<any>;
    dexList(option: ChainName): Promise<any>;
    getTxs(option: TxsVo): Promise<any>;
    getTokenPrice(id: string): any;
    getBalance(option: ReqBanlanceVo): Promise<any>;
    getAllowance(option: ReqAllowanceVo): Promise<any>;
    createWallet(option: ChainName): Promise<any>;
}
