const axios = require('axios');
import BigNumber from 'bignumber.js';


export enum ChainNames {
  'eth', 'solana', 'ont', 'terra', 'tron',
  'osmosis', 'sifchain', 'ropsten',
  'bsc', 'okex', 'polygon', 'fantom', 'heco', 'avax',
  'arbitrum', 'xdai', 'optimism', 'boba', 'moonriver',
  'aurora', 'cronos', 'cosmos', 'harmony', 'bsctest'
}



export class Utils {
  sleep(interval: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, interval);
    });
  }
  getShift(a: any, b: any): string {
    return new BigNumber(a).shiftedBy(Number(b)).toFixed()
  }
  decimals2Amount(amount: any, decimals: any): string {
    return this.getShift(amount, -decimals)
  }
  amount2Decimals(amount: any, decimals: any): string {
    return this.getFixed(this.getShift(amount, decimals), 0);
  }
  getFixed(val: any, fixed: any, trailingZeros?: any): string {
    const numStr = val || '0';
    if (trailingZeros) {
      return new BigNumber(numStr).toFixed(fixed);
    }
    return new BigNumber(numStr).decimalPlaces(fixed).toString();
  }
  toFixed(n: any, k: any, z?: any) {
    if (isNaN(n)) {
      return 0
    }
    if (!k) k = 4
    let a = 10 ** k
    if (Number(n) < 0) {
      a = Math.ceil(Number(n) * a) / a
    } else {
      a = Math.floor(Number(n) * a) / a
    }
    if (!z) {
      return a
    } else {
      return a.toFixed(k)
    }
  }
}

export const utils: Utils = new Utils()

export function isPc() {
  let userAgent = navigator.userAgent,Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
  console.log('userAgent:',userAgent)
  return Agents.some((i)=>{
      return userAgent.includes(i)
  })
}


