import { AntPlusSensor } from "./AntPlusSensor";
export declare class EnvironmentSensor extends AntPlusSensor {
    static deviceType: number;
    attachSensor(channel: any, deviceID: number): Promise<void>;
    private state?;
    protected updateState(deviceId: number, data: DataView): void;
}
