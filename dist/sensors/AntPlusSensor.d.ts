import { GarminStick2 } from "../GarminStick2";
import { GarminStick3 } from "../GarminStick3";
import { AntPlusBaseSensor } from "./AntPlusBaseSensor";
import { AttachProps } from "./BaseSensor";
export declare abstract class AntPlusSensor extends AntPlusBaseSensor {
    constructor(stick: GarminStick2 | GarminStick3);
    protected scan(): Promise<void>;
    protected attach(props: AttachProps): Promise<void>;
    private decodeData;
}
