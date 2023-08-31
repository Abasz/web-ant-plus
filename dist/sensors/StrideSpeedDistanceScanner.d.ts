import { AntPlusScanner } from "./AntPlusScanner";
export declare class StrideSpeedDistanceScanner extends AntPlusScanner {
    protected deviceType(): number;
    private states;
    protected createStateIfNew(deviceId: number): void;
    protected updateRssiAndThreshold(deviceId: number, rssi: number | undefined, threshold: number | undefined): void;
    protected updateState(deviceId: number, data: DataView): void;
}
