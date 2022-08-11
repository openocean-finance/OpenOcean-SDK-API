export declare enum ChainNames {
    'eth' = 0,
    'solana' = 1,
    'ont' = 2,
    'terra' = 3,
    'tron' = 4,
    'osmosis' = 5,
    'sifchain' = 6,
    'ropsten' = 7,
    'bsc' = 8,
    'okex' = 9,
    'polygon' = 10,
    'fantom' = 11,
    'heco' = 12,
    'avax' = 13,
    'arbitrum' = 14,
    'xdai' = 15,
    'optimism' = 16,
    'boba' = 17,
    'moonriver' = 18,
    'aurora' = 19,
    'cronos' = 20,
    'cosmos' = 21,
    'harmony' = 22,
    'bsctest' = 23
}
export declare class Utils {
    sleep(interval: number): Promise<unknown>;
    getShift(a: any, b: any): string;
    decimals2Amount(amount: any, decimals: any): string;
    amount2Decimals(amount: any, decimals: any): string;
    getFixed(val: any, fixed: any, trailingZeros?: any): string;
    toFixed(n: any, k: any, z?: any): string | number;
}
export declare const utils: Utils;
export declare function isPc(): boolean;
