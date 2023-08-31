"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStrideSpeedDistanceSensorState = exports.updateSpeedSensorState = exports.updateSpeedCadenceSensorState = exports.updateMuscleOxygenSensorState = exports.updateHeartRateSensorState = exports.resetFitnessEquipmentSensorState = exports.updateFitnessEquipmentSensorState = exports.updateEnvironmentSensorState = exports.updateCadenceSensorState = exports.updateBicyclePowerSensorState = void 0;
function updateBicyclePowerSensorState(sensor, state, data) {
    sensor.emit("powerData", state.updateState(data));
}
exports.updateBicyclePowerSensorState = updateBicyclePowerSensorState;
function updateCadenceSensorState(sensor, state, data) {
    sensor.emit("cadenceData", state.updateState(data));
}
exports.updateCadenceSensorState = updateCadenceSensorState;
function updateEnvironmentSensorState(sensor, state, data) {
    const updatedState = state.updateState(data);
    sensor.emit("envdata", updatedState);
    sensor.emit("envData", updatedState);
}
exports.updateEnvironmentSensorState = updateEnvironmentSensorState;
function updateFitnessEquipmentSensorState(sensor, state, data) {
    sensor.emit("fitnessData", state.updateState(data));
}
exports.updateFitnessEquipmentSensorState = updateFitnessEquipmentSensorState;
function resetFitnessEquipmentSensorState(state) {
    state.resetState();
}
exports.resetFitnessEquipmentSensorState = resetFitnessEquipmentSensorState;
function updateHeartRateSensorState(sensor, state, data, page) {
    const updatedState = state.updateState(data, page);
    sensor.emit("hbdata", updatedState);
    sensor.emit("hbData", updatedState);
}
exports.updateHeartRateSensorState = updateHeartRateSensorState;
function updateMuscleOxygenSensorState(sensor, state, data) {
    const updatedState = state.updateState(data);
    if (updatedState) {
        sensor.emit("oxygenData", updatedState);
    }
}
exports.updateMuscleOxygenSensorState = updateMuscleOxygenSensorState;
function updateSpeedCadenceSensorState(sensor, state, data) {
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
exports.updateSpeedCadenceSensorState = updateSpeedCadenceSensorState;
function updateSpeedSensorState(sensor, state, data) {
    const updatedState = state.updateState(data, sensor.wheelCircumference);
    if (updatedState) {
        sensor.emit("speedData", updatedState);
    }
}
exports.updateSpeedSensorState = updateSpeedSensorState;
function updateStrideSpeedDistanceSensorState(sensor, state, data) {
    const updatedState = state.updateState(data);
    sensor.emit("ssddata", updatedState);
    sensor.emit("ssdData", updatedState);
}
exports.updateStrideSpeedDistanceSensorState = updateStrideSpeedDistanceSensorState;
//# sourceMappingURL=UpdateState.js.map