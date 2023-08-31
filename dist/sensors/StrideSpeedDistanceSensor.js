"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#528_tab
 * Spec sheet: https://www.thisisant.com/resources/stride-based-speed-and-distance-monitor/
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrideSpeedDistanceSensor = void 0;
const UpdateState_1 = require("../lib/UpdateState");
const AntPlusSensor_1 = require("./AntPlusSensor");
const StrideSpeedDistanceSensorState_1 = require("./StrideSpeedDistanceSensorState");
class StrideSpeedDistanceSensor extends AntPlusSensor_1.AntPlusSensor {
    attachSensor(channel, deviceID) {
        const _super = Object.create(null, {
            attach: { get: () => super.attach }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.attach.call(this, {
                channel,
                type: "receive",
                deviceID,
                deviceType: StrideSpeedDistanceSensor.deviceType,
                transmissionType: 0,
                timeout: 255,
                period: 8134
            });
            this.state = new StrideSpeedDistanceSensorState_1.StrideSpeedDistanceSensorState(deviceID);
        });
    }
    updateState(deviceId, data) {
        if (!this.state) {
            throw new Error("StrideSpeedDistanceSensor: not attached");
        }
        this.state.DeviceID = deviceId;
        (0, UpdateState_1.updateStrideSpeedDistanceSensorState)(this, this.state, data);
    }
}
exports.StrideSpeedDistanceSensor = StrideSpeedDistanceSensor;
StrideSpeedDistanceSensor.deviceType = 124;
//# sourceMappingURL=StrideSpeedDistanceSensor.js.map