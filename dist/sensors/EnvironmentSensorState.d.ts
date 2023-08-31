export declare class EnvironmentSensorState {
    constructor(deviceId: number);
    DeviceID: number;
    EventCount?: number;
    Temperature?: number;
    ReceivedAt?: number;
    updateState(data: DataView): EnvironmentSensorState;
}
