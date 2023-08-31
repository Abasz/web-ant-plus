"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#2343_tab
 * Spec sheet: https://www.thisisant.com/resources/ant-device-profile-muscle-oxygen/
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
exports.MuscleOxygenSensor = void 0;
const UpdateState_1 = require("../lib/UpdateState");
const Messages_1 = require("../Messages");
const AntPlusSensor_1 = require("./AntPlusSensor");
const MuscleOxygenSensorState_1 = require("./MuscleOxygenSensorState");
class MuscleOxygenSensor extends AntPlusSensor_1.AntPlusSensor {
    attachSensor(channel, deviceID) {
        const _super = Object.create(null, {
            attach: { get: () => super.attach }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.attach.call(this, {
                channel,
                type: "receive",
                deviceID,
                deviceType: MuscleOxygenSensor.deviceType,
                transmissionType: 0,
                timeout: 255,
                period: 8192
            });
            this.state = new MuscleOxygenSensorState_1.MuscleOxygenSensorState(deviceID);
        });
    }
    updateState(deviceId, data) {
        if (!this.state) {
            throw new Error("MuscleOxygenSensor: not attached");
        }
        this.state.DeviceID = deviceId;
        (0, UpdateState_1.updateMuscleOxygenSensorState)(this, this.state, data);
    }
    _sendTimeCmd(cmd, cbk) {
        if (this.channel === undefined) {
            throw new Error("MuscleOxygenSensor: not attached");
        }
        const now = new Date();
        const utc = Math.round((now.getTime() - Date.UTC(1989, 11, 31, 0, 0, 0, 0)) / 1000);
        const offset = -Math.round(now.getTimezoneOffset() / 15);
        const payload = [
            0x10,
            cmd & 0xff,
            0xff,
            offset & 0xff,
            (utc >> 0) & 0xff,
            (utc >> 8) & 0xff,
            (utc >> 16) & 0xff,
            (utc >> 24) & 0xff
        ];
        const msg = Messages_1.Messages.acknowledgedData(this.channel, payload);
        this.send(msg, cbk);
    }
    setUTCTime(cbk) {
        this._sendTimeCmd(0x00, cbk);
    }
    startSession(cbk) {
        this._sendTimeCmd(0x01, cbk);
    }
    stopSession(cbk) {
        this._sendTimeCmd(0x02, cbk);
    }
    setLap(cbk) {
        this._sendTimeCmd(0x03, cbk);
    }
}
exports.MuscleOxygenSensor = MuscleOxygenSensor;
MuscleOxygenSensor.deviceType = 0x1f;
//# sourceMappingURL=MuscleOxygenSensor.js.map