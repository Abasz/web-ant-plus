export interface WrappedFunction extends Function {
    listener: Function;
}
export declare class EventEmitter {
    #private;
    private events;
    private maxListeners?;
    get defaultMaxListeners(): number;
    set defaultMaxListeners(n: number);
    addListener(eventName: string | symbol, listener: Function): this;
    emit(eventName: string | symbol, ...args: unknown[]): boolean;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listenerCount(eventName: string | symbol): number;
    eventNames(): (string | symbol)[];
    listeners(eventName: string | symbol): Function[];
    off(eventName: string | symbol, listener: Function): this;
    on(eventName: string | symbol, listener: Function, prepend?: boolean): this;
    removeAllListeners(eventName: string | symbol): this;
    removeListener(eventName: string | symbol, listener: Function): this;
    once(eventName: string | symbol, listener: Function): this;
    private onceWrap;
    prependListener(eventName: string | symbol, listener: Function): this;
    prependOnceListener(eventName: string | symbol, listener: Function): this;
    rawListeners(eventName: string | symbol): Function[];
}
