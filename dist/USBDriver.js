var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Constants } from "./Constants";
import { CancellationError, CancellationToken } from "./ICancellationToken";
import { EventEmitter } from "./lib/EventEmitter";
import { Messages } from "./Messages";
export class USBDriver extends EventEmitter {
    constructor(vendorId, productId) {
        super();
        this.vendorId = vendorId;
        this.productId = productId;
        this.deviceInUse = [];
        this.attachedSensors = [];
        this.usedChannels = 0;
        this.readInCancellationToken = new CancellationToken();
        this.maxChannels = 0;
        this.canScan = false;
        this.setMaxListeners(50);
    }
    /** Creates a USBDriver instance from an already paired (and permitted) device
     * @Note If more than one ANT+ stick was paired the USBDriver instance will be created from the first one.
     */
    static createFromPairedDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const device = (_a = (yield this.getPairedDevices())) === null || _a === void 0 ? void 0 : _a[0];
            if (device !== undefined) {
                const driverInstance = new USBDriver(device.vendorId, device.productId);
                driverInstance.device = device;
                return driverInstance;
            }
            return undefined;
        });
    }
    /** Starts the paring process by opening the dialog box, once USBDevice is connected it will return a USBDriver instance
     * @Note This method filters the usb devices shown in the dialog box i.e. only ANT+ sticks will be shown.
     */
    static createFromNewDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield navigator.usb.requestDevice({
                filters: this.supportedDevices.map((supportedDevice) => ({
                    vendorId: supportedDevice.vendor,
                    productId: supportedDevice.product
                }))
            });
            const driverInstance = new USBDriver(device.vendorId, device.productId);
            driverInstance.device = device;
            return driverInstance;
        });
    }
    /** Creates a USBDriver instance from the specified USBDevice
     * @Note This method does not check if the provided USBDevice is in fact an ANT+ stick.
     */
    static createFromDevice(device) {
        const driverInstance = new USBDriver(device.vendorId, device.productId);
        driverInstance.device = device;
        return driverInstance;
    }
    /** Gets an array of ANT+ usb sticks that has been previously paired and hence have permission to connect (if any) */
    static getPairedDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield navigator.usb.getDevices();
            return devices.filter((device) => ((device.vendorId === this.supportedDevices[0].vendor ||
                device.vendorId === this.supportedDevices[1].vendor) &&
                device.productId === this.supportedDevices[0].product) ||
                device.productId === this.supportedDevices[1].product);
        });
    }
    getDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield navigator.usb.requestDevice({
                filters: [{ vendorId: this.vendorId, productId: this.productId }]
            });
            return device;
        });
    }
    is_present() {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield this.getDevice();
            return device !== undefined;
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            if (this.device === undefined) {
                this.device = yield this.getDevice();
            }
            try {
                if (this.device === undefined) {
                    throw new Error("No device found");
                }
                yield this.device.open();
                if (((_a = this.device.configuration) === null || _a === void 0 ? void 0 : _a.interfaces[0]) === undefined) {
                    throw new Error("No interface found");
                }
                this.interface = (_b = this.device.configuration) === null || _b === void 0 ? void 0 : _b.interfaces[0];
                yield this.device.claimInterface(this.interface.interfaceNumber);
            }
            catch (err) {
                throw err;
            }
            this.deviceInUse.push(this.device);
            this.inEndpoint = (_c = this.interface) === null || _c === void 0 ? void 0 : _c.alternate.endpoints.find((e) => e.direction === "in");
            this.outEndpoint = (_d = this.interface) === null || _d === void 0 ? void 0 : _d.alternate.endpoints.find((e) => e.direction === "out");
            if (!this.inEndpoint || !this.outEndpoint) {
                throw new Error("No endpoints found");
            }
            yield this.reset();
            const readInEndPoint = () => __awaiter(this, void 0, void 0, function* () {
                if (this.inEndpoint === undefined ||
                    this.device === undefined ||
                    !this.device.opened) {
                    return;
                }
                try {
                    this.readInCancellationToken.cancelled();
                    const result = yield this.device.transferIn(this.inEndpoint.endpointNumber, this.inEndpoint.packetSize);
                    if (!result.data) {
                        return;
                    }
                    let data = result.data;
                    if (this.leftover) {
                        const tmp = new Uint8Array(this.leftover.byteLength + data.byteLength);
                        tmp.set(new Uint8Array(this.leftover.buffer), 0);
                        tmp.set(new Uint8Array(data.buffer), this.leftover.byteLength);
                        data = new DataView(tmp.buffer);
                        this.leftover = undefined;
                    }
                    if (data.getUint8(0) !== 0xa4) {
                        throw "SYNC missing";
                    }
                    if (result.status === "ok") {
                        const len = data.byteLength;
                        let beginBlock = 0;
                        while (beginBlock < len) {
                            if (beginBlock + 1 === len) {
                                this.leftover = new DataView(data.buffer.slice(beginBlock));
                                break;
                            }
                            const blockLen = data.getUint8(beginBlock + 1);
                            const endBlock = beginBlock + blockLen + 4;
                            if (endBlock > len) {
                                this.leftover = new DataView(data.buffer.slice(beginBlock));
                                break;
                            }
                            const readData = new DataView(data.buffer.slice(beginBlock, endBlock));
                            this.read(readData);
                            beginBlock = endBlock;
                        }
                    }
                    yield readInEndPoint();
                }
                catch (error) {
                    if (!(error instanceof CancellationError)) {
                        throw error;
                    }
                }
            });
            yield readInEndPoint();
            return this.device;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            (_a = this.readInCancellationToken) === null || _a === void 0 ? void 0 : _a.cancel();
            yield this.reset();
            this.interface = undefined;
            if (!this.device)
                return;
            yield this.device.close();
            this.emit("shutdown");
            const devIdx = this.deviceInUse.indexOf(this.device);
            if (devIdx >= 0) {
                this.deviceInUse.splice(devIdx, 1);
            }
            this.emit("attach", this.device);
            this.device = undefined;
        });
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.detach_all();
            this.maxChannels = 0;
            this.usedChannels = 0;
            yield this.write(Messages.resetSystem());
        });
    }
    isScanning() {
        return this.usedChannels === -1;
    }
    attach(sensor, forScan) {
        if (this.usedChannels < 0) {
            return false;
        }
        if (forScan) {
            if (this.usedChannels !== 0) {
                return false;
            }
            this.usedChannels = -1;
        }
        else {
            if (this.maxChannels <= this.usedChannels) {
                return false;
            }
            ++this.usedChannels;
        }
        this.attachedSensors.push(sensor);
        return true;
    }
    detach(sensor) {
        const idx = this.attachedSensors.indexOf(sensor);
        if (idx < 0) {
            return false;
        }
        if (this.usedChannels < 0) {
            this.usedChannels = 0;
        }
        else {
            --this.usedChannels;
        }
        this.attachedSensors.splice(idx, 1);
        return true;
    }
    detach_all() {
        const copy = this.attachedSensors;
        return Promise.all(copy.map((s) => s.detach()));
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (this.outEndpoint === undefined) {
                    throw new Error("No out endpoint");
                }
                yield ((_a = this.device) === null || _a === void 0 ? void 0 : _a.transferOut((_b = this.outEndpoint) === null || _b === void 0 ? void 0 : _b.endpointNumber, data));
            }
            catch (error) {
                throw error;
            }
        });
    }
    read(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageID = data.getUint8(2);
            if (messageID === Constants.MESSAGE_STARTUP) {
                yield this.write(Messages.requestMessage(0, Constants.MESSAGE_CAPABILITIES));
            }
            else if (messageID === Constants.MESSAGE_CAPABILITIES) {
                this.maxChannels = data.getUint8(3);
                this.canScan = (data.getUint8(7) & 0x06) === 0x06;
                yield this.write(Messages.setNetworkKey());
            }
            else if (messageID === Constants.MESSAGE_CHANNEL_EVENT &&
                data.getUint8(4) === Constants.MESSAGE_NETWORK_KEY) {
                this.emit("startup", data);
            }
            else {
                this.emit("read", data);
            }
        });
    }
}
USBDriver.supportedDevices = [
    { vendor: 0x0fcf, product: 0x1008, name: "GarminStick2" },
    { vendor: 0x0fcf, product: 0x1009, name: "GarminStick3" }
];
//# sourceMappingURL=USBDriver.js.map