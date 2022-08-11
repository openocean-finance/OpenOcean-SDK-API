"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallets = exports.Wallets = exports.WalletNames = void 0;
var wallet_1 = require("@openocean.finance/wallet");
var WalletNames;
(function (WalletNames) {
    WalletNames[WalletNames["MetaMask"] = 0] = "MetaMask";
    WalletNames[WalletNames["WalletConnect"] = 1] = "WalletConnect";
    WalletNames[WalletNames["BscWallet"] = 2] = "BscWallet";
    WalletNames[WalletNames["Cyano"] = 3] = "Cyano";
    WalletNames[WalletNames["OntoMobile"] = 4] = "OntoMobile";
    WalletNames[WalletNames["TronLink"] = 5] = "TronLink";
    WalletNames[WalletNames["Sollet"] = 6] = "Sollet";
    WalletNames[WalletNames["SolflareWallet"] = 7] = "SolflareWallet";
    WalletNames[WalletNames["TrustWallet"] = 8] = "TrustWallet";
    WalletNames[WalletNames["MathWallet"] = 9] = "MathWallet";
    WalletNames[WalletNames["TokenPocket"] = 10] = "TokenPocket";
    WalletNames[WalletNames["SafePalWallet"] = 11] = "SafePalWallet";
    WalletNames[WalletNames["OntoWallet"] = 12] = "OntoWallet";
    WalletNames[WalletNames["Coin98Wallet"] = 13] = "Coin98Wallet";
    WalletNames[WalletNames["ImTokenWallet"] = 14] = "ImTokenWallet";
    WalletNames[WalletNames["Phantom"] = 15] = "Phantom";
    WalletNames[WalletNames["TerraStation"] = 16] = "TerraStation";
    WalletNames[WalletNames["CoinbaseWallet"] = 17] = "CoinbaseWallet";
    WalletNames[WalletNames["GnosisSafeWallet"] = 18] = "GnosisSafeWallet";
    WalletNames[WalletNames["BitKeepWallet"] = 19] = "BitKeepWallet";
    WalletNames[WalletNames["CloverWallet"] = 20] = "CloverWallet";
    WalletNames[WalletNames["CryptoCom"] = 21] = "CryptoCom";
    WalletNames[WalletNames["BraveWallet"] = 22] = "BraveWallet";
    WalletNames[WalletNames["XDEFIWallet"] = 23] = "XDEFIWallet";
    WalletNames[WalletNames["MetaXWallet"] = 24] = "MetaXWallet";
    WalletNames[WalletNames["SlopeWallet"] = 25] = "SlopeWallet";
    WalletNames[WalletNames["KeplrWallet"] = 26] = "KeplrWallet";
})(WalletNames = exports.WalletNames || (exports.WalletNames = {}));
var WalletObj = {
    MetaMask: new wallet_1.MetaMask(),
    TrustWallet: new wallet_1.TrustWallet(),
    BraveWallet: new wallet_1.BraveWallet(),
    BscWallet: new wallet_1.BscWallet(),
    WalletConnect: new wallet_1.WalletConnect(),
    CoinbaseWallet: new wallet_1.CoinbaseWallet(),
    SafePalWallet: new wallet_1.SafePalWallet(),
    BitKeepWallet: new wallet_1.BitKeepWallet(),
    XDEFIWallet: new wallet_1.XDEFIWallet(),
    OntoWallet: new wallet_1.OntoWallet(),
    Coin98Wallet: new wallet_1.Coin98(),
    TokenPocket: new wallet_1.TokenPocket(),
    CloverWallet: new wallet_1.CloverWallet(),
    ImTokenWallet: new wallet_1.ImTokenWallet(),
    MetaXWallet: new wallet_1.MetaXWallet(),
    MathWallet: new wallet_1.MathWallet(),
    CryptoCom: new wallet_1.CryptoCom(),
    Cyano: new wallet_1.Cyano(),
    OntoMobile: new wallet_1.OntoMobile(),
    TronLink: new wallet_1.TronLink(),
    Sollet: new wallet_1.Sollet(),
    SolflareWallet: new wallet_1.SolflareWallet(),
    Phantom: new wallet_1.Phantom(),
    TerraStation: new wallet_1.TerraStation(),
    GnosisSafeWallet: new wallet_1.GnosisSafeWallet(),
    SlopeWallet: new wallet_1.SlopeWallet(),
    KeplrWallet: new wallet_1.KeplrWallet(),
};
var Wallets = /** @class */ (function () {
    function Wallets() {
        this.walletObj = {};
        this.walletList = [];
        WalletObj.MetaMask.supportChains.push('rinkeby');
        WalletObj.MetaMask.supportChains.push('ropsten');
        this.walletObj = WalletObj;
        this.walletList = Object.keys(WalletObj).map(function (key) {
            WalletObj[key].key = key;
            return WalletObj[key];
        });
    }
    return Wallets;
}());
exports.Wallets = Wallets;
exports.wallets = new Wallets();
