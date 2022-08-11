"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenoceanSdk = void 0;
var api_1 = require("./api");
var utils_1 = require("./utils");
var web3_1 = require("./utils/web3");
var swapSdk_1 = require("./swapSdk");
var config_1 = require("./config");
var OpenoceanSdk = /** @class */ (function () {
    function OpenoceanSdk(sdkArg) {
        this.web3 = web3_1.web3;
        this.utils = utils_1.utils;
        this.config = config_1.config;
        this.swapSdk = swapSdk_1.swapSdk;
        this.api = new api_1.Api(sdkArg ? sdkArg.apiUrl : '');
        this.swapSdk.setApi(this.api);
    }
    return OpenoceanSdk;
}());
exports.OpenoceanSdk = OpenoceanSdk;
