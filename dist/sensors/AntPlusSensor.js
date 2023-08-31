import { Constants } from "../Constants";
import { Messages } from "../Messages";
import { AntPlusBaseSensor } from "./AntPlusBaseSensor";
export class AntPlusSensor extends AntPlusBaseSensor {
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
        switch (data.getUint8(Messages.BUFFER_INDEX_MSG_TYPE)) {
            case Constants.MESSAGE_CHANNEL_BROADCAST_DATA:
            case Constants.MESSAGE_CHANNEL_ACKNOWLEDGED_DATA:
            case Constants.MESSAGE_CHANNEL_BURST_DATA:
                if (this.channel !== undefined && this.deviceID === 0) {
                    this.write(Messages.requestMessage(this.channel, Constants.MESSAGE_CHANNEL_ID));
                }
                if (this.deviceID !== undefined) {
                    this.updateState(this.deviceID, data);
                }
                break;
            case Constants.MESSAGE_CHANNEL_ID:
                this.deviceID = data.getUint16(Messages.BUFFER_INDEX_MSG_DATA, true);
                this.transmissionType = data.getUint8(Messages.BUFFER_INDEX_MSG_DATA + 3);
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=AntPlusSensor.js.map