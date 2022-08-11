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
exports.ReqtransferVo = exports.ReqTransactionVo = exports.ReqTransactionReceiptVo = exports.ReqGetTokenVo = exports.ReqSwapVo = exports.ReqQuoteVo = exports.ReqTokenInfoVo = exports.ReqTokenPriceVo = exports.ReqAllowanceVo = exports.TxsVo = exports.NftSignVo = exports.NftSellVo = exports.NftBuyVo = exports.AssetsVo = exports.CollectionsVo = exports.TransactionVo = exports.ReqBanlanceVo = exports.UserCode = exports.ChainName = exports.ReqBase = void 0;
require("reflect-metadata");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var Chains_1 = require("../../config/Chains");
var ReqBase = /** @class */ (function () {
    function ReqBase() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ChainId addresses cannot be empty' }),
        (0, class_validator_1.IsIn)(Chains_1.chains.chainIds, { message: 'Chain id in(31/56/100/137/250/42161/43114)' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqBase.prototype, "chainId", void 0);
    return ReqBase;
}());
exports.ReqBase = ReqBase;
var ChainName = /** @class */ (function () {
    function ChainName() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Chain cannot be empty' }),
        (0, class_validator_1.IsIn)(Chains_1.chains.chainNames, { message: "Chain in(".concat(Chains_1.chains.chainNames.join(','), ")") }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ChainName.prototype, "chain", void 0);
    return ChainName;
}());
exports.ChainName = ChainName;
var UserCode = /** @class */ (function () {
    function UserCode() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Code cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], UserCode.prototype, "code", void 0);
    return UserCode;
}());
exports.UserCode = UserCode;
var ReqBanlanceVo = /** @class */ (function (_super) {
    __extends(ReqBanlanceVo, _super);
    function ReqBanlanceVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Account cannot be empty' }),
        (0, class_validator_1.Length)(30, 60, { message: 'Account length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqBanlanceVo.prototype, "account", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Token addresses cannot be empty' }),
        (0, class_validator_1.MinLength)(30, { message: 'Token addresses length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqBanlanceVo.prototype, "inTokenAddress", void 0);
    return ReqBanlanceVo;
}(ChainName));
exports.ReqBanlanceVo = ReqBanlanceVo;
var TransactionVo = /** @class */ (function (_super) {
    __extends(TransactionVo, _super);
    function TransactionVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Hash cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], TransactionVo.prototype, "hash", void 0);
    return TransactionVo;
}(ChainName));
exports.TransactionVo = TransactionVo;
var CollectionsVo = /** @class */ (function (_super) {
    __extends(CollectionsVo, _super);
    function CollectionsVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Market cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], CollectionsVo.prototype, "market", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Limit cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], CollectionsVo.prototype, "limit", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Offset cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], CollectionsVo.prototype, "offset", void 0);
    return CollectionsVo;
}(ChainName));
exports.CollectionsVo = CollectionsVo;
var AssetsVo = /** @class */ (function (_super) {
    __extends(AssetsVo, _super);
    function AssetsVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Market cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], AssetsVo.prototype, "market", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Limit cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], AssetsVo.prototype, "limit", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Offset cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], AssetsVo.prototype, "offset", void 0);
    return AssetsVo;
}(ChainName));
exports.AssetsVo = AssetsVo;
var NftBuyVo = /** @class */ (function (_super) {
    __extends(NftBuyVo, _super);
    function NftBuyVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Market cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], NftBuyVo.prototype, "market", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Sender cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], NftBuyVo.prototype, "sender", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'BalanceTokens cannot be empty' })
    ], NftBuyVo.prototype, "balanceTokens", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'DustTokens cannot be empty' })
    ], NftBuyVo.prototype, "dustTokens", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Buy cannot be empty' })
    ], NftBuyVo.prototype, "buy", void 0);
    return NftBuyVo;
}(ChainName));
exports.NftBuyVo = NftBuyVo;
var NftSellVo = /** @class */ (function (_super) {
    __extends(NftSellVo, _super);
    function NftSellVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Market cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], NftSellVo.prototype, "market", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Sender cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], NftSellVo.prototype, "sender", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Sell cannot be empty' })
    ], NftSellVo.prototype, "sell", void 0);
    return NftSellVo;
}(ChainName));
exports.NftSellVo = NftSellVo;
var NftSignVo = /** @class */ (function (_super) {
    __extends(NftSignVo, _super);
    function NftSignVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Market cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], NftSignVo.prototype, "market", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Order cannot be empty' })
    ], NftSignVo.prototype, "order", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Signature cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], NftSignVo.prototype, "signature", void 0);
    return NftSignVo;
}(ChainName));
exports.NftSignVo = NftSignVo;
var TxsVo = /** @class */ (function (_super) {
    __extends(TxsVo, _super);
    function TxsVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Hash cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], TxsVo.prototype, "account", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'pageSize cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], TxsVo.prototype, "pageSize", void 0);
    return TxsVo;
}(ChainName));
exports.TxsVo = TxsVo;
var ReqAllowanceVo = /** @class */ (function (_super) {
    __extends(ReqAllowanceVo, _super);
    function ReqAllowanceVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Account cannot be empty' }),
        (0, class_validator_1.Length)(30, 60, { message: 'Account length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqAllowanceVo.prototype, "account", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Token addresses cannot be empty' }),
        (0, class_validator_1.MinLength)(30, { message: 'Token addresses length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqAllowanceVo.prototype, "inTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Contract addresses cannot be empty' }),
        (0, class_validator_1.MinLength)(30, { message: 'Contract addresses length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqAllowanceVo.prototype, "contractAddress", void 0);
    return ReqAllowanceVo;
}(ChainName));
exports.ReqAllowanceVo = ReqAllowanceVo;
var ReqTokenPriceVo = /** @class */ (function () {
    function ReqTokenPriceVo() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ChainId cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTokenPriceVo.prototype, "ids", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Token name cannot be empty' }),
        (0, class_validator_1.Length)(2, 4, { message: 'Token name length error' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTokenPriceVo.prototype, "vs_currencies", void 0);
    return ReqTokenPriceVo;
}());
exports.ReqTokenPriceVo = ReqTokenPriceVo;
var ReqTokenInfoVo = /** @class */ (function () {
    function ReqTokenInfoVo() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'ChainId cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTokenInfoVo.prototype, "id", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Contract address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTokenInfoVo.prototype, "contract_address", void 0);
    return ReqTokenInfoVo;
}());
exports.ReqTokenInfoVo = ReqTokenInfoVo;
var ReqQuoteVo = /** @class */ (function (_super) {
    __extends(ReqQuoteVo, _super);
    function ReqQuoteVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'In Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqQuoteVo.prototype, "inTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Out Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqQuoteVo.prototype, "outTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Amount cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqQuoteVo.prototype, "amount", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqQuoteVo.prototype, "gasPrice", void 0);
    return ReqQuoteVo;
}(ChainName));
exports.ReqQuoteVo = ReqQuoteVo;
var Dexs;
(function (Dexs) {
    Dexs[Dexs["openOcean"] = 0] = "openOcean";
    Dexs[Dexs["1inch"] = 1] = "1inch";
    Dexs[Dexs["paraSwap"] = 2] = "paraSwap";
    Dexs[Dexs["matcha"] = 3] = "matcha";
    Dexs[Dexs["jupiter"] = 4] = "jupiter";
})(Dexs || (Dexs = {}));
var ReqSwapVo = /** @class */ (function (_super) {
    __extends(ReqSwapVo, _super);
    function ReqSwapVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'In Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "inTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'In Dex cannot be empty' }),
        (0, class_validator_1.IsEnum)(Dexs, { message: "Dex in (openOcean,1inch,paraSwap,matcha,jupiter)" }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "dex", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Out Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "outTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Amount cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqSwapVo.prototype, "amount", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Slippage cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqSwapVo.prototype, "slippage", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'String cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "account", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "gasPrice", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqSwapVo.prototype, "referrer", void 0);
    return ReqSwapVo;
}(ChainName));
exports.ReqSwapVo = ReqSwapVo;
var ReqGetTokenVo = /** @class */ (function (_super) {
    __extends(ReqGetTokenVo, _super);
    function ReqGetTokenVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqGetTokenVo.prototype, "address", void 0);
    return ReqGetTokenVo;
}(ChainName));
exports.ReqGetTokenVo = ReqGetTokenVo;
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["transfer"] = 0] = "transfer";
    TransactionType[TransactionType["swap"] = 1] = "swap";
})(TransactionType || (TransactionType = {}));
var ReqTransactionReceiptVo = /** @class */ (function (_super) {
    __extends(ReqTransactionReceiptVo, _super);
    function ReqTransactionReceiptVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Hash cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTransactionReceiptVo.prototype, "hash", void 0);
    return ReqTransactionReceiptVo;
}(ChainName));
exports.ReqTransactionReceiptVo = ReqTransactionReceiptVo;
var ReqTransactionVo = /** @class */ (function (_super) {
    __extends(ReqTransactionVo, _super);
    function ReqTransactionVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Type cannot be empty' }),
        (0, class_validator_1.IsEnum)(TransactionType, { message: "Type in (transfer/swap)" }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqTransactionVo.prototype, "type", void 0);
    return ReqTransactionVo;
}(ReqTransactionReceiptVo));
exports.ReqTransactionVo = ReqTransactionVo;
var ReqtransferVo = /** @class */ (function (_super) {
    __extends(ReqtransferVo, _super);
    function ReqtransferVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'In Token address cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return String; })
    ], ReqtransferVo.prototype, "inTokenAddress", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Decimals cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqtransferVo.prototype, "decimals", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'Amount cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqtransferVo.prototype, "amount", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'GasPrice cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqtransferVo.prototype, "gasPrice", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: 'TargetAddress cannot be empty' }),
        (0, class_transformer_1.Type)(function () { return Number; })
    ], ReqtransferVo.prototype, "targetAddress", void 0);
    return ReqtransferVo;
}(ChainName));
exports.ReqtransferVo = ReqtransferVo;
