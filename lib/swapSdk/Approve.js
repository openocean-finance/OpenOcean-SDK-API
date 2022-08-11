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
exports.Approve = void 0;
var web3_1 = __importDefault(require("web3"));
var Approve = /** @class */ (function () {
    function Approve(contract, wallet) {
        this.errorCallback = function () { };
        this.transactionHashCallback = function () { };
        this.receiptCallback = function () { };
        this.successCallback = function () { };
        this.contract = contract;
        this.wallet = wallet;
    }
    Approve.prototype.send = function (reqApproveVo, address) {
        return __awaiter(this, void 0, void 0, function () {
            var web3, data, safeTxHash, e_1, _a, gasAmount, error_1, json;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.account = address;
                        this.key = 0;
                        this.contractAddress = reqApproveVo.contractAddress;
                        this.tokenAddress = reqApproveVo.tokenAddress;
                        if (!(this.wallet.key === "GnosisSafeWallet")) return [3 /*break*/, 5];
                        web3 = new web3_1.default();
                        data = web3.eth.abi.encodeFunctionCall({
                            "inputs": [
                                {
                                    "name": "spender",
                                    "type": "address"
                                },
                                {
                                    "name": "value",
                                    "type": "uint256"
                                }
                            ],
                            "name": "approve",
                            "type": "function"
                        }, [this.contractAddress, reqApproveVo.amount]);
                        console.log('data', this.contractAddress, reqApproveVo.amount, data);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.wallet.sdk.txs.send({
                                txs: [
                                    {
                                        to: this.tokenAddress,
                                        value: 0,
                                        data: data
                                    },
                                ],
                            })];
                    case 2:
                        safeTxHash = (_b.sent()).safeTxHash;
                        console.log('safeTxHash', safeTxHash);
                        setTimeout(function () {
                            console.log('successCallback');
                            _this.successCallback(1);
                        }, 3000);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        setTimeout(function () {
                            _this.errorCallback(e_1);
                        }, 500);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 12];
                    case 5:
                        if (!!reqApproveVo.amount) return [3 /*break*/, 7];
                        _a = reqApproveVo;
                        return [4 /*yield*/, this.contract.methods.totalSupply().call()];
                    case 6:
                        _a.amount = _b.sent();
                        _b.label = 7;
                    case 7:
                        this.amount = reqApproveVo.amount + '';
                        gasAmount = '80000';
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, this.contract.methods
                                .approve(this.contractAddress, this.amount)
                                .estimateGas({
                                from: this.account,
                            })];
                    case 9:
                        gasAmount = _b.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        error_1 = _b.sent();
                        setTimeout(function () {
                            _this.errorCallback(error_1);
                        }, 500);
                        return [2 /*return*/];
                    case 11:
                        json = {
                            from: address,
                        };
                        if (reqApproveVo.gasPrice) {
                            json.gasPrice = reqApproveVo.gasPrice;
                        }
                        try {
                            this.contract.methods.approve(this.contractAddress, this.amount)
                                .send(json, function (err, data) {
                                if (err) {
                                }
                                else {
                                }
                            })
                                .on('error', function (error) {
                                _this.errorCallback(error);
                            })
                                .on('transactionHash', function (transactionHash) {
                                _this.transactionHashCallback(transactionHash);
                            })
                                .on('receipt', function (receipt) {
                                _this.receiptCallback(receipt);
                                _this.getSuccess();
                            })
                                .then(function (receipt) {
                            })
                                .catch(function (err) {
                            });
                        }
                        catch (error) {
                            this.errorCallback(error);
                        }
                        _b.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Approve.prototype.on = function (events, callback) {
        if (events === 'error') {
            this.errorCallback = callback;
        }
        else if (events === 'transactionHash') {
            this.transactionHashCallback = callback;
        }
        else if (events === 'receipt') {
            this.receiptCallback = callback;
        }
        else if (events === 'success') {
            this.successCallback = callback;
        }
        return this;
    };
    Approve.prototype.getSuccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.methods.allowance(this.account, this.contractAddress).call()];
                    case 1:
                        balance = _a.sent();
                        this.key++;
                        if (this.key > 20)
                            return [2 /*return*/];
                        if (balance >= Number(this.amount)) {
                            this.successCallback(balance);
                        }
                        else {
                            setTimeout(function () {
                                _this.getSuccess();
                            }, 2000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Approve;
}());
exports.Approve = Approve;
