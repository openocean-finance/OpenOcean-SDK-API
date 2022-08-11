"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotoMobile = void 0;
var QRCode = require("./qrcode").QRCode;
// import { QRCode } from "./qrcode";
var axios = require('axios');
var NotoMobile = /** @class */ (function () {
    function NotoMobile(qrData) {
        this.time = 0;
        var id = qrData.id, qrCode = qrData.qrCode;
        this.id = id;
        this.qrCode = JSON.stringify(qrCode);
        this.setCloseStyle();
        this.show();
    }
    NotoMobile.prototype.$on = function (key, callBack) {
        if (key == 'close')
            this.close = callBack;
    };
    NotoMobile.prototype.loop = function () {
        var _this = this;
        axios.get('https://ethapi.openocean.finance/v1/ont/qrcode/result/' + this.id).then(function (res) {
            var _a = res.data, action = _a.action, state = _a.state, account = _a.account;
            if (state === '0') {
                _this.close('success', action, account);
                _this.cancel();
            }
            else {
                _this.time++;
                if (_this.time > 120) {
                    _this.close('error', 'over time');
                    _this.cancel();
                    return;
                }
                _this.outTime = setTimeout(function () {
                    _this.loop();
                }, 1000);
            }
        }).catch(function (e) {
            console.log(e);
            _this.close('error', e);
            _this.cancel();
        });
    };
    NotoMobile.prototype.setCloseStyle = function () {
        var k = document.getElementById('qrcodeStyle09');
        if (k)
            return;
        var style = document.createElement('style');
        style.type = "text/css";
        style.id = 'qrcodeStyle09';
        document.head.appendChild(style);
        style.innerHTML = "\n    #qrcodeBox div,#qrcodeBox span{box-sizing: border-box;}\n    #qrcodeBox #close8 :hover{cursor:pointer;opacity:0.5;}\n    #qrcodeBox #close8 >div:before,#qrcodeBox #close8 >div:after{\n      content: '';position: absolute;height: 2px;width: 100%;top: 50%;left: 0;margin-top: -1px;background: #000;border-radius:5px;\n    }\n    #qrcodeBox #close8 >div:before{transform: rotate(45deg);}\n    #qrcodeBox #close8 >div:after{transform: rotate(-45deg);}\n    #qrcodeBox #qrcode img{ display:inline-block;}\n    ";
    };
    NotoMobile.prototype.createQrcode = function (w) {
        var _this = this;
        if (!document.getElementById("qrcode")) {
            setTimeout(function () {
                _this.createQrcode(w);
            }, 100);
        }
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: this.qrCode,
            width: w,
            height: w,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        this.loop();
    };
    NotoMobile.prototype.show = function () {
        var _this = this;
        var page_width = document.documentElement.scrollWidth;
        var page_height = document.documentElement.scrollHeight;
        var b_width = document.documentElement.clientWidth;
        var b_height = document.documentElement.clientHeight;
        this.mask = document.createElement("div");
        this.mask.id = "mask";
        this.mask.style.width = page_width + "px";
        this.mask.style.height = page_height + "px";
        this.mask.style.position = 'absolute';
        this.mask.style.background = 'rgba(37,41,46,.95)';
        this.mask.style.zIndex = '999';
        this.mask.style.top = '0';
        this.mask.style.left = '0';
        document.body.appendChild(this.mask);
        var width = 0;
        var height = 0;
        var headHeight = 60;
        var headHeight1 = 50;
        var qrcodeWidth = 0;
        var padding = 50;
        // pc
        if (b_width > b_height) {
            height = b_height;
            width = b_height - headHeight1 - headHeight - headHeight / 2;
            qrcodeWidth = width - padding * 2;
        }
        else {
            // phone
            padding = 30;
            headHeight = 50;
            headHeight1 = 50;
            width = b_width - 60;
            height = width + headHeight1 + headHeight + headHeight / 2;
            qrcodeWidth = width - padding * 2;
        }
        this.qrcodeBox = document.createElement("div");
        this.qrcodeBox.id = "qrcodeBox";
        this.qrcodeBox.style.left = (b_width - width) / 2 + "px";
        this.qrcodeBox.style.top = (b_height - height) / 2 + "px";
        this.qrcodeBox.style.height = height + "px";
        this.qrcodeBox.style.width = width + "px";
        this.qrcodeBox.style.position = 'absolute';
        this.qrcodeBox.style.zIndex = '10000';
        // qrcodeBox.style.padding = '0 30px 0 30px'
        this.qrcodeBox.innerHTML =
            "<div style=\"font-size: 22px;height:100%;padding-top:".concat(headHeight, "px;padding-bottom:").concat(headHeight / 2, "px;position:relative;\">\n        <div style=\"color:#ffffff;line-height: ").concat(headHeight, "px;position:absolute;top:0;left:0;width:100%\">\n          <img style=\"vertical-align: middle; width: 30px;height:30px\" src=\"https://cloudstorage.openocean.finance/openocean/img/icon-onto-white.b4f61a37.svg\"/>\n          <span style=\"vertical-align: middle;\">Onto Mobile</span>\n          <div id=\"close8\" style=\"margin-top: 20px;position: relative;float: right;background: #fff;border-radius: 100px;width:25px;height:25px;padding:5px;display: inline-block;\">\n             <div style=\"position: relative;width:100%;height:100%;display: block;\"></div>\n          </div>\n        </div>\n        <div id=\"qrcodeb\" style=\"padding-top:").concat(headHeight1, "px;position:relative;height:100%;width:100%;background:#fff;text-align: center;\">\n          <div style=\"position:absolute;top:0;left:0;width:100%;font-size:").concat(width > 400 ? 18 : 14, "px;color:rgba(60,66,82,.6);line-height: ").concat(headHeight1 + padding, "px;\">Scan QR code with a Onto wallet</div>\n          <div style=\"display: flex;justify-content: center;align-items: center;height:100%;height:100%;\">\n            <div id=\"qrcode\"></div>\n          </div>\n        </div>\n      </div>\n      ");
        document.body.appendChild(this.qrcodeBox);
        var qrcodeb = document.getElementById("qrcodeb");
        qrcodeb.style.borderRadius = "20px";
        qrcodeb.style.boxSizing = 'border-box';
        this.createQrcode(qrcodeWidth);
        var close = window.document.getElementById("close8");
        close.onclick = function () {
            _this.cancel();
        };
        this.mask.onclick = function () {
            _this.cancel();
        };
    };
    NotoMobile.prototype.cancel = function () {
        this.time = 0;
        this.outTime ? clearTimeout(this.outTime) : '';
        document.body.removeChild(this.mask);
        document.body.removeChild(this.qrcodeBox);
    };
    return NotoMobile;
}());
exports.NotoMobile = NotoMobile;
