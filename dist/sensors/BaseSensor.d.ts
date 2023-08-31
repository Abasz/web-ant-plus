import { SendCallback } from "../ant";
import { EventEmitter } from "../lib/EventEmitter";
import { USBDriver } from "../USBDriver";
export type AttachProps = {
    channel: number;
    deviceID: number;
    type?: string;
    deviceType?: number;
    transmissionType?: number;
    timeout?: number;
    period?: number;
};
export declare abstract class BaseSensor extends EventEmitter {
    private stick;
    channel: number | undefined;
    deviceID: number | undefined;
    transmissionType: number | undefined;
    private msgQueue;
    protected decodeDataCbk: ((data: DataView) => void) | undefined;
    protected statusCbk: ((status: {
        msg: number;
        code: number;
    }) => Promise<boolean>) | undefined;
    protected abstract updateState(deviceId: number, data: DataView): void;
    constructor(stick: USBDriver);
    protected scan(type: string, frequency: number): Promise<void>;
    protected attach(props: AttachProps & {
        frequency: number;
    }): Promise<void>;
    detach(): Promise<void>;
    protected write(data: DataView): Promise<void>;
    private handleEventMessages;
    protected send(data: DataView, cbk?: SendCallback): Promise<void>;
}
