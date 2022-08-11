export declare class NotoMobile {
    close: Function;
    $on(key: string, callBack: Function): void;
    mask: any;
    qrcodeBox: any;
    id: string;
    qrCode: string;
    width: number;
    time: number;
    outTime: any;
    constructor(qrData: any);
    loop(): void;
    setCloseStyle(): void;
    createQrcode(w: number): void;
    show(): void;
    cancel(): void;
}
