

import { Api } from './api';
import { Utils, utils } from './utils';
import { Web3, web3 } from './utils/web3';
import { SwapSdk, swapSdk } from './swapSdk';
import { config, Config } from './config';

interface OpenoceanSdkArg {
  apiUrl?: string
}
export class OpenoceanSdk {
  web3: Web3 = web3
  utils: Utils = utils
  config: Config = config

  api: Api
  swapSdk: SwapSdk = swapSdk
  constructor(sdkArg: OpenoceanSdkArg) {
    this.api = new Api(sdkArg ? sdkArg.apiUrl : '')
    this.swapSdk.setApi(this.api)
  }
}

