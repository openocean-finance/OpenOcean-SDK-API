"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqApproveVo = exports.ReqAllowanceVo = exports.ReqBalanceVo = exports.ReqConnectWalletVo = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var RequestVo_1 = require("../api/vo/RequestVo");
var ReqConnectWalletVo = /** @class */ (function (_super) {
    __extends(ReqConnectWalletVo, _super);
    function ReqConnectWalletVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Wallet name cannot be empty' })
        // @IsEnum(WalletNames, { message: 'Wallet name error' })
        ,
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqConnectWalletVo.prototype, "walletName", void 0);
    return ReqConnectWalletVo;
}(RequestVo_1.ChainName));
exports.ReqConnectWalletVo = ReqConnectWalletVo;
var ReqBalanceVo = /** @class */ (function (_super) {
    __extends(ReqBalanceVo, _super);
    function ReqBalanceVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'TokenAddressOrSymbol cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqBalanceVo.prototype, "tokenAddressOrSymbol", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Decimals cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqBalanceVo.prototype, "decimals", void 0);
    return ReqBalanceVo;
}(RequestVo_1.ChainName));
exports.ReqBalanceVo = ReqBalanceVo;
var ReqAllowanceVo = /** @class */ (function (_super) {
    __extends(ReqAllowanceVo, _super);
    function ReqAllowanceVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ApproveContract cannot be empty' })
    ], ReqAllowanceVo.prototype, "approveContract", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'TokenAddress cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqAllowanceVo.prototype, "tokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Decimals cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqAllowanceVo.prototype, "decimals", void 0);
    return ReqAllowanceVo;
}(RequestVo_1.ChainName));
exports.ReqAllowanceVo = ReqAllowanceVo;
var ReqApproveVo = /** @class */ (function (_super) {
    __extends(ReqApproveVo, _super);
    function ReqApproveVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Token addresses cannot be empty' }),
        (0, class_validator_1.MinLength)(30, { message: 'Token addresses length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqApproveVo.prototype, "tokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Contract addresses cannot be empty' }),
        (0, class_validator_1.MinLength)(30, { message: 'Contract addresses length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqApproveVo.prototype, "contractAddress", void 0);
    return ReqApproveVo;
}(RequestVo_1.ChainName));
exports.ReqApproveVo = ReqApproveVo;
