import { wallets } from "./Wallets";
import { isPc } from "./../utils";


let chainObj: any = {
  "eth": {
    chainName: "Ethereum Mainnet",
    chainId: 1,
    blockExplorerUrl: "https://etherscan.io/tx/",
    nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    popularToken: ["ETH", "USDT", "USDC", "BUSD", "UNI", "C98", "LINK", "MATIC"],
    rpcUrls: [
      "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ],
    compiler: 'EVM'
  },
  "ropsten": {
    chainName: "Ethereum Ropsten",
    chainId: 3,
    blockExplorerUrl: "https://ropsten.etherscan.io/",
    nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    popularToken: ["ETH", "USDT", "USDC", "BUSD", "UNI", "C98", "LINK", "MATIC"],
    rpcUrls: [
      "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ],
    compiler: 'EVM',
    isTest: true
  },
  "rinkeby": {
    chainName: "Ethereum Rinkeby",
    chainId: 4,
    blockExplorerUrl: "https://rinkeby.etherscan.io/",
    nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    popularToken: ["ETH", "USDT", "USDC", "BUSD", "UNI", "C98", "LINK", "MATIC"],
    rpcUrls: [
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ],
    compiler: 'EVM',
    isTest: true
  },
  "bsc": {
    chainName: "Binance Smart Chain", chainId: 56, blockExplorerUrl: "https://bscscan.com/tx/",
    popularToken: ["BNB", "USDT", "BUSD", "CAKE", "C98", "BAKE", "MBOX"],
    nativeCurrency: { name: "BNB", symbol: "bnb", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
    compiler: 'EVM',

  },
  "solana": {
    compiler: 'SOL',
    chainName: "Solana Mainnet", blockExplorerUrl: "https://solscan.io/tx/", popularToken: ["SOL", "SNY", "USDT", "USDC", "RAY", "STEP"], rpcUrls: null
  },
  "polygon": {
    compiler: 'EVM',
    chainName: "Polygon Mainnet", chainId: 137, blockExplorerUrl: "https://polygonscan.com/tx/", popularToken: ["USDT", "USDC", "MATIC", "AAVE", "DINO", "ADDY", "MIMATIC"], nativeCurrency: { name: "MATIC", symbol: "matic", decimals: 18, address: "0x0000000000000000000000000000000000001010" }, rpcUrls: ["https://rpc-mainnet.maticvigil.com"]
  },
  "avax": {
    compiler: 'EVM',
    chainName: "Avalanche", chainId: 43114, blockExplorerUrl: "https://cchain.explorer.avax.network/tx/", popularToken: ["AVAX", "PNG", "DAI.E", "ETH", "WAVAX", "JOE", "QI", "USDC.E"], nativeCurrency: { name: "AVAX", symbol: "avax", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"]
  },
  "fantom": {
    compiler: 'EVM',
    chainName: "Fantom", chainId: 250, blockExplorerUrl: "https://ftmscan.com/tx/", popularToken: ["ETH", "USDT", "USDC", "SPIRIT", "1INCH", "C98", "FTM", "fUSDT", "MIM", "BOO"], nativeCurrency: { name: "FTM", symbol: "ftm", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://rpcapi.fantom.network"]
  },
  "arbitrum": {
    compiler: 'EVM',
    chainName: "Arbitrum", chainId: 42161, blockExplorerUrl: "https://arbiscan.io/tx/", nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" }, rpcUrls: ["https://arb1.arbitrum.io/rpc"]
  },
  "terra": {
    compiler: 'TERRA',
    chainName: "Terra Mainnet", blockExplorerUrl: "https://finder.terra.money/columbus-5/tx/", rpcUrls: null
  },
  "xdai": {
    compiler: 'EVM',
    chainName: "Gnosis Mainnet",
    chainId: 100,
    blockExplorerUrl: "https://blockscout.com/poa/xdai/tx/", popularToken: ["ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
    nativeCurrency: { name: "xDai", symbol: "xdai", decimals: 18, address: "0x0000000000000000000000000000000000000000" },
    rpcUrls: ["https://rpc.gnosischain.com", "https://rpc.xdaichain.com/"]
  },
  "boba": {
    compiler: 'EVM',
    chainName: "Boba Mainnet", chainId: 288, blockExplorerUrl: "https://blockexplorer.boba.network/tx/", nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://mainnet.boba.network"]
  },
  "ont": {
    compiler: 'ONT',
    chainName: "Ontology Mainnet", blockExplorerUrl: "https://explorer.ont.io/transaction/", popularToken: [], rpcUrls: null
  },
  "tron": {
    compiler: 'TRON',
    chainName: "Tron Mainnet",
    blockExplorerUrl: "https://tronscan.io/#/transaction/",
    popularToken: ["TRX", "WTRX", "ETH", "BTC", "USDT", "USDJ", "JST"],
    rpcUrls: null
  },
  "heco": {
    compiler: 'EVM',
    chainName: "Heco Mainnet",
    chainId: 128,
    blockExplorerUrl: "https://http-mainnet.hecochain.com/tx/",
    popularToken: ["HT", "ETH", "AAVE", "USDT", "USDC", "MDX", "DEP"],
    nativeCurrency: { name: "HT", symbol: "ht", decimals: 18, address: "0x0000000000000000000000000000000000000000" },
    rpcUrls: ["https://http-mainnet.hecochain.com"]
  },
  "okex": {
    compiler: 'EVM',
    chainName: "OEC Mainnet", chainId: 66, blockExplorerUrl: "https://www.oklink.com/okexchain/", popularToken: ["OKT", "OKB", "USDT", "USDC", "BUSD", "BNB", "CHE"], nativeCurrency: { name: "OKT", symbol: "okt", decimals: 18, address: "0x0000000000000000000000000000000000000000" }, rpcUrls: ["https://exchainrpc.okex.org"]
  },
  "optimism": {
    compiler: 'EVM',
    chainName: "Optimistic Ethereum",
    chainId: 10,
    blockExplorerUrl: "https://optimism.io/tx/",
    nativeCurrency: { name: "OETH", symbol: "oeth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    rpcUrls: ["https://rpc.ankr.com/optimism", "https://optimism-mainnet.public.blastapi.io", "https://mainnet.optimism.io"]
  },
  "harmony": {
    compiler: 'EVM',
    chainName: "Harmony",
    chainId: '1666600000',
    blockExplorerUrl: "https://explorer.harmony.one/",
    nativeCurrency: { name: "ONE", symbol: "ONE", decimals: 18, address: "0x0000000000000000000000000000000000000000" },
    popularToken: ["ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
    rpcUrls: ["https://api.s0.t.hmny.io", "https://api.harmony.one"]
  },
  "dot": {
    compiler: 'EVM',
    chainName: "Polkadot", blockExplorerUrl: "", popularToken: ["ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"]
  },
  "neo": {
    compiler: 'EVM',
    chainName: "Neo", blockExplorerUrl: "", popularToken: ["ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"]
  },
  "aurora": {
    chainName: "Aurora Mainnet",
    chainId: 1313161554,
    blockExplorerUrl: "https://aurorascan.dev/tx/",
    nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    popularToken: [],
    rpcUrls: [
      "https://mainnet.aurora.dev"
    ],
    compiler: 'EVM'
  },
  "cronos": {
    chainName: "Cronos Mainnet",
    chainId: 25,
    blockExplorerUrl: "https://cronos.org/explorer",
    nativeCurrency: {
      name: "CRO",
      symbol: "cro",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000"
    },
    popularToken: [],
    rpcUrls: [
      "https://evm.cronos.org"
    ],
    compiler: 'EVM'
  },
  "moonriver": {
    chainName: "Moonriver Mainnet",
    chainId: 1285,
    blockExplorerUrl: "https://moonriver.moonscan.io",
    nativeCurrency: { name: "ETH", symbol: "eth", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    popularToken: [],
    rpcUrls: [
      "https://rpc.moonriver.moonbeam.network"
    ],
    compiler: 'EVM'
  },
  "bsctest": {
    chainName: "BSC Test Network",
    chainId: 1285,
    blockExplorerUrl: "https://testnet.bscscan.com/",
    nativeCurrency: { name: "BNB", symbol: "bnb", decimals: 18, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
    popularToken: [],
    rpcUrls: [
      "https://data-seed-prebsc-1-s1.binance.org:8545"
    ],
    compiler: 'EVM'
  },
}

export class Chains {
  ethereumChainParams: any = {
    rinkeby: [
      {
        chainId: `0x4`, // 4
        chainName: "rinkeby",
        key: 'rinkeby',
        nativeCurrency: {
          name: "ETH",
          symbol: "eth",
          decimals: 18,
        },
        rpcUrls: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
        blockExplorerUrls: ["https://rinkeby.etherscan.io"],
      },
    ],
    bsc: [
      {
        chainId: `0x38`, // 56
        chainName: "BSC Mainnet",
        nativeCurrency: {
          name: "BNB",
          symbol: "bnb",
          decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed1.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com/"],
      },
    ],
    ok: [
      {
        chainId: `0x42`, // 66
        chainName: "OEC Mainnet",
        nativeCurrency: {
          name: "OKT",
          symbol: "okt",
          decimals: 18,
        },
        rpcUrls: ["https://exchainrpc.okex.org"],
        blockExplorerUrls: ["https://www.oklink.com/okexchain/"],
      },
    ],
    polygon: [
      {
        chainId: `0x89`, // 137
        chainName: "Matic Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "matic",
          decimals: 18,
        },
        rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
        blockExplorerUrls: ["https://polygonscan.com"],
      },
    ],
    xdai: [
      {
        chainId: `0x64`, // 100
        chainName: "Gnosis Mainnet",
        nativeCurrency: {
          name: "xDai",
          symbol: "xdai",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.gnosischain.com", "https://rpc.xdaichain.com/"],
        blockExplorerUrls: ["https://blockscout.com/poa/xdai", "https://blockscout.com/xdai/mainnet"],
      },
    ],
    fantom: [
      {
        chainId: `0xfa`, // 250
        chainName: "Fantom Mainnet",
        nativeCurrency: {
          name: "FTM",
          symbol: "ftm",
          decimals: 18,
        },
        rpcUrls: ["https://rpcapi.fantom.network"],
        blockExplorerUrls: ["https://ftmscan.com/"],
      },
    ],
    heco: [
      {
        chainId: `0x80`, // 128
        chainName: "Heco Mainnet",
        nativeCurrency: {
          name: "HT",
          symbol: "ht",
          decimals: 18,
        },
        rpcUrls: ["https://http-mainnet.hecochain.com"],
        blockExplorerUrls: ["https://http-mainnet.hecochain.com"],
      },
    ],
    avax: [
      {
        chainId: `0xa86a`, // 43114
        chainName: "Avalanche Mainnet C-Chain",
        nativeCurrency: {
          name: "AVAX",
          symbol: "avax",
          decimals: 18,
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
      },
    ],
    okex: [
      {
        chainId: `0x42`, // 66
        chainName: "OEC Mainnet",
        nativeCurrency: {
          name: "OKT",
          symbol: "okt",
          decimals: 18,
        },
        rpcUrls: ["https://exchainrpc.okex.org"],
        blockExplorerUrls: ["https://www.oklink.com/okexchain"],
      },
    ],
    harmony: [
      {
        chainId: `0x63564c40`, // 1666600000
        chainName: "Harmony Mainnet",
        nativeCurrency: {
          name: "ONE",
          symbol: "one",
          decimals: 18,
        },
        rpcUrls: ["https://api.s0.t.hmny.io", "https://api.harmony.one"],
        blockExplorerUrls: ["https://explorer.harmony.one/"],
      },
    ],
    arbitrum: [
      {
        chainId: `0xa4b1`, // 42161
        chainName: "Arbitrum One",
        nativeCurrency: {
          name: "ETH",
          symbol: "eth",
          decimals: 18,
        },
        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
        blockExplorerUrls: ["https://arbiscan.io"],
      },
    ],
    optimism: [
      {
        chainId: `0xa`, // 10
        chainName: "Optimistic Ethereum",
        nativeCurrency: {
          name: "OETH",
          symbol: "oeth",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/optimism", "https://optimism-mainnet.public.blastapi.io", "https://mainnet.optimism.io"],
        blockExplorerUrls: ["https://optimism.io/"],
      },
    ],
    boba: [
      {
        chainId: `0x120`, // 288
        chainName: "Boba Mainnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "eth",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.boba.network"],
        blockExplorerUrls: ["https://blockexplorer.boba.network"],
      },
    ],
    aurora: [
      {
        chainId: `0x4e454152`, // 1313161554
        chainName: "Aurora Mainnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "eth",
          decimals: 18,
        },
        rpcUrls: ["https://mainnet.aurora.dev"],
        blockExplorerUrls: ["https://aurorascan.dev/tx/"],
      },
    ],
    cronos: [
      {
        chainId: `0x19`, // 25
        chainName: "Cronos Mainnet",
        nativeCurrency: {
          name: "CRO",
          symbol: "cro",
          decimals: 18,
        },
        rpcUrls: ["https://evm.cronos.org"],
        blockExplorerUrls: ["https://cronos.org/explorer"],
      },
    ],
    moonriver: [
      {
        chainId: `0x505`, // 1285
        chainName: "Moonriver Mainnet",
        nativeCurrency: {
          name: "MOVR",
          symbol: "movr",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.moonriver.moonbeam.network"],
        blockExplorerUrls: ["https://moonriver.moonscan.io"],
      },
    ],
    bsctest: [
      {
        chainId: `0x61`, // 97
        chainName: "BSC Test Network",
        nativeCurrency: {
          name: "BNB",
          symbol: "bnb",
          decimals: 18,
        },
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        blockExplorerUrls: ["https://testnet.bscscan.com/"],
      },
    ],
  };
  chainObj: any = {}
  chainList: any[] = []
  chainIds: String[] = []
  chainNames: String[] = []
  chainApproveNames: String[] = []

  constructor() {
    if (!isPc) {
      this.ethereumChainParams.eth = {
        eth: [
          {
            chainId: `0x1`, // 4
            chainName: "ethereum",
            key: 'eth',
            nativeCurrency: {
              name: "ETH",
              symbol: "eth",
              decimals: 18,
            },
            rpcUrls: ["https://mainnet.infura.io/v3/"],
            blockExplorerUrls: ["https://etherscan.io"],
          },
        ],
      }
    }
    wallets.walletList.forEach((item: any) => {
      item.supportChains.forEach((chainName: string) => {
        if (chainObj[chainName] && chainObj[chainName].wallets) {
          chainObj[chainName].wallets.push(item.key)
        } else {
          if (!chainObj[chainName]) {
            chainObj[chainName] = {}
          }
          chainObj[chainName].key = chainName
          chainObj[chainName].wallets = [item.key]
        }
      })
    })
    this.chainObj = chainObj
    this.chainList = Object.keys(chainObj).map((key: string) => {
      if (chainObj[key].chainId) {
        this.chainIds.push(chainObj[key].chainId)
      }

      this.chainNames.push(key)
      if (chainObj[key].compiler === 'EVM' || chainObj[key].compiler === 'TRON') {
        this.chainApproveNames.push(key)
      }
      return chainObj[key]
    })

    // console.log(JSON.stringify(this.chainList))
  }
  isNativeToken(chainName: string, address: string) {
    if (this.chainObj[chainName] && this.chainObj[chainName].nativeCurrency && this.chainObj[chainName].nativeCurrency.address) {
      return this.chainObj[chainName].nativeCurrency.address.toUpperCase() === address.toUpperCase()
    }
    return false
  }
  getNativeToken(chainName: string) {
    return this.chainObj[chainName]
  }
  getIsNewChain() {
    return ['eth', 'bsc', 'xdai', 'boba', 'arbitrum', 'heco', 'moonriver', 'cronos', 'optimism', 'harmony', 'fantom', 'avax', 'polygon', 'okex']
  }
  getChainById(chainId: string) {
    return this.chainList.find((item: any) => {
      return item.chainId == chainId
    })
  }
  getChainByName(name: string) {
    return this.chainObj[name] || null
  }
  getProxyContract(chainName: string) {
    return {
      eth: '0x38B7C17E62dcBD1C39f96eFe74848C4A037b3ed3',
      bsc: "0x7aeef1035ba6794c0478718a2330671ec8802af1",
      fantom: "0x38B7C17E62dcBD1C39f96eFe74848C4A037b3ed3",
      avax: "0x38B7C17E62dcBD1C39f96eFe74848C4A037b3ed3",
      polygon: "0x38B7C17E62dcBD1C39f96eFe74848C4A037b3ed3",
      okex: "0x6D5630eC1Ee74C907617a6fb7BCAdC4Bf0EF3fcA",
      optimism: "0x7AeEF1035Ba6794C0478718a2330671Ec8802aF1",
      harmony: "0x7AeEF1035Ba6794C0478718a2330671Ec8802aF1",
      cronos: "0x7AeEF1035Ba6794C0478718a2330671Ec8802aF1",
      moonriver: "0x7AeEF1035Ba6794C0478718a2330671Ec8802aF1",
      arbitrum: "0x7AeEF1035Ba6794C0478718a2330671Ec8802aF1",
      heco: "0x7AeEF1035Ba6794C0478718a2330671Ec8802aF1",
      boba: "0x7AeEF1035Ba6794C0478718a2330671Ec8802aF1",
      xdai: "0x7AeEF1035Ba6794C0478718a2330671Ec8802aF1",
      tron: "TTpcMZbsojNCMhea2a9LFHq9DLCxsgGZVv",
    }[chainName];
  };
 
}
export const chains: Chains = new Chains()


