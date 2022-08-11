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
exports.Swap = exports.ReqSwapVo = void 0;
var aggregator_1 = require("../asset/abi/aggregator");
var RequestVo_1 = require("../api/vo/RequestVo");
Object.defineProperty(exports, "ReqSwapVo", { enumerable: true, get: function () { return RequestVo_1.ReqSwapVo; } });
var Chains_1 = require("../config/Chains");
var web3_js_1 = require("@solana/web3.js");
var terra_js_1 = require("@terra-money/terra.js");
var ontology_ts_sdk_1 = require("ontology-ts-sdk");
var ontology_dapi_1 = require("@ont-dev/ontology-dapi");
var NotoMobile_1 = require("./NotoMobile");
var axios = require('axios');
var bs58 = require("bs58");
ontology_dapi_1.client.registerClient({});
var Swap = /** @class */ (function () {
    function Swap(res, wallet, chain, isNew) {
        this.getDataCallback = function () { };
        this.errorCallback = function () { };
        this.transactionHashCallback = function () { };
        this.receiptCallback = function () { };
        this.successCallback = function () { };
        this.res = res;
        this.wallet = wallet;
        this.chain = chain;
    }
    Swap.prototype.send = function () {
        var _this = this;
        setTimeout(function () {
            switch (_this.chain.compiler) {
                case 'EVM':
                    if (_this.isNew) {
                        _this.sendEthTransactionNew();
                    }
                    else {
                        _this.sendEthTransaction();
                    }
                    break;
                case 'SOL':
                    _this.sendSolanaTransaction();
                    break;
                case 'TRON':
                    _this.sendTronTransaction();
                    break;
                case 'TERRA':
                    _this.sendTerraTransaction();
                    break;
                case 'ONT':
                    _this.sendONTTransaction();
                    break;
            }
        }, 200);
        return this;
    };
    Swap.prototype.getGas = function () {
        var _this = this;
        return new Promise(function (r, j) {
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = this.chain.compiler;
                            switch (_a) {
                                case 'EVM': return [3 /*break*/, 1];
                            }
                            return [3 /*break*/, 6];
                        case 1:
                            if (!this.isNew) return [3 /*break*/, 3];
                            _b = r;
                            return [4 /*yield*/, this.getGasNew()];
                        case 2:
                            _b.apply(void 0, [_d.sent()]);
                            return [3 /*break*/, 5];
                        case 3:
                            _c = r;
                            return [4 /*yield*/, this.getGasOld()];
                        case 4:
                            _c.apply(void 0, [_d.sent()]);
                            _d.label = 5;
                        case 5: return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            }); }, 200);
        });
    };
    Swap.prototype.sendONTTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, approve, swap, transaction, inAmount, inToken, instance_1, account;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.res, approve = _a.approve, swap = _a.swap, transaction = _a.transaction, inAmount = _a.inAmount, inToken = _a.inToken;
                        if (!(this.wallet.key === "OntoMobile")) return [3 /*break*/, 2];
                        instance_1 = new NotoMobile_1.NotoMobile(approve ? approve : swap);
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
                    case 1:
                        account = _b.sent();
                        this.transactionHashCallback(account);
                        return [3 /*break*/, 3];
                    case 2:
                        if (approve) {
                            this.approveOnt(transaction, inAmount, inToken);
                        }
                        else {
                            this.sendOntTransactionSdk(transaction);
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.sendSolanaTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, setupTransaction, swapTransaction, cleanupTransaction, list, recentBlock_1, transactions, i, _i, transactions_1, transaction_1, txid, transaction, signed, signature, result, bytes, _b, msg, data, bytes, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        res = this.res;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 19, , 20]);
                        if (!(res.dex == "jupiter")) return [3 /*break*/, 11];
                        _a = JSON.parse(res.transaction), setupTransaction = _a.setupTransaction, swapTransaction = _a.swapTransaction, cleanupTransaction = _a.cleanupTransaction;
                        list = [setupTransaction, swapTransaction, cleanupTransaction].filter(Boolean);
                        return [4 /*yield*/, this.wallet.connection.getLatestBlockhash()];
                    case 2:
                        recentBlock_1 = _c.sent();
                        transactions = list.map(function (tx) {
                            var transaction = web3_js_1.Transaction.from(Buffer.from(tx, "base64"));
                            transaction.recentBlockhash = recentBlock_1.blockhash;
                            return transaction;
                        });
                        return [4 /*yield*/, this.wallet.sdk.signAllTransactions(transactions)];
                    case 3: return [4 /*yield*/, _c.sent()];
                    case 4:
                        _c.sent();
                        i = 0;
                        _i = 0, transactions_1 = transactions;
                        _c.label = 5;
                    case 5:
                        if (!(_i < transactions_1.length)) return [3 /*break*/, 10];
                        transaction_1 = transactions_1[_i];
                        i++;
                        return [4 /*yield*/, this.wallet.connection.sendRawTransaction(transaction_1.serialize({ requireAllSignatures: false }))];
                    case 6:
                        txid = _c.sent();
                        if (!(i < list.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.wallet.connection.confirmTransaction(txid)];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        this.transactionHashCallback(txid);
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 5];
                    case 10: return [2 /*return*/];
                    case 11:
                        transaction = web3_js_1.Transaction.from(Buffer.from(res.transaction, res.dex == "jupiter" ? "base64" : "hex"));
                        signed = null;
                        signature = null;
                        if (!this.wallet.sdk.isCoin98) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.wallet.sdk.request({
                                method: 'sol_sign',
                                params: [transaction]
                            })];
                    case 12:
                        result = _c.sent();
                        console.log("Got signature, submitting transaction");
                        bytes = bs58.decode(result.signature);
                        transaction.signatures[0].signature = bytes;
                        transaction.feePayer = this.wallet.customPublicKey;
                        signed = transaction;
                        return [3 /*break*/, 17];
                    case 13:
                        if (!this.wallet.sdk.isSlopeWallet) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.wallet.sdk.signTransaction(bs58.encode(transaction.serializeMessage()))];
                    case 14:
                        _b = _c.sent(), msg = _b.msg, data = _b.data;
                        if (msg !== 'ok')
                            return [2 /*return*/];
                        bytes = bs58.decode(data.signature);
                        transaction.signatures[0].signature = bytes;
                        transaction.feePayer = this.wallet.customPublicKey;
                        signed = transaction;
                        return [3 /*break*/, 17];
                    case 15: return [4 /*yield*/, this.wallet.sdk.signTransaction(transaction)];
                    case 16:
                        signed = _c.sent();
                        _c.label = 17;
                    case 17: return [4 /*yield*/, this.wallet.connection.sendRawTransaction(signed.serialize({ requireAllSignatures: false }))];
                    case 18:
                        signature = _c.sent();
                        // this.receiptCallback(signature)
                        this.transactionHashCallback(signature);
                        return [3 /*break*/, 20];
                    case 19:
                        e_1 = _c.sent();
                        this.errorCallback(e_1.message);
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.getGasOld = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inToken, inAmount, data, to, gas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.res, inToken = _a.inToken, inAmount = _a.inAmount, data = _a.data, to = _a.to;
                        return [4 /*yield*/, this.wallet.sdk.eth.estimateGas({
                                from: this.wallet.address,
                                to: to,
                                data: data,
                                value: Chains_1.chains.isNativeToken(this.chain.key, inToken.address) ? inAmount : 0
                            })];
                    case 1:
                        gas = _b.sent();
                        return [2 /*return*/, Math.ceil(gas * 1.15)];
                }
            });
        });
    };
    Swap.prototype.getGasNew = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inToken, inAmount, outAmount, outToken, data, to, myWallet, contract, invitee, path, amounts, swapAddr, swapExtraData, gas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.res, inToken = _a.inToken, inAmount = _a.inAmount, outAmount = _a.outAmount, outToken = _a.outToken, data = _a.data, to = _a.to;
                        myWallet = this.wallet.sdk;
                        contract = new myWallet.eth.Contract(aggregator_1.aggregator, Chains_1.chains.getProxyContract(this.chain.key));
                        invitee = this.wallet.address;
                        path = [inToken.address, outToken.address];
                        amounts = [inAmount, outAmount];
                        swapAddr = to;
                        swapExtraData = data;
                        return [4 /*yield*/, contract.methods
                                .swap(invitee, path, amounts, swapAddr, swapExtraData)
                                .estimateGas({
                                from: this.wallet.address,
                                value: Chains_1.chains.isNativeToken(this.chain.key, inToken.address) ? inAmount : 0
                            })];
                    case 1:
                        gas = _b.sent();
                        return [2 /*return*/, Math.ceil(gas * 1.5)];
                }
            });
        });
    };
    Swap.prototype.sendEthTransactionNew = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inToken, inAmount, outAmount, outToken, data, to, ethGasPrice, gasPrice, myWallet, contract, invitee, path, amounts, swapAddr, swapExtraData, swapParams, maxFeePerGas, maxPriorityFeePerGas;
            var _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.res, inToken = _a.inToken, inAmount = _a.inAmount, outAmount = _a.outAmount, outToken = _a.outToken, data = _a.data, to = _a.to, ethGasPrice = _a.ethGasPrice, gasPrice = _a.gasPrice;
                        myWallet = this.wallet.sdk;
                        contract = new myWallet.eth.Contract(aggregator_1.aggregator, Chains_1.chains.getProxyContract(this.chain.key));
                        invitee = this.wallet.address;
                        path = [inToken.address, outToken.address];
                        amounts = [inAmount, outAmount];
                        swapAddr = to;
                        swapExtraData = data;
                        _b = {
                            from: this.wallet.address
                        };
                        return [4 /*yield*/, this.getGasNew()];
                    case 1:
                        swapParams = (_b.gas = _c.sent(),
                            _b.to = to,
                            _b.data = data,
                            _b);
                        if (ethGasPrice) {
                            maxFeePerGas = ethGasPrice.maxFeePerGas, maxPriorityFeePerGas = ethGasPrice.maxPriorityFeePerGas;
                            if (maxFeePerGas && maxPriorityFeePerGas) {
                                swapParams.maxFeePerGas = +maxFeePerGas;
                                swapParams.maxPriorityFeePerGas = +maxPriorityFeePerGas;
                            }
                        }
                        else {
                            swapParams.gasPrice = +gasPrice;
                        }
                        if (Chains_1.chains.isNativeToken(this.chain.key, inToken.address)) {
                            swapParams.value = inAmount;
                        }
                        contract.methods
                            .swap(invitee, path, amounts, swapAddr, swapExtraData)
                            .send(swapParams)
                            .on('error', function (error) {
                            _this.errorCallback(error);
                        })
                            .on('transactionHash', function (transactionHash) {
                            _this.transactionHashCallback(transactionHash);
                        })
                            .on('receipt', function (receipt) {
                            _this.receiptCallback(receipt);
                            // this.getSuccess()
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.sendEthTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inToken, inAmount, data, to, ethGasPrice, gasPrice, swapParams, safeTxHash, e_2, gas, e_3, maxFeePerGas, maxPriorityFeePerGas;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.res, inToken = _a.inToken, inAmount = _a.inAmount, data = _a.data, to = _a.to, ethGasPrice = _a.ethGasPrice, gasPrice = _a.gasPrice;
                        swapParams = {
                            from: this.wallet.address,
                            to: to,
                            data: data
                        };
                        if (Chains_1.chains.isNativeToken(this.chain.key, inToken.address)) {
                            swapParams.value = inAmount;
                        }
                        if (!(this.wallet.key === "GnosisSafeWallet")) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.wallet.sdk.txs.send({
                                txs: [
                                    {
                                        to: swapParams.to,
                                        value: swapParams.value || '0',
                                        data: swapParams.data,
                                    },
                                ],
                            })];
                    case 2:
                        safeTxHash = (_b.sent()).safeTxHash;
                        this.getGnosisSafeTransaction(safeTxHash);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        this.errorCallback((e_2 && e_2.message) || e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getGasOld()];
                    case 6:
                        gas = _b.sent();
                        swapParams.gas = gas;
                        return [3 /*break*/, 8];
                    case 7:
                        e_3 = _b.sent();
                        if (e_3 && e_3.message.indexOf('JSON-RPC error.') != -1) {
                            e_3 = JSON.parse(e_3.message.split('JSON-RPC error.')[1]);
                        }
                        this.errorCallback((e_3 && e_3.message) || e_3);
                        return [3 /*break*/, 8];
                    case 8:
                        if (ethGasPrice) {
                            maxFeePerGas = ethGasPrice.maxFeePerGas, maxPriorityFeePerGas = ethGasPrice.maxPriorityFeePerGas;
                            if (maxFeePerGas && maxPriorityFeePerGas) {
                                swapParams.maxFeePerGas = +maxFeePerGas;
                                swapParams.maxPriorityFeePerGas = +maxPriorityFeePerGas;
                            }
                        }
                        else {
                            swapParams.gasPrice = +gasPrice;
                        }
                        this.wallet.sdk.eth.sendTransaction(swapParams)
                            .on('error', function (error) {
                            _this.errorCallback(error);
                        })
                            .on('transactionHash', function (transactionHash) {
                            _this.transactionHashCallback(transactionHash);
                        })
                            .on('receipt', function (receipt) {
                            _this.receiptCallback(receipt);
                            // this.getSuccess()
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.getGnosisSafeTransaction = function (safeTxHash) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wallet.sdk.txs.getBySafeTxHash(safeTxHash)];
                    case 1:
                        txHash = (_a.sent()).txHash;
                        console.log('safeTxHash', safeTxHash, txHash);
                        if (txHash) {
                            this.transactionHashCallback(txHash);
                        }
                        else {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getGnosisSafeTransaction(safeTxHash)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 2000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.sendTronTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inToken, outToken, inAmount, outAmount, minOutAmount, addresses, calldata, offsets, gasLimitsAndValues, data, _contract, swapParams;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.res, inToken = _a.inToken, outToken = _a.outToken, inAmount = _a.inAmount, outAmount = _a.outAmount, minOutAmount = _a.minOutAmount, addresses = _a.addresses, calldata = _a.calldata, offsets = _a.offsets, gasLimitsAndValues = _a.gasLimitsAndValues;
                        return [4 /*yield*/, axios.get("https://ethapi.openocean.finance/v1/tron/exchange")];
                    case 1:
                        data = (_b.sent()).data;
                        return [4 /*yield*/, this.wallet.sdk.contract(data.abi, data.contract)];
                    case 2:
                        _contract = _b.sent();
                        swapParams = {
                            feeLimit: 300000000,
                        };
                        if (inToken.toLowerCase() === "t9yd14nj9j7xab4dbgeix9h8unkkhxuwwb") {
                            swapParams.callValue = inAmount;
                        }
                        try {
                            _contract.methods
                                .swap(inToken, outToken, inAmount, minOutAmount, outAmount, // guaranteedAmount
                            "0x0000000000000000000000000000000000000000", // referrer
                            addresses, calldata, offsets, gasLimitsAndValues)
                                .send(swapParams, function (result, txHash) {
                                console.log("state.multicall.methods.swap", result);
                                if (result) {
                                    _this.errorCallback(result.message || result);
                                }
                                else {
                                    _this.transactionHashCallback(txHash);
                                }
                            });
                        }
                        catch (e) {
                            this.errorCallback(e || e.message);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.sendTerraTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, address, gasPrices, msg, _a, fee, accountInfo, e_4;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, axios.get("https://ethapi.openocean.finance/v1/terra/exchange")];
                    case 1:
                        data = (_b.sent()).data;
                        address = this.wallet.address;
                        return [4 /*yield*/, axios.get("https://ethapi.openocean.finance/v1/terra/gas-price", { cache: true })];
                    case 2:
                        gasPrices = _b.sent();
                        return [4 /*yield*/, this.getTerraMsgExecuteContract(this.res, data, address, gasPrices.data)];
                    case 3:
                        msg = _b.sent();
                        return [4 /*yield*/, this.getTerraFee(address, msg, gasPrices.data)];
                    case 4:
                        _a = _b.sent(), fee = _a.fee, accountInfo = _a.accountInfo;
                        return [4 /*yield*/, this.wallet.sdk.post({
                                msgs: [msg],
                                gasAdjustment: 1.5,
                                waitForConfirmation: true,
                                fee: fee,
                                account_number: accountInfo.account_number,
                                sequence: accountInfo.sequence,
                                purgeQueue: true,
                            })];
                    case 5:
                        _b.sent();
                        this.wallet.sdk.on("onPost", function (data) {
                            var _a = data || {}, result = _a.result, success = _a.success;
                            if (success) {
                                var txhash = (result || {}).txhash;
                                _this.transactionHashCallback(txhash);
                            }
                            else {
                                _this.errorCallback('Transaction failed');
                            }
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        e_4 = _b.sent();
                        this.errorCallback(e_4.message || e_4);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.approveOnt = function (transaction, _amount, inToken) {
        return __awaiter(this, void 0, void 0, function () {
            var scriptHash, operation, gasLimit, args, params, result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        scriptHash = transaction.scriptHash, operation = transaction.operation, gasLimit = transaction.gasLimit, args = transaction.args;
                        params = {
                            contract: inToken,
                            operation: "approve",
                            args: [
                                {
                                    type: "Address",
                                    value: this.wallet.address,
                                },
                                {
                                    type: "ByteArray",
                                    value: ontology_ts_sdk_1.utils.reverseHex(scriptHash),
                                },
                                {
                                    type: "ByteArray",
                                    value: ontology_ts_sdk_1.utils.bigIntToBytes(_amount + ""),
                                },
                            ],
                            gasPrice: 2500,
                            gasLimit: 40000,
                        };
                        return [4 /*yield*/, ontology_dapi_1.client.api.smartContract.invoke(params)];
                    case 1:
                        result = _a.sent();
                        console.log("approveOnt params, result", params, result);
                        this.sendOntTransactionSdk(transaction);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        // tslint:disable-next-line:no-console
                        console.log("onScCall error:", e_5);
                        this.errorCallback((e_5 && e_5.message) || e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.sendOntTransactionSdk = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var scriptHash, operation, gasLimit, args, params, result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        scriptHash = transaction.scriptHash, operation = transaction.operation, gasLimit = transaction.gasLimit, args = transaction.args;
                        params = {
                            scriptHash: scriptHash,
                            operation: operation,
                            args: args.map(function (item) {
                                var type = item.type;
                                if (["Long", "Integer"].indexOf(type) >= 0) {
                                    item.value = Number(item.value);
                                }
                                return item;
                            }),
                            gasPrice: 2500,
                            gasLimit: 60000,
                            requireIdentity: false,
                        };
                        return [4 /*yield*/, ontology_dapi_1.client.api.smartContract.invoke(params)];
                    case 1:
                        result = _a.sent();
                        if (result && (result.transaction)) {
                            this.transactionHashCallback(result.transaction);
                        }
                        else {
                            this.errorCallback('Progress transactions submitted.');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        this.errorCallback((e_6 && e_6.message) || e_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.getTerraFee = function (address, msg, gasPrices) {
        return __awaiter(this, void 0, void 0, function () {
            var terra, accountInfo, fee, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        terra = new terra_js_1.LCDClient({
                            chainID: "columbus-5",
                            URL: "https://lcd.terra.dev",
                            gasPrices: gasPrices,
                            gasAdjustment: 1.75,
                        });
                        return [4 /*yield*/, terra.auth.accountInfo(address)];
                    case 1:
                        accountInfo = _a.sent();
                        return [4 /*yield*/, terra.tx.estimateFee([
                                {
                                    sequenceNumber: accountInfo.sequence,
                                    publicKey: accountInfo.public_key,
                                },
                            ], {
                                msgs: [msg],
                                feeDenoms: ["uusd"],
                            })];
                    case 2:
                        fee = _a.sent();
                        return [2 /*return*/, {
                                fee: fee,
                                accountInfo: accountInfo,
                            }];
                    case 3:
                        e_7 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Swap.prototype.getTerraMsgExecuteContract = function (res, res2, sender, gasPrices) {
        try {
            var inToken = res.inToken, inAmount = res.inAmount, data = res.data;
            var dataObj = data.msgs.map(function (item) {
                return JSON.parse(item);
            });
            var execute_swap_operations = dataObj[0].execute_msg.execute_swap_operations;
            var contract = res2.contract;
            var address = inToken.address;
            var msg = null;
            if (gasPrices[address]) {
                var coins = {};
                coins[address] = +inAmount;
                msg = new terra_js_1.MsgExecuteContract(sender, contract, {
                    execute_swap_operations: execute_swap_operations,
                }, coins);
            }
            else {
                msg = new terra_js_1.MsgExecuteContract(sender, address, {
                    send: {
                        contract: contract,
                        amount: inAmount,
                        msg: btoa(JSON.stringify({ execute_swap_operations: execute_swap_operations })),
                    },
                }, []);
            }
            return msg;
        }
        catch (e) {
            return null;
        }
    };
    Swap.prototype.on = function (events, callback) {
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
        else if (events === 'getDataSuccess') {
            this.getDataCallback = callback;
        }
        return this;
    };
    return Swap;
}());
exports.Swap = Swap;
