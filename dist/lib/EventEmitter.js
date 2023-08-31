/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/ban-types */
// Folk: https://github.com/deno-library/events/blob/master/mod.ts
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _EventEmitter_defaultMaxListeners;
export class EventEmitter {
    constructor() {
        this.events = new Map();
        _EventEmitter_defaultMaxListeners.set(this, 10);
    }
    get defaultMaxListeners() {
        return __classPrivateFieldGet(this, _EventEmitter_defaultMaxListeners, "f");
    }
    set defaultMaxListeners(n) {
        if (Number.isInteger(n) || n < 0) {
            const error = new RangeError(`The value of "defaultMaxListeners" is out of range. It must be a non-negative integer. Received ${n}.`);
            throw error;
        }
        __classPrivateFieldSet(this, _EventEmitter_defaultMaxListeners, n, "f");
    }
    addListener(eventName, listener) {
        return this.on(eventName, listener);
    }
    emit(eventName, ...args) {
        const listeners = this.events.get(eventName);
        if (listeners === undefined) {
            if (eventName === "error") {
                const error = args[0];
                if (error instanceof Error)
                    throw error;
                throw new Error("Unhandled error.");
            }
            return false;
        }
        const copyListeners = [...listeners];
        for (const listener of copyListeners) {
            listener.apply(this, args);
        }
        return true;
    }
    setMaxListeners(n) {
        if (!Number.isInteger(n) || n < 0) {
            throw new RangeError(`The value of "n" is out of range. It must be a non-negative integer. Received ${n}.`);
        }
        this.maxListeners = n;
        return this;
    }
    getMaxListeners() {
        if (this.maxListeners === undefined) {
            return this.defaultMaxListeners;
        }
        return this.maxListeners;
    }
    listenerCount(eventName) {
        const events = this.events.get(eventName);
        return events === undefined ? 0 : events.length;
    }
    eventNames() {
        return Reflect.ownKeys(this.events);
    }
    listeners(eventName) {
        const listeners = this.events.get(eventName);
        return listeners === undefined ? [] : listeners;
    }
    off(eventName, listener) {
        return this.removeListener(eventName, listener);
    }
    on(eventName, listener, prepend) {
        if (this.events.has(eventName) === false) {
            this.events.set(eventName, []);
        }
        const events = this.events.get(eventName);
        if (prepend) {
            events.unshift(listener);
        }
        else {
            events.push(listener);
        }
        // newListener
        if (eventName !== "newListener" && this.events.has("newListener")) {
            this.emit("newListener", eventName, listener);
        }
        // warn
        const maxListener = this.getMaxListeners();
        const eventLength = events.length;
        if (maxListener > 0 && eventLength > maxListener && !events.warned) {
            events.warned = true;
            const warning = new Error(`Possible EventEmitter memory leak detected.
         ${this.listenerCount(eventName)} ${eventName.toString()} listeners.
         Use emitter.setMaxListeners() to increase limit`);
            warning.name = "MaxListenersExceededWarning";
            console.warn(warning);
        }
        return this;
    }
    removeAllListeners(eventName) {
        const { events } = this;
        // Not listening for removeListener, no need to emit
        if (!events.has("removeListener")) {
            if (arguments.length === 0) {
                this.events = new Map();
            }
            else if (events.has(eventName)) {
                events.delete(eventName);
            }
            return this;
        }
        // Emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            for (const key of events.keys()) {
                if (key !== "removeListener") {
                    this.removeAllListeners(key);
                }
            }
            this.removeAllListeners("removeListener");
            this.events = new Map();
            return this;
        }
        const listeners = events.get(eventName);
        if (listeners !== undefined) {
            listeners.forEach((listener) => {
                this.removeListener(eventName, listener);
            });
        }
        return this;
    }
    removeListener(eventName, listener) {
        const { events } = this;
        if (events.size === 0)
            return this;
        const list = events.get(eventName);
        if (list === undefined)
            return this;
        const index = list.findIndex((item) => item === listener || item.listener === listener);
        if (index === -1)
            return this;
        list.splice(index, 1);
        if (list.length === 0)
            this.events.delete(eventName);
        if (events.has("removeListener")) {
            this.emit("removeListener", eventName, listener);
        }
        return this;
    }
    once(eventName, listener) {
        this.on(eventName, this.onceWrap(eventName, listener));
        return this;
    }
    onceWrap(eventName, listener) {
        const wrapper = function (...args // eslint-disable-line @typescript-eslint/no-explicit-any
        ) {
            this.context.removeListener(this.eventName, this.wrapedListener);
            this.listener.apply(this.context, args);
        };
        const wrapperContext = {
            eventName,
            listener,
            wrapedListener: wrapper,
            context: this
        };
        const wrapped = wrapper.bind(wrapperContext);
        wrapperContext.wrapedListener = wrapped;
        wrapped.listener = listener;
        return wrapped;
    }
    prependListener(eventName, listener) {
        return this.on(eventName, listener, true);
    }
    prependOnceListener(eventName, listener) {
        this.prependListener(eventName, this.onceWrap(eventName, listener));
        return this;
    }
    rawListeners(eventName) {
        const { events } = this;
        if (events === undefined)
            return [];
        const listeners = events.get(eventName);
        if (listeners === undefined)
            return [];
        return [...listeners];
    }
}
_EventEmitter_defaultMaxListeners = new WeakMap();
//# sourceMappingURL=EventEmitter.js.map