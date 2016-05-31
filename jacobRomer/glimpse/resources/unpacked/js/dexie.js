(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Dexie = factory();
}(this, function () { 'use strict';

    function nop() {}
    function mirror(val) {
        return val;
    }
    function pureFunctionChain(f1, f2) {
        // Enables chained events that takes ONE argument and returns it to the next function in chain.
        // This pattern is used in the hook("reading") event.
        if (f1 == null || f1 === mirror) return f2;
        return function (val) {
            return f2(f1(val));
        };
    }

    function callBoth(on1, on2) {
        return function () {
            on1.apply(this, arguments);
            on2.apply(this, arguments);
        };
    }

    function hookCreatingChain(f1, f2) {
        // Enables chained events that takes several arguments and may modify first argument by making a modification and then returning the same instance.
        // This pattern is used in the hook("creating") event.
        if (f1 === nop) return f2;
        return function () {
            var res = f1.apply(this, arguments);
            if (res !== undefined) arguments[0] = res;
            var onsuccess = this.onsuccess,
                // In case event listener has set this.onsuccess
            onerror = this.onerror; // In case event listener has set this.onerror
            this.onsuccess = null;
            this.onerror = null;
            var res2 = f2.apply(this, arguments);
            if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
            if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
            return res2 !== undefined ? res2 : res;
        };
    }

    function hookDeletingChain(f1, f2) {
        if (f1 === nop) return f2;
        return function () {
            f1.apply(this, arguments);
            var onsuccess = this.onsuccess,
                // In case event listener has set this.onsuccess
            onerror = this.onerror; // In case event listener has set this.onerror
            this.onsuccess = this.onerror = null;
            f2.apply(this, arguments);
            if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
            if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        };
    }

    function hookUpdatingChain(f1, f2) {
        if (f1 === nop) return f2;
        return function () {
            var res = f1.apply(this, arguments);
            extend(arguments[0], res); // If f1 returns new modifications, extend caller's modifications with the result before calling next in chain.
            var onsuccess = this.onsuccess,
                // In case event listener has set this.onsuccess
            onerror = this.onerror; // In case event listener has set this.onerror
            this.onsuccess = null;
            this.onerror = null;
            var res2 = f2.apply(this, arguments);
            if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
            if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
            return res === undefined ? res2 === undefined ? undefined : res2 : extend(res, res2);
        };
    }

    function stoppableEventChain(f1, f2) {
        // Enables chained events that may return false to stop the event chain.
        if (f1 === nop) return f2;
        return function () {
            if (f1.apply(this, arguments) === false) return false;
            return f2.apply(this, arguments);
        };
    }

    function reverseStoppableEventChain(f1, f2) {
        if (f1 === nop) return f2;
        return function () {
            if (f2.apply(this, arguments) === false) return false;
            return f1.apply(this, arguments);
        };
    }

    function promisableChain(f1, f2) {
        if (f1 === nop) return f2;
        return function () {
            var res = f1.apply(this, arguments);
            if (res && typeof res.then === 'function') {
                var thiz = this,
                    args = arguments;
                return res.then(function () {
                    return f2.apply(thiz, args);
                });
            }
            return f2.apply(this, arguments);
        };
    }

    var keys = Object.keys;
    var isArray = Array.isArray;
    var _global = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;

    function extend(obj, extension) {
        if (typeof extension !== 'object') return obj;
        keys(extension).forEach(function (key) {
            obj[key] = extension[key];
        });
        return obj;
    }

    function extendProto(proto, extension) {
        if (typeof extension === 'function') extension = extension(Object.getPrototypeOf(proto));
        keys(extension).forEach(function (key) {
            setProp(proto, key, extension[key]);
        });
    }

    function setProp(obj, prop, functionOrGetSet, options) {
        Object.defineProperty(obj, prop, extend(typeof functionOrGetSet.get === 'function' ? { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } : { value: functionOrGetSet, configurable: true, writable: true }, options));
    }

    function derive(Child) {
        return {
            from: function (Parent) {
                Child.prototype = Object.create(Parent.prototype);
                setProp(Child.prototype, "constructor", Child);
                return {
                    extend: extendProto.bind(null, Child.prototype)
                };
            }
        };
    }

    var _slice = [].slice;
    function slice(args, start, end) {
        return _slice.call(args, start, end);
    }

    function override(origFunc, overridedFactory) {
        return overridedFactory(origFunc);
    }

    function doFakeAutoComplete(fn) {
        var to = setTimeout(fn, 1000);
        clearTimeout(to);
    }

    function assert(b) {
        if (!b) throw new exceptions.Internal("Assertion failed");
    }

    function asap(fn) {
        if (_global.setImmediate) setImmediate(fn);else setTimeout(fn, 0);
    }

    function miniTryCatch(fn, onerror) {
        try {
            fn();
        } catch (ex) {
            onerror && onerror(ex);
        }
    }

    function messageAndStack(e) {
        var stack = e && e.stack;
        return stack ? stack.indexOf(e + '') > 0 ? stack : e + ". " + stack : e;
    }

    function stack(error) {
        if (error.stack) return error; // Provided error already has a stack
        try {
            var err = new Error(error.message || error); // In Chrome, stack is generated here.
            if (err.stack) {
                error.stack = err.stack;return error;
            } // If stack was generated, set it.
            // No stack. Other browsers only put the stack if we throw the error:
            throw err;
        } catch (e) {
            error.stack = e.stack;
        }
        return error;
    }

    function fail(err) {
        // Get the call stack and return a rejected promise.
        return Promise.reject(stack(err));
    }

    function getByKeyPath(obj, keyPath) {
        // http://www.w3.org/TR/IndexedDB/#steps-for-extracting-a-key-from-a-value-using-a-key-path
        if (obj.hasOwnProperty(keyPath)) return obj[keyPath]; // This line is moved from last to first for optimization purpose.
        if (!keyPath) return obj;
        if (typeof keyPath !== 'string') {
            var rv = [];
            for (var i = 0, l = keyPath.length; i < l; ++i) {
                var val = getByKeyPath(obj, keyPath[i]);
                rv.push(val);
            }
            return rv;
        }
        var period = keyPath.indexOf('.');
        if (period !== -1) {
            var innerObj = obj[keyPath.substr(0, period)];
            return innerObj === undefined ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
        }
        return undefined;
    }

    function setByKeyPath(obj, keyPath, value) {
        if (!obj || keyPath === undefined) return;
        if ('isFrozen' in Object && Object.isFrozen(obj)) return;
        if (typeof keyPath !== 'string' && 'length' in keyPath) {
            assert(typeof value !== 'string' && 'length' in value);
            for (var i = 0, l = keyPath.length; i < l; ++i) {
                setByKeyPath(obj, keyPath[i], value[i]);
            }
        } else {
            var period = keyPath.indexOf('.');
            if (period !== -1) {
                var currentKeyPath = keyPath.substr(0, period);
                var remainingKeyPath = keyPath.substr(period + 1);
                if (remainingKeyPath === "") {
                    if (value === undefined) delete obj[currentKeyPath];else obj[currentKeyPath] = value;
                } else {
                    var innerObj = obj[currentKeyPath];
                    if (!innerObj) innerObj = obj[currentKeyPath] = {};
                    setByKeyPath(innerObj, remainingKeyPath, value);
                }
            } else {
                if (value === undefined) delete obj[keyPath];else obj[keyPath] = value;
            }
        }
    }

    function delByKeyPath(obj, keyPath) {
        if (typeof keyPath === 'string') setByKeyPath(obj, keyPath, undefined);else if ('length' in keyPath) [].map.call(keyPath, function (kp) {
            setByKeyPath(obj, kp, undefined);
        });
    }

    function shallowClone(obj) {
        var rv = {};
        for (var m in obj) {
            if (obj.hasOwnProperty(m)) rv[m] = obj[m];
        }
        return rv;
    }

    function deepClone(any) {
        if (!any || typeof any !== 'object') return any;
        var rv;
        if (isArray(any)) {
            rv = [];
            for (var i = 0, l = any.length; i < l; ++i) {
                rv.push(deepClone(any[i]));
            }
        } else if (any instanceof Date) {
            rv = new Date();
            rv.setTime(any.getTime());
        } else {
            rv = any.constructor ? Object.create(any.constructor.prototype) : {};
            for (var prop in any) {
                if (any.hasOwnProperty(prop)) {
                    rv[prop] = deepClone(any[prop]);
                }
            }
        }
        return rv;
    }

    function getObjectDiff(a, b, rv, prfx) {
        // Compares objects a and b and produces a diff object.
        rv = rv || {};
        prfx = prfx || '';
        for (var prop in a) {
            if (a.hasOwnProperty(prop)) {
                if (!b.hasOwnProperty(prop)) rv[prfx + prop] = undefined; // Property removed
                else {
                        var ap = a[prop],
                            bp = b[prop];
                        if (typeof ap === 'object' && typeof bp === 'object') getObjectDiff(ap, bp, rv, prfx + prop + ".");else if (ap !== bp) rv[prfx + prop] = b[prop]; // Primitive value changed
                    }
            }
        }for (prop in b) {
            if (b.hasOwnProperty(prop) && !a.hasOwnProperty(prop)) {
                rv[prfx + prop] = b[prop]; // Property added
            }
        }return rv;
    }

    var dexieErrorNames = ['Modify', 'Bulk', 'OpenFailed', 'VersionChange', 'Schema', 'Upgrade', 'InvalidTable', 'MissingAPI', 'NoSuchDatabase', 'InvalidArgument', 'SubTransaction', 'Unsupported', 'Internal', 'DatabaseClosed', 'IncompatiblePromise'];

    var idbDomErrorNames = ['Unknown', 'Constraint', 'Data', 'TransactionInactive', 'ReadOnly', 'Version', 'NotFound', 'InvalidState', 'InvalidAccess', 'Abort', 'Timeout', 'QuotaExceeded', 'Syntax', 'DataClone'];

    var errorList = dexieErrorNames.concat(idbDomErrorNames);

    var defaultTexts = {
        VersionChanged: "Database version changed by other database connection",
        DatabaseClosed: "Database has been closed",
        IncompatiblePromise: "Incompatible Promise used in transaction scope. See http://tinyurl.com/znyqjqc"
    };

    //
    // DexieError - base class of all out exceptions.
    //
    function DexieError(name, msg) {
        // Reason we don't use ES6 classes is because:
        // 1. It bloats transpiled code and increases size of minified code.
        // 2. It doesn't give us much in this case.
        // 3. It would require sub classes to call super(), which
        //    is not needed when deriving from Error.
        this.name = name;
        this.message = msg;
    }
    derive(DexieError).from(Error).extend({
        dump: function () {
            return messageAndStack(this);
        }
    });

    function getMultiErrorMessage(msg, failures) {
        return msg + ". Errors: " + failures.map(function (f) {
            return f.toString();
        }).filter(function (v, i, s) {
            return s.indexOf(v) === i;
        }) // Only unique error strings
        .join('\n');
    }
    //
    // ModifyError - thrown in WriteableCollection.modify()
    // Specific constructor because it contains members failures and failedKeys.
    //
    function ModifyError(msg, failures, successCount, failedKeys) {
        this.name = "ModifyError";
        this.failures = failures;
        this.failedKeys = failedKeys;
        this.successCount = successCount;
        this.message = getMultiErrorMessage(msg, failures);
    }
    derive(ModifyError).from(DexieError);

    function BulkError(msg, failures) {
        this.name = "BulkError";
        this.failures = failures;
        this.message = getMultiErrorMessage(msg, failures);
    }
    derive(BulkError).from(DexieError);

    //
    //
    // Dynamically generate error names and exception classes based
    // on the names in errorList.
    //
    //

    // Map of {ErrorName -> ErrorName + "Error"}
    var errnames = errorList.reduce(function (obj, name) {
        return obj[name] = name + "Error", obj;
    }, {});

    // Need an alias for DexieError because we're gonna create subclasses with the same name.
    var BaseException = DexieError;
    // Map of {ErrorName -> exception constructor}
    var exceptions = errorList.reduce(function (obj, name) {
        // Let the name be "DexieError" because this name may
        // be shown in call stack and when debugging. DexieError is
        // the most true name because it derives from DexieError,
        // and we cannot change Function.name programatically without
        // dynamically create a Function object, which would be considered
        // 'eval-evil'.
        var fullName = name + "Error";
        function DexieError(msgOrInner, inner) {
            this.name = fullName;
            if (typeof msgOrInner === 'string') {
                this.message = msgOrInner;
                this.inner = inner || null;
            } else if (typeof msgOrInner === 'object') {
                this.message = msgOrInner.name + ' ' + msgOrInner.message;
                this.inner = msgOrInner;
            } else {
                this.message = defaultTexts[name];
                this.inner = null;
            }
        }
        derive(DexieError).from(BaseException);
        obj[name] = DexieError;
        return obj;
    }, {});

    // Use ECMASCRIPT standard exceptions where applicable:
    exceptions.Syntax = SyntaxError;
    exceptions.Type = TypeError;
    exceptions.Range = RangeError;

    var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
        obj[name + "Error"] = exceptions[name];
        return obj;
    }, {});

    function mapError(domError, message) {
        var rv = domError;
        if (!(domError instanceof DexieError) && domError.name && exceptionMap[domError.name]) {
            rv = new exceptionMap[domError.name](message || domError.message, domError);
            if (domError.stack) rv.stack = domError.stack;
        }
        return rv;
    }

    var fullNameExceptions = errorList.reduce(function (obj, name) {
        if (["Syntax", "Type", "Range"].indexOf(name) === -1) obj[name + "Error"] = exceptions[name];
        return obj;
    }, {});

    fullNameExceptions.ModifyError = ModifyError;
    fullNameExceptions.DexieError = DexieError;
    fullNameExceptions.BulkError = BulkError;

    function Events(ctx) {
        var args = arguments;
        var evs = {};
        var rv = function (eventName, subscriber) {
            if (subscriber) {
                // Subscribe
                var args = slice(arguments, 1);
                var ev = evs[eventName];
                ev.subscribe.apply(ev, args);
                return ctx;
            } else if (typeof eventName === 'string') {
                // Return interface allowing to fire or unsubscribe from event
                return evs[eventName];
            }
        };
        rv.addEventType = add;

        function add(eventName, chainFunction, defaultFunction) {
            if (isArray(eventName)) return addEventGroup(eventName);
            if (typeof eventName === 'object') return addConfiguredEvents(eventName);
            if (!chainFunction) chainFunction = stoppableEventChain;
            if (!defaultFunction) defaultFunction = nop;

            var context = {
                subscribers: [],
                fire: defaultFunction,
                subscribe: function (cb) {
                    context.subscribers.push(cb);
                    context.fire = chainFunction(context.fire, cb);
                },
                unsubscribe: function (cb) {
                    context.subscribers = context.subscribers.filter(function (fn) {
                        return fn !== cb;
                    });
                    context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
                }
            };
            evs[eventName] = rv[eventName] = context;
            return context;
        }

        function addConfiguredEvents(cfg) {
            // events(this, {reading: [functionChain, nop]});
            keys(cfg).forEach(function (eventName) {
                var args = cfg[eventName];
                if (isArray(args)) {
                    add(eventName, cfg[eventName][0], cfg[eventName][1]);
                } else if (args === 'asap') {
                    // Rather than approaching event subscription using a functional approach, we here do it in a for-loop where subscriber is executed in its own stack
                    // enabling that any exception that occur wont disturb the initiator and also not nescessary be catched and forgotten.
                    var context = add(eventName, null, function fire() {
                        var args = arguments;
                        context.subscribers.forEach(function (fn) {
                            asap(function fireEvent() {
                                fn.apply(_global, args);
                            });
                        });
                    });
                    context.subscribe = function (fn) {
                        // Change how subscribe works to not replace the fire function but to just add the subscriber to subscribers
                        if (context.subscribers.indexOf(fn) === -1) context.subscribers.push(fn);
                    };
                    context.unsubscribe = function (fn) {
                        // Change how unsubscribe works for the same reason as above.
                        var idxOfFn = context.subscribers.indexOf(fn);
                        if (idxOfFn !== -1) context.subscribers.splice(idxOfFn, 1);
                    };
                } else throw new exceptions.InvalidArgument("Invalid event config");
            });
        }

        function addEventGroup(eventGroup) {
            // promise-based event group (i.e. we promise to call one and only one of the events in the pair, and to only call it once.
            var done = false;
            eventGroup.forEach(function (name) {
                add(name).subscribe(checkDone);
            });
            function checkDone() {
                if (done) return false;
                done = true;
            }
        }

        for (var i = 1, l = args.length; i < l; ++i) {
            add(args[i]);
        }

        return rv;
    }

    //
    // Promise Class
    //
    // A variant of promise-light (https://github.com/taylorhakes/promise-light) by https://github.com/taylorhakes - an A+ and ECMASCRIPT 6 compliant Promise implementation.
    //
    // Modified by David Fahlander to be indexedDB compliant (See discussion: https://github.com/promises-aplus/promises-spec/issues/45) .
    // This implementation will not use setTimeout or setImmediate when it's not needed. The behavior is 100% Promise/A+ compliant since
    // the caller of new Promise() can be certain that the promise wont be triggered the lines after constructing the promise. We fix this by using the member variable constructing to check
    // whether the object is being constructed when reject or resolve is called. If so, the use setTimeout/setImmediate to fulfill the promise, otherwise, we know that it's not needed.
    //
    // This topic was also discussed in the following thread: https://github.com/promises-aplus/promises-spec/issues/45 and this implementation solves that issue.
    //
    // Another feature with this Promise implementation is that reject will return false in case no one catched the reject call. This is used
    // to stopPropagation() on the IDBRequest error event in case it was catched but not otherwise.
    //
    // Also, the event new Promise().onuncatched is called in case no one catches a reject call. This is used for us to manually bubble any request
    // errors to the transaction. We must not rely on IndexedDB implementation to do this, because it only does so when the source of the rejection
    // is an error event on a request, not in case an ordinary exception is thrown.

    var _asap = _global.setImmediate || function (fn) {
        var args = slice(arguments, 1);

        // If not FF13 and earlier failed, we could use this call here instead: setTimeout.call(this, [fn, 0].concat(arguments));
        setTimeout(function () {
            fn.apply(_global, args);
        }, 0);
    };

    doFakeAutoComplete(function () {
        // Simplify the job for VS Intellisense. This piece of code is one of the keys to the new marvellous intellisense support in Dexie.
        _asap = asap$1 = enqueueImmediate = function (fn) {
            var args = arguments;setTimeout(function () {
                fn.apply(_global, slice(args, 1));
            }, 0);
        };
    });

    var asap$1 = _asap;
    var isRootExecution = true;
    var operationsQueue = [];
    var tickFinalizers = [];
    var enqueueImmediate = function (fn) {
        operationsQueue.push([fn, slice(arguments, 1)]);
    };

    function executeOperationsQueue() {
        var queue = operationsQueue;
        operationsQueue = [];
        for (var i = 0, l = queue.length; i < l; ++i) {
            var item = queue[i];
            item[0].apply(_global, item[1]);
        }
    }

    function Promise(fn) {
        if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
        if (typeof fn !== 'function') throw new TypeError('not a function');
        this._state = null; // null (=pending), false (=rejected) or true (=resolved)
        this._value = null; // error or result
        this._deferreds = [];
        this._catched = false; // for onuncatched
        //this._id = ++PromiseID;
        var self = this;
        var constructing = true;
        this._PSD = Promise.PSD;

        try {
            doResolve(this, fn, function (data) {
                if (constructing) asap$1(resolve, self, data);else resolve(self, data);
            }, function (reason) {
                if (constructing) {
                    asap$1(reject, self, reason);
                    return false;
                } else {
                    return reject(self, reason);
                }
            });
        } finally {
            constructing = false;
        }
    }

    function handle(self, deferred) {
        if (self._state === null) {
            self._deferreds.push(deferred);
            return;
        }

        var cb = self._state ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
            // This Deferred doesnt have a listener for the event being triggered (onFulfilled or onReject) so lets forward the event to any eventual listeners on the Promise instance returned by then() or catch()
            return (self._state ? deferred.resolve : deferred.reject)(self._value);
        }
        var ret,
            isRootExec = isRootExecution;
        isRootExecution = false;
        asap$1 = enqueueImmediate;
        try {
            var outerPSD = Promise.PSD;
            Promise.PSD = self._PSD;
            ret = cb(self._value);
            if (!self._state && (!ret || typeof ret.then !== 'function' || ret._state !== false)) setCatched(self); // Caller did 'return Promise.reject(err);' - don't regard it as catched!
            deferred.resolve(ret);
        } catch (e) {
            deferred.reject(e);
        } finally {
            Promise.PSD = outerPSD;
            if (isRootExec) {
                do {
                    while (operationsQueue.length > 0) {
                        executeOperationsQueue();
                    }var finalizer = tickFinalizers.pop();
                    if (finalizer) try {
                        finalizer();
                    } catch (e) {}
                } while (tickFinalizers.length > 0 || operationsQueue.length > 0);
                asap$1 = _asap;
                isRootExecution = true;
            }
        }
    }

    function _rootExec(fn) {
        var isRootExec = isRootExecution;
        isRootExecution = false;
        asap$1 = enqueueImmediate;
        try {
            return fn();
        } finally {
            if (isRootExec) {
                do {
                    while (operationsQueue.length > 0) {
                        executeOperationsQueue();
                    }var finalizer = tickFinalizers.pop();
                    if (finalizer) try {
                        finalizer();
                    } catch (e) {}
                } while (tickFinalizers.length > 0 || operationsQueue.length > 0);
                asap$1 = _asap;
                isRootExecution = true;
            }
        }
    }

    function setCatched(promise) {
        promise._catched = true;
        if (promise._parent && !promise._parent._catched) setCatched(promise._parent);
    }

    function resolve(promise, newValue) {
        var outerPSD = Promise.PSD;
        Promise.PSD = promise._PSD;
        try {
            //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === promise) throw new TypeError('A promise cannot be resolved with itself.');
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                if (typeof newValue.then === 'function') {
                    if (newValue instanceof Promise && newValue._state !== null) {
                        promise._state = newValue._state;
                        promise._value = newValue._value;
                        finale.call(promise);
                        return;
                    }
                    doResolve(promise, function (resolve, reject) {
                        //newValue instanceof Promise ? newValue._then(resolve, reject) : newValue.then(resolve, reject);
                        newValue.then(resolve, reject);
                    }, function (data) {
                        resolve(promise, data);
                    }, function (reason) {
                        reject(promise, reason);
                    });
                    return;
                }
            }
            promise._state = true;
            promise._value = newValue;
            finale.call(promise);
        } catch (e) {
            reject(e);
        } finally {
            Promise.PSD = outerPSD;
        }
    }

    function reject(promise, newValue) {
        var outerPSD = Promise.PSD;
        Promise.PSD = promise._PSD;
        promise._state = false;
        promise._value = newValue;

        finale.call(promise);
        if (!promise._catched) {
            try {
                if (promise.onuncatched) promise.onuncatched(promise._value);else Promise.on.error.fire(promise._value);
            } catch (e) {}
        }
        Promise.PSD = outerPSD;
        return promise._catched;
    }

    function finale() {
        for (var i = 0, len = this._deferreds.length; i < len; i++) {
            handle(this, this._deferreds[i]);
        }
        this._deferreds = [];
    }

    function Deferred(onFulfilled, onRejected, resolve, reject) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
    }

    /**
        * Take a potentially misbehaving resolver function and make sure
        * onFulfilled and onRejected are only called once.
        *
        * Makes no guarantees about asynchrony.
        */
    function doResolve(promise, fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(function Promise_resolve(value) {
                if (done) return;
                done = true;
                onFulfilled(value);
            }, function Promise_reject(reason) {
                if (done) return promise._catched;
                done = true;
                return onRejected(reason);
            });
        } catch (ex) {
            if (done) return;
            return onRejected(ex);
        }
    }

    Promise.all = function () {
        var args = slice(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

        return new Promise(function (resolve, reject) {
            if (args.length === 0) return resolve([]);
            var remaining = args.length;
            function res(i, val) {
                try {
                    if (val && (typeof val === 'object' || typeof val === 'function')) {
                        var then = val.then;
                        if (typeof then === 'function') {
                            then.call(val, function (val) {
                                res(i, val);
                            }, reject);
                            return;
                        }
                    }
                    args[i] = val;
                    if (--remaining === 0) {
                        resolve(args);
                    }
                } catch (ex) {
                    reject(ex);
                }
            }
            for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
            }
        });
    };

    /* Prototype Methods */
    Promise.prototype.then = function (onFulfilled, onRejected) {
        var self = this;
        var p = new Promise(function (resolve, reject) {
            if (self._state === null) handle(self, new Deferred(onFulfilled, onRejected, resolve, reject));else asap$1(handle, self, new Deferred(onFulfilled, onRejected, resolve, reject));
        });
        p._PSD = this._PSD;
        p.onuncatched = this.onuncatched; // Needed when exception occurs in a then() clause of a successful parent promise. Want onuncatched to be called even in callbacks of callbacks of the original promise.
        p._parent = this; // Used for recursively calling onuncatched event on self and all parents.
        return p;
    };

    Promise.prototype._then = function (onFulfilled, onRejected) {
        handle(this, new Deferred(onFulfilled, onRejected, nop, nop));
    };

    Promise.prototype['catch'] = function (onRejected) {
        if (arguments.length === 1) return this.then(null, onRejected);
        // First argument is the Error type to catch
        var type = arguments[0],
            callback = arguments[1];
        if (typeof type === 'function') return this.then(null, function (e) {
            // Catching errors by its constructor type (similar to java / c++ / c#)
            // Sample: promise.catch(TypeError, function (e) { ... });
            if (e instanceof type) return callback(e);else return Promise.reject(e);
        });else return this.then(null, function (e) {
            // Catching errors by the error.name property. Makes sense for indexedDB where error type
            // is always DOMError but where e.name tells the actual error type.
            // Sample: promise.catch('ConstraintError', function (e) { ... });
            if (e && e.name === type) return callback(e);else return Promise.reject(e);
        });
    };

    Promise.prototype['finally'] = function (onFinally) {
        return this.then(function (value) {
            onFinally();
            return value;
        }, function (err) {
            onFinally();
            return Promise.reject(err);
        });
    };

    Promise.prototype.onuncatched = null; // Optional event triggered if promise is rejected but no one listened.

    Promise.resolve = function (value) {
        if (value && typeof value.then === 'function') return value;
        var p = new Promise(function () {});
        p._state = true;
        p._value = value;
        return p;
    };

    Promise.reject = function (value) {
        var p = new Promise(function () {});
        p._state = false;
        p._value = value;
        return p;
    };

    Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
            values.map(function (value) {
                value.then(resolve, reject);
            });
        });
    };

    Promise.PSD = null; // Promise Specific Data - a TLS Pattern (Thread Local Storage) for Promises. TODO: Rename Promise.PSD to Promise.data

    Promise.newPSD = function (fn) {
        // Create new PSD scope (Promise Specific Data)
        var outerScope = Promise.PSD;
        Promise.PSD = outerScope ? Object.create(outerScope) : {};
        try {
            return fn();
        } finally {
            Promise.PSD = outerScope;
        }
    };

    Promise.usePSD = function (psd, fn) {
        var outerScope = Promise.PSD;
        Promise.PSD = psd;
        try {
            return fn();
        } finally {
            Promise.PSD = outerScope;
        }
    };

    Promise._rootExec = _rootExec;
    Promise._tickFinalize = function (callback) {
        if (isRootExecution) throw new Error("Not in a virtual tick");
        tickFinalizers.push(callback);
    };

    Promise.on = Events(null, { "error": [function (f1, f2) {
            return f2;
        }, // Only use the most recent handler (only allow one handler at a time).
        defaultErrorHandler] // Default to defaultErrorHandler
    });

    // By default, log uncaught errors to the console
    function defaultErrorHandler(e) {
        console.warn('Uncaught Promise: ' + messageAndStack(e));
    }

    var maxString = String.fromCharCode(65535);
    var maxKey = function () {
        try {
            IDBKeyRange.only([[]]);return [[]];
        } catch (e) {
            return maxString;
        }
    }();
    var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
    var STRING_EXPECTED = "String expected.";
    var connections = [];
    var isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
    var hasIEDeleteObjectStoreBug = isIEOrEdge;
    var hangsOnDeleteLargeKeyRange = isIEOrEdge;
    function Dexie(dbName, options) {
        /// <param name="options" type="Object" optional="true">Specify only if you wich to control which addons that should run on this instance</param>
        var deps = Dexie.dependencies;
        var opts = extend({
            // Default Options
            addons: Dexie.addons, // Pick statically registered addons by default
            autoOpen: true, // Don't require db.open() explicitely.
            indexedDB: deps.indexedDB, // Backend IndexedDB api. Default to IDBShim or browser env.
            IDBKeyRange: deps.IDBKeyRange // Backend IDBKeyRange api. Default to IDBShim or browser env.
        }, options);
        var addons = opts.addons,
            autoOpen = opts.autoOpen,
            indexedDB = opts.indexedDB,
            IDBKeyRange = opts.IDBKeyRange;

        var globalSchema = this._dbSchema = {};
        var versions = [];
        var dbStoreNames = [];
        var allTables = {};
        var notInTransFallbackTables = {};
        ///<var type="IDBDatabase" />
        var idbdb = null; // Instance of IDBDatabase
        var db_is_blocked = true;
        var dbOpenError = null;
        var isBeingOpened = false;
        var READONLY = "readonly",
            READWRITE = "readwrite";
        var db = this;
        var pausedResumeables = [];
        var autoSchema = true;
        var hasNativeGetDatabaseNames = !!getNativeGetDatabaseNamesFn(indexedDB);

        function init() {
            // Default subscribers to "versionchange" and "blocked".
            // Can be overridden by custom handlers. If custom handlers return false, these default
            // behaviours will be prevented.
            db.on("versionchange", function (ev) {
                // Default behavior for versionchange event is to close database connection.
                // Caller can override this behavior by doing db.on("versionchange", function(){ return false; });
                // Let's not block the other window from making it's delete() or open() call.
                // NOTE! This event is never fired in IE,Edge or Safari.
                if (ev.newVersion > 0) console.warn('Another connection wants to upgrade database \'' + db.name + '\'. Closing db now to resume the upgrade.');else console.warn('Another connection wants to delete database \'' + db.name + '\'. Closing db now to resume the delete request.');
                db.close();
                // In many web applications, it would be recommended to force window.reload()
                // when this event occurs. To do that, subscribe to the versionchange event
                // and call window.location.reload(true) if ev.newVersion > 0 (not a deletion)
                // The reason for this is that your current web app obviously has old schema code that needs
                // to be updated. Another window got a newer version of the app and needs to upgrade DB but
                // your window is blocking it unless we close it here.
            });
            db.on("blocked", function (ev) {
                if (!ev.newVersion || ev.newVersion < ev.oldVersion) console.warn('Dexie.delete(\'' + db.name + '\') was blocked');else console.warn('Upgrade \'' + db.name + '\' blocked by other connection holding version ' + ev.oldVersion / 10);
            });
        }

        //
        //
        //
        // ------------------------- Versioning Framework---------------------------
        //
        //
        //

        this.version = function (versionNumber) {
            /// <param name="versionNumber" type="Number"></param>
            /// <returns type="Version"></returns>
            if (idbdb || isBeingOpened) throw new exceptions.Schema("Cannot add version when database is open");
            this.verno = Math.max(this.verno, versionNumber);
            var versionInstance = versions.filter(function (v) {
                return v._cfg.version === versionNumber;
            })[0];
            if (versionInstance) return versionInstance;
            versionInstance = new Version(versionNumber);
            versions.push(versionInstance);
            versions.sort(lowerVersionFirst);
            return versionInstance;
        };

        function Version(versionNumber) {
            this._cfg = {
                version: versionNumber,
                storesSource: null,
                dbschema: {},
                tables: {},
                contentUpgrade: null
            };
            this.stores({}); // Derive earlier schemas by default.
        }

        extend(Version.prototype, {
            stores: function (stores) {
                /// <summary>
                ///   Defines the schema for a particular version
                /// </summary>
                /// <param name="stores" type="Object">
                /// Example: <br/>
                ///   {users: "id++,first,last,&amp;username,*email", <br/>
                ///   passwords: "id++,&amp;username"}<br/>
                /// <br/>
                /// Syntax: {Table: "[primaryKey][++],[&amp;][*]index1,[&amp;][*]index2,..."}<br/><br/>
                /// Special characters:<br/>
                ///  "&amp;"  means unique key, <br/>
                ///  "*"  means value is multiEntry, <br/>
                ///  "++" means auto-increment and only applicable for primary key <br/>
                /// </param>
                this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;

                // Derive stores from earlier versions if they are not explicitely specified as null or a new syntax.
                var storesSpec = {};
                versions.forEach(function (version) {
                    // 'versions' is always sorted by lowest version first.
                    extend(storesSpec, version._cfg.storesSource);
                });

                var dbschema = this._cfg.dbschema = {};
                this._parseStoresSpec(storesSpec, dbschema);
                // Update the latest schema to this version
                // Update API
                globalSchema = db._dbSchema = dbschema;
                removeTablesApi([allTables, db, notInTransFallbackTables]);
                setApiOnPlace([notInTransFallbackTables], tableNotInTransaction, keys(dbschema), READWRITE, dbschema);
                setApiOnPlace([allTables, db, this._cfg.tables], db._transPromiseFactory, keys(dbschema), READWRITE, dbschema, true);
                dbStoreNames = keys(dbschema);
                return this;
            },
            upgrade: function (upgradeFunction) {
                /// <param name="upgradeFunction" optional="true">Function that performs upgrading actions.</param>
                var self = this;
                fakeAutoComplete(function () {
                    upgradeFunction(db._createTransaction(READWRITE, keys(self._cfg.dbschema), self._cfg.dbschema)); // BUGBUG: No code completion for prev version's tables wont appear.
                });
                this._cfg.contentUpgrade = upgradeFunction;
                return this;
            },
            _parseStoresSpec: function (stores, outSchema) {
                keys(stores).forEach(function (tableName) {
                    if (stores[tableName] !== null) {
                        var instanceTemplate = {};
                        var indexes = parseIndexSyntax(stores[tableName]);
                        var primKey = indexes.shift();
                        if (primKey.multi) throw new exceptions.Schema("Primary key cannot be multi-valued");
                        if (primKey.keyPath) setByKeyPath(instanceTemplate, primKey.keyPath, primKey.auto ? 0 : primKey.keyPath);
                        indexes.forEach(function (idx) {
                            if (idx.auto) throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                            if (!idx.keyPath) throw new exceptions.Schema("Index must have a name and cannot be an empty string");
                            setByKeyPath(instanceTemplate, idx.keyPath, idx.compound ? idx.keyPath.map(function () {
                                return "";
                            }) : "");
                        });
                        outSchema[tableName] = new TableSchema(tableName, primKey, indexes, instanceTemplate);
                    }
                });
            }
        });

        function runUpgraders(oldVersion, idbtrans, reject, openReq) {
            if (oldVersion === 0) {
                //globalSchema = versions[versions.length - 1]._cfg.dbschema;
                // Create tables:
                keys(globalSchema).forEach(function (tableName) {
                    createTable(idbtrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
                });
                // Populate data
                var t = db._createTransaction(READWRITE, dbStoreNames, globalSchema);
                t.idbtrans = idbtrans;
                t.idbtrans.onerror = eventRejectHandler(reject, ["populating database"]);
                t.on('error').subscribe(reject);
                Promise.newPSD(function () {
                    Promise.PSD.trans = t;
                    try {
                        db.on("populate").fire(t);
                    } catch (err) {
                        openReq.onerror = idbtrans.onerror = function (ev) {
                            ev.preventDefault();
                        }; // Prohibit AbortError fire on db.on("error") in Firefox.
                        try {
                            idbtrans.abort();
                        } catch (e) {}
                        idbtrans.db.close();
                        reject(err);
                    }
                });
            } else {
                // Upgrade version to version, step-by-step from oldest to newest version.
                // Each transaction object will contain the table set that was current in that version (but also not-yet-deleted tables from its previous version)
                var queue = [];
                var oldVersionStruct = versions.filter(function (version) {
                    return version._cfg.version === oldVersion;
                })[0];
                if (!oldVersionStruct) throw new exceptions.Upgrade("Dexie specification of currently installed DB version is missing");
                globalSchema = db._dbSchema = oldVersionStruct._cfg.dbschema;
                var anyContentUpgraderHasRun = false;

                var versToRun = versions.filter(function (v) {
                    return v._cfg.version > oldVersion;
                });
                versToRun.forEach(function (version) {
                    /// <param name="version" type="Version"></param>
                    var oldSchema = globalSchema;
                    var newSchema = version._cfg.dbschema;
                    adjustToExistingIndexNames(oldSchema, idbtrans);
                    adjustToExistingIndexNames(newSchema, idbtrans);
                    globalSchema = db._dbSchema = newSchema;
                    {
                        var diff = getSchemaDiff(oldSchema, newSchema);
                        diff.add.forEach(function (tuple) {
                            queue.push(function (idbtrans, cb) {
                                createTable(idbtrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
                                cb();
                            });
                        });
                        diff.change.forEach(function (change) {
                            if (change.recreate) {
                                throw new exceptions.Upgrade("Not yet support for changing primary key");
                            } else {
                                queue.push(function (idbtrans, cb) {
                                    var store = idbtrans.objectStore(change.name);
                                    change.add.forEach(function (idx) {
                                        addIndex(store, idx);
                                    });
                                    change.change.forEach(function (idx) {
                                        store.deleteIndex(idx.name);
                                        addIndex(store, idx);
                                    });
                                    change.del.forEach(function (idxName) {
                                        store.deleteIndex(idxName);
                                    });
                                    cb();
                                });
                            }
                        });
                        if (version._cfg.contentUpgrade) {
                            queue.push(function (idbtrans, cb) {
                                anyContentUpgraderHasRun = true;
                                var t = db._createTransaction(READWRITE, slice(idbtrans.db.objectStoreNames), newSchema);
                                t.idbtrans = idbtrans;
                                var uncompletedRequests = 0;
                                t._promise = override(t._promise, function (orig_promise) {
                                    return function (mode, fn, writeLock) {
                                        ++uncompletedRequests;
                                        function proxy(fn) {
                                            return function () {
                                                fn.apply(this, arguments);
                                                if (--uncompletedRequests === 0) cb(); // A called db operation has completed without starting a new operation. The flow is finished, now run next upgrader.
                                            };
                                        }
                                        return orig_promise.call(this, mode, function (resolve, reject) {
                                            arguments[0] = proxy(resolve);
                                            arguments[1] = proxy(reject);
                                            fn.apply(this, arguments);
                                        }, writeLock);
                                    };
                                });
                                idbtrans.onerror = eventRejectHandler(reject, ["running upgrader function for version", version._cfg.version]);
                                t.on('error').subscribe(reject);
                                version._cfg.contentUpgrade(t);
                                if (uncompletedRequests === 0) cb(); // contentUpgrade() didnt call any db operations at all.
                            });
                        }
                        if (!anyContentUpgraderHasRun || hasIEDeleteObjectStoreBug) {
                            // Dont delete old tables if ieBug is present and a content upgrader has run. Let tables be left in DB so far. This needs to be taken care of.
                            queue.push(function (idbtrans, cb) {
                                // Delete old tables
                                deleteRemovedTables(newSchema, idbtrans);
                                cb();
                            });
                        }
                    }
                });

                // Now, create a queue execution engine
                var runNextQueuedFunction = function () {
                    try {
                        if (queue.length) queue.shift()(idbtrans, runNextQueuedFunction);else createMissingTables(globalSchema, idbtrans); // At last, make sure to create any missing tables. (Needed by addons that add stores to DB without specifying version)
                    } catch (err) {
                        openReq.onerror = idbtrans.onerror = function (ev) {
                            ev.preventDefault();
                        }; // Prohibit AbortError fire on db.on("error") in Firefox.
                        try {
                            idbtrans.abort();
                        } catch (e) {}
                        idbtrans.db.close();
                        reject(err);
                    }
                };
                runNextQueuedFunction();
            }
        }

        function getSchemaDiff(oldSchema, newSchema) {
            var diff = {
                del: [], // Array of table names
                add: [], // Array of [tableName, newDefinition]
                change: [] // Array of {name: tableName, recreate: newDefinition, del: delIndexNames, add: newIndexDefs, change: changedIndexDefs}
            };
            for (var table in oldSchema) {
                if (!newSchema[table]) diff.del.push(table);
            }
            for (table in newSchema) {
                var oldDef = oldSchema[table],
                    newDef = newSchema[table];
                if (!oldDef) diff.add.push([table, newDef]);else {
                    var change = {
                        name: table,
                        def: newSchema[table],
                        recreate: false,
                        del: [],
                        add: [],
                        change: []
                    };
                    if (oldDef.primKey.src !== newDef.primKey.src) {
                        // Primary key has changed. Remove and re-add table.
                        change.recreate = true;
                        diff.change.push(change);
                    } else {
                        var oldIndexes = oldDef.indexes.reduce(function (prev, current) {
                            prev[current.name] = current;return prev;
                        }, {});
                        var newIndexes = newDef.indexes.reduce(function (prev, current) {
                            prev[current.name] = current;return prev;
                        }, {});
                        for (var idxName in oldIndexes) {
                            if (!newIndexes[idxName]) change.del.push(idxName);
                        }
                        for (idxName in newIndexes) {
                            var oldIdx = oldIndexes[idxName],
                                newIdx = newIndexes[idxName];
                            if (!oldIdx) change.add.push(newIdx);else if (oldIdx.src !== newIdx.src) change.change.push(newIdx);
                        }
                        if (change.recreate || change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
                            diff.change.push(change);
                        }
                    }
                }
            }
            return diff;
        }

        function createTable(idbtrans, tableName, primKey, indexes) {
            /// <param name="idbtrans" type="IDBTransaction"></param>
            var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
            indexes.forEach(function (idx) {
                addIndex(store, idx);
            });
            return store;
        }

        function createMissingTables(newSchema, idbtrans) {
            keys(newSchema).forEach(function (tableName) {
                if (!idbtrans.db.objectStoreNames.contains(tableName)) {
                    createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
                }
            });
        }

        function deleteRemovedTables(newSchema, idbtrans) {
            for (var i = 0; i < idbtrans.db.objectStoreNames.length; ++i) {
                var storeName = idbtrans.db.objectStoreNames[i];
                if (newSchema[storeName] === null || newSchema[storeName] === undefined) {
                    idbtrans.db.deleteObjectStore(storeName);
                }
            }
        }

        function addIndex(store, idx) {
            store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
        }

        function executePausedResumeables() {
            pausedResumeables.forEach(function (resumable) {
                // Resume all stalled operations. They will fail once they wake up.
                resumable.resume();
            });
        }

        //
        //
        //      Dexie Protected API
        //
        //

        this._allTables = allTables;

        this._tableFactory = function createTable(mode, tableSchema, transactionPromiseFactory) {
            /// <param name="tableSchema" type="TableSchema"></param>
            if (mode === READONLY) return new Table(tableSchema.name, transactionPromiseFactory, tableSchema, Collection);else return new WriteableTable(tableSchema.name, transactionPromiseFactory, tableSchema);
        };

        this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) {
            return new Transaction(mode, storeNames, dbschema, parentTransaction);
        };

        function tableNotInTransaction(mode, storeNames) {
            throw new exceptions.InvalidTable("Table " + storeNames[0] + " not part of transaction. Original Scope Function Source: " + Dexie.Promise.PSD.trans.scopeFunc.toString());
        }

        this._transPromiseFactory = function transactionPromiseFactory(mode, storeNames, fn) {
            // Last argument is "writeLocked". But this doesnt apply to oneshot direct db operations, so we ignore it.
            if (db_is_blocked && (!Promise.PSD || !Promise.PSD.letThrough)) {
                // Database is paused. Wait til resumed.
                if (!isBeingOpened && !autoOpen) {
                    return fail(new exceptions.DatabaseClosed());
                }
                var blockedPromise = new Promise(function (resolve, reject) {
                    pausedResumeables.push({
                        resume: function () {
                            var p = db._transPromiseFactory(mode, storeNames, fn);
                            blockedPromise.onuncatched = p.onuncatched;
                            p.then(resolve, reject);
                        }
                    });
                });
                if (autoOpen && !isBeingOpened) {
                    db.open().catch(nop); // catching to get rid of error logging of uncaught Promise. dbOpenError will be returned again as a rejected Promise.
                }
                return blockedPromise;
            } else {
                var trans = db._createTransaction(mode, storeNames, globalSchema);
                return trans._promise(mode, function (resolve, reject) {
                    // An uncatched operation will bubble to this anonymous transaction. Make sure
                    // to continue bubbling it up to db.on('error'):
                    trans.error(function (err) {
                        db.on('error').fire(err);
                    });
                    Promise.newPSD(function () {
                        Promise.PSD.trans = trans;
                        fn(function (value) {
                            // Instead of resolving value directly, wait with resolving it until transaction has completed.
                            // Otherwise the data would not be in the DB if requesting it in the then() operation.
                            // Specifically, to ensure that the following expression will work:
                            //
                            //   db.friends.put({name: "Arne"}).then(function () {
                            //       db.friends.where("name").equals("Arne").count(function(count) {
                            //           assert (count === 1);
                            //       });
                            //   });
                            //
                            trans.complete(function () {
                                resolve(value);
                            });
                        }, reject, trans);
                    });
                });
            }
        };

        this._whenReady = function (fn) {
            if (!fake && db_is_blocked && (!Promise.PSD || !Promise.PSD.letThrough)) {
                if (!isBeingOpened) {
                    if (autoOpen) {
                        db.open().catch(nop); // catching to get rid of error logging of uncaught Promise. dbOpenError will be returned again as a rejected Promise.
                    } else {
                            return fail(new exceptions.DatabaseClosed());
                        }
                }
                return new Promise(function (resolve, reject) {
                    pausedResumeables.push({
                        resume: function () {
                            fn(resolve, reject);
                        }
                    });
                });
            }
            return new Promise(fn);
        };

        //
        //
        //
        //
        //      Dexie API
        //
        //
        //

        this.verno = 0;

        this.open = function () {
            if (idbdb) return Promise.resolve(db);
            if (isBeingOpened) return new Promise(function (resolve, reject) {
                return db._whenReady(function () {
                    resolve(db);
                }, function (e) {
                    reject(e);
                });
            });
            dbOpenError = null;
            isBeingOpened = true;
            db_is_blocked = true;
            return new Promise(function (resolve, reject) {
                if (fake) resolve();
                var req;
                function openError(err) {
                    try {
                        req.transaction.abort();
                    } catch (e) {}
                    if (idbdb) try {
                        idbdb.close();
                    } catch (e) {}
                    idbdb = null;
                    isBeingOpened = false;
                    dbOpenError = mapError(err);
                    db_is_blocked = false;
                    reject(dbOpenError);
                    executePausedResumeables();
                }
                try {
                    // Make sure caller has specified at least one version
                    if (versions.length > 0) autoSchema = false;

                    // Multiply db.verno with 10 will be needed to workaround upgrading bug in IE:
                    // IE fails when deleting objectStore after reading from it.
                    // A future version of Dexie.js will stopover an intermediate version to workaround this.
                    // At that point, we want to be backward compatible. Could have been multiplied with 2, but by using 10, it is easier to map the number to the real version number.
                    if (!indexedDB) throw new exceptions.MissingAPI("indexedDB API not found. If using IE10+, make sure to run your code on a server URL " + "(not locally). If using Safari, make sure to include indexedDB polyfill.");
                    req = autoSchema ? indexedDB.open(dbName) : indexedDB.open(dbName, Math.round(db.verno * 10));
                    if (!req) throw new exceptions.MissingAPI("IndexedDB API not available"); // May happen in Safari private mode, see https://github.com/dfahlander/Dexie.js/issues/134
                    req.onerror = eventRejectHandler(openError, ["opening database", dbName]);
                    req.onblocked = fireOnBlocked;
                    req.onupgradeneeded = trycatch(function (e) {
                        if (autoSchema && !db._allowEmptyDB) {
                            // Unless an addon has specified db._allowEmptyDB, lets make the call fail.
                            // Caller did not specify a version or schema. Doing that is only acceptable for opening alread existing databases.
                            // If onupgradeneeded is called it means database did not exist. Reject the open() promise and make sure that we
                            // do not create a new database by accident here.
                            req.onerror = function (event) {
                                event.preventDefault();
                            }; // Prohibit onabort error from firing before we're done!
                            req.transaction.abort(); // Abort transaction (would hope that this would make DB disappear but it doesnt.)
                            // Close database and delete it.
                            req.result.close();
                            var delreq = indexedDB.deleteDatabase(dbName); // The upgrade transaction is atomic, and javascript is single threaded - meaning that there is no risk that we delete someone elses database here!
                            delreq.onsuccess = delreq.onerror = function () {
                                openError(new exceptions.NoSuchDatabase('Database ' + dbName + ' doesnt exist'));
                            };
                        } else {
                            req.transaction.onerror = eventRejectHandler(openError);
                            var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion; // Safari 8 fix.
                            runUpgraders(oldVer / 10, req.transaction, openError, req);
                        }
                    }, openError);
                    req.onsuccess = trycatch(function () {
                        isBeingOpened = false;
                        idbdb = req.result;
                        if (autoSchema) readGlobalSchema();else if (idbdb.objectStoreNames.length > 0) {
                            try {
                                adjustToExistingIndexNames(globalSchema, idbdb.transaction(safariMultiStoreFix(idbdb.objectStoreNames), READONLY));
                            } catch (e) {
                                // Safari may bail out if > 1 store names. However, this shouldnt be a showstopper. Issue #120.
                            }
                        }

                        idbdb.onversionchange = function (ev) {
                            db._vcFired = true; // detect implementations that not support versionchange (IE/Edge/Safari)
                            db.on("versionchange").fire(ev);
                        };
                        if (!hasNativeGetDatabaseNames) {
                            // Update localStorage with list of database names
                            globalDatabaseList(function (databaseNames) {
                                if (databaseNames.indexOf(dbName) === -1) return databaseNames.push(dbName);
                            });
                        }
                        // Now, let any subscribers to the on("ready") fire BEFORE any other db operations resume!
                        // If an the on("ready") subscriber returns a Promise, we will wait til promise completes or rejects before
                        Promise.newPSD(function () {
                            Promise.PSD.letThrough = true; // Set a Promise-Specific Data property informing that onready is firing. This will make db._whenReady() let the subscribers use the DB but block all others (!). Quite cool ha?
                            try {
                                var res = db.on.ready.fire();
                                if (res && typeof res.then === 'function') {
                                    // If on('ready') returns a promise, wait for it to complete and then resume any pending operations.
                                    res.then(resume, function (err) {
                                        idbdb.close();
                                        idbdb = null;
                                        openError(err);
                                    });
                                } else {
                                    asap(resume); // Cannot call resume directly because then the pauseResumables would inherit from our PSD scope.
                                }
                            } catch (e) {
                                openError(e);
                            }

                            function resume() {
                                db_is_blocked = false;
                                executePausedResumeables();
                                resolve();
                            }
                        });
                    }, openError);
                } catch (err) {
                    openError(err);
                }
            }).then(function () {
                connections.push(db);
                return db;
            });
        };

        this.close = function () {
            var idx = connections.indexOf(db);
            if (idx >= 0) connections.splice(idx, 1);
            if (idbdb) {
                idbdb.close();
                idbdb = null;
                autoOpen = false;
                if (db_is_blocked) {
                    executePausedResumeables();
                }
                db_is_blocked = false;
                dbOpenError = new exceptions.DatabaseClosed();
            } else if (isBeingOpened) {
                db.on('ready', function () {
                    return Promise.reject(new exceptions.DatabaseClosed());
                });
            }
        };

        this.delete = function () {
            var args = arguments;
            return new Promise(function (resolve, reject) {
                if (args.length > 0) throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
                function doDelete() {
                    db.close();
                    var req = indexedDB.deleteDatabase(dbName);
                    req.onsuccess = function () {
                        if (!hasNativeGetDatabaseNames) {
                            globalDatabaseList(function (databaseNames) {
                                var pos = databaseNames.indexOf(dbName);
                                if (pos >= 0) return databaseNames.splice(pos, 1);
                            });
                        }
                        resolve();
                    };
                    req.onerror = eventRejectHandler(reject, ["deleting", dbName]);
                    req.onblocked = fireOnBlocked;
                }
                if (isBeingOpened) {
                    pausedResumeables.push({ resume: doDelete });
                } else {
                    doDelete();
                }
            });
        };

        this.backendDB = function () {
            return idbdb;
        };

        this.isOpen = function () {
            return idbdb !== null;
        };
        this.hasFailed = function () {
            return dbOpenError !== null;
        };
        this.dynamicallyOpened = function () {
            return autoSchema;
        };

        //
        // Properties
        //
        this.name = dbName;

        // db.tables - an array of all Table instances.
        setProp(this, "tables", {
            get: function () {
                /// <returns type="Array" elementType="WriteableTable" />
                return keys(allTables).map(function (name) {
                    return allTables[name];
                });
            }
        });

        //
        // Events
        //
        this.on = Events(this, "error", "populate", { blocked: [reverseStoppableEventChain, nop], "ready": [promisableChain, nop], "versionchange": [reverseStoppableEventChain, nop] });

        // Handle on('ready') specifically: If DB is already open, trigger the event immediately. Also, default to unsubscribe immediately after being triggered.
        this.on.ready.subscribe = override(this.on.ready.subscribe, function (origSubscribe) {
            return function (subscriber, bSticky) {
                function proxy() {
                    if (!bSticky) db.on.ready.unsubscribe(proxy);
                    return subscriber.apply(this, arguments);
                }
                origSubscribe.call(this, proxy);
                if (db.isOpen()) {
                    if (db_is_blocked) {
                        pausedResumeables.push({ resume: proxy });
                    } else {
                        proxy();
                    }
                }
            };
        });

        fakeAutoComplete(function () {
            db.on("populate").fire(db._createTransaction(READWRITE, dbStoreNames, globalSchema));
            db.on("error").fire(new Error());
        });

        this.transaction = function (mode, tableInstances, scopeFunc) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="mode" type="String">"r" for readonly, or "rw" for readwrite</param>
            /// <param name="tableInstances">Table instance, Array of Table instances, String or String Array of object stores to include in the transaction</param>
            /// <param name="scopeFunc" type="Function">Function to execute with transaction</param>

            // Let table arguments be all arguments between mode and last argument.
            tableInstances = slice(arguments, 1, arguments.length - 1);
            // Let scopeFunc be the last argument
            scopeFunc = arguments[arguments.length - 1];
            var parentTransaction = Promise.PSD && Promise.PSD.trans;
            // Check if parent transactions is bound to this db instance, and if caller wants to reuse it
            if (!parentTransaction || parentTransaction.db !== db || mode.indexOf('!') !== -1) parentTransaction = null;
            var onlyIfCompatible = mode.indexOf('?') !== -1;
            mode = mode.replace('!', '').replace('?', '');
            //
            // Get storeNames from arguments. Either through given table instances, or through given table names.
            //
            var tables = isArray(tableInstances[0]) ? tableInstances.reduce(function (a, b) {
                return a.concat(b);
            }) : tableInstances;
            var error = null;
            var storeNames = tables.map(function (tableInstance) {
                if (typeof tableInstance === "string") {
                    return tableInstance;
                } else {
                    if (!(tableInstance instanceof Table)) error = error || new TypeError("Invalid type. Arguments following mode must be instances of Table or String");
                    return tableInstance.name;
                }
            });

            //
            // Resolve mode. Allow shortcuts "r" and "rw".
            //
            if (mode == "r" || mode == READONLY) mode = READONLY;else if (mode == "rw" || mode == READWRITE) mode = READWRITE;else error = new exceptions.InvalidArgument("Invalid transaction mode: " + mode);

            if (parentTransaction) {
                // Basic checks
                if (!error) {
                    if (parentTransaction && parentTransaction.mode === READONLY && mode === READWRITE) {
                        if (onlyIfCompatible) parentTransaction = null; // Spawn new transaction instead.
                        else error = error || new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
                    }
                    if (parentTransaction) {
                        storeNames.forEach(function (storeName) {
                            if (!parentTransaction.tables.hasOwnProperty(storeName)) {
                                if (onlyIfCompatible) parentTransaction = null; // Spawn new transaction instead.
                                else error = error || new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction. Parent Transaction function: " + parentTransaction.scopeFunc.toString());
                            }
                        });
                    }
                }
            }
            if (parentTransaction) {
                // If this is a sub-transaction, lock the parent and then launch the sub-transaction.
                return parentTransaction._promise(mode, enterTransactionScope, "lock");
            } else {
                // If this is a root-level transaction, wait til database is ready and then launch the transaction.
                return db._whenReady(enterTransactionScope);
            }

            function enterTransactionScope(resolve, reject) {
                // Our transaction. To be set later.
                var trans = null;
                var isConstructing = true;

                try {
                    // Throw any error if any of the above checks failed.
                    // Real error defined some lines up. We throw it here from within a Promise to reject Promise
                    // rather than make caller need to both use try..catch and promise catching. The reason we still
                    // throw here rather than do Promise.reject(error) is that we like to have the stack attached to the
                    // error. Also because there is a catch() clause bound to this try() that will bubble the error
                    // to the parent transaction.
                    if (error) throw error;

                    //
                    // Create Transaction instance
                    //
                    trans = db._createTransaction(mode, storeNames, globalSchema, parentTransaction);

                    // Provide arguments to the scope function (for backward compatibility)
                    var tableArgs = storeNames.map(function (name) {
                        return trans.tables[name];
                    });
                    tableArgs.push(trans);

                    // If transaction completes, resolve the Promise with the return value of scopeFunc.
                    var returnValue;
                    var uncompletedRequests = 0;

                    // Create a new PSD frame to hold Promise.PSD.trans. Must not be bound to the current PSD frame since we want
                    // it to pop before then() callback is called of our returned Promise.
                    Promise.newPSD(function () {
                        // Let the transaction instance be part of a Promise-specific data (PSD) value.
                        Promise.PSD.trans = trans;
                        trans.scopeFunc = scopeFunc; // For Error ("Table " + storeNames[0] + " not part of transaction") when it happens. This may help localizing the code that started a transaction used on another place.

                        if (parentTransaction) {
                            // Emulate transaction commit awareness for inner transaction (must 'commit' when the inner transaction has no more operations ongoing)
                            trans.idbtrans = parentTransaction.idbtrans;
                            trans._promise = override(trans._promise, function (orig) {
                                return function (mode, fn, writeLock) {
                                    ++uncompletedRequests;
                                    function proxy(fn2) {
                                        return function (val) {
                                            var retval;
                                            // _rootExec needed so that we do not loose any IDBTransaction in a setTimeout() call.
                                            Promise._rootExec(function () {
                                                retval = fn2(val);
                                                // _tickFinalize makes sure to support lazy micro tasks executed in Promise._rootExec().
                                                // We certainly do not want to copy the bad pattern from IndexedDB but instead allow
                                                // execution of Promise.then() callbacks until the're all done.
                                                Promise._tickFinalize(function () {
                                                    if (--uncompletedRequests === 0 && trans.active) {
                                                        trans.active = false;
                                                        trans.on.complete.fire(); // A called db operation has completed without starting a new operation. The flow is finished
                                                    }
                                                });
                                            });
                                            return retval;
                                        };
                                    }
                                    return orig.call(this, mode, function (resolve2, reject2, trans) {
                                        return fn(proxy(resolve2), proxy(reject2), trans);
                                    }, writeLock);
                                };
                            });
                        }
                        trans.complete(function () {
                            resolve(returnValue);
                        });
                        // If transaction fails, reject the Promise and bubble to db if noone catched this rejection.
                        trans.error(function (e) {
                            if (trans.idbtrans) trans.idbtrans.onerror = preventDefault; // Prohibit AbortError from firing.
                            try {
                                trans.abort();
                            } catch (e2) {}
                            if (parentTransaction) {
                                parentTransaction.active = false;
                                parentTransaction.on.error.fire(e); // Bubble to parent transaction
                            }

                            if (isConstructing) asap(doReject);else doReject();
                            function doReject() {
                                var catched = reject(e);
                                if (!parentTransaction && !catched) {
                                    db.on.error.fire(e); // If not catched, bubble error to db.on("error").
                                }
                            }
                        });

                        // Finally, call the scope function with our table and transaction arguments.
                        Promise._rootExec(function () {
                            returnValue = scopeFunc.apply(trans, tableArgs); // NOTE: returnValue is used in trans.on.complete() not as a returnValue to this func.
                            if (returnValue) {
                                if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
                                    // scopeFunc returned an iterable. Handle yield as await.
                                    returnValue = awaitIterable(returnValue);
                                } else if (typeof returnValue.then === 'function' && !returnValue.hasOwnProperty('_PSD')) {
                                    throw new exceptions.IncompatiblePromise();
                                }
                            }
                        });
                    });
                    if (!trans.idbtrans || parentTransaction && uncompletedRequests === 0) {
                        trans._nop(); // Make sure transaction is being used so that it will resolve.
                    }
                } catch (e) {
                    // If exception occur, abort the transaction and reject Promise.
                    if (trans && trans.idbtrans) trans.idbtrans.onerror = preventDefault; // Prohibit AbortError from firing.
                    if (trans) trans.abort();
                    if (parentTransaction) parentTransaction.on.error.fire(e);
                    asap(function () {
                        // Need to use asap(=setImmediate/setTimeout) before calling reject because we are in the Promise constructor and reject() will always return false if so.
                        if (!reject(e)) db.on("error").fire(e); // If not catched, bubble exception to db.on("error");
                    });
                }
                isConstructing = false;
            }
        };

        this.table = function (tableName) {
            /// <returns type="WriteableTable"></returns>
            if (fake && autoSchema) return new WriteableTable(tableName);
            if (!allTables.hasOwnProperty(tableName)) {
                throw new exceptions.InvalidTable('Table ' + tableName + ' does not exist');
            }
            return allTables[tableName];
        };

        //
        //
        //
        // Table Class
        //
        //
        //
        function Table(name, transactionPromiseFactory, tableSchema, collClass) {
            /// <param name="name" type="String"></param>
            this.name = name;
            this.schema = tableSchema;
            this.hook = allTables[name] ? allTables[name].hook : Events(null, {
                "creating": [hookCreatingChain, nop],
                "reading": [pureFunctionChain, mirror],
                "updating": [hookUpdatingChain, nop],
                "deleting": [hookDeletingChain, nop]
            });
            this._tpf = transactionPromiseFactory;
            this._collClass = collClass || Collection;
        }

        extendProto(Table.prototype, function () {
            function failReadonly() {
                // It's ok to throw here because this can only happen within a transaction,
                // and will always be caught by the transaction scope and returned as a
                // failed promise.
                throw new exceptions.ReadOnly("Current Transaction is READONLY");
            }
            return {
                //
                // Table Protected Methods
                //

                _trans: function getTransaction(mode, fn, writeLocked) {
                    return this._tpf(mode, [this.name], fn, writeLocked);
                },
                _idbstore: function getIDBObjectStore(mode, fn, writeLocked) {
                    if (fake) return new Promise(fn); // Simplify the work for Intellisense/Code completion.
                    var self = this;
                    return this._tpf(mode, [this.name], function (resolve, reject, trans) {
                        fn(resolve, reject, trans.idbtrans.objectStore(self.name), trans);
                    }, writeLocked);
                },

                //
                // Table Public Methods
                //
                get: function (key, cb) {
                    var self = this;
                    return this._idbstore(READONLY, function (resolve, reject, idbstore) {
                        fake && resolve(self.schema.instanceTemplate);
                        var req = idbstore.get(key);
                        req.onerror = eventRejectHandler(reject, ["getting", key, "from", self.name]);
                        req.onsuccess = function () {
                            resolve(self.hook.reading.fire(req.result));
                        };
                    }).then(cb);
                },
                where: function (indexName) {
                    return new WhereClause(this, indexName);
                },
                count: function (cb) {
                    return this.toCollection().count(cb);
                },
                offset: function (offset) {
                    return this.toCollection().offset(offset);
                },
                limit: function (numRows) {
                    return this.toCollection().limit(numRows);
                },
                reverse: function () {
                    return this.toCollection().reverse();
                },
                filter: function (filterFunction) {
                    return this.toCollection().and(filterFunction);
                },
                each: function (fn) {
                    return this.toCollection().each(fn);
                },
                toArray: function (cb) {
                    return this.toCollection().toArray(cb);
                },
                orderBy: function (index) {
                    return new this._collClass(new WhereClause(this, index));
                },

                toCollection: function () {
                    return new this._collClass(new WhereClause(this));
                },

                mapToClass: function (constructor, structure) {
                    /// <summary>
                    ///     Map table to a javascript constructor function. Objects returned from the database will be instances of this class, making
                    ///     it possible to the instanceOf operator as well as extending the class using constructor.prototype.method = function(){...}.
                    /// </summary>
                    /// <param name="constructor">Constructor function representing the class.</param>
                    /// <param name="structure" optional="true">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
                    /// know what type each member has. Example: {name: String, emailAddresses: [String], password}</param>
                    this.schema.mappedClass = constructor;
                    var instanceTemplate = Object.create(constructor.prototype);
                    if (structure) {
                        // structure and instanceTemplate is for IDE code competion only while constructor.prototype is for actual inheritance.
                        applyStructure(instanceTemplate, structure);
                    }
                    this.schema.instanceTemplate = instanceTemplate;

                    // Now, subscribe to the when("reading") event to make all objects that come out from this table inherit from given class
                    // no matter which method to use for reading (Table.get() or Table.where(...)... )
                    var readHook = function (obj) {
                        if (!obj) return obj; // No valid object. (Value is null). Return as is.
                        // Create a new object that derives from constructor:
                        var res = Object.create(constructor.prototype);
                        // Clone members:
                        for (var m in obj) {
                            if (obj.hasOwnProperty(m)) res[m] = obj[m];
                        }return res;
                    };

                    if (this.schema.readHook) {
                        this.hook.reading.unsubscribe(this.schema.readHook);
                    }
                    this.schema.readHook = readHook;
                    this.hook("reading", readHook);
                    return constructor;
                },
                defineClass: function (structure) {
                    /// <summary>
                    ///     Define all members of the class that represents the table. This will help code completion of when objects are read from the database
                    ///     as well as making it possible to extend the prototype of the returned constructor function.
                    /// </summary>
                    /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
                    /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>
                    return this.mapToClass(Dexie.defineClass(structure), structure);
                },
                add: failReadonly,
                put: failReadonly,
                'delete': failReadonly,
                clear: failReadonly,
                update: failReadonly
            };
        });

        //
        //
        //
        // WriteableTable Class (extends Table)
        //
        //
        //
        function WriteableTable(name, transactionPromiseFactory, tableSchema, collClass) {
            Table.call(this, name, transactionPromiseFactory, tableSchema, collClass || WriteableCollection);
        }

        function BulkErrorHandlerCatchAll(errorList, done) {
            var psd = Promise.PSD;
            return function (ev) {
                try {
                    if (ev.stopPropagation) ev.stopPropagation();
                    if (ev.preventDefault) ev.preventDefault();
                    var err = ev.target.error;
                    errorList.push(err);
                    if (ev.target._err) {
                        Promise.usePSD(psd, ev.target._err.bind(null, err));
                    }
                } finally {
                    if (done) done();
                }
            };
        }

        function BulkErrorHandler(done) {
            var psd = Promise.PSD;
            return function (ev) {
                var err;
                try {
                    err = ev.target.error;
                    if (ev.target._err) {
                        Promise.usePSD(psd, ev.target._err.bind(null, err));
                    }
                } finally {
                    done(err);
                }
            };
        }

        function BulkSuccessHandler(done, hookListener) {
            var psd = Promise.PSD;
            return hookListener ? function (ev) {
                var res;
                try {
                    res = ev.target.result;
                    ev.target._suc && Promise.usePSD(psd, ev.target._suc.bind(null, res));
                } finally {
                    if (done) done(res);
                }
            } : function (ev) {
                done(ev.target.result);
            };
        }

        function bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook) {
            // If hasDeleteHook, keysOrTuples must be an array of tuples: [[key1, value2],[key2,value2],...],
            // else keysOrTuples must be just an array of keys: [key1, key2, ...].
            return new Promise(function (resolve, reject) {
                var len = keysOrTuples.length,
                    lastItem = len - 1;
                if (len === 0) return resolve();
                if (!hasDeleteHook) {
                    for (var i = 0; i < len; ++i) {
                        var req = idbstore.delete(keysOrTuples[i]);
                        req.onerror = function (ev) {
                            return reject(mapError(ev.target.error));
                        };
                        if (i === lastItem) req.onsuccess = function () {
                            return resolve();
                        };
                    }
                } else {
                    var hookCtx = { onsuccess: null, onerror: null },
                        errorHandler = BulkErrorHandler(function (e) {
                        return reject(mapError(e));
                    }),
                        successHandler = BulkSuccessHandler(null, true);
                    miniTryCatch(function () {
                        for (var i = 0; i < len; ++i) {
                            var tuple = keysOrTuples[i];
                            deletingHook.call(hookCtx, tuple[0], tuple[1], trans);
                            var req = idbstore.delete(tuple[0]);
                            if (hookCtx.onerror) req._err = hookCtx.onerror;
                            if (hookCtx.onsuccess) req._suc = hookCtx.onsuccess;
                            req.onerror = errorHandler;
                            if (i === lastItem) req.onsuccess = BulkSuccessHandler(resolve, true);else req.onsuccess = successHandler;
                            hookCtx.onsuccess = null;
                            hookCtx.onerror = null;
                        }
                    }, function (err) {
                        hookCtx.onerror && hookCtx.onerror(err);
                        throw err;
                    });
                }
            });
        }

        derive(WriteableTable).from(Table).extend(function () {

            return {
                bulkDelete: function (keys) {
                    if (this.hook.deleting.fire === nop) {
                        return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                            resolve(bulkDelete(idbstore, trans, keys, false, nop));
                        });
                    } else {
                        return this.where(':id').anyOf(keys).delete().then(function () {}); // Resolve with undefined.
                    }
                },
                bulkPut: function (objects, keys) {
                    var _this = this;

                    return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                        if (!idbstore.keyPath && !_this.schema.primKey.auto && !keys) throw new exceptions.InvalidArgument("bulkPut() with non-inbound keys requires keys array in second argument");
                        if (idbstore.keyPath && keys) throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
                        if (keys && keys.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                        if (objects.length === 0) return resolve(); // Caller provided empty list.
                        var done = function (result) {
                            if (errorList.length === 0) resolve(result);else reject(new BulkError(_this.name + '.bulkPut(): ' + errorList.length + ' of ' + numObjs + ' operations failed', errorList));
                        };
                        var req,
                            errorList = [],
                            errorHandler,
                            numObjs = objects.length,
                            table = trans.tables[_this.name]; // Enable us to do stuff in several steps with same transaction.
                        if (_this.hook.creating.fire === nop && _this.hook.updating.fire === nop) {
                            //
                            // Standard Bulk (no 'creating' or 'updating' hooks to care about)
                            //
                            errorHandler = BulkErrorHandlerCatchAll(errorList);
                            for (var i = 0, l = objects.length; i < l; ++i) {
                                req = keys ? idbstore.put(objects[i], keys[i]) : idbstore.put(objects[i]);
                                req.onerror = errorHandler;
                            }
                            // Only need to catch success or error on the last operation
                            // according to the IDB spec.
                            req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                            req.onsuccess = BulkSuccessHandler(done);
                        } else {
                            var effectiveKeys = keys || idbstore.keyPath && objects.map(function (o) {
                                return getByKeyPath(o, idbstore.keyPath);
                            });
                            var objectLookup = effectiveKeys && effectiveKeys.reduce(function (res, key, i) {
                                if (key != null) res[key] = objects[i];
                                return res;
                            }, {}); // Generates map of {[key]: object}

                            var promise = !effectiveKeys ?

                            // Auto-incremented key-less objects only without any keys argument.
                            table.bulkAdd(objects) :

                            // Keys provided. Either as inbound in provided objects, or as a keys argument.
                            // Begin with updating those that exists in DB:
                            table.where(':id').anyOf(effectiveKeys.filter(function (key) {
                                return key != null;
                            })).modify(function () {
                                this.value = objectLookup[this.primKey];
                                objectLookup[this.primKey] = null; // Mark as "don't add this"
                            }).catch(ModifyError, function (e) {
                                errorList = e.failures; // No need to concat here. These are the first errors added.
                            }).then(function () {
                                // Now, let's examine which items didnt exist so we can add them:
                                var objsToAdd = [],
                                    keysToAdd = keys && [];
                                // Iterate backwards. Why? Because if same key was used twice, just add the last one.
                                for (var i = effectiveKeys.length - 1; i >= 0; --i) {
                                    var key = effectiveKeys[i];
                                    if (key == null || objectLookup[key]) {
                                        objsToAdd.push(objects[i]);
                                        keys && keysToAdd.push(key);
                                        if (key != null) objectLookup[key] = null; // Mark as "dont add again"
                                    }
                                }
                                // The items are in reverse order so reverse them before adding.
                                // Could be important in order to get auto-incremented keys the way the caller
                                // would expect. Could have used unshift instead of push()/reverse(),
                                // but: http://jsperf.com/unshift-vs-reverse
                                objsToAdd.reverse();
                                keys && keysToAdd.reverse();
                                return table.bulkAdd(objsToAdd, keysToAdd);
                            }).then(function (lastAddedKey) {
                                // Resolve with key of the last object in given arguments to bulkPut():
                                var lastEffectiveKey = effectiveKeys[effectiveKeys.length - 1]; // Key was provided.
                                return lastEffectiveKey != null ? lastEffectiveKey : lastAddedKey;
                            });

                            promise.then(done).catch(BulkError, function (e) {
                                // Concat failure from ModifyError and reject using our 'done' method.
                                errorList = errorList.concat(e.failures);
                                done();
                            }).catch(reject);
                        }
                    }, "locked"); // If called from transaction scope, lock transaction til all steps are done.
                },
                bulkAdd: function (objects, keys) {
                    var self = this,
                        creatingHook = this.hook.creating.fire;
                    return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                        if (!idbstore.keyPath && !self.schema.primKey.auto && !keys) throw new exceptions.InvalidArgument("bulkAdd() with non-inbound keys requires keys array in second argument");
                        if (idbstore.keyPath && keys) throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
                        if (keys && keys.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                        if (objects.length === 0) return resolve(); // Caller provided empty list.
                        function done(result) {
                            if (errorList.length === 0) resolve(result);else reject(new BulkError(self.name + '.bulkAdd(): ' + errorList.length + ' of ' + numObjs + ' operations failed', errorList));
                        }
                        var req,
                            errorList = [],
                            errorHandler,
                            successHandler,
                            numObjs = objects.length;
                        if (creatingHook !== nop) {
                            //
                            // There are subscribers to hook('creating')
                            // Must behave as documented.
                            //
                            var keyPath = idbstore.keyPath,
                                hookCtx = { onerror: null, onsuccess: null };
                            errorHandler = BulkErrorHandlerCatchAll(errorList, null);
                            successHandler = BulkSuccessHandler(null, true);

                            miniTryCatch(function () {
                                for (var i = 0, l = objects.length; i < l; ++i) {
                                    var key = keys && keys[i];
                                    var obj = objects[i],
                                        effectiveKey = keys ? key : keyPath ? getByKeyPath(obj, keyPath) : undefined,
                                        keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans);
                                    if (effectiveKey == null && keyToUse != null) {
                                        if (keyPath) {
                                            obj = deepClone(obj);
                                            setByKeyPath(obj, keyPath, keyToUse);
                                        } else {
                                            key = keyToUse;
                                        }
                                    }
                                    req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
                                    if (hookCtx.onerror) req._err = hookCtx.onerror;
                                    if (hookCtx.onsuccess) req._suc = hookCtx.onsuccess;
                                    if (i < l - 1) {
                                        req.onerror = errorHandler;
                                        if (hookCtx.onsuccess) req.onsuccess = successHandler;
                                        // Reset event listeners for next iteration.
                                        hookCtx.onerror = null;
                                        hookCtx.onsuccess = null;
                                    }
                                }
                            }, function (err) {
                                hookCtx.onerror && hookCtx.onerror(err);
                                throw err;
                            });

                            req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                            req.onsuccess = BulkSuccessHandler(done, true);
                        } else {
                            //
                            // Standard Bulk (no 'creating' hook to care about)
                            //
                            errorHandler = BulkErrorHandlerCatchAll(errorList);
                            for (var i = 0, l = objects.length; i < l; ++i) {
                                req = keys ? idbstore.add(objects[i], keys[i]) : idbstore.add(objects[i]);
                                req.onerror = errorHandler;
                            }
                            // Only need to catch success or error on the last operation
                            // according to the IDB spec.
                            req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                            req.onsuccess = BulkSuccessHandler(done);
                        }
                    });
                },
                add: function (obj, key) {
                    /// <summary>
                    ///   Add an object to the database. In case an object with same primary key already exists, the object will not be added.
                    /// </summary>
                    /// <param name="obj" type="Object">A javascript object to insert</param>
                    /// <param name="key" optional="true">Primary key</param>
                    var self = this,
                        creatingHook = this.hook.creating.fire;
                    return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                        var thisCtx = { onsuccess: null, onerror: null };
                        if (creatingHook !== nop) {
                            var effectiveKey = key != null ? key : idbstore.keyPath ? getByKeyPath(obj, idbstore.keyPath) : undefined;
                            var keyToUse = creatingHook.call(thisCtx, effectiveKey, obj, trans); // Allow subscribers to when("creating") to generate the key.
                            if (effectiveKey == null && keyToUse != null) {
                                // Using "==" and "!=" to check for either null or undefined!
                                if (idbstore.keyPath) setByKeyPath(obj, idbstore.keyPath, keyToUse);else key = keyToUse;
                            }
                        }
                        try {
                            var req = key != null ? idbstore.add(obj, key) : idbstore.add(obj),
                                psd = Promise.PSD;
                            req.onerror = eventRejectHandler(function (e) {
                                if (thisCtx.onerror) Promise.usePSD(psd, thisCtx.onerror.bind(thisCtx, e));
                                return reject(e);
                            }, ["adding", obj, "into", self.name]);
                            req.onsuccess = function (ev) {
                                var keyPath = idbstore.keyPath;
                                if (keyPath) setByKeyPath(obj, keyPath, ev.target.result);
                                if (thisCtx.onsuccess) Promise.usePSD(psd, thisCtx.onsuccess.bind(thisCtx, ev.target.result));
                                resolve(req.result);
                            };
                        } catch (e) {
                            if (thisCtx.onerror) thisCtx.onerror(e);
                            throw e;
                        }
                    });
                },

                put: function (obj, key) {
                    /// <summary>
                    ///   Add an object to the database but in case an object with same primary key alread exists, the existing one will get updated.
                    /// </summary>
                    /// <param name="obj" type="Object">A javascript object to insert or update</param>
                    /// <param name="key" optional="true">Primary key</param>
                    var self = this,
                        creatingHook = this.hook.creating.fire,
                        updatingHook = this.hook.updating.fire;
                    if (creatingHook !== nop || updatingHook !== nop) {
                        //
                        // People listens to when("creating") or when("updating") events!
                        // We must know whether the put operation results in an CREATE or UPDATE.
                        //
                        return this._trans(READWRITE, function (resolve, reject, trans) {
                            // Since key is optional, make sure we get it from obj if not provided
                            var effectiveKey = key !== undefined ? key : self.schema.primKey.keyPath && getByKeyPath(obj, self.schema.primKey.keyPath);
                            if (effectiveKey == null) {
                                // "== null" means checking for either null or undefined.
                                // No primary key. Must use add().
                                trans.tables[self.name].add(obj).then(resolve, reject);
                            } else {
                                // Primary key exist. Lock transaction and try modifying existing. If nothing modified, call add().
                                trans._lock(); // Needed because operation is splitted into modify() and add().
                                // clone obj before this async call. If caller modifies obj the line after put(), the IDB spec requires that it should not affect operation.
                                obj = deepClone(obj);
                                trans.tables[self.name].where(":id").equals(effectiveKey).modify(function () {
                                    // Replace extisting value with our object
                                    // CRUD event firing handled in WriteableCollection.modify()
                                    this.value = obj;
                                }).then(function (count) {
                                    if (count === 0) {
                                        // Object's key was not found. Add the object instead.
                                        // CRUD event firing will be done in add()
                                        return trans.tables[self.name].add(obj, key); // Resolving with another Promise. Returned Promise will then resolve with the new key.
                                    } else {
                                            return effectiveKey; // Resolve with the provided key.
                                        }
                                }).finally(function () {
                                    trans._unlock();
                                }).then(resolve, reject);
                            }
                        });
                    } else {
                        // Use the standard IDB put() method.
                        return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                            var req = key !== undefined ? idbstore.put(obj, key) : idbstore.put(obj);
                            req.onerror = eventRejectHandler(reject, ["putting", obj, "into", self.name]);
                            req.onsuccess = function (ev) {
                                var keyPath = idbstore.keyPath;
                                if (keyPath) setByKeyPath(obj, keyPath, ev.target.result);
                                resolve(req.result);
                            };
                        });
                    }
                },

                'delete': function (key) {
                    /// <param name="key">Primary key of the object to delete</param>
                    if (this.hook.deleting.subscribers.length) {
                        // People listens to when("deleting") event. Must implement delete using WriteableCollection.delete() that will
                        // call the CRUD event. Only WriteableCollection.delete() will know whether an object was actually deleted.
                        return this.where(":id").equals(key).delete();
                    } else {
                        // No one listens. Use standard IDB delete() method.
                        return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                            var req = idbstore.delete(key);
                            req.onerror = eventRejectHandler(reject, ["deleting", key, "from", idbstore.name]);
                            req.onsuccess = function () {
                                resolve(req.result);
                            };
                        });
                    }
                },

                clear: function () {
                    if (this.hook.deleting.subscribers.length) {
                        // People listens to when("deleting") event. Must implement delete using WriteableCollection.delete() that will
                        // call the CRUD event. Only WriteableCollection.delete() will knows which objects that are actually deleted.
                        return this.toCollection().delete();
                    } else {
                        return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                            var req = idbstore.clear();
                            req.onerror = eventRejectHandler(reject, ["clearing", idbstore.name]);
                            req.onsuccess = function () {
                                resolve(req.result);
                            };
                        });
                    }
                },

                update: function (keyOrObject, modifications) {
                    if (typeof modifications !== 'object' || isArray(modifications)) throw new exceptions.InvalidArgument("db.update(keyOrObject, modifications). modifications must be an object.");
                    if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
                        // object to modify. Also modify given object with the modifications:
                        keys(modifications).forEach(function (keyPath) {
                            setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
                        });
                        var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
                        if (key === undefined) Promise.reject(new exceptions.InvalidArgument("Given object does not contain its primary key"));
                        return this.where(":id").equals(key).modify(modifications);
                    } else {
                        // key to modify
                        return this.where(":id").equals(keyOrObject).modify(modifications);
                    }
                }
            };
        });

        //
        //
        //
        // Transaction Class
        //
        //
        //
        function Transaction(mode, storeNames, dbschema, parent) {
            /// <summary>
            ///    Transaction class. Represents a database transaction. All operations on db goes through a Transaction.
            /// </summary>
            /// <param name="mode" type="String">Any of "readwrite" or "readonly"</param>
            /// <param name="storeNames" type="Array">Array of table names to operate on</param>
            var self = this;
            this.db = db;
            this.mode = mode;
            this.storeNames = storeNames;
            this.idbtrans = null;
            this.on = Events(this, ["complete", "error"], "abort");
            this._reculock = 0;
            this._blockedFuncs = [];
            this._psd = null;
            this.active = true;
            this._dbschema = dbschema;
            if (parent) this.parent = parent;
            this._tpf = transactionPromiseFactory;
            this.tables = Object.create(notInTransFallbackTables); // ...so that all non-included tables exists as instances (possible to call table.name for example) but will fail as soon as trying to execute a query on it.

            function transactionPromiseFactory(mode, storeNames, fn, writeLocked) {
                // Creates a Promise instance and calls fn (resolve, reject, trans) where trans is the instance of this transaction object.
                // Support for write-locking the transaction during the promise life time from creation to success/failure.
                // This is actually not needed when just using single operations on IDB, since IDB implements this internally.
                // However, when implementing a write operation as a series of operations on top of IDB(collection.delete() and collection.modify() for example),
                // lock is indeed needed if Dexie APIshould behave in a consistent manner for the API user.
                // Another example of this is if we want to support create/update/delete events,
                // we need to implement put() using a series of other IDB operations but still need to lock the transaction all the way.
                return self._promise(mode, fn, writeLocked);
            }

            for (var i = storeNames.length - 1; i !== -1; --i) {
                var name = storeNames[i];
                var table = db._tableFactory(mode, dbschema[name], transactionPromiseFactory);
                this.tables[name] = table;
                if (!this[name]) this[name] = table;
            }
        }

        extendProto(Transaction.prototype, {
            //
            // Transaction Protected Methods (not required by API users, but needed internally and eventually by dexie extensions)
            //

            _lock: function () {
                // Temporary set all requests into a pending queue if they are called before database is ready.
                ++this._reculock; // Recursive read/write lock pattern using PSD (Promise Specific Data) instead of TLS (Thread Local Storage)
                if (this._reculock === 1 && Promise.PSD) Promise.PSD.lockOwnerFor = this;
                return this;
            },
            _unlock: function () {
                if (--this._reculock === 0) {
                    if (Promise.PSD) Promise.PSD.lockOwnerFor = null;
                    while (this._blockedFuncs.length > 0 && !this._locked()) {
                        var fn = this._blockedFuncs.shift();
                        try {
                            fn();
                        } catch (e) {}
                    }
                }
                return this;
            },
            _locked: function () {
                // Checks if any write-lock is applied on this transaction.
                // To simplify the Dexie API for extension implementations, we support recursive locks.
                // This is accomplished by using "Promise Specific Data" (PSD).
                // PSD data is bound to a Promise and any child Promise emitted through then() or resolve( new Promise() ).
                // Promise.PSD is local to code executing on top of the call stacks of any of any code executed by Promise():
                //         * callback given to the Promise() constructor  (function (resolve, reject){...})
                //         * callbacks given to then()/catch()/finally() methods (function (value){...})
                // If creating a new independant Promise instance from within a Promise call stack, the new Promise will derive the PSD from the call stack of the parent Promise.
                // Derivation is done so that the inner PSD __proto__ points to the outer PSD.
                // Promise.PSD.lockOwnerFor will point to current transaction object if the currently executing PSD scope owns the lock.
                return this._reculock && (!Promise.PSD || Promise.PSD.lockOwnerFor !== this);
            },
            _nop: function (cb) {
                // An asyncronic no-operation that may call given callback when done doing nothing. An alternative to asap() if we must not lose the transaction.
                this.tables[this.storeNames[0]].get(0).then(cb);
            },
            _promise: function (mode, fn, bWriteLock) {
                var self = this;
                return Promise.newPSD(function () {
                    var p;
                    // Read lock always
                    if (!self._locked()) {
                        p = self.active ? new Promise(function (resolve, reject) {
                            if (!self.idbtrans && mode) {
                                if (!idbdb) throw !dbOpenError || ["DatabaseClosedError", "MissingAPIError"].indexOf(dbOpenError.name) >= 0 ? dbOpenError : // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
                                new exceptions.OpenFailed(dbOpenError); // Make it clear that the user operation was not what caused the error - the error had occurred earlier on db.open()!

                                var idbtrans = self.idbtrans = idbdb.transaction(safariMultiStoreFix(self.storeNames), self.mode);
                                idbtrans.onerror = function (e) {
                                    self.on("error").fire(e && e.target.error);
                                    e.preventDefault(); // Prohibit default bubbling to window.error
                                    self.abort(); // Make sure transaction is aborted since we preventDefault.
                                };
                                idbtrans.onabort = function (e) {
                                    // Workaround for issue #78 - low disk space on chrome.
                                    // onabort is called but never onerror. Call onerror explicitely.
                                    // Do this in a future tick so we allow default onerror to execute before doing the fallback.
                                    asap(function () {
                                        self.on('error').fire(new exceptions.Abort("Transaction aborted for unknown reason"));
                                    });

                                    self.active = false;
                                    self.on("abort").fire(e);
                                };
                                idbtrans.oncomplete = function (e) {
                                    self.active = false;
                                    self.on("complete").fire(e);
                                };
                            }
                            if (bWriteLock) self._lock(); // Write lock if write operation is requested
                            try {
                                fn(resolve, reject, self);
                            } catch (e) {
                                // Direct exception happened when doing operation.
                                // We must immediately fire the error and abort the transaction.
                                // When this happens we are still constructing the Promise so we don't yet know
                                // whether the caller is about to catch() the error or not. Have to make
                                // transaction fail. Catching such an error wont stop transaction from failing.
                                // This is a limitation we have to live with.
                                var e2 = stack(mapError(e));
                                Dexie.ignoreTransaction(function () {
                                    self.on('error').fire(e2);
                                });
                                self.abort();
                                reject(e2);
                            }
                        }) : Promise.reject(stack(new exceptions.TransactionInactive("Transaction is inactive. Original Scope Function Source: " + self.scopeFunc.toString())));
                        if (self.active && bWriteLock) p.finally(function () {
                            self._unlock();
                        });
                    } else {
                        // Transaction is write-locked. Wait for mutex.
                        p = new Promise(function (resolve, reject) {
                            self._blockedFuncs.push(function () {
                                self._promise(mode, fn, bWriteLock).then(resolve, reject);
                            });
                        });
                    }
                    p.onuncatched = function (e) {
                        // Bubble to transaction. Even though IDB does this internally, it would just do it for error events and not for caught exceptions.
                        Dexie.ignoreTransaction(function () {
                            self.on("error").fire(e);
                        });
                        self.abort();
                    };
                    return p;
                });
            },

            //
            // Transaction Public Methods
            //

            complete: function (cb) {
                return this.on("complete", cb);
            },
            error: function (cb) {
                return this.on("error", cb);
            },
            abort: function () {
                if (this.idbtrans && this.active) try {
                    // TODO: if !this.idbtrans, enqueue an abort() operation.
                    this.active = false;
                    this.idbtrans.abort();
                    this.on.error.fire(new exceptions.Abort("Transaction Aborted"));
                } catch (e) {}
            },
            table: function (name) {
                if (!this.tables.hasOwnProperty(name)) {
                    throw new exceptions.InvalidTable("Table " + name + " not in transaction");
                }
                return this.tables[name];
            }
        });

        //
        //
        //
        // WhereClause
        //
        //
        //
        function WhereClause(table, index, orCollection) {
            /// <param name="table" type="Table"></param>
            /// <param name="index" type="String" optional="true"></param>
            /// <param name="orCollection" type="Collection" optional="true"></param>
            this._ctx = {
                table: table,
                index: index === ":id" ? null : index,
                collClass: table._collClass,
                or: orCollection
            };
        }

        extendProto(WhereClause.prototype, function () {

            // WhereClause private methods

            function fail(c, err, T) {
                var collection = c instanceof WhereClause ? new c._ctx.collClass(c) : c;
                try {
                    throw T ? new T(err) : new TypeError(err);
                } catch (e) {
                    collection._ctx.error = e;
                }
                return collection;
            }

            function emptyCollection(whereClause) {
                return new whereClause._ctx.collClass(whereClause, function () {
                    return IDBKeyRange.only("");
                }).limit(0);
            }

            function getSetArgs(args) {
                return slice(args.length === 1 && isArray(args[0]) ? args[0] : args);
            }

            function upperFactory(dir) {
                return dir === "next" ? function (s) {
                    return s.toUpperCase();
                } : function (s) {
                    return s.toLowerCase();
                };
            }
            function lowerFactory(dir) {
                return dir === "next" ? function (s) {
                    return s.toLowerCase();
                } : function (s) {
                    return s.toUpperCase();
                };
            }
            function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
                var length = Math.min(key.length, lowerNeedle.length);
                var llp = -1;
                for (var i = 0; i < length; ++i) {
                    var lwrKeyChar = lowerKey[i];
                    if (lwrKeyChar !== lowerNeedle[i]) {
                        if (cmp(key[i], upperNeedle[i]) < 0) return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
                        if (cmp(key[i], lowerNeedle[i]) < 0) return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
                        if (llp >= 0) return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
                        return null;
                    }
                    if (cmp(key[i], lwrKeyChar) < 0) llp = i;
                }
                if (length < lowerNeedle.length && dir === "next") return key + upperNeedle.substr(key.length);
                if (length < key.length && dir === "prev") return key.substr(0, upperNeedle.length);
                return llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
            }

            function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
                /// <param name="needles" type="Array" elementType="String"></param>
                var upper,
                    lower,
                    compare,
                    upperNeedles,
                    lowerNeedles,
                    direction,
                    nextKeySuffix,
                    needlesLen = needles.length;
                function initDirection(dir) {
                    upper = upperFactory(dir);
                    lower = lowerFactory(dir);
                    compare = dir === "next" ? simpleCompare : simpleCompareReverse;
                    var needleBounds = needles.map(function (needle) {
                        return { lower: lower(needle), upper: upper(needle) };
                    }).sort(function (a, b) {
                        return compare(a.lower, b.lower);
                    });
                    upperNeedles = needleBounds.map(function (nb) {
                        return nb.upper;
                    });
                    lowerNeedles = needleBounds.map(function (nb) {
                        return nb.lower;
                    });
                    direction = dir;
                    nextKeySuffix = dir === "next" ? "" : suffix;
                }
                initDirection("next");

                var c = new whereClause._ctx.collClass(whereClause, function () {
                    return IDBKeyRange.bound(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
                });

                c._ondirectionchange = function (direction) {
                    // This event onlys occur before filter is called the first time.
                    initDirection(direction);
                };

                var firstPossibleNeedle = 0;

                c._addAlgorithm(function (cursor, advance, resolve) {
                    /// <param name="cursor" type="IDBCursor"></param>
                    /// <param name="advance" type="Function"></param>
                    /// <param name="resolve" type="Function"></param>
                    var key = cursor.key;
                    if (typeof key !== 'string') return false;
                    var lowerKey = lower(key);
                    if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
                        return true;
                    } else {
                        var lowestPossibleCasing = null;
                        for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
                            var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
                            if (casing === null && lowestPossibleCasing === null) firstPossibleNeedle = i + 1;else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
                                lowestPossibleCasing = casing;
                            }
                        }
                        if (lowestPossibleCasing !== null) {
                            advance(function () {
                                cursor.continue(lowestPossibleCasing + nextKeySuffix);
                            });
                        } else {
                            advance(resolve);
                        }
                        return false;
                    }
                });
                return c;
            }

            //
            // WhereClause public methods
            //
            return {
                between: function (lower, upper, includeLower, includeUpper) {
                    /// <summary>
                    ///     Filter out records whose where-field lays between given lower and upper values. Applies to Strings, Numbers and Dates.
                    /// </summary>
                    /// <param name="lower"></param>
                    /// <param name="upper"></param>
                    /// <param name="includeLower" optional="true">Whether items that equals lower should be included. Default true.</param>
                    /// <param name="includeUpper" optional="true">Whether items that equals upper should be included. Default false.</param>
                    /// <returns type="Collection"></returns>
                    includeLower = includeLower !== false; // Default to true
                    includeUpper = includeUpper === true; // Default to false
                    try {
                        if (cmp(lower, upper) > 0 || cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)) return emptyCollection(this); // Workaround for idiotic W3C Specification that DataError must be thrown if lower > upper. The natural result would be to return an empty collection.
                        return new this._ctx.collClass(this, function () {
                            return IDBKeyRange.bound(lower, upper, !includeLower, !includeUpper);
                        });
                    } catch (e) {
                        return fail(this, INVALID_KEY_ARGUMENT);
                    }
                },
                equals: function (value) {
                    return new this._ctx.collClass(this, function () {
                        return IDBKeyRange.only(value);
                    });
                },
                above: function (value) {
                    return new this._ctx.collClass(this, function () {
                        return IDBKeyRange.lowerBound(value, true);
                    });
                },
                aboveOrEqual: function (value) {
                    return new this._ctx.collClass(this, function () {
                        return IDBKeyRange.lowerBound(value);
                    });
                },
                below: function (value) {
                    return new this._ctx.collClass(this, function () {
                        return IDBKeyRange.upperBound(value, true);
                    });
                },
                belowOrEqual: function (value) {
                    return new this._ctx.collClass(this, function () {
                        return IDBKeyRange.upperBound(value);
                    });
                },
                startsWith: function (str) {
                    /// <param name="str" type="String"></param>
                    if (typeof str !== 'string') return fail(this, STRING_EXPECTED);
                    return this.between(str, str + maxString, true, true);
                },
                startsWithIgnoreCase: function (str) {
                    /// <param name="str" type="String"></param>
                    if (typeof str !== 'string') return fail(this, STRING_EXPECTED);
                    if (str === "") return this.startsWith(str);
                    return addIgnoreCaseAlgorithm(this, function (x, a) {
                        return x.indexOf(a[0]) === 0;
                    }, [str], maxString);
                },
                equalsIgnoreCase: function (str) {
                    /// <param name="str" type="String"></param>
                    if (typeof str !== 'string') return fail(this, STRING_EXPECTED);
                    return addIgnoreCaseAlgorithm(this, function (x, a) {
                        return x === a[0];
                    }, [str], "");
                },
                anyOfIgnoreCase: function () {
                    var set = getSetArgs(arguments);
                    if (set.length === 0) return emptyCollection(this);
                    if (!set.every(function (s) {
                        return typeof s === 'string';
                    })) {
                        return fail(this, "anyOfIgnoreCase() only works with strings");
                    }
                    return addIgnoreCaseAlgorithm(this, function (x, a) {
                        return a.indexOf(x) !== -1;
                    }, set, "");
                },
                startsWithAnyOfIgnoreCase: function () {
                    var set = getSetArgs(arguments);
                    if (set.length === 0) return emptyCollection(this);
                    if (!set.every(function (s) {
                        return typeof s === 'string';
                    })) {
                        return fail(this, "startsWithAnyOfIgnoreCase() only works with strings");
                    }
                    return addIgnoreCaseAlgorithm(this, function (x, a) {
                        return a.some(function (n) {
                            return x.indexOf(n) === 0;
                        });
                    }, set, maxString);
                },
                anyOf: function () {
                    var set = getSetArgs(arguments);
                    var compare = ascending;
                    try {
                        set.sort(compare);
                    } catch (e) {
                        return fail(this, INVALID_KEY_ARGUMENT);
                    }
                    if (set.length === 0) return emptyCollection(this);
                    var c = new this._ctx.collClass(this, function () {
                        return IDBKeyRange.bound(set[0], set[set.length - 1]);
                    });

                    c._ondirectionchange = function (direction) {
                        compare = direction === "next" ? ascending : descending;
                        set.sort(compare);
                    };
                    var i = 0;
                    c._addAlgorithm(function (cursor, advance, resolve) {
                        var key = cursor.key;
                        while (compare(key, set[i]) > 0) {
                            // The cursor has passed beyond this key. Check next.
                            ++i;
                            if (i === set.length) {
                                // There is no next. Stop searching.
                                advance(resolve);
                                return false;
                            }
                        }
                        if (compare(key, set[i]) === 0) {
                            // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                            return true;
                        } else {
                            // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                            advance(function () {
                                cursor.continue(set[i]);
                            });
                            return false;
                        }
                    });
                    return c;
                },

                notEqual: function (value) {
                    return this.inAnyRange([[-Infinity, value], [value, maxKey]], { includeLowers: false, includeUppers: false });
                },

                noneOf: function () {
                    var set = getSetArgs(arguments);
                    if (set.length === 0) return new this._ctx.collClass(this); // Return entire collection.
                    try {
                        set.sort(ascending);
                    } catch (e) {
                        return fail(this, INVALID_KEY_ARGUMENT);
                    }
                    // Transform ["a","b","c"] to a set of ranges for between/above/below: [[-Infinity,"a"], ["a","b"], ["b","c"], ["c",maxKey]]
                    var ranges = set.reduce(function (res, val) {
                        return res ? res.concat([[res[res.length - 1][1], val]]) : [[-Infinity, val]];
                    }, null);
                    ranges.push([set[set.length - 1], maxKey]);
                    return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
                },

                /** Filter out values withing given set of ranges.
                * Example, give children and elders a rebate of 50%:
                *
                *   db.friends.where('age').inAnyRange([[0,18],[65,Infinity]]).modify({Rebate: 1/2});
                *
                * @param {(string|number|Date|Array)[][]} ranges
                * @param {{includeLowers: boolean, includeUppers: boolean}} options
                */
                inAnyRange: function (ranges, options) {
                    var ctx = this._ctx;
                    if (ranges.length === 0) return emptyCollection(this);
                    if (!ranges.every(function (range) {
                        return range[0] !== undefined && range[1] !== undefined && ascending(range[0], range[1]) <= 0;
                    })) {
                        return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
                    }
                    var includeLowers = !options || options.includeLowers !== false; // Default to true
                    var includeUppers = options && options.includeUppers === true; // Default to false

                    function addRange(ranges, newRange) {
                        for (var i = 0, l = ranges.length; i < l; ++i) {
                            var range = ranges[i];
                            if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
                                range[0] = min(range[0], newRange[0]);
                                range[1] = max(range[1], newRange[1]);
                                break;
                            }
                        }
                        if (i === l) ranges.push(newRange);
                        return ranges;
                    }

                    var sortDirection = ascending;
                    function rangeSorter(a, b) {
                        return sortDirection(a[0], b[0]);
                    }

                    // Join overlapping ranges
                    var set;
                    try {
                        set = ranges.reduce(addRange, []);
                        set.sort(rangeSorter);
                    } catch (ex) {
                        return fail(this, INVALID_KEY_ARGUMENT);
                    }

                    var i = 0;
                    var keyIsBeyondCurrentEntry = includeUppers ? function (key) {
                        return ascending(key, set[i][1]) > 0;
                    } : function (key) {
                        return ascending(key, set[i][1]) >= 0;
                    };

                    var keyIsBeforeCurrentEntry = includeLowers ? function (key) {
                        return descending(key, set[i][0]) > 0;
                    } : function (key) {
                        return descending(key, set[i][0]) >= 0;
                    };

                    function keyWithinCurrentRange(key) {
                        return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
                    }

                    var checkKey = keyIsBeyondCurrentEntry;

                    var c = new ctx.collClass(this, function () {
                        return IDBKeyRange.bound(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
                    });

                    c._ondirectionchange = function (direction) {
                        if (direction === "next") {
                            checkKey = keyIsBeyondCurrentEntry;
                            sortDirection = ascending;
                        } else {
                            checkKey = keyIsBeforeCurrentEntry;
                            sortDirection = descending;
                        }
                        set.sort(rangeSorter);
                    };

                    c._addAlgorithm(function (cursor, advance, resolve) {
                        var key = cursor.key;
                        while (checkKey(key)) {
                            // The cursor has passed beyond this key. Check next.
                            ++i;
                            if (i === set.length) {
                                // There is no next. Stop searching.
                                advance(resolve);
                                return false;
                            }
                        }
                        if (keyWithinCurrentRange(key)) {
                            // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                            return true;
                        } else if (cmp(key, set[i][1]) === 0 || cmp(key, set[i][0]) === 0) {
                            // includeUpper or includeLower is false so keyWithinCurrentRange() returns false even though we are at range border.
                            // Continue to next key but don't include this one.
                            return false;
                        } else {
                            // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                            advance(function () {
                                if (sortDirection === ascending) cursor.continue(set[i][0]);else cursor.continue(set[i][1]);
                            });
                            return false;
                        }
                    });
                    return c;
                },
                startsWithAnyOf: function () {
                    var set = getSetArgs(arguments);

                    if (!set.every(function (s) {
                        return typeof s === 'string';
                    })) {
                        return fail(this, "startsWithAnyOf() only works with strings");
                    }
                    if (set.length === 0) return emptyCollection(this);

                    return this.inAnyRange(set.map(function (str) {
                        return [str, str + maxString];
                    }));
                }
            };
        });

        //
        //
        //
        // Collection Class
        //
        //
        //
        function Collection(whereClause, keyRangeGenerator) {
            /// <summary>
            ///
            /// </summary>
            /// <param name="whereClause" type="WhereClause">Where clause instance</param>
            /// <param name="keyRangeGenerator" value="function(){ return IDBKeyRange.bound(0,1);}" optional="true"></param>
            var keyRange = null,
                error = null;
            if (keyRangeGenerator) try {
                keyRange = keyRangeGenerator();
            } catch (ex) {
                error = stack(mapError(ex));
            }

            var whereCtx = whereClause._ctx,
                table = whereCtx.table;
            this._ctx = {
                table: table,
                index: whereCtx.index,
                isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
                range: keyRange,
                keysOnly: false,
                dir: "next",
                unique: "",
                algorithm: null,
                filter: null,
                replayFilter: null,
                isMatch: null,
                offset: 0,
                limit: Infinity,
                error: error, // If set, any promise must be rejected with this error
                or: whereCtx.or,
                valueFilter: table.hook.reading.fire
            };
        }

        extendProto(Collection.prototype, function () {

            //
            // Collection Private Functions
            //

            function addFilter(ctx, fn) {
                ctx.filter = combine(ctx.filter, fn);
            }

            function addReplayFilter(ctx, factory) {
                var curr = ctx.replayFilter;
                ctx.replayFilter = curr ? function () {
                    return combine(curr(), factory());
                } : factory;
            }

            function addMatchFilter(ctx, fn) {
                ctx.isMatch = combine(ctx.isMatch, fn);
            }

            function getIndexOrStore(ctx, store) {
                if (ctx.isPrimKey) return store;
                var indexSpec = ctx.table.schema.idxByName[ctx.index];
                if (!indexSpec) throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + store.name + " is not indexed");
                return store.index(indexSpec.name);
            }

            function openCursor(ctx, store) {
                var idxOrStore = getIndexOrStore(ctx, store);
                return ctx.keysOnly && 'openKeyCursor' in idxOrStore ? idxOrStore.openKeyCursor(ctx.range || null, ctx.dir + ctx.unique) : idxOrStore.openCursor(ctx.range || null, ctx.dir + ctx.unique);
            }

            function iter(ctx, fn, resolve, reject, idbstore) {
                var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
                if (!ctx.or) {
                    iterate(openCursor(ctx, idbstore), combine(ctx.algorithm, filter), fn, resolve, reject, !ctx.keysOnly && ctx.valueFilter);
                } else {
                    (function () {
                        var set = {};
                        var resolved = 0;

                        function resolveboth() {
                            if (++resolved === 2) resolve(); // Seems like we just support or btwn max 2 expressions, but there are no limit because we do recursion.
                        }

                        function union(item, cursor, advance) {
                            if (!filter || filter(cursor, advance, resolveboth, reject)) {
                                var key = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
                                if (!set.hasOwnProperty(key)) {
                                    set[key] = true;
                                    fn(item, cursor, advance);
                                }
                            }
                        }

                        ctx.or._iterate(union, resolveboth, reject, idbstore);
                        iterate(openCursor(ctx, idbstore), ctx.algorithm, union, resolveboth, reject, !ctx.keysOnly && ctx.valueFilter);
                    })();
                }
            }
            function getInstanceTemplate(ctx) {
                return ctx.table.schema.instanceTemplate;
            }

            return {

                //
                // Collection Protected Functions
                //

                _read: function (fn, cb) {
                    var ctx = this._ctx;
                    if (ctx.error) return ctx.table._trans(null, function rejector(resolve, reject) {
                        reject(ctx.error);
                    });else return ctx.table._idbstore(READONLY, fn).then(cb);
                },
                _write: function (fn) {
                    var ctx = this._ctx;
                    if (ctx.error) return ctx.table._trans(null, function rejector(resolve, reject) {
                        reject(ctx.error);
                    });else return ctx.table._idbstore(READWRITE, fn, "locked"); // When doing write operations on collections, always lock the operation so that upcoming operations gets queued.
                },
                _addAlgorithm: function (fn) {
                    var ctx = this._ctx;
                    ctx.algorithm = combine(ctx.algorithm, fn);
                },

                _iterate: function (fn, resolve, reject, idbstore) {
                    return iter(this._ctx, fn, resolve, reject, idbstore);
                },

                clone: function (props) {
                    var rv = Object.create(this.constructor.prototype),
                        ctx = Object.create(this._ctx);
                    if (props) extend(ctx, props);
                    rv._ctx = ctx;
                    return rv;
                },

                raw: function () {
                    this._ctx.valueFilter = null;
                    return this;
                },

                //
                // Collection Public methods
                //

                each: function (fn) {
                    var ctx = this._ctx;

                    fake && fn(getInstanceTemplate(ctx));

                    return this._read(function (resolve, reject, idbstore) {
                        iter(ctx, fn, resolve, reject, idbstore);
                    });
                },

                count: function (cb) {
                    if (fake) return Promise.resolve(0).then(cb);
                    var self = this,
                        ctx = this._ctx;

                    if (ctx.filter || ctx.algorithm || ctx.or || ctx.replayFilter) {
                        // When filters are applied or 'ored' collections are used, we must count manually
                        var count = 0;
                        return this._read(function (resolve, reject, idbstore) {
                            iter(ctx, function () {
                                ++count;return false;
                            }, function () {
                                resolve(count);
                            }, reject, idbstore);
                        }, cb);
                    } else {
                        // Otherwise, we can use the count() method if the index.
                        return this._read(function (resolve, reject, idbstore) {
                            var idx = getIndexOrStore(ctx, idbstore);
                            var req = ctx.range ? idx.count(ctx.range) : idx.count();
                            req.onerror = eventRejectHandler(reject, ["calling", "count()", "on", self.name]);
                            req.onsuccess = function (e) {
                                resolve(e.target.result);
                            };
                        }, cb);
                    }
                },

                sortBy: function (keyPath, cb) {
                    /// <param name="keyPath" type="String"></param>
                    var parts = keyPath.split('.').reverse(),
                        lastPart = parts[0],
                        lastIndex = parts.length - 1;
                    function getval(obj, i) {
                        if (i) return getval(obj[parts[i]], i - 1);
                        return obj[lastPart];
                    }
                    var order = this._ctx.dir === "next" ? 1 : -1;

                    function sorter(a, b) {
                        var aVal = getval(a, lastIndex),
                            bVal = getval(b, lastIndex);
                        return aVal < bVal ? -order : aVal > bVal ? order : 0;
                    }
                    return this.toArray(function (a) {
                        return a.sort(sorter);
                    }).then(cb);
                },

                toArray: function (cb) {
                    var ctx = this._ctx;
                    return this._read(function (resolve, reject, idbstore) {
                        fake && resolve([getInstanceTemplate(ctx)]);
                        var a = [];
                        iter(ctx, function (item) {
                            a.push(item);
                        }, function arrayComplete() {
                            resolve(a);
                        }, reject, idbstore);
                    }, cb);
                },

                offset: function (offset) {
                    var ctx = this._ctx;
                    if (offset <= 0) return this;
                    ctx.offset += offset; // For count()
                    if (!ctx.or && !ctx.algorithm && !ctx.filter && !ctx.replayFilter) {
                        addReplayFilter(ctx, function () {
                            var offsetLeft = offset;
                            return function (cursor, advance) {
                                if (offsetLeft === 0) return true;
                                if (offsetLeft === 1) {
                                    --offsetLeft;return false;
                                }
                                advance(function () {
                                    cursor.advance(offsetLeft);
                                    offsetLeft = 0;
                                });
                                return false;
                            };
                        });
                    } else {
                        addReplayFilter(ctx, function () {
                            var offsetLeft = offset;
                            return function () {
                                return --offsetLeft < 0;
                            };
                        });
                    }
                    return this;
                },

                limit: function (numRows) {
                    this._ctx.limit = Math.min(this._ctx.limit, numRows); // For count()
                    addReplayFilter(this._ctx, function () {
                        var rowsLeft = numRows;
                        return function (cursor, advance, resolve) {
                            if (--rowsLeft <= 0) advance(resolve); // Stop after this item has been included
                            return rowsLeft >= 0; // If numRows is already below 0, return false because then 0 was passed to numRows initially. Otherwise we wouldnt come here.
                        };
                    });
                    return this;
                },

                until: function (filterFunction, bIncludeStopEntry) {
                    var ctx = this._ctx;
                    fake && filterFunction(getInstanceTemplate(ctx));
                    addFilter(this._ctx, function (cursor, advance, resolve) {
                        if (filterFunction(cursor.value)) {
                            advance(resolve);
                            return bIncludeStopEntry;
                        } else {
                            return true;
                        }
                    });
                    return this;
                },

                first: function (cb) {
                    return this.limit(1).toArray(function (a) {
                        return a[0];
                    }).then(cb);
                },

                last: function (cb) {
                    return this.reverse().first(cb);
                },

                filter: function (filterFunction) {
                    /// <param name="jsFunctionFilter" type="Function">function(val){return true/false}</param>
                    fake && filterFunction(getInstanceTemplate(this._ctx));
                    addFilter(this._ctx, function (cursor) {
                        return filterFunction(cursor.value);
                    });
                    addMatchFilter(this._ctx, filterFunction); // match filters not used in Dexie.js but can be used by 3rd part libraries to test a collection for a match without querying DB. Used by Dexie.Observable.
                    return this;
                },

                and: function (filterFunction) {
                    return this.filter(filterFunction);
                },

                or: function (indexName) {
                    return new WhereClause(this._ctx.table, indexName, this);
                },

                reverse: function () {
                    this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
                    if (this._ondirectionchange) this._ondirectionchange(this._ctx.dir);
                    return this;
                },

                desc: function () {
                    return this.reverse();
                },

                eachKey: function (cb) {
                    var ctx = this._ctx;
                    fake && cb(getByKeyPath(getInstanceTemplate(this._ctx), this._ctx.index ? this._ctx.table.schema.idxByName[this._ctx.index].keyPath : this._ctx.table.schema.primKey.keyPath));
                    ctx.keysOnly = !ctx.isMatch;
                    return this.each(function (val, cursor) {
                        cb(cursor.key, cursor);
                    });
                },

                eachUniqueKey: function (cb) {
                    this._ctx.unique = "unique";
                    return this.eachKey(cb);
                },

                keys: function (cb) {
                    var ctx = this._ctx;
                    ctx.keysOnly = !ctx.isMatch;
                    var a = [];
                    if (fake) return new Promise(this.eachKey.bind(this)).then(function (x) {
                        return [x];
                    }).then(cb);
                    return this.each(function (item, cursor) {
                        a.push(cursor.key);
                    }).then(function () {
                        return a;
                    }).then(cb);
                },

                uniqueKeys: function (cb) {
                    this._ctx.unique = "unique";
                    return this.keys(cb);
                },

                firstKey: function (cb) {
                    return this.limit(1).keys(function (a) {
                        return a[0];
                    }).then(cb);
                },

                lastKey: function (cb) {
                    return this.reverse().firstKey(cb);
                },

                distinct: function () {
                    var ctx = this._ctx,
                        idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
                    if (!idx || !idx.multi) return this; // distinct() only makes differencies on multiEntry indexes.
                    var set = {};
                    addFilter(this._ctx, function (cursor) {
                        var strKey = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
                        var found = set.hasOwnProperty(strKey);
                        set[strKey] = true;
                        return !found;
                    });
                    return this;
                }
            };
        });

        //
        //
        // WriteableCollection Class
        //
        //
        function WriteableCollection() {
            Collection.apply(this, arguments);
        }

        derive(WriteableCollection).from(Collection).extend({

            //
            // WriteableCollection Public Methods
            //

            modify: function (changes) {
                var self = this,
                    ctx = this._ctx,
                    hook = ctx.table.hook,
                    updatingHook = hook.updating.fire,
                    deletingHook = hook.deleting.fire;

                fake && typeof changes === 'function' && changes.call({ value: ctx.table.schema.instanceTemplate }, ctx.table.schema.instanceTemplate);

                return this._write(function (resolve, reject, idbstore, trans) {
                    var modifyer;
                    if (typeof changes === 'function') {
                        // Changes is a function that may update, add or delete propterties or even require a deletion the object itself (delete this.item)
                        if (updatingHook === nop && deletingHook === nop) {
                            // Noone cares about what is being changed. Just let the modifier function be the given argument as is.
                            modifyer = changes;
                        } else {
                            // People want to know exactly what is being modified or deleted.
                            // Let modifyer be a proxy function that finds out what changes the caller is actually doing
                            // and call the hooks accordingly!
                            modifyer = function (item) {
                                var origItem = deepClone(item); // Clone the item first so we can compare laters.
                                if (changes.call(this, item, this) === false) return false; // Call the real modifyer function (If it returns false explicitely, it means it dont want to modify anyting on this object)
                                if (!this.hasOwnProperty("value")) {
                                    // The real modifyer function requests a deletion of the object. Inform the deletingHook that a deletion is taking place.
                                    deletingHook.call(this, this.primKey, item, trans);
                                } else {
                                    // No deletion. Check what was changed
                                    var objectDiff = getObjectDiff(origItem, this.value);
                                    var additionalChanges = updatingHook.call(this, objectDiff, this.primKey, origItem, trans);
                                    if (additionalChanges) {
                                        // Hook want to apply additional modifications. Make sure to fullfill the will of the hook.
                                        item = this.value;
                                        keys(additionalChanges).forEach(function (keyPath) {
                                            setByKeyPath(item, keyPath, additionalChanges[keyPath]); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                        });
                                    }
                                }
                            };
                        }
                    } else if (updatingHook === nop) {
                            // changes is a set of {keyPath: value} and no one is listening to the updating hook.
                            var keyPaths = keys(changes);
                            var numKeys = keyPaths.length;
                            modifyer = function (item) {
                                var anythingModified = false;
                                for (var i = 0; i < numKeys; ++i) {
                                    var keyPath = keyPaths[i],
                                        val = changes[keyPath];
                                    if (getByKeyPath(item, keyPath) !== val) {
                                        setByKeyPath(item, keyPath, val); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                        anythingModified = true;
                                    }
                                }
                                return anythingModified;
                            };
                        } else {
                            // changes is a set of {keyPath: value} and people are listening to the updating hook so we need to call it and
                            // allow it to add additional modifications to make.
                            var origChanges = changes;
                            changes = shallowClone(origChanges); // Let's work with a clone of the changes keyPath/value set so that we can restore it in case a hook extends it.
                            modifyer = function (item) {
                                var anythingModified = false;
                                var additionalChanges = updatingHook.call(this, changes, this.primKey, deepClone(item), trans);
                                if (additionalChanges) extend(changes, additionalChanges);
                                keys(changes).forEach(function (keyPath) {
                                    var val = changes[keyPath];
                                    if (getByKeyPath(item, keyPath) !== val) {
                                        setByKeyPath(item, keyPath, val);
                                        anythingModified = true;
                                    }
                                });
                                if (additionalChanges) changes = shallowClone(origChanges); // Restore original changes for next iteration
                                return anythingModified;
                            };
                        }

                    var count = 0;
                    var successCount = 0;
                    var iterationComplete = false;
                    var failures = [];
                    var failKeys = [];
                    var currentKey = null;

                    function modifyItem(item, cursor) {
                        currentKey = cursor.primaryKey;
                        var thisContext = {
                            primKey: cursor.primaryKey,
                            value: item,
                            onsuccess: null,
                            onerror: null
                        };

                        function onerror(e) {
                            failures.push(e);
                            failKeys.push(thisContext.primKey);
                            if (thisContext.onerror) Promise.newPSD(function () {
                                Promise.PSD.trans = trans;
                                thisContext.onerror(e);
                            });
                            checkFinished();
                            return true; // Catch these errors and let a final rejection decide whether or not to abort entire transaction
                        }

                        if (modifyer.call(thisContext, item, thisContext) !== false) {
                            // If a callback explicitely returns false, do not perform the update!
                            var bDelete = !thisContext.hasOwnProperty("value");
                            ++count;
                            miniTryCatch(function () {
                                var req = bDelete ? cursor.delete() : cursor.update(thisContext.value);
                                req.onerror = eventRejectHandler(onerror, bDelete ? ["deleting", item, "from", ctx.table.name] : ["modifying", item, "on", ctx.table.name]);
                                req.onsuccess = function () {
                                    if (thisContext.onsuccess) Promise.newPSD(function () {
                                        Promise.PSD.trans = trans;
                                        thisContext.onsuccess(thisContext.value);
                                    });
                                    ++successCount;
                                    checkFinished();
                                };
                            }, onerror);
                        } else if (thisContext.onsuccess) {
                            // Hook will expect either onerror or onsuccess to always be called!
                            thisContext.onsuccess(thisContext.value);
                        }
                    }

                    function doReject(e) {
                        if (e) {
                            failures.push(e);
                            failKeys.push(currentKey);
                        }
                        return reject(new ModifyError("Error modifying one or more objects", failures, successCount, failKeys));
                    }

                    function checkFinished() {
                        if (iterationComplete && successCount + failures.length === count) {
                            if (failures.length > 0) doReject();else resolve(successCount);
                        }
                    }
                    self.clone().raw()._iterate(modifyItem, function () {
                        iterationComplete = true;
                        checkFinished();
                    }, doReject, idbstore);
                });
            },

            'delete': function () {
                var _this2 = this;

                var ctx = this._ctx,
                    range = ctx.range,
                    deletingHook = ctx.table.hook.deleting.fire,
                    hasDeleteHook = deletingHook !== nop;
                if (!hasDeleteHook && !ctx.or && !ctx.algorithm && !ctx.filter && !ctx.replayFilter && (ctx.isPrimKey && !hangsOnDeleteLargeKeyRange || !range)) // if no range, we'll use clear().
                    {
                        // May use IDBObjectStore.delete(IDBKeyRange) in this case (Issue #208)
                        // For chromium, this is the way most optimized version.
                        // For IE/Edge, this could hang the indexedDB engine and make operating system instable
                        // (https://gist.github.com/dfahlander/5a39328f029de18222cf2125d56c38f7)
                        return this._write(function (resolve, reject, idbstore) {
                            // Our API contract is to return a count of deleted items, so we have to count() before delete().
                            var onerror = eventRejectHandler(reject, ["deleting range from", ctx.table.name]),
                                countReq = range ? idbstore.count(range) : idbstore.count();
                            countReq.onerror = onerror;
                            countReq.onsuccess = function () {
                                var count = countReq.result;
                                miniTryCatch(function () {
                                    var delReq = range ? idbstore.delete(range) : idbstore.clear();
                                    delReq.onerror = onerror;
                                    delReq.onsuccess = function () {
                                        return resolve(count);
                                    };
                                }, function (err) {
                                    return reject(mapError(err));
                                });
                            };
                        });
                    }

                // Default version to use when collection is not a vanilla IDBKeyRange on the primary key.
                // Divide into chunks to not starve RAM.
                // If has delete hook, we will have to collect not just keys but also objects, so it will use
                // more memory and need lower chunk size.
                var CHUNKSIZE = hasDeleteHook ? 2000 : 10000;

                return this._write(function (resolve, reject, idbstore, trans) {
                    var totalCount = 0;
                    // Clone table and change the way transaction promises are generated.
                    // This is to be able to call other Collection methods within the same
                    // transaction even if the caller calls us without a transaction.
                    var table = Object.create(ctx.table);
                    table._tpf = trans._tpf; // Enable us to keep same transaction even if called without transaction.
                    // Clone collection and change its table and set a limit of CHUNKSIZE on the cloned Collection instance.
                    var collection = _this2.clone({
                        table: table, // Execute in same transaction
                        keysOnly: !ctx.isMatch && !hasDeleteHook }) // load just keys (unless filter() or and() or deleteHook has subscribers)
                    .distinct() // In case multiEntry is used, never delete same key twice because resulting count
                    // would become larger than actual delete count.
                    .limit(CHUNKSIZE).raw(); // Don't filter through reading-hooks (like mapped classes etc)

                    var keysOrTuples = [];

                    // We're gonna do things on as many chunks that are needed.
                    // Use recursion of nextChunk function:
                    var nextChunk = function () {
                        return collection.each(hasDeleteHook ? function (val, cursor) {
                            // Somebody subscribes to hook('deleting'). Collect all primary keys and their values,
                            // so that the hook can be called with its values in bulkDelete().
                            keysOrTuples.push([cursor.primaryKey, cursor.value]);
                        } : function (val, cursor) {
                            // No one subscribes to hook('deleting'). Collect only primary keys:
                            keysOrTuples.push(cursor.primaryKey);
                        }).then(function () {
                            // Chromium deletes faster when doing it in sort order.
                            hasDeleteHook ? keysOrTuples.sort(function (a, b) {
                                return ascending(a[0], b[0]);
                            }) : keysOrTuples.sort(ascending);
                            return bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook);
                        }).then(function () {
                            var count = keysOrTuples.length;
                            totalCount += count;
                            keysOrTuples = [];
                            return count < CHUNKSIZE ? totalCount : nextChunk();
                        });
                    };

                    resolve(nextChunk());
                });
            }
        });

        //
        //
        //
        // ------------------------- Help functions ---------------------------
        //
        //
        //

        function lowerVersionFirst(a, b) {
            return a._cfg.version - b._cfg.version;
        }

        function setApiOnPlace(objs, transactionPromiseFactory, tableNames, mode, dbschema, enableProhibitedDB) {
            tableNames.forEach(function (tableName) {
                var tableInstance = db._tableFactory(mode, dbschema[tableName], transactionPromiseFactory);
                objs.forEach(function (obj) {
                    if (!obj[tableName]) {
                        if (enableProhibitedDB) {
                            setProp(obj, tableName, {
                                get: function () {
                                    var currentTrans = Promise.PSD && Promise.PSD.trans;
                                    if (currentTrans && currentTrans.db === db) {
                                        return currentTrans.tables[tableName];
                                    }
                                    return tableInstance;
                                }
                            }, { enumerable: true });
                        } else {
                            obj[tableName] = tableInstance;
                        }
                    }
                });
            });
        }

        function removeTablesApi(objs) {
            objs.forEach(function (obj) {
                for (var key in obj) {
                    if (obj[key] instanceof Table) delete obj[key];
                }
            });
        }

        function iterate(req, filter, fn, resolve, reject, valueFilter) {
            valueFilter = valueFilter || mirror;
            if (!req.onerror) req.onerror = eventRejectHandler(reject);
            if (filter) {
                req.onsuccess = trycatch(function filter_record() {
                    var cursor = req.result;
                    if (cursor) {
                        var c = function () {
                            cursor.continue();
                        };
                        if (filter(cursor, function (advancer) {
                            c = advancer;
                        }, resolve, reject)) fn(valueFilter(cursor.value), cursor, function (advancer) {
                            c = advancer;
                        });
                        c();
                    } else {
                        resolve();
                    }
                }, reject);
            } else {
                req.onsuccess = trycatch(function filter_record() {
                    var cursor = req.result;
                    if (cursor) {
                        var c = function () {
                            cursor.continue();
                        };
                        fn(valueFilter(cursor.value), cursor, function (advancer) {
                            c = advancer;
                        });
                        c();
                    } else {
                        resolve();
                    }
                }, reject);
            }
        }

        function parseIndexSyntax(indexes) {
            /// <param name="indexes" type="String"></param>
            /// <returns type="Array" elementType="IndexSpec"></returns>
            var rv = [];
            indexes.split(',').forEach(function (index) {
                index = index.trim();
                var name = index.replace("&", "").replace("++", "").replace("*", "");
                var keyPath = name.indexOf('[') !== 0 ? name : index.substring(index.indexOf('[') + 1, index.indexOf(']')).split('+');

                rv.push(new IndexSpec(name, keyPath || null, index.indexOf('&') !== -1, index.indexOf('*') !== -1, index.indexOf("++") !== -1, isArray(keyPath), keyPath.indexOf('.') !== -1));
            });
            return rv;
        }

        function cmp(key1, key2) {
            return indexedDB.cmp(key1, key2);
        }

        function min(a, b) {
            return cmp(a, b) < 0 ? a : b;
        }

        function max(a, b) {
            return cmp(a, b) > 0 ? a : b;
        }

        function ascending(a, b) {
            return indexedDB.cmp(a, b);
        }

        function descending(a, b) {
            return indexedDB.cmp(b, a);
        }

        function simpleCompare(a, b) {
            return a < b ? -1 : a === b ? 0 : 1;
        }

        function simpleCompareReverse(a, b) {
            return a > b ? -1 : a === b ? 0 : 1;
        }

        function combine(filter1, filter2) {
            return filter1 ? filter2 ? function () {
                return filter1.apply(this, arguments) && filter2.apply(this, arguments);
            } : filter1 : filter2;
        }

        function readGlobalSchema() {
            db.verno = idbdb.version / 10;
            db._dbSchema = globalSchema = {};
            dbStoreNames = slice(idbdb.objectStoreNames, 0);
            if (dbStoreNames.length === 0) return; // Database contains no stores.
            var trans = idbdb.transaction(safariMultiStoreFix(dbStoreNames), 'readonly');
            dbStoreNames.forEach(function (storeName) {
                var store = trans.objectStore(storeName),
                    keyPath = store.keyPath,
                    dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
                var primKey = new IndexSpec(keyPath, keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== 'string', dotted);
                var indexes = [];
                for (var j = 0; j < store.indexNames.length; ++j) {
                    var idbindex = store.index(store.indexNames[j]);
                    keyPath = idbindex.keyPath;
                    dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
                    var index = new IndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== 'string', dotted);
                    indexes.push(index);
                }
                globalSchema[storeName] = new TableSchema(storeName, primKey, indexes, {});
            });
            setApiOnPlace([allTables], db._transPromiseFactory, keys(globalSchema), READWRITE, globalSchema);
        }

        function adjustToExistingIndexNames(schema, idbtrans) {
            /// <summary>
            /// Issue #30 Problem with existing db - adjust to existing index names when migrating from non-dexie db
            /// </summary>
            /// <param name="schema" type="Object">Map between name and TableSchema</param>
            /// <param name="idbtrans" type="IDBTransaction"></param>
            var storeNames = idbtrans.db.objectStoreNames;
            for (var i = 0; i < storeNames.length; ++i) {
                var storeName = storeNames[i];
                var store = idbtrans.objectStore(storeName);
                for (var j = 0; j < store.indexNames.length; ++j) {
                    var indexName = store.indexNames[j];
                    var keyPath = store.index(indexName).keyPath;
                    var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
                    if (schema[storeName]) {
                        var indexSpec = schema[storeName].idxByName[dexieName];
                        if (indexSpec) indexSpec.name = indexName;
                    }
                }
            }
        }

        function fireOnBlocked(ev) {
            db.on("blocked").fire(ev);
            // Workaround (not fully*) for missing "versionchange" event in IE,Edge and Safari:
            connections.filter(function (c) {
                return c.name === db.name && c !== db && !c._vcFired;
            }).map(function (c) {
                return c.on("versionchange").fire(ev);
            });
        }

        extend(this, {
            Collection: Collection,
            Table: Table,
            Transaction: Transaction,
            Version: Version,
            WhereClause: WhereClause,
            WriteableCollection: WriteableCollection,
            WriteableTable: WriteableTable
        });

        init();

        addons.forEach(function (fn) {
            fn(db);
        });
    }

    var fakeAutoComplete = function () {}; // Will never be changed. We just fake for the IDE that we change it (see doFakeAutoComplete())
    var fake = false; // Will never be changed. We just fake for the IDE that we change it (see doFakeAutoComplete())

    function trycatch(fn, reject) {
        var psd = Promise.PSD;
        return function () {
            var outerPSD = Promise.PSD; // Support Promise-specific data (PSD) in callback calls
            Promise.PSD = psd;
            try {
                fn.apply(this, arguments);
            } catch (e) {
                reject(e);
            } finally {
                Promise.PSD = outerPSD;
            }
        };
    }

    function parseType(type) {
        if (typeof type === 'function') {
            return new type();
        } else if (isArray(type)) {
            return [parseType(type[0])];
        } else if (type && typeof type === 'object') {
            var rv = {};
            applyStructure(rv, type);
            return rv;
        } else {
            return type;
        }
    }

    function applyStructure(obj, structure) {
        keys(structure).forEach(function (member) {
            var value = parseType(structure[member]);
            obj[member] = value;
        });
        return obj;
    }

    function eventRejectHandler(reject, sentance) {
        return function (event) {
            var errObj = event && event.target.error || new Error("");
            if (sentance) {
                var occurredWhen = " occurred when " + sentance.map(function (word) {
                    switch (typeof word) {
                        case 'function':
                            return word();
                        case 'string':
                            return word;
                        default:
                            return JSON.stringify(word);
                    }
                }).join(" ");
                if (errObj.message && errObj.message != errObj.name) occurredWhen += ". " + errObj.message;
                if (errObj.name) {
                    errObj = mapError(errObj, errObj.name + occurredWhen);
                } else {
                    // Non-standard exceptions from IndexedDBPolyfill
                    errObj = errObj + occurredWhen;
                }
            }
            reject(errObj);

            if (event) {
                // Old versions of IndexedDBShim doesnt provide an error event
                // Stop error from propagating to IDBTransaction. Let us handle that manually instead.
                if (event.stopPropagation) // IndexedDBShim doesnt support this
                    event.stopPropagation();
                if (event.preventDefault) // IndexedDBShim doesnt support this
                    event.preventDefault();
            }

            return false;
        };
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    function globalDatabaseList(cb) {
        var val,
            localStorage = Dexie.dependencies.localStorage;
        if (!localStorage) return cb([]); // Envs without localStorage support
        try {
            val = JSON.parse(localStorage.getItem('Dexie.DatabaseNames') || "[]");
        } catch (e) {
            val = [];
        }
        if (cb(val)) {
            localStorage.setItem('Dexie.DatabaseNames', JSON.stringify(val));
        }
    }

    function awaitIterable(iterable) {
        var callNext = function (result) {
            return iterable.next(result);
        },
            doThrow = function (error) {
            return iterable.throw(error);
        },
            onSuccess = step(callNext),
            onError = step(doThrow);

        function step(getNext) {
            return function (val) {
                var next = getNext(val),
                    value = next.value;

                return next.done ? value : !value || typeof value.then !== 'function' ? Array.isArray(value) ? awaitAll(value, 0) : onSuccess(value) : value.then(onSuccess, onError);
            };
        }

        function awaitAll(values, i) {
            if (i === values.length) return onSuccess(values);
            var value = values[i];
            return value.constructor && typeof value.constructor.all == 'function' ? value.constructor.all(values).then(onSuccess, onError) : awaitAll(values, i + 1);
        }

        return step(callNext)();
    }

    //
    // IndexSpec struct
    //
    function IndexSpec(name, keyPath, unique, multi, auto, compound, dotted) {
        /// <param name="name" type="String"></param>
        /// <param name="keyPath" type="String"></param>
        /// <param name="unique" type="Boolean"></param>
        /// <param name="multi" type="Boolean"></param>
        /// <param name="auto" type="Boolean"></param>
        /// <param name="compound" type="Boolean"></param>
        /// <param name="dotted" type="Boolean"></param>
        this.name = name;
        this.keyPath = keyPath;
        this.unique = unique;
        this.multi = multi;
        this.auto = auto;
        this.compound = compound;
        this.dotted = dotted;
        var keyPathSrc = typeof keyPath === 'string' ? keyPath : keyPath && '[' + [].join.call(keyPath, '+') + ']';
        this.src = (unique ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + keyPathSrc;
    }

    //
    // TableSchema struct
    //
    function TableSchema(name, primKey, indexes, instanceTemplate) {
        /// <param name="name" type="String"></param>
        /// <param name="primKey" type="IndexSpec"></param>
        /// <param name="indexes" type="Array" elementType="IndexSpec"></param>
        /// <param name="instanceTemplate" type="Object"></param>
        this.name = name;
        this.primKey = primKey || new IndexSpec();
        this.indexes = indexes || [new IndexSpec()];
        this.instanceTemplate = instanceTemplate;
        this.mappedClass = null;
        this.idxByName = indexes.reduce(function (hashSet, index) {
            hashSet[index.name] = index;
            return hashSet;
        }, {});
    }

    //
    // Static delete() method.
    //
    Dexie.delete = function (databaseName) {
        var db = new Dexie(databaseName),
            promise = db.delete();
        promise.onblocked = function (fn) {
            db.on("blocked", fn);
            return this;
        };
        return promise;
    };

    //
    // Static exists() method.
    //
    Dexie.exists = function (name) {
        return new Dexie(name).open().then(function (db) {
            db.close();
            return true;
        }).catch(Dexie.NoSuchDatabaseError, function () {
            return false;
        });
    };

    //
    // Static method for retrieving a list of all existing databases at current host.
    //
    Dexie.getDatabaseNames = function (cb) {
        return new Promise(function (resolve, reject) {
            var getDatabaseNames = getNativeGetDatabaseNamesFn(indexedDB);
            if (getDatabaseNames) {
                // In case getDatabaseNames() becomes standard, let's prepare to support it:
                var req = getDatabaseNames();
                req.onsuccess = function (event) {
                    resolve(slice(event.target.result, 0)); // Converst DOMStringList to Array<String>
                };
                req.onerror = eventRejectHandler(reject);
            } else {
                globalDatabaseList(function (val) {
                    resolve(val);
                    return false;
                });
            }
        }).then(cb);
    };

    Dexie.defineClass = function (structure) {
        /// <summary>
        ///     Create a javascript constructor based on given template for which properties to expect in the class.
        ///     Any property that is a constructor function will act as a type. So {name: String} will be equal to {name: new String()}.
        /// </summary>
        /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
        /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>

        // Default constructor able to copy given properties into this object.
        function Class(properties) {
            /// <param name="properties" type="Object" optional="true">Properties to initialize object with.
            /// </param>
            properties ? extend(this, properties) : fake && applyStructure(this, structure);
        }
        return Class;
    };

    Dexie.applyStructure = applyStructure;

    Dexie.ignoreTransaction = function (scopeFunc) {
        // In case caller is within a transaction but needs to create a separate transaction.
        // Example of usage:
        //
        // Let's say we have a logger function in our app. Other application-logic should be unaware of the
        // logger function and not need to include the 'logentries' table in all transaction it performs.
        // The logging should always be done in a separate transaction and not be dependant on the current
        // running transaction context. Then you could use Dexie.ignoreTransaction() to run code that starts a new transaction.
        //
        //     Dexie.ignoreTransaction(function() {
        //         db.logentries.add(newLogEntry);
        //     });
        //
        // Unless using Dexie.ignoreTransaction(), the above example would try to reuse the current transaction
        // in current Promise-scope.
        //
        // An alternative to Dexie.ignoreTransaction() would be setImmediate() or setTimeout(). The reason we still provide an
        // API for this because
        //  1) The intention of writing the statement could be unclear if using setImmediate() or setTimeout().
        //  2) setTimeout() would wait unnescessary until firing. This is however not the case with setImmediate().
        //  3) setImmediate() is not supported in the ES standard.
        return Promise.newPSD(function () {
            Promise.PSD.trans = null;
            return scopeFunc();
        });
    };

    Dexie.vip = function (fn) {
        // To be used by subscribers to the on('ready') event.
        // This will let caller through to access DB even when it is blocked while the db.ready() subscribers are firing.
        // This would have worked automatically if we were certain that the Provider was using Dexie.Promise for all asyncronic operations. The promise PSD
        // from the provider.connect() call would then be derived all the way to when provider would call localDatabase.applyChanges(). But since
        // the provider more likely is using non-promise async APIs or other thenable implementations, we cannot assume that.
        // Note that this method is only useful for on('ready') subscribers that is returning a Promise from the event. If not using vip()
        // the database could deadlock since it wont open until the returned Promise is resolved, and any non-VIPed operation started by
        // the caller will not resolve until database is opened.
        return Promise.newPSD(function () {
            Promise.PSD.letThrough = true; // Make sure we are let through if still blocking db due to onready is firing.
            return fn();
        });
    };

    Dexie.async = function (generatorFn) {
        return function () {
            try {
                var rv = awaitIterable(generatorFn.apply(this, arguments));
                if (!rv || typeof rv.then !== 'function') return Dexie.Promise.resolve(rv);
                return rv;
            } catch (e) {
                return Dexie.Promise.reject(e);
            }
        };
    };

    Dexie.spawn = function (generatorFn, args, thiz) {
        try {
            var rv = awaitIterable(generatorFn.apply(thiz, args || []));
            if (!rv || typeof rv.then !== 'function') return Dexie.Promise.resolve(rv);
            return rv;
        } catch (e) {
            return Dexie.Promise.reject(e);
        }
    };

    // Dexie.currentTransaction property. Only applicable for transactions entered using the new "transact()" method.
    setProp(Dexie, "currentTransaction", {
        get: function () {
            /// <returns type="Transaction"></returns>
            return Promise.PSD && Promise.PSD.trans || null;
        }
    });

    function safariMultiStoreFix(storeNames) {
        return storeNames.length === 1 ? storeNames[0] : storeNames;
    }

    // Export our Promise implementation since it can be handy as a standalone Promise implementation
    Dexie.Promise = Promise;
    // Export our derive/extend/override methodology
    Dexie.derive = derive;
    Dexie.extend = extend;
    Dexie.extendProto = extendProto;
    Dexie.override = override;
    // Export our Events() function - can be handy as a toolkit
    Dexie.Events = Dexie.events = Events; // Backward compatible lowercase version.
    // Utilities
    Dexie.getByKeyPath = getByKeyPath;
    Dexie.setByKeyPath = setByKeyPath;
    Dexie.delByKeyPath = delByKeyPath;
    Dexie.shallowClone = shallowClone;
    Dexie.deepClone = deepClone;
    Dexie.addons = [];
    Dexie.fakeAutoComplete = fakeAutoComplete;
    Dexie.asap = asap;
    Dexie.maxKey = maxKey;
    Dexie.connections = connections;
    Dexie.dump = messageAndStack;

    // Export Error classes
    extend(Dexie, fullNameExceptions); // Dexie.XXXError = class XXXError {...};
    Dexie.MultiModifyError = Dexie.ModifyError; // Backward compatibility 0.9.8
    Dexie.errnames = errnames;

    // Export other static classes
    Dexie.IndexSpec = IndexSpec;
    Dexie.TableSchema = TableSchema;

    //
    // Dependencies
    //
    // These will automatically work in browsers with indexedDB support, or where an indexedDB polyfill has been included.
    //
    // In node.js, however, these properties must be set "manually" before instansiating a new Dexie(). For node.js, you need to require indexeddb-js or similar and then set these deps.
    //
    var idbshim = _global.idbModules && _global.idbModules.shimIndexedDB ? _global.idbModules : {};
    Dexie.dependencies = {
        // Required:
        indexedDB: idbshim.shimIndexedDB || _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
        IDBKeyRange: idbshim.IDBKeyRange || _global.IDBKeyRange || _global.webkitIDBKeyRange
    };
    miniTryCatch(function () {
        // Optional dependencies
        // localStorage
        Dexie.dependencies.localStorage = (typeof chrome !== "undefined" && chrome !== null ? chrome.storage : void 0) != null ? null : _global.localStorage;
    });

    // API Version Number: Type Number, make sure to always set a version number that can be comparable correctly. Example: 0.9, 0.91, 0.92, 1.0, 1.01, 1.1, 1.2, 1.21, etc.
    Dexie.semVer = "1.3.6";
    Dexie.version = Dexie.semVer.split('.').map(function (n) {
        return parseInt(n);
    }).reduce(function (p, c, i) {
        return p + c / Math.pow(10, i * 2);
    });

    function getNativeGetDatabaseNamesFn(indexedDB) {
        var fn = indexedDB && (indexedDB.getDatabaseNames || indexedDB.webkitGetDatabaseNames);
        return fn && fn.bind(indexedDB);
    }

    // Fool IDE to improve autocomplete. Tested with Visual Studio 2013 and 2015.
    doFakeAutoComplete(function () {
        Dexie.fakeAutoComplete = fakeAutoComplete = doFakeAutoComplete;
        Dexie.fake = fake = true;
    });

    // https://github.com/dfahlander/Dexie.js/issues/186
    // typescript compiler tsc in mode ts-->es5 & commonJS, will expect require() to return
    // x.default. Workaround: Set Dexie.default = Dexie.
    Dexie.default = Dexie;

    return Dexie;

}));
//# sourceMappingURL=dexie.js.map