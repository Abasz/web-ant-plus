export interface ICancellationToken {
    cancelled(): void;
    cancel(): void;
}
export declare class CancellationToken implements ICancellationToken {
    get isCancelled(): boolean;
    _isCancelled: boolean;
    constructor();
    cancelled(): void;
    cancel(): void;
}
export declare class CancellationError extends Error {
    constructor(message?: string);
}
