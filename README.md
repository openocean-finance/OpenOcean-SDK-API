# Quick Start

## How to install

You can install the SDK by npm.

``` sh
npm i @openocean.finance/api
```

Or, if you use yarn as your module management tool.

``` sh
yarn add @openocean.finance/api
```


Or, if you want to build up a wallet and contract object by yourself, you will need web3 and bignumber.js.

``` sh
npm install bignumber.js
npm install web3
```
## How to use the sdk in your project



``` js
import { OpenoceanApiSdk } from '@openocean.finance/api';
const openoceanApiSdk = new OpenoceanApiSdk()
const { api, swapSdk, config } = openoceanApiSdk
```

You can then use all the functions explored by the SDK (API and swapSdk).

## Start programing now

More details in [Recommend Workflow](./select.md)


