Quick Start
Get started with OpenOcean SDK
How to install
You can install the SDK by npm.n
npm i @openocean.finance/api
Or, if you use yarn as your module management tool.
yarn add @openocean.finance/api
Or, if you want to build up a jwallet and contract object by yourself, you will need web3 and bignumber.js.
npm install bignumber.js
npm install web3va
How to use the sdk in your project
import { OpenoceanApiSdk } from '@openocean.finance/api';
​
const openoceanApiSdk = new OpenoceanApiSdk()
const { api, swapSdk, config } = openoceanApiSdk
You can then use all the functions explored by the SDK (API and swapSdk).
Start programing now!
More details in 
