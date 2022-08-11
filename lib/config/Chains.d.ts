export declare class Chains {
    ethereumChainParams: any;
    chainObj: any;
    chainList: any[];
    chainIds: String[];
    chainNames: String[];
    chainApproveNames: String[];
    constructor();
    isNativeToken(chainName: string, address: string): boolean;
    getNativeToken(chainName: string): any;
    getIsNewChain(): string[];
    getChainById(chainId: string): any;
    getChainByName(name: string): any;
    getProxyContract(chainName: string): string | undefined;
}
export declare const chains: Chains;
