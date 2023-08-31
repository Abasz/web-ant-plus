import { AntPlusSensor } from "./AntPlusSensor";
export declare class CadenceSensor extends AntPlusSensor {
    static deviceType: number;
    wheelCircumference: number;
    setWheelCircumference(wheelCircumference: number): void;
    attachSensor(channel: number, deviceID: number): Promise<void>;
    private state?;
    protected updateState(deviceId: number, data: DataView): void;
}
