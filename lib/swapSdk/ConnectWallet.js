"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectWallet = void 0;
var Wallets_1 = require("../config/Wallets");
var utils_1 = require("../utils");
var web3_js_1 = require("@solana/web3.js");
var Chains_1 = require("../config/Chains");
var NotoMobile_1 = require("./NotoMobile");
var axios = require('axios');
var ConnectWallet = /** @class */ (function () {
    function ConnectWallet() {
    }
    ConnectWallet.isChainIdEq = function (wallet, chainId, utilsEht, k) {
        return __awaiter(this, void 0, void 0, function () {
            var key, chainIdNow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = k || 0;
                        return [4 /*yield*/, utils_1.utils.sleep(1000)];
                    case 1:
                        _a.sent();
                        chainIdNow = utilsEht.hexToNumber(wallet.sdk.currentProvider.chainId);
                        if (!(chainId == chainIdNow)) return [3 /*break*/, 2];
                        wallet.chainId = chainId;
                        return [2 /*return*/, true];
                    case 2:
                        if (!(key < 3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.isChainIdEq(wallet, chainId, utilsEht, key + 1)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: throw new Error('User rejected the request.');
                }
            });
        });
    };
    ConnectWallet.link = function (reqConnectWalletVo) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, chain, chainId, selectedChain, qrData, instance_1, account, res, res, account, res, res, _a, e_1, message, _b, currentProvider, utilsEht;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        wallet = Wallets_1.wallets.walletObj[reqConnectWalletVo.walletName];
                        if (!wallet)
                            wallet = Wallets_1.wallets.walletList.find(function (item) { return item.name == reqConnectWalletVo.walletName; });
                        chain = Chains_1.chains.chainObj[reqConnectWalletVo.chain];
                        if (!chain)
                            throw new Error('Chain error.');
                        chainId = chain.chainId;
                        selectedChain = chain.key;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 23, , 27]);
                        if (!(wallet.type === 'WalletConnect')) return [3 /*break*/, 3];
                        wallet.infuraId = '2c7c4d86c2c746c89de722551b606119';
                        return [4 /*yield*/, wallet.requestConnect(chainId)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 22];
                    case 3:
                        if (!(wallet.key === 'OntoMobile')) return [3 /*break*/, 6];
                        return [4 /*yield*/, axios.get('https://ethapi.openocean.finance/v1/ont/login')];
                    case 4:
                        qrData = _c.sent();
                        wallet.qrData = qrData.data;
                        instance_1 = new NotoMobile_1.NotoMobile(qrData.data);
                        return [4 /*yield*/, new Promise(function (r, q) {
                                instance_1.$on('close', function (result, action, account) {
                                    if (action === 'login' && result === 'success') {
                                        r(account);
                                    }
                                    else {
                                        q(action);
                                    }
                                });
                            })];
                    case 5:
                        account = _c.sent();
                        wallet.address = account;
                        return [3 /*break*/, 22];
                    case 6:
                        if (!(selectedChain === 'terra')) return [3 /*break*/, 9];
                        if (!!wallet.sdk) return [3 /*break*/, 8];
                        return [4 /*yield*/, wallet.requestTerraConnect()];
                    case 7:
                        res = _c.sent();
                        if (res) {
                            // this.connect(wallet);
                        }
                        else {
                            // const message = {
                            //   'XDEFI Wallet': 'wallet_message_40018',
                            //   'Terra Station': 'wallet_message_40015'
                            // }[wallet.name];
                            // showToast(this.$t(message));
                        }
                        _c.label = 8;
                    case 8: return [3 /*break*/, 22];
                    case 9:
                        if (!(selectedChain === "solana")) return [3 /*break*/, 11];
                        return [4 /*yield*/, wallet.requestSolanaConnect()];
                    case 10:
                        res = _c.sent();
                        wallet.customPublicKey = new web3_js_1.PublicKey(res);
                        // "https://api.mainnet-beta.solana.com"
                        // "https://solana-mainnet.phantom.tech"
                        // "https://rpc.ankr.com/solana"
                        // https://solana-api.projectserum.com
                        // https://mercuria-fronten-1cd8.mainnet.rpcpool.com/
                        wallet.connection = new web3_js_1.Connection("https://solana-api.projectserum.com");
                        if (res) {
                            // this.connect(wallet);
                        }
                        else {
                            // const message = {
                            //   'Sollet': 'wallet_message_40010',
                            //   'Coin98 Wallet': 'wallet_message_40011',
                            //   'Phantom': 'wallet_message_40013',
                            //   'Clover Wallet': 'wallet_message_40017',
                            //   'Slope Wallet': 'wallet_message_40019',
                            //   'Solflare Wallet': 'wallet_message_40020',
                            // };
                            // return {
                            //   code: 401,
                            //   message: message
                            // }
                        }
                        return [3 /*break*/, 22];
                    case 11:
                        if (!(selectedChain === 'tron')) return [3 /*break*/, 16];
                        account = window.tronWeb.defaultAddress.base58;
                        if (!!account) return [3 /*break*/, 14];
                        return [4 /*yield*/, utils_1.utils.sleep(1000)];
                    case 12:
                        _c.sent();
                        return [4 /*yield*/, this.link(reqConnectWalletVo)];
                    case 13: return [2 /*return*/, _c.sent()];
                    case 14: return [4 /*yield*/, wallet.requestConnect()];
                    case 15:
                        res = _c.sent();
                        console.log('wallet.requestConnect', res, wallet);
                        return [3 /*break*/, 22];
                    case 16:
                        if (!chainId) return [3 /*break*/, 18];
                        return [4 /*yield*/, wallet.requestConnect(chainId)];
                    case 17:
                        _a = _c.sent();
                        return [3 /*break*/, 20];
                    case 18: return [4 /*yield*/, wallet.requestConnect()];
                    case 19:
                        _a = _c.sent();
                        _c.label = 20;
                    case 20:
                        res = _a;
                        console.log('wallet.requestConnect', res, wallet);
                        return [4 /*yield*/, utils_1.utils.sleep(200)];
                    case 21:
                        _c.sent();
                        if (res) {
                            // this.connect(wallet);
                        }
                        _c.label = 22;
                    case 22: return [2 /*return*/, { chain: chain, wallet: wallet }];
                    case 23:
                        e_1 = _c.sent();
                        message = e_1.message;
                        _b = wallet.sdk || {}, currentProvider = _b.currentProvider, utilsEht = _b.utils;
                        if (!(message === "40006" && currentProvider)) return [3 /*break*/, 25];
                        return [4 /*yield*/, this.linkAddOrSwitch(reqConnectWalletVo, wallet, chain)];
                    case 24: return [2 /*return*/, _c.sent()];
                    case 25: throw new Error(/^\d+$/.test(message) ? "wallet_message_" + message : message);
                    case 26: return [3 /*break*/, 27];
                    case 27: return [2 /*return*/];
                }
            });
        });
    };
    ConnectWallet.linkAddOrSwitch = function (reqConnectWalletVo, wallet, chain) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, currentProvider, utilsEht, chainId, params, address, address, address, address;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = wallet.sdk || {}, currentProvider = _a.currentProvider, utilsEht = _a.utils;
                        chainId = chain.chainId;
                        params = Chains_1.chains.ethereumChainParams[reqConnectWalletVo.chain];
                        if (!params) return [3 /*break*/, 8];
                        return [4 /*yield*/, currentProvider.request({
                                method: "wallet_addEthereumChain",
                                params: params
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.isChainIdEq(wallet, chainId, utilsEht)];
                    case 2:
                        if (!_b.sent()) return [3 /*break*/, 7];
                        if (!(wallet.type === 'WalletConnect')) return [3 /*break*/, 4];
                        return [4 /*yield*/, wallet.sdk.eth.getAccounts()];
                    case 3:
                        address = (_b.sent())[0];
                        wallet.address = address;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, wallet.sdk.eth.requestAccounts()];
                    case 5:
                        address = (_b.sent())[0];
                        wallet.address = address;
                        _b.label = 6;
                    case 6: return [2 /*return*/, { chain: chain, wallet: wallet }];
                    case 7: return [3 /*break*/, 17];
                    case 8:
                        if (!(chainId == '1' || chainId == '3' || chainId == '4')) return [3 /*break*/, 16];
                        return [4 /*yield*/, currentProvider.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{
                                        chainId: utilsEht.toHex(chainId)
                                    }],
                            })];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, this.isChainIdEq(wallet, chainId, utilsEht)];
                    case 10:
                        if (!_b.sent()) return [3 /*break*/, 15];
                        if (!(wallet.type === 'WalletConnect')) return [3 /*break*/, 12];
                        return [4 /*yield*/, wallet.sdk.eth.getAccounts()];
                    case 11:
                        address = (_b.sent())[0];
                        wallet.address = address;
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, wallet.sdk.eth.requestAccounts()];
                    case 13:
                        address = (_b.sent())[0];
                        wallet.address = address;
                        _b.label = 14;
                    case 14: return [2 /*return*/, { chain: chain, wallet: wallet }];
                    case 15: return [3 /*break*/, 17];
                    case 16: throw new Error('Network error');
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    return ConnectWallet;
}());
exports.ConnectWallet = ConnectWallet;
