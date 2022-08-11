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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = void 0;
var axios = require('axios');
var utils_1 = require("./../utils");
var terra_js_1 = require("@terra-money/terra.js");
var web3_1 = __importDefault(require("web3"));
var config_1 = require("./../config");
var web3_js_1 = require("@solana/web3.js");
var Chains_1 = require("./../config/Chains");
function getBalance(account, tokenAddressOrSymbol, decimals, chainName, myWallet) {
    return __awaiter(this, void 0, void 0, function () {
        var balanceObj, balance, contract, sum_1, _a, value, terra, result, _symbol, token, amount, res, e_1, balanceDecimals, e_2, _b, result, e_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    balanceObj = {
                        short: 0,
                        long: 0,
                        decimals: decimals,
                        tokenAddress: tokenAddressOrSymbol
                    };
                    balance = 0;
                    contract = null;
                    if (!(chainName === 'ont')) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios.get("https://ethapi.openocean.finance/v1/ont/token-balance?account=".concat(account, "&token=").concat(tokenAddressOrSymbol))];
                case 1:
                    balance = _c.sent();
                    if (balance.data && balance.data[tokenAddressOrSymbol]) {
                        balanceObj.short = balance.data[tokenAddressOrSymbol].balance;
                        balanceObj.long = balance.data[tokenAddressOrSymbol].balance * (Math.pow(10, decimals));
                    }
                    return [3 /*break*/, 31];
                case 2:
                    if (!(chainName === 'solana')) return [3 /*break*/, 7];
                    if (!(tokenAddressOrSymbol === "So11111111111111111111111111111111111111112")) return [3 /*break*/, 4];
                    return [4 /*yield*/, myWallet.connection.getBalance(new web3_js_1.PublicKey(account))];
                case 3:
                    balance = _c.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, myWallet.connection.getParsedTokenAccountsByOwner(new web3_js_1.PublicKey(account), {
                        mint: new web3_js_1.PublicKey(tokenAddressOrSymbol),
                    })];
                case 5:
                    balance = _c.sent();
                    sum_1 = 0;
                    _a = (balance || {}).value, value = _a === void 0 ? [] : _a;
                    value.forEach(function (item) {
                        var account = (item || {}).account;
                        var data = (account || {}).data;
                        var parsed = (data || {}).parsed;
                        var info = (parsed || {}).info;
                        var tokenAmount = (info || {}).tokenAmount;
                        var _a = (tokenAmount || {}).amount, amount = _a === void 0 ? 0 : _a;
                        sum_1 += +amount;
                    });
                    balance = sum_1;
                    _c.label = 6;
                case 6:
                    balanceObj.long = balance;
                    balanceObj.short = +utils_1.utils.toFixed(utils_1.utils.decimals2Amount(balance || 0, decimals), 6);
                    return [3 /*break*/, 31];
                case 7:
                    if (!(chainName === 'terra')) return [3 /*break*/, 13];
                    terra = new terra_js_1.LCDClient({
                        URL: "https://lcd.terra.dev",
                        chainID: "columbus-5",
                    });
                    return [4 /*yield*/, terra.bank.balance(account)];
                case 8:
                    result = _c.sent();
                    _symbol = {
                        'luna': 'uluna',
                        'ust': 'uusd',
                    }[tokenAddressOrSymbol.toLowerCase()] || tokenAddressOrSymbol.toLowerCase();
                    token = result[0]._coins[_symbol];
                    amount = 0;
                    if (!token) return [3 /*break*/, 9];
                    amount = token.amount.toNumber();
                    return [3 /*break*/, 12];
                case 9:
                    _c.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, axios.get("https://fcd.terra.dev/wasm/contracts/".concat(tokenAddressOrSymbol, "/store"), {
                            params: {
                                query_msg: {
                                    balance: {
                                        address: account,
                                    },
                                },
                            },
                            cache: false,
                        })];
                case 10:
                    res = _c.sent();
                    amount = +(res.result.balance || 0);
                    return [3 /*break*/, 12];
                case 11:
                    e_1 = _c.sent();
                    console.log('terra balanceOf', e_1);
                    return [3 /*break*/, 12];
                case 12:
                    balanceObj.long = amount;
                    balanceObj.short = +utils_1.utils.toFixed(utils_1.utils.decimals2Amount(amount || 0, decimals), 6);
                    return [3 /*break*/, 31];
                case 13:
                    if (!(chainName === 'tron')) return [3 /*break*/, 20];
                    if (!(tokenAddressOrSymbol.toLowerCase() === "t9yd14nj9j7xab4dbgeix9h8unkkhxuwwb")) return [3 /*break*/, 15];
                    return [4 /*yield*/, myWallet.sdk.trx.getBalance(account)];
                case 14:
                    balance = _c.sent();
                    balanceObj.long = myWallet.sdk.fromSun(balance) * (Math.pow(10, decimals));
                    balanceObj.short = myWallet.sdk.fromSun(balance);
                    _c.label = 15;
                case 15:
                    _c.trys.push([15, 18, , 19]);
                    return [4 /*yield*/, myWallet.sdk.contract().at(tokenAddressOrSymbol)];
                case 16:
                    contract = _c.sent();
                    return [4 /*yield*/, contract.balanceOf(account).call()];
                case 17:
                    balance = _c.sent();
                    balanceDecimals = web3_1.default.utils.hexToNumberString(balance || 0);
                    if (balanceDecimals) {
                        balanceObj.long = Number(balanceDecimals);
                        balanceObj.short = +utils_1.utils.toFixed(utils_1.utils.decimals2Amount(balanceDecimals, decimals), 6);
                    }
                    return [3 /*break*/, 19];
                case 18:
                    e_2 = _c.sent();
                    console.log("triggerConfirmedConstantContract", e_2);
                    return [3 /*break*/, 19];
                case 19: return [3 /*break*/, 31];
                case 20:
                    if (!(chainName === 'osmosis' || chainName === 'sifchain')) return [3 /*break*/, 22];
                    return [4 /*yield*/, myWallet.lcdClient.bank.balances(account)];
                case 21:
                    _b = (_c.sent()).result, result = _b === void 0 ? [] : _b;
                    result.forEach(function (item) {
                        var amount = item.amount, denom = item.denom;
                        if (denom === tokenAddressOrSymbol) {
                            balance = amount;
                        }
                    });
                    balanceObj.long = balance;
                    balanceObj.short = +utils_1.utils.toFixed(utils_1.utils.decimals2Amount(balance, decimals), 6);
                    return [3 /*break*/, 31];
                case 22:
                    if (!Chains_1.chains.isNativeToken(chainName, tokenAddressOrSymbol)) return [3 /*break*/, 27];
                    console.log('myWallet', myWallet);
                    if (!(myWallet.key === "GnosisSafeWallet")) return [3 /*break*/, 24];
                    return [4 /*yield*/, myWallet.sdk.eth.getBalance([account, "latest"])];
                case 23:
                    balance = _c.sent();
                    return [3 /*break*/, 26];
                case 24: return [4 /*yield*/, myWallet.sdk.eth.getBalance(account)];
                case 25:
                    balance = _c.sent();
                    _c.label = 26;
                case 26: return [3 /*break*/, 30];
                case 27:
                    _c.trys.push([27, 29, , 30]);
                    contract = new myWallet.sdk.eth.Contract(config_1.ERC20_abi, tokenAddressOrSymbol);
                    return [4 /*yield*/, contract.methods.balanceOf(account).call()];
                case 28:
                    balance = _c.sent();
                    return [3 /*break*/, 30];
                case 29:
                    e_3 = _c.sent();
                    return [3 /*break*/, 30];
                case 30:
                    if (balance) {
                        balanceObj.long = balance;
                        balanceObj.short = +utils_1.utils.toFixed(utils_1.utils.decimals2Amount(balance, decimals), 6);
                    }
                    _c.label = 31;
                case 31: return [2 /*return*/, balanceObj];
            }
        });
    });
}
exports.getBalance = getBalance;
