export declare class SpeedCadenceSensorState {
    constructor(deviceID: number);
    DeviceID: number;
    CadenceEventTime?: number;
    CumulativeCadenceRevolutionCount?: number;
    SpeedEventTime?: number;
    CumulativeSpeedRevolutionCount?: number;
    CalculatedCadence?: number;
    CalculatedDistance?: number;
    CalculatedSpeed?: number;
    ReceivedAt?: number;
    updateState(data: DataView, wheelCircumference: number): {
        updatedState: SpeedCadenceSensorState;
        resultType: "cadence" | "speed" | "both" | "none";
    };
}
