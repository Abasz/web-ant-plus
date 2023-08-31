import { AttachProps, BaseSensor } from "./BaseSensor";
export declare abstract class AntPlusBaseSensor extends BaseSensor {
    protected scan(type: string): Promise<void>;
    protected attach(props: AttachProps): Promise<void>;
}
