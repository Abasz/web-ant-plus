export declare class SpeedSensorState {
    constructor(deviceID: number);
    DeviceID: number;
    SpeedEventTime?: number;
    CumulativeSpeedRevolutionCount?: number;
    CalculatedDistance?: number;
    CalculatedSpeed?: number;
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
    updateState(data: DataView, wheelCircumference: number): SpeedSensorState | undefined;
}
