import { Page } from "../ant";
export declare class HeartRateSensorState {
    constructor(deviceId: number);
    DeviceID: number;
    BeatTime?: number;
    BeatCount?: number;
    ComputedHeartRate?: number;
    OperatingTime?: number;
    ManId?: number;
    SerialNumber?: number;
    HwVersion?: number;
    SwVersion?: number;
    ModelNum?: number;
    PreviousBeat?: number;
    IntervalAverage?: number;
    IntervalMax?: number;
    SessionAverage?: number;
    SupportedFeatures?: number;
    EnabledFeatures?: number;
    BatteryLevel?: number;
    BatteryVoltage?: number;
    BatteryStatus?: "New" | "Good" | "Ok" | "Low" | "Critical" | "Invalid";
    ReceivedAt?: number;
    updateState(data: DataView, page: Page): HeartRateSensorState;
    private decodeDefaultHRM;
}
