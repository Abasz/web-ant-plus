"use strict";
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
exports.BaseSensor = void 0;
const Constants_1 = require("../Constants");
const EventEmitter_1 = require("../lib/EventEmitter");
const Messages_1 = require("../Messages");
class BaseSensor extends EventEmitter_1.EventEmitter {
    constructor(stick) {
        super();
        this.stick = stick;
        this.msgQueue = [];
        stick.on("read", this.handleEventMessages.bind(this));
    }
    scan(type, frequency) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel !== undefined) {
                throw "already attached";
            }
            if (!this.stick.canScan) {
                throw "stick cannot scan";
            }
            const channel = 0;
            const mc = this.msgQueue.shift();
            const onStatus = (status) => __awaiter(this, void 0, void 0, function* () {
                switch (status.msg) {
                    case Constants_1.Constants.MESSAGE_RF:
                        switch (status.code) {
                            case Constants_1.Constants.EVENT_CHANNEL_CLOSED:
                            case Constants_1.Constants.EVENT_RX_FAIL_GO_TO_SEARCH:
                                yield this.write(Messages_1.Messages.unassignChannel(channel));
                                return true;
                            case Constants_1.Constants.EVENT_TRANSFER_TX_COMPLETED:
                            case Constants_1.Constants.EVENT_TRANSFER_TX_FAILED:
                            case Constants_1.Constants.EVENT_RX_FAIL:
                            case Constants_1.Constants.INVALID_SCAN_TX_CHANNEL:
                                if (mc && mc.cbk) {
                                    mc.cbk(status.code === Constants_1.Constants.EVENT_TRANSFER_TX_COMPLETED);
                                }
                                if (this.msgQueue.length) {
                                    yield this.write(this.msgQueue[0].msg);
                                }
                                return true;
                            default:
                                break;
                        }
                        break;
                    case Constants_1.Constants.MESSAGE_CHANNEL_ASSIGN:
                        yield this.write(Messages_1.Messages.setDevice(channel, 0, 0, 0));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_ID:
                        yield this.write(Messages_1.Messages.setFrequency(channel, frequency));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_FREQUENCY:
                        yield this.write(Messages_1.Messages.setRxExt());
                        return true;
                    case Constants_1.Constants.MESSAGE_ENABLE_RX_EXT:
                        yield this.write(Messages_1.Messages.libConfig(channel, 0xe0));
                        return true;
                    case Constants_1.Constants.MESSAGE_LIB_CONFIG:
                        yield this.write(Messages_1.Messages.openRxScan());
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_OPEN_RX_SCAN:
                        queueMicrotask(() => this.emit("attached"));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_CLOSE:
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_UNASSIGN:
                        this.statusCbk = undefined;
                        this.channel = undefined;
                        queueMicrotask(() => this.emit("detached"));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_ACKNOWLEDGED_DATA:
                        return status.code === Constants_1.Constants.TRANSFER_IN_PROGRESS;
                    default:
                        break;
                }
                return false;
            });
            if (this.stick.isScanning()) {
                this.channel = channel;
                this.deviceID = 0;
                this.transmissionType = 0;
                this.statusCbk = onStatus;
                queueMicrotask(() => this.emit("attached"));
            }
            else if (this.stick.attach(this, true)) {
                this.channel = channel;
                this.deviceID = 0;
                this.transmissionType = 0;
                this.statusCbk = onStatus;
                yield this.write(Messages_1.Messages.assignChannel(channel, type));
            }
            else {
                throw "cannot attach";
            }
        });
    }
    attach(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { channel, deviceID, type, deviceType, transmissionType, timeout, period, frequency } = props;
            if (this.channel !== undefined) {
                throw "already attached";
            }
            if (!this.stick.attach(this, false)) {
                throw "cannot attach";
            }
            this.channel = channel;
            this.deviceID = deviceID;
            this.transmissionType = transmissionType;
            const mc = this.msgQueue.shift();
            const onStatus = (status) => __awaiter(this, void 0, void 0, function* () {
                switch (status.msg) {
                    case Constants_1.Constants.MESSAGE_RF:
                        switch (status.code) {
                            case Constants_1.Constants.EVENT_CHANNEL_CLOSED:
                            case Constants_1.Constants.EVENT_RX_FAIL_GO_TO_SEARCH:
                                yield this.write(Messages_1.Messages.unassignChannel(channel));
                                return true;
                            case Constants_1.Constants.EVENT_TRANSFER_TX_COMPLETED:
                            case Constants_1.Constants.EVENT_TRANSFER_TX_FAILED:
                            case Constants_1.Constants.EVENT_RX_FAIL:
                            case Constants_1.Constants.INVALID_SCAN_TX_CHANNEL:
                                if (mc && mc.cbk) {
                                    mc.cbk(status.code === Constants_1.Constants.EVENT_TRANSFER_TX_COMPLETED);
                                }
                                if (this.msgQueue.length) {
                                    yield this.write(this.msgQueue[0].msg);
                                }
                                return true;
                            default:
                                break;
                        }
                        break;
                    case Constants_1.Constants.MESSAGE_CHANNEL_ASSIGN:
                        if (deviceType === undefined) {
                            throw "deviceType required";
                        }
                        if (transmissionType === undefined) {
                            throw "transmissionType required";
                        }
                        yield this.write(Messages_1.Messages.setDevice(channel, deviceID, deviceType, transmissionType));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_ID:
                        if (timeout === undefined) {
                            throw "timeout required";
                        }
                        yield this.write(Messages_1.Messages.searchChannel(channel, timeout));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_SEARCH_TIMEOUT:
                        yield this.write(Messages_1.Messages.setFrequency(channel, frequency));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_FREQUENCY:
                        if (period === undefined) {
                            throw "period required";
                        }
                        yield this.write(Messages_1.Messages.setPeriod(channel, period));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_PERIOD:
                        yield this.write(Messages_1.Messages.libConfig(channel, 0xe0));
                        return true;
                    case Constants_1.Constants.MESSAGE_LIB_CONFIG:
                        yield this.write(Messages_1.Messages.openChannel(channel));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_OPEN:
                        queueMicrotask(() => this.emit("attached"));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_CLOSE:
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_UNASSIGN:
                        this.statusCbk = undefined;
                        this.channel = undefined;
                        queueMicrotask(() => this.emit("detached"));
                        return true;
                    case Constants_1.Constants.MESSAGE_CHANNEL_ACKNOWLEDGED_DATA:
                        return status.code === Constants_1.Constants.TRANSFER_IN_PROGRESS;
                    default:
                        break;
                }
                return false;
            });
            this.statusCbk = onStatus;
            yield this.write(Messages_1.Messages.assignChannel(channel, type));
        });
    }
    detach() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channel === undefined) {
                return;
            }
            yield this.write(Messages_1.Messages.closeChannel(this.channel));
            if (!this.stick.detach(this)) {
                throw "error detaching";
            }
            this.channel = undefined;
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stick.write(data);
        });
    }
    handleEventMessages(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageID = data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_TYPE);
            const channel = data.getUint8(Messages_1.Messages.BUFFER_INDEX_CHANNEL_NUM);
            if (channel === this.channel) {
                if (messageID === Constants_1.Constants.MESSAGE_CHANNEL_EVENT) {
                    const status = {
                        msg: data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA),
                        code: data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 1)
                    };
                    const handled = this.statusCbk && (yield this.statusCbk(status));
                    if (!handled) {
                        this.emit("eventData", {
                            message: data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA),
                            code: data.getUint8(Messages_1.Messages.BUFFER_INDEX_MSG_DATA + 1)
                        });
                    }
                }
                else if (this.decodeDataCbk) {
                    this.decodeDataCbk(data);
                }
            }
        });
    }
    send(data, cbk) {
        return __awaiter(this, void 0, void 0, function* () {
            this.msgQueue.push({ msg: data, cbk });
            if (this.msgQueue.length === 1) {
                yield this.write(data);
            }
        });
    }
}
exports.BaseSensor = BaseSensor;
//# sourceMappingURL=BaseSensor.js.map