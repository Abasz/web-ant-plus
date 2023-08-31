import { AntPlusSensor } from "./AntPlusSensor";
export declare class BicyclePowerSensor extends AntPlusSensor {
    static deviceType: number;
    attachSensor(channel: number, deviceID: number): Promise<void>;
    private state?;
    protected updateState(deviceId: number, data: DataView): void;
}