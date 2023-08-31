/*
 * Copyright (c) 2019 Tom Cosgrove
 * Copyright (c) 2015 Alessandro Vergani
 *
 * This file is licensed under the MIT License (MIT):
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { updateEnvironmentSensorState } from "../lib/UpdateState";
import { AntPlusSensor } from "./AntPlusSensor";
import { EnvironmentSensorState } from "./EnvironmentSensorState";
export class EnvironmentSensor extends AntPlusSensor {
    attachSensor(channel, deviceID) {
        const _super = Object.create(null, {
            attach: { get: () => super.attach }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.attach.call(this, {
                channel,
                type: "receive",
                deviceID,
                deviceType: EnvironmentSensor.deviceType,
                transmissionType: 0,
                timeout: 255,
                period: 8192
            });
            this.state = new EnvironmentSensorState(deviceID);
        });
    }
    updateState(deviceId, data) {
        if (!this.state) {
            throw new Error("EnvironmentSensor: not attached");
        }
        this.state.DeviceID = deviceId;
        updateEnvironmentSensorState(this, this.state, data);
    }
}
EnvironmentSensor.deviceType = 25;
//# sourceMappingURL=EnvironmentSensor.js.map