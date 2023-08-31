export declare class Messages {
    static BUFFER_INDEX_MSG_LEN: number;
    static BUFFER_INDEX_MSG_TYPE: number;
    static BUFFER_INDEX_CHANNEL_NUM: number;
    static BUFFER_INDEX_MSG_DATA: number;
    static BUFFER_INDEX_EXT_MSG_BEGIN: number;
    static resetSystem(): DataView;
    static requestMessage(channel: number, messageID: number): DataView;
    static setNetworkKey(): DataView;
    static assignChannel(channel: number, type?: string): DataView;
    static setDevice(channel: number, deviceID: number, deviceType: number, transmissionType: number): DataView;
    static searchChannel(channel: number, timeout: number): DataView;
    static setPeriod(channel: number, period: number): DataView;
    static setFrequency(channel: number, frequency: number): DataView;
    static setRxExt(): DataView;
    static libConfig(channel: number, how: number): DataView;
    static openRxScan(): DataView;
    static openChannel(channel: number): DataView;
    static closeChannel(channel: number): DataView;
    static unassignChannel(channel: number): DataView;
    static acknowledgedData(channel: number, payload: number[]): DataView;
    static broadcastData(channel: number, payload: number[]): DataView;
    static buildMessage(payload?: number[], msgID?: number): DataView;
    static intToLEHexArray(int: number, numBytes?: number): number[];
    static decimalToHex(d: number, numDigits: number): string;
    static getChecksum(message: any[]): number;
}
