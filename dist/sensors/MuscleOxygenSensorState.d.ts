export declare class MuscleOxygenSensorState {
    constructor(deviceID: number);
    _EventCount?: number;
    DeviceID: number;
    UTCTimeRequired?: boolean;
    SupportANTFS?: boolean;
    MeasurementInterval?: 0.25 | 0.5 | 1 | 2;
    TotalHemoglobinConcentration?: number | "AmbientLightTooHigh" | "Invalid";
    PreviousSaturatedHemoglobinPercentage?: number | "AmbientLightTooHigh" | "Invalid";
    CurrentSaturatedHemoglobinPercentage?: number | "AmbientLightTooHigh" | "Invalid";
    HwVersion?: number;
    ManId?: number;
    ModelNum?: number;
    SwVersion?: number;
    SerialNumber?: number;
    OperatingTime?: number;
    BatteryId?: number;
    BatteryVoltage?: number;
    BatteryStatus?: "New" | "Good" | "Ok" | "Low" | "Critical" | "Invalid";
    ReceivedAt?: number;
    updateState(data: DataView): MuscleOxygenSensorState | undefined;
}