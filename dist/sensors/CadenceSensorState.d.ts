export declare class CadenceSensorState {
    constructor(deviceID: number);
    DeviceID: number;
    CadenceEventTime?: number;
    CumulativeCadenceRevolutionCount?: number;
    CalculatedCadence?: number;
    OperatingTime?: number;
    ManId?: number;
    SerialNumber?: number;
    HwVersion?: number;
    SwVersion?: number;
    ModelNum?: number;
    BatteryVoltage?: number;
    BatteryStatus?: "New" | "Good" | "Ok" | "Low" | "Critical" | "Invalid";
    Motion?: boolean;
    ReceivedAt?: number;
    updateState(data: DataView): CadenceSensorState;
}
