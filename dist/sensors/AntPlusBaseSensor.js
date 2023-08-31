import { BaseSensor } from "./BaseSensor";
export class AntPlusBaseSensor extends BaseSensor {
    scan(type) {
        return super.scan(type, 57);
    }
    attach(props) {
        return super.attach(Object.assign(Object.assign({}, props), { frequency: 57 }));
    }
}
//# sourceMappingURL=AntPlusBaseSensor.js.map