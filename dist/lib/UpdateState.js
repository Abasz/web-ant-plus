export function updateBicyclePowerSensorState(sensor, state, data) {
    sensor.emit("powerData", state.updateState(data));
}
export function updateCadenceSensorState(sensor, state, data) {
    sensor.emit("cadenceData", state.updateState(data));
}
export function updateEnvironmentSensorState(sensor, state, data) {
    const updatedState = state.updateState(data);
    sensor.emit("envdata", updatedState);
    sensor.emit("envData", updatedState);
}
export function updateFitnessEquipmentSensorState(sensor, state, data) {
    sensor.emit("fitnessData", state.updateState(data));
}
export function resetFitnessEquipmentSensorState(state) {
    state.resetState();
}
export function updateHeartRateSensorState(sensor, state, data, page) {
    const updatedState = state.updateState(data, page);
    sensor.emit("hbdata", updatedState);
    sensor.emit("hbData", updatedState);
}
export function updateMuscleOxygenSensorState(sensor, state, data) {
    const updatedState = state.updateState(data);
    if (updatedState) {
        sensor.emit("oxygenData", updatedState);
    }
}
export function updateSpeedCadenceSensorState(sensor, state, data) {
    const { updatedState, resultType } = state.updateState(data, sensor.wheelCircumference);
    switch (resultType) {
        case "both":
            sensor.emit("cadenceData", updatedState);
            sensor.emit("speedData", updatedState);
            break;
        case "cadence":
            sensor.emit("cadenceData", updatedState);
            break;
        case "speed":
            sensor.emit("speedData", updatedState);
            break;
        default:
            break;
    }
}
export function updateSpeedSensorState(sensor, state, data) {
    const updatedState = state.updateState(data, sensor.wheelCircumference);
    if (updatedState) {
        sensor.emit("speedData", updatedState);
    }
}
export function updateStrideSpeedDistanceSensorState(sensor, state, data) {
    const updatedState = state.updateState(data);
    sensor.emit("ssddata", updatedState);
    sensor.emit("ssdData", updatedState);
}
//# sourceMappingURL=UpdateState.js.map