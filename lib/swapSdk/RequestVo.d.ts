import { ChainName } from "../api/vo/RequestVo";
export declare class ReqConnectWalletVo extends ChainName {
    walletName: string;
    localRpcUrl: string;
}
export declare class ReqBalanceVo extends ChainName {
    tokenAddressOrSymbol: string;
    decimals: number;
    account: string;
}
export declare class ReqAllowanceVo extends ChainName {
    approveContract: string;
    tokenAddress: string;
    decimals: number;
    account: string;
}
export declare class ReqApproveVo extends ChainName {
    tokenAddress: string;
    contractAddress: string;
    amount: string;
    gasPrice: Number;
    tokenAbi: any;
}
