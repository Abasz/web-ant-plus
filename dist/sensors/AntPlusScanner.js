"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntPlusScanner = void 0;
const Constants_1 = require("../Constants");
const Messages_1 = require("../Messages");
const AntPlusBaseSensor_1 = require("./AntPlusBaseSensor");
class AntPlusScanner extends AntPlusBaseSensor_1.AntPlusBaseSensor {
    constructor(stick) {
        super(stick);
        this.decodeDataCbk = this.decodeData.bind(this);
    }
    scan() {
        return super.scan("receive");
    }
    attach() {
        throw new Error("attach unsupported");
    }
    send() {
        throw new Error("send unsupported");
    }
    decodeData(data) {
        if (data.byteLength <= Messages_1.Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 3 ||
            !(data.getUint8(Messages_1.Messages.BUFFER_INDEX_EXT_MSG_BEGIN) & 0x80)) {
            console.warn("wrong message format", data.buffer);
            return;
        }
        const deviceId = data.getUint16(Messages_1.Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 1, true);
        const deviceType = data.getUint8(Messages_1.Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 3);
        if (deviceType !== this.deviceType()) {
            return;
        }
        this.createStateIfNew(deviceId);
        if (data.getUint8(Messages_1.Messages.BUFFER_INDEX_EXT_MSG_BEGIN) & 0x40) {
            if (data.getUint8(Messages_1.Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 5) === 0x20) {
                this.updateRssiAndThreshold(deviceId, data.getInt8(Messages_1.Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 6), data.getInt8(Messages_1.Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 7));
            }
        }
        switch (data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_TYPE)) {
            case Constants_1.Constants.MESSAGE_CHANNEL_BROADCAST_DATA:
            case Constants_1.Constants.MESSAGE_CHANNEL_ACKNOWLEDGED_DATA:
            case Constants_1.Constants.MESSAGE_CHANNEL_BURST_DATA:
                this.updateState(deviceId, data);
                break;
            default:
                break;
        }
    }
}
exports.AntPlusScanner = AntPlusScanner;
//# sourceMappingURL=AntPlusScanner.js.map