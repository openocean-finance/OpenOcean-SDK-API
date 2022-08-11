import { Api } from './api';
import { Utils } from './utils';
import { Web3 } from './utils/web3';
import { SwapSdk } from './swapSdk';
import { Config } from './config';
interface OpenoceanSdkArg {
    apiUrl?: string;
}
export declare class OpenoceanSdk {
    web3: Web3;
    utils: Utils;
    config: Config;
    api: Api;
    swapSdk: SwapSdk;
    constructor(sdkArg: OpenoceanSdkArg);
}
export {};
