import { SendCallback } from "../ant";
import { AntPlusSensor } from "./AntPlusSensor";
export declare class FitnessEquipmentSensor extends AntPlusSensor {
    static deviceType: number;
    attachSensor(channel: number, deviceID: number): Promise<void>;
    private state?;
    protected updateState(deviceId: number, data: DataView): void;
    private _setUserConfiguration;
    setUserConfiguration(cbk: SendCallback): void;
    setUserConfiguration(userWeight: number, cbk?: SendCallback): void;
    setUserConfiguration(userWeight: number, bikeWeight: number, cbk?: SendCallback): void;
    setUserConfiguration(userWeight: number, bikeWeight: number, wheelDiameter: number, cbk?: SendCallback): void;
    setUserConfiguration(userWeight: number, bikeWeight: number, wheelDiameter: number, gearRatio: number, cbk?: SendCallback): void;
    setBasicResistance(resistance: number, cbk?: SendCallback): void;
    setTargetPower(power: number, cbk?: SendCallback): void;
    private _setWindResistance;
    setWindResistance(cbk: SendCallback): void;
    setWindResistance(windCoeff: number, cbk?: SendCallback): void;
    setWindResistance(windCoeff: number, windSpeed: number, cbk?: SendCallback): void;
    setWindResistance(windCoeff: number, windSpeed: number, draftFactor: number, cbk?: SendCallback): void;
    private _setTrackResistance;
    setTrackResistance(cbk: SendCallback): void;
    setTrackResistance(slope: number, cbk?: SendCallback): void;
    setTrackResistance(slope: number, rollingResistanceCoeff: number, cbk?: SendCallback): void;
}
