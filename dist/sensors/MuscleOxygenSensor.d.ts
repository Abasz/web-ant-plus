import { SendCallback } from "../ant";
import { AntPlusSensor } from "./AntPlusSensor";
export declare class MuscleOxygenSensor extends AntPlusSensor {
    static deviceType: number;
    attachSensor(channel: number, deviceID: number): Promise<void>;
    private state?;
    protected updateState(deviceId: number, data: DataView): void;
    private _sendTimeCmd;
    setUTCTime(cbk?: SendCallback): void;
    startSession(cbk?: SendCallback): void;
    stopSession(cbk?: SendCallback): void;
    setLap(cbk?: SendCallback): void;
}
