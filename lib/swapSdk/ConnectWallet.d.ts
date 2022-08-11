export declare class ConnectWallet {
    static isChainIdEq(wallet: any, chainId: string, utilsEht: any, k?: number): Promise<any>;
    static link(reqConnectWalletVo: any): Promise<any>;
    static linkAddOrSwitch(reqConnectWalletVo: any, wallet: any, chain: any): Promise<{
        chain: any;
        wallet: any;
    } | undefined>;
}
