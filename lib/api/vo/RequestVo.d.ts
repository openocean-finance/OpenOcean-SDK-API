import 'reflect-metadata';
export declare class ReqBase {
    chainId: string;
}
export declare class ChainName {
    chain: string;
}
export declare class UserCode {
    code: string;
}
export declare class ReqBanlanceVo extends ChainName {
    account: string;
    inTokenAddress: string;
}
export declare class TransactionVo extends ChainName {
    hash: string;
}
export declare class CollectionsVo extends ChainName {
    market: string;
    limit: number;
    offset: number;
    sort: string;
    filters: any;
}
export declare class AssetsVo extends ChainName {
    market: string;
    limit: number;
    offset: number;
    sort: string;
    filters: any;
}
export declare class NftBuyVo extends ChainName {
    market: string;
    sender: string;
    balanceTokens: any[];
    dustTokens: any[];
    buy: any[];
}
export declare class NftSellVo extends ChainName {
    market: string;
    sender: string;
    sell: any[];
}
export declare class NftSignVo extends ChainName {
    market: string;
    order: any;
    signature: string;
}
export declare class TxsVo extends ChainName {
    account: string;
    pageSize: number;
}
export declare class ReqAllowanceVo extends ChainName {
    account: string;
    inTokenAddress: string;
    contractAddress: string;
}
export declare class ReqTokenPriceVo {
    ids: string;
    vs_currencies: string;
}
export declare class ReqTokenInfoVo {
    id: string;
    contract_address: string;
}
export declare class ReqQuoteVo extends ChainName {
    inTokenAddress: string;
    outTokenAddress: string;
    amount: Number;
    gasPrice: String;
}
export declare class ReqSwapVo extends ChainName {
    inTokenAddress: string;
    dex: string;
    outTokenAddress: string;
    amount: Number;
    slippage: Number;
    account: String;
    gasPrice: String;
    referrer: String;
}
export declare class ReqGetTokenVo extends ChainName {
    address: string;
}
export declare class ReqTransactionReceiptVo extends ChainName {
    hash: string;
}
export declare class ReqTransactionVo extends ReqTransactionReceiptVo {
    type: string;
}
export declare class ReqtransferVo extends ChainName {
    inTokenAddress: string;
    decimals: Number;
    amount: Number;
    gasPrice: Number;
    targetAddress: Number;
}
