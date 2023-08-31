"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#528_tab
 * Spec sheet: https://www.thisisant.com/resources/stride-based-speed-and-distance-monitor/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrideSpeedDistanceSensorState = void 0;
const Messages_1 = require("../Messages");
class StrideSpeedDistanceSensorState {
    constructor(deviceId) {
        this.DeviceID = deviceId;
    }
    updateState(data) {
        const page = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA);
        if (page === 1) {
            this.TimeFractional = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 1);
            this.TimeInteger = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 2);
            this.DistanceInteger = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 3);
            this.DistanceFractional =
                data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 4) >>> 4;
            this.SpeedInteger =
                data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 4) & 0x0f;
            this.SpeedFractional = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 5);
            this.StrideCount = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 6);
            this.UpdateLatency = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 7);
        }
        else if (page >= 2 && page <= 15) {
            this.CadenceInteger = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 3);
            this.CadenceFractional =
                data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 4) >>> 4;
            this.SpeedInteger =
                data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 4) & 0x0f;
            this.SpeedFractional = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 5);
            this.Status = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 7);
            switch (page) {
                case 3:
                    this.Calories = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 6);
                    break;
                default:
                    break;
            }
        }
        this.ReceivedAt = Date.now();
        return this;
    }
}
exports.StrideSpeedDistanceSensorState = StrideSpeedDistanceSensorState;
//# sourceMappingURL=StrideSpeedDistanceSensorState.js.map