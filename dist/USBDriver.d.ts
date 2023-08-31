/// <reference types="w3c-web-usb" />
import { EventEmitter } from "./lib/EventEmitter";
import { BaseSensor } from "./sensors/BaseSensor";
export interface SupportedVendors {
    vendor: number;
    product: number;
    name: string;
}
export declare class USBDriver extends EventEmitter {
    private vendorId;
    private productId;
    static supportedDevices: Array<SupportedVendors>;
    private deviceInUse;
    private attachedSensors;
    private device;
    private inEndpoint;
    private interface;
    private leftover;
    private outEndpoint;
    private usedChannels;
    private readInCancellationToken;
    maxChannels: number;
    canScan: boolean;
    constructor(vendorId: number, productId: number);
    /** Creates a USBDriver instance from an already paired (and permitted) device
     * @Note If more than one ANT+ stick was paired the USBDriver instance will be created from the first one.
     */
    static createFromPairedDevice(): Promise<USBDriver | undefined>;
    /** Starts the paring process by opening the dialog box, once USBDevice is connected it will return a USBDriver instance
     * @Note This method filters the usb devices shown in the dialog box i.e. only ANT+ sticks will be shown.
     */
    static createFromNewDevice(): Promise<USBDriver>;
    /** Creates a USBDriver instance from the specified USBDevice
     * @Note This method does not check if the provided USBDevice is in fact an ANT+ stick.
     */
    static createFromDevice(device: USBDevice): USBDriver;
    /** Gets an array of ANT+ usb sticks that has been previously paired and hence have permission to connect (if any) */
    static getPairedDevices(): Promise<Array<USBDevice>>;
    private getDevice;
    is_present(): Promise<boolean>;
    open(): Promise<USBDevice | undefined>;
    close(): Promise<void>;
    reset(): Promise<void>;
    isScanning(): boolean;
    attach(sensor: BaseSensor, forScan: boolean): boolean;
    detach(sensor: BaseSensor): boolean;
    detach_all(): Promise<void[]>;
    write(data: DataView): Promise<void>;
    read(data: DataView): Promise<void>;
}
