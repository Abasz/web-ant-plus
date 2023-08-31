"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#523_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-speed/
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
exports.SpeedSensor = void 0;
const UpdateState_1 = require("../lib/UpdateState");
const AntPlusSensor_1 = require("./AntPlusSensor");
const SpeedSensorState_1 = require("./SpeedSensorState");
class SpeedSensor extends AntPlusSensor_1.AntPlusSensor {
    constructor() {
        super(...arguments);
        this.wheelCircumference = 2.199; // default 70cm wheel
    }
    setWheelCircumference(wheelCircumference) {
        this.wheelCircumference = wheelCircumference;
    }
    attachSensor(channel, deviceID) {
        const _super = Object.create(null, {
            attach: { get: () => super.attach }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.attach.call(this, {
                channel,
                type: "receive",
                deviceID,
                deviceType: SpeedSensor.deviceType,
                transmissionType: 0,
                timeout: 255,
                period: 8086
            });
            this.state = new SpeedSensorState_1.SpeedSensorState(deviceID);
        });
    }
    updateState(deviceId, data) {
        if (!this.state) {
            throw new Error("SpeedSensor: not attached");
        }
        this.state.DeviceID = deviceId;
        (0, UpdateState_1.updateSpeedSensorState)(this, this.state, data);
    }
}
exports.SpeedSensor = SpeedSensor;
SpeedSensor.deviceType = 0x7b;
//# sourceMappingURL=SpeedSensor.js.map