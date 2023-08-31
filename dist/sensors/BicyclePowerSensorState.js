"use strict";
/*
 * ANT+ profile: https://www.thisisant.com/developer/ant-plus/device-profiles/#521_tab
 * Spec sheet: https://www.thisisant.com/resources/bicycle-power/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicyclePowerSensorState = void 0;
const Messages_1 = require("../Messages");
class BicyclePowerSensorState {
    constructor(deviceID) {
        this.offset = 0;
        this.DeviceID = deviceID;
    }
    updateState(data) {
        const page = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA);
        switch (page) {
            case 0x01: {
                const calID = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 1);
                if (calID === 0x10) {
                    const calParam = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 2);
                    if (calParam === 0x01) {
                        this.offset = data.getUint16(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 6, true);
                    }
                }
                break;
            }
            case 0x10: {
                const pedalPower = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 2);
                if (pedalPower !== 0xff) {
                    if (pedalPower & 0x80) {
                        this.PedalPower = pedalPower & 0x7f;
                        this.RightPedalPower = this.PedalPower;
                        this.LeftPedalPower = 100 - this.RightPedalPower;
                    }
                    else {
                        this.PedalPower = pedalPower & 0x7f;
                        this.RightPedalPower = undefined;
                        this.LeftPedalPower = undefined;
                    }
                }
                else {
                    this.PedalPower = undefined;
                    this.RightPedalPower = undefined;
                    this.LeftPedalPower = undefined;
                }
                const cadence = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 3);
                if (cadence !== 0xff) {
                    this.Cadence = cadence;
                }
                else {
                    this.Cadence = undefined;
                }
                this.AccumulatedPower = data.getUint16(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 4, true);
                this.Power = data.getUint16(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 6, true);
                break;
            }
            case 0x20: {
                const oldEventCount = this.EventCount;
                const oldTimeStamp = this.TimeStamp;
                const oldTorqueTicksStamp = this.TorqueTicksStamp;
                let eventCount = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 1);
                const slope = data.getUint16(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 3, true);
                let timeStamp = data.getUint16(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 5, true);
                let torqueTicksStamp = data.getUint16(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 7, true);
                if (timeStamp !== oldTimeStamp && eventCount !== oldEventCount) {
                    this.EventCount = eventCount;
                    if (oldEventCount && oldEventCount > eventCount) {
                        // Hit rollover value
                        eventCount += 255;
                    }
                    this.TimeStamp = timeStamp;
                    if (oldTimeStamp && oldTimeStamp > timeStamp) {
                        // Hit rollover value
                        timeStamp += 65400;
                    }
                    this.Slope = slope;
                    this.TorqueTicksStamp = torqueTicksStamp;
                    if (oldTorqueTicksStamp && oldTorqueTicksStamp > torqueTicksStamp) {
                        // Hit rollover value
                        torqueTicksStamp += 65535;
                    }
                    const elapsedTime = (timeStamp - (oldTimeStamp || 0)) * 0.0005;
                    const torqueTicks = torqueTicksStamp - (oldTorqueTicksStamp || 0);
                    const cadencePeriod = elapsedTime / (eventCount - (oldEventCount || 0)); // s
                    const cadence = Math.round(60 / cadencePeriod); // rpm
                    this.CalculatedCadence = cadence;
                    const torqueFrequency = 1 / (elapsedTime / torqueTicks) - this.offset; // Hz
                    const torque = torqueFrequency / (slope / 10); // Nm
                    this.CalculatedTorque = torque;
                    this.CalculatedPower = (torque * cadence * Math.PI) / 30; // Watts
                }
                break;
            }
            default:
        }
        this.ReceivedAt = Date.now();
        return this;
    }
}
exports.BicyclePowerSensorState = BicyclePowerSensorState;
//# sourceMappingURL=BicyclePowerSensorState.js.map