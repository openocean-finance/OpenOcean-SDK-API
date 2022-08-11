"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
var ajx_1 = require("../utils/ajx");
var config_1 = require("../config");
var RequestVo_1 = require("./vo/RequestVo");
var axios = require('axios');
var Api = /** @class */ (function () {
    function Api(baseUrl) {
        this.baseUrl = 'https://open-api.openocean.finance/v3';
        this.baseUrlNft = 'http://10.17.130.161:7104/v1';
        this.baseUrlV1 = 'https://open-api.openocean.finance/v1';
        if (baseUrl)
            this.baseUrl = baseUrl;
    }
    Api.prototype.collections = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrlNft, "/").concat(option.chain, "/").concat(option.market, "/collections"), option, RequestVo_1.CollectionsVo);
    };
    Api.prototype.assets = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrlNft, "/").concat(option.chain, "/").concat(option.market, "/assets"), option, RequestVo_1.AssetsVo);
    };
    Api.prototype.buy = function (option) {
        return (0, ajx_1.post)("".concat(this.baseUrlNft, "/").concat(option.chain, "/").concat(option.market, "/buy"), option, RequestVo_1.NftBuyVo);
    };
    Api.prototype.sell = function (option) {
        return (0, ajx_1.post)("".concat(this.baseUrlNft, "/").concat(option.chain, "/").concat(option.market, "/sell"), option, RequestVo_1.NftSellVo);
    };
    Api.prototype.sign = function (option) {
        return (0, ajx_1.post)("".concat(this.baseUrlNft, "/").concat(option.chain, "/").concat(option.market, "/sign"), option, RequestVo_1.NftSignVo);
    };
    Api.prototype.quote = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrl, "/").concat(option.chain, "/quote"), option, RequestVo_1.ReqQuoteVo);
    };
    Api.prototype.swapQuote = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrl, "/").concat(option.chain, "/swap_quote"), option, RequestVo_1.ReqSwapVo);
    };
    Api.prototype.getGasPrice = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrl, "/").concat(option.chain, "/gasPrice"), option, RequestVo_1.ChainName);
    };
    Api.prototype.getTransaction = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrl, "/").concat(option.chain, "/getTransaction"), option, RequestVo_1.TransactionVo);
    };
    Api.prototype.getTokenList = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrl, "/").concat(option.chain, "/tokenList"), option, RequestVo_1.ChainName);
    };
    Api.prototype.dexList = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrl, "/").concat(option.chain, "/dexList"), option, RequestVo_1.ChainName);
    };
    Api.prototype.getTxs = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrl, "/").concat(option.chain, "/getTxs"), option, RequestVo_1.TxsVo);
    };
    Api.prototype.getTokenPrice = function (id) {
        return axios.get("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=".concat(id));
    };
    Api.prototype.getBalance = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrl, "/cross/getBalance"), option, RequestVo_1.ReqBanlanceVo);
    };
    Api.prototype.getAllowance = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrlV1, "/cross/getAllowance"), option, RequestVo_1.ReqAllowanceVo);
    };
    Api.prototype.createWallet = function (option) {
        return (0, ajx_1.get)("".concat(this.baseUrl, "/").concat(option.chain, "/createWallet"), option, RequestVo_1.ChainName);
    };
    __decorate([
        setChainId
    ], Api.prototype, "collections", null);
    __decorate([
        setChainId
    ], Api.prototype, "assets", null);
    __decorate([
        setChainId
    ], Api.prototype, "buy", null);
    __decorate([
        setChainId
    ], Api.prototype, "sell", null);
    __decorate([
        setChainId
    ], Api.prototype, "sign", null);
    __decorate([
        setChainId
    ], Api.prototype, "quote", null);
    __decorate([
        setChainId
    ], Api.prototype, "swapQuote", null);
    __decorate([
        setChainId
    ], Api.prototype, "getGasPrice", null);
    __decorate([
        setChainId
    ], Api.prototype, "getTransaction", null);
    __decorate([
        setChainId
    ], Api.prototype, "getTokenList", null);
    __decorate([
        setChainId
    ], Api.prototype, "dexList", null);
    __decorate([
        setChainId
    ], Api.prototype, "getTxs", null);
    __decorate([
        setChainId
    ], Api.prototype, "getBalance", null);
    __decorate([
        setChainId
    ], Api.prototype, "getAllowance", null);
    __decorate([
        setChainId
    ], Api.prototype, "createWallet", null);
    return Api;
}());
exports.Api = Api;
function setChainId(target, method, descriptor) {
    var oldMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args = args.map(function (item, i) {
            if (item && item.chain) {
                item.chain = item.chain.toLowerCase();
                if (config_1.config.chains.chainObj[item.chain] && config_1.config.chains.chainObj[item.chain].chainId) {
                    item.chainId = config_1.config.chains.chainObj[item.chain].chainId + '';
                }
            }
            return item;
        });
        return oldMethod.apply(this, args);
    };
}
