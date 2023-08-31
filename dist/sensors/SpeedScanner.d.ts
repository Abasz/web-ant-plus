import { AntPlusScanner } from "./AntPlusScanner";
export declare class SpeedScanner extends AntPlusScanner {
    protected deviceType(): number;
    wheelCircumference: number;
    setWheelCircumference(wheelCircumference: number): void;
    private states;
    protected createStateIfNew(deviceId: number): void;
    protected updateRssiAndThreshold(deviceId: number, rssi: number | undefined, threshold: number | undefined): void;
    protected updateState(deviceId: number, data: DataView): void;
}
