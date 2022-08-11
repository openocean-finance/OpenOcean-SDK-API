

let { QRCode } = require("./qrcode");
// import { QRCode } from "./qrcode";
const axios = require('axios');

export class NotoMobile {
  close: Function
  $on(key: string, callBack: Function) {
    if (key == 'close') this.close = callBack
  }
  mask: any
  qrcodeBox: any

  id: string
  qrCode: string
  width: number

  time: number = 0
  outTime: any

  constructor(qrData: any) {
    const { id, qrCode } = qrData
    this.id = id
    this.qrCode = JSON.stringify(qrCode)
    this.setCloseStyle()
    this.show()
  }
  loop() {
    axios.get('https://ethapi.openocean.finance/v1/ont/qrcode/result/' + this.id).then((res: any) => {
      const { action, state, account } = res.data;
      if (state === '0') {
        this.close('success', action, account,)
        this.cancel()
      }
      else {
        this.time++
        if (this.time > 120) {
          this.close('error', 'over time')
          this.cancel()
          return
        }
        this.outTime = setTimeout(() => {
          this.loop();
        }, 1000);
      }
    }).catch((e: any) => {
      console.log(e);
      this.close('error', e)
      this.cancel()
    });
  }
  setCloseStyle() {
    let k = document.getElementById('qrcodeStyle09')
    if (k) return
    let style: any = document.createElement('style');
    style.type = "text/css";
    style.id = 'qrcodeStyle09'
    document.head.appendChild(style);
    style.innerHTML = `
    #qrcodeBox div,#qrcodeBox span{box-sizing: border-box;}
    #qrcodeBox #close8 :hover{cursor:pointer;opacity:0.5;}
    #qrcodeBox #close8 >div:before,#qrcodeBox #close8 >div:after{
      content: '';position: absolute;height: 2px;width: 100%;top: 50%;left: 0;margin-top: -1px;background: #000;border-radius:5px;
    }
    #qrcodeBox #close8 >div:before{transform: rotate(45deg);}
    #qrcodeBox #close8 >div:after{transform: rotate(-45deg);}
    #qrcodeBox #qrcode img{ display:inline-block;}
    `
  }
  createQrcode(w: number) {
    if (!document.getElementById("qrcode")) {
      setTimeout(() => {
        this.createQrcode(w)
      }, 100);
    }
    let qrcode = new QRCode(document.getElementById("qrcode"), {
      text: this.qrCode,
      width: w,
      height: w,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    this.loop();
  }
  show() {
    let page_width = document.documentElement.scrollWidth;
    let page_height = document.documentElement.scrollHeight;

    let b_width = document.documentElement.clientWidth;
    let b_height = document.documentElement.clientHeight;

    this.mask = document.createElement("div");
    this.mask.id = "mask";
    this.mask.style.width = page_width + "px";
    this.mask.style.height = page_height + "px";
    this.mask.style.position = 'absolute'
    this.mask.style.background = 'rgba(37,41,46,.95)'
    this.mask.style.zIndex = '999'
    this.mask.style.top = '0'
    this.mask.style.left = '0'
    document.body.appendChild(this.mask);


    let width = 0
    let height = 0
    let headHeight = 60
    let headHeight1 = 50
    let qrcodeWidth = 0
    let padding = 50
    // pc
    if (b_width > b_height) {
      height = b_height
      width = b_height - headHeight1 - headHeight - headHeight / 2
      qrcodeWidth = width - padding * 2
    } else {
      // phone
      padding = 30
      headHeight = 50
      headHeight1 = 50
      width = b_width - 60
      height = width + headHeight1 + headHeight + headHeight / 2
      qrcodeWidth = width - padding * 2
    }

    this.qrcodeBox = document.createElement("div");
    this.qrcodeBox.id = "qrcodeBox";
    this.qrcodeBox.style.left = (b_width - width) / 2 + "px";
    this.qrcodeBox.style.top = (b_height - height) / 2 + "px";
    this.qrcodeBox.style.height = height + "px";
    this.qrcodeBox.style.width = width + "px";

    this.qrcodeBox.style.position = 'absolute'
    this.qrcodeBox.style.zIndex = '10000'
    // qrcodeBox.style.padding = '0 30px 0 30px'

    this.qrcodeBox.innerHTML =
      `<div style="font-size: 22px;height:100%;padding-top:${headHeight}px;padding-bottom:${headHeight / 2}px;position:relative;">
        <div style="color:#ffffff;line-height: ${headHeight}px;position:absolute;top:0;left:0;width:100%">
          <img style="vertical-align: middle; width: 30px;height:30px" src="https://cloudstorage.openocean.finance/openocean/img/icon-onto-white.b4f61a37.svg"/>
          <span style="vertical-align: middle;">Onto Mobile</span>
          <div id="close8" style="margin-top: 20px;position: relative;float: right;background: #fff;border-radius: 100px;width:25px;height:25px;padding:5px;display: inline-block;">
             <div style="position: relative;width:100%;height:100%;display: block;"></div>
          </div>
        </div>
        <div id="qrcodeb" style="padding-top:${headHeight1}px;position:relative;height:100%;width:100%;background:#fff;text-align: center;">
          <div style="position:absolute;top:0;left:0;width:100%;font-size:${width > 400 ? 18 : 14}px;color:rgba(60,66,82,.6);line-height: ${headHeight1 + padding}px;">Scan QR code with a Onto wallet</div>
          <div style="display: flex;justify-content: center;align-items: center;height:100%;height:100%;">
            <div id="qrcode"></div>
          </div>
        </div>
      </div>
      `
    document.body.appendChild(this.qrcodeBox);
    let qrcodeb: any = document.getElementById("qrcodeb");
    qrcodeb.style.borderRadius = "20px"
    qrcodeb.style.boxSizing = 'border-box'

    this.createQrcode(qrcodeWidth)

    let close: any = window.document.getElementById("close8")
    close.onclick = () => {
      this.cancel()
    }

    this.mask.onclick = () => {
      this.cancel()
    }
  }
  cancel() {
    this.time = 0
    this.outTime ? clearTimeout(this.outTime) : ''
    document.body.removeChild(this.mask);
    document.body.removeChild(this.qrcodeBox);

  }
}
