"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPc = exports.utils = exports.Utils = exports.ChainNames = void 0;
var axios = require('axios');
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var ChainNames;
(function (ChainNames) {
    ChainNames[ChainNames["eth"] = 0] = "eth";
    ChainNames[ChainNames["solana"] = 1] = "solana";
    ChainNames[ChainNames["ont"] = 2] = "ont";
    ChainNames[ChainNames["terra"] = 3] = "terra";
    ChainNames[ChainNames["tron"] = 4] = "tron";
    ChainNames[ChainNames["osmosis"] = 5] = "osmosis";
    ChainNames[ChainNames["sifchain"] = 6] = "sifchain";
    ChainNames[ChainNames["ropsten"] = 7] = "ropsten";
    ChainNames[ChainNames["bsc"] = 8] = "bsc";
    ChainNames[ChainNames["okex"] = 9] = "okex";
    ChainNames[ChainNames["polygon"] = 10] = "polygon";
    ChainNames[ChainNames["fantom"] = 11] = "fantom";
    ChainNames[ChainNames["heco"] = 12] = "heco";
    ChainNames[ChainNames["avax"] = 13] = "avax";
    ChainNames[ChainNames["arbitrum"] = 14] = "arbitrum";
    ChainNames[ChainNames["xdai"] = 15] = "xdai";
    ChainNames[ChainNames["optimism"] = 16] = "optimism";
    ChainNames[ChainNames["boba"] = 17] = "boba";
    ChainNames[ChainNames["moonriver"] = 18] = "moonriver";
    ChainNames[ChainNames["aurora"] = 19] = "aurora";
    ChainNames[ChainNames["cronos"] = 20] = "cronos";
    ChainNames[ChainNames["cosmos"] = 21] = "cosmos";
    ChainNames[ChainNames["harmony"] = 22] = "harmony";
    ChainNames[ChainNames["bsctest"] = 23] = "bsctest";
})(ChainNames = exports.ChainNames || (exports.ChainNames = {}));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.sleep = function (interval) {
        return new Promise(function (resolve) {
            setTimeout(resolve, interval);
        });
    };
    Utils.prototype.getShift = function (a, b) {
        return new bignumber_js_1.default(a).shiftedBy(Number(b)).toFixed();
    };
    Utils.prototype.decimals2Amount = function (amount, decimals) {
        return this.getShift(amount, -decimals);
    };
    Utils.prototype.amount2Decimals = function (amount, decimals) {
        return this.getFixed(this.getShift(amount, decimals), 0);
    };
    Utils.prototype.getFixed = function (val, fixed, trailingZeros) {
        var numStr = val || '0';
        if (trailingZeros) {
            return new bignumber_js_1.default(numStr).toFixed(fixed);
        }
        return new bignumber_js_1.default(numStr).decimalPlaces(fixed).toString();
    };
    Utils.prototype.toFixed = function (n, k, z) {
        if (isNaN(n)) {
            return 0;
        }
        if (!k)
            k = 4;
        var a = Math.pow(10, k);
        if (Number(n) < 0) {
            a = Math.ceil(Number(n) * a) / a;
        }
        else {
            a = Math.floor(Number(n) * a) / a;
        }
        if (!z) {
            return a;
        }
        else {
            return a.toFixed(k);
        }
    };
    return Utils;
}());
exports.Utils = Utils;
exports.utils = new Utils();
function isPc() {
    var userAgent = navigator.userAgent, Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    console.log('userAgent:', userAgent);
    return Agents.some(function (i) {
        return userAgent.includes(i);
    });
}
exports.isPc = isPc;
