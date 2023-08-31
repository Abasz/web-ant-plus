"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntPlusSensor = void 0;
const Constants_1 = require("../Constants");
const Messages_1 = require("../Messages");
const AntPlusBaseSensor_1 = require("./AntPlusBaseSensor");
class AntPlusSensor extends AntPlusBaseSensor_1.AntPlusBaseSensor {
    constructor(stick) {
        super(stick);
        this.decodeDataCbk = this.decodeData.bind(this);
    }
    scan() {
        throw "scanning unsupported";
    }
    attach(props) {
        return super.attach(props);
    }
    decodeData(data) {
        switch (data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_TYPE)) {
            case Constants_1.Constants.MESSAGE_CHANNEL_BROADCAST_DATA:
            case Constants_1.Constants.MESSAGE_CHANNEL_ACKNOWLEDGED_DATA:
            case Constants_1.Constants.MESSAGE_CHANNEL_BURST_DATA:
                if (this.channel !== undefined && this.deviceID === 0) {
                    this.write(Messages_1.Messages.requestMessage(this.channel, Constants_1.Constants.MESSAGE_CHANNEL_ID));
                }
                if (this.deviceID !== undefined) {
                    this.updateState(this.deviceID, data);
                }
                break;
            case Constants_1.Constants.MESSAGE_CHANNEL_ID:
                this.deviceID = data.getUint16(Messages_1.Messages.BUFFER_INDEX_MSG_DATA, true);
                this.transmissionType = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 3);
                break;
            default:
                break;
        }
    }
}
exports.AntPlusSensor = AntPlusSensor;
//# sourceMappingURL=AntPlusSensor.js.map