import { AntPlusSensor } from "./AntPlusSensor";
export declare class HeartRateSensor extends AntPlusSensor {
    static deviceType: number;
    attachSensor(channel: number, deviceID: number): Promise<void>;
    private state?;
    private page;
    protected updateState(deviceId: number, data: DataView): void;
}
