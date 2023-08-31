export declare class StrideSpeedDistanceSensorState {
    constructor(deviceId: number);
    DeviceID: number;
    TimeFractional?: number;
    TimeInteger?: number;
    DistanceInteger?: number;
    DistanceFractional?: number;
    SpeedInteger?: number;
    SpeedFractional?: number;
    StrideCount?: number;
    UpdateLatency?: number;
    CadenceInteger?: number;
    CadenceFractional?: number;
    Status?: number;
    Calories?: number;
    ReceivedAt?: number;
    updateState(data: DataView): StrideSpeedDistanceSensorState;
}
