"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compose = function (middlewares) {
    if (!Array.isArray(middlewares)) {
        throw new Error('Middlewares must be an array');
    }
    if (middlewares.some(function (middleware) { return typeof middleware !== 'function'; })) {
        throw new Error('Middleware must be a function');
    }
    return function (ctx) {
        var index = -1;
        var dispatch = function (i) {
            if (i <= index)
                return Promise.reject(new Error('next() called multiple times'));
            index = i;
            var fn = middlewares[i];
            if (!fn)
                return Promise.resolve();
            return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
        };
        return dispatch(0);
    };
};
exports.default = compose;
