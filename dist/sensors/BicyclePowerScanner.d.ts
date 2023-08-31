import { AntPlusScanner } from "./AntPlusScanner";
export declare class BicyclePowerScanner extends AntPlusScanner {
    protected deviceType(): number;
    private states;
    protected createStateIfNew(deviceId: number): void;
    protected updateRssiAndThreshold(deviceId: number, rssi: number, threshold: number): void;
    protected updateState(deviceId: number, data: DataView): void;
}
