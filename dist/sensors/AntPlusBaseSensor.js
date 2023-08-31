"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntPlusBaseSensor = void 0;
const BaseSensor_1 = require("./BaseSensor");
class AntPlusBaseSensor extends BaseSensor_1.BaseSensor {
    scan(type) {
        return super.scan(type, 57);
    }
    attach(props) {
        return super.attach(Object.assign(Object.assign({}, props), { frequency: 57 }));
    }
}
exports.AntPlusBaseSensor = AntPlusBaseSensor;
//# sourceMappingURL=AntPlusBaseSensor.js.map