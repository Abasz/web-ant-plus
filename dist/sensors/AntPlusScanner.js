import { Constants } from "../Constants";
import { Messages } from "../Messages";
import { AntPlusBaseSensor } from "./AntPlusBaseSensor";
export class AntPlusScanner extends AntPlusBaseSensor {
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
        if (data.byteLength <= Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 3 ||
            !(data.getUint8(Messages.BUFFER_INDEX_EXT_MSG_BEGIN) & 0x80)) {
            console.warn("wrong message format", data.buffer);
            return;
        }
        const deviceId = data.getUint16(Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 1, true);
        const deviceType = data.getUint8(Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 3);
        if (deviceType !== this.deviceType()) {
            return;
        }
        this.createStateIfNew(deviceId);
        if (data.getUint8(Messages.BUFFER_INDEX_EXT_MSG_BEGIN) & 0x40) {
            if (data.getUint8(Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 5) === 0x20) {
                this.updateRssiAndThreshold(deviceId, data.getInt8(Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 6), data.getInt8(Messages.BUFFER_INDEX_EXT_MSG_BEGIN + 7));
            }
        }
        switch (data.getUint8(Messages.BUFFER_INDEX_MSG_TYPE)) {
            case Constants.MESSAGE_CHANNEL_BROADCAST_DATA:
            case Constants.MESSAGE_CHANNEL_ACKNOWLEDGED_DATA:
            case Constants.MESSAGE_CHANNEL_BURST_DATA:
                this.updateState(deviceId, data);
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=AntPlusScanner.js.map