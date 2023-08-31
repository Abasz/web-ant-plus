import { GarminStick2 } from "../GarminStick2";
import { GarminStick3 } from "../GarminStick3";
import { AntPlusBaseSensor } from "./AntPlusBaseSensor";
export declare abstract class AntPlusScanner extends AntPlusBaseSensor {
    protected abstract deviceType(): number;
    protected abstract createStateIfNew(deviceId: number): void;
    protected abstract updateRssiAndThreshold(deviceId: number, rssi: number, threshold: number): void;
    constructor(stick: GarminStick2 | GarminStick3);
    scan(): Promise<void>;
    protected attach(): Promise<void>;
    protected send(): Promise<void>;
    private decodeData;
}
