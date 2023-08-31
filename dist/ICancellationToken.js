"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationError = exports.CancellationToken = void 0;
class CancellationToken {
    get isCancelled() {
        return this._isCancelled;
    }
    constructor() {
        this._isCancelled = false;
    }
    cancelled() {
        if (this._isCancelled) {
            this._isCancelled = false;
            throw new CancellationError();
        }
    }
    cancel() {
        this._isCancelled = true;
    }
}
exports.CancellationToken = CancellationToken;
class CancellationError extends Error {
    constructor(message) {
        super(message !== null && message !== void 0 ? message : "Operation was cancelled");
        this.name = "CancellationError";
    }
}
exports.CancellationError = CancellationError;
//# sourceMappingURL=ICancellationToken.js.map