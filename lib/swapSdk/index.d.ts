import { ReqConnectWalletVo, ReqApproveVo, ReqBalanceVo, ReqAllowanceVo } from "./RequestVo";
import { Approve } from "./Approve";
import { Swap, ReqSwapVo } from "./Swap";
import { Api } from "../api";
export declare class SwapSdk {
    i: number;
    chain: any;
    wallet: any;
    localProvider: any;
    localRpcUrl: string;
    private api;
    constructor();
    setApi(api: Api): void;
    swapQuote(reqSwapVo: ReqSwapVo): Promise<any>;
    swap(swapData: any): Swap;
    fastSwap(swapData: any): Promise<unknown>;
    getGas(swapData: any): Promise<unknown>;
    getGasLocal(swapData: any): Promise<unknown>;
    approve(reqApproveVo: ReqApproveVo): Promise<Approve>;
    connectWallet(reqConnectWalletVo: ReqConnectWalletVo): Promise<this>;
    getWallet(): Promise<any>;
    getChain(): Promise<any>;
    getBalance(reqBalanceVo: ReqBalanceVo): Promise<number>;
    getAllowance(reqAllowanceVo: ReqAllowanceVo): Promise<string>;
}
export declare const swapSdk: SwapSdk;
