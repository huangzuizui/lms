"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Data = /** @class */ (function () {
    function Data() {
        this.table = [];
        this.id = 0;
    }
    Data.prototype.add = function (datum) {
        if (Object.prototype.toString.call(datum) !== '[object Object]')
            return new Error('Data must be an object literal.');
        var newDatum = __assign({ id: this.id++ }, datum);
        this.table.push(newDatum);
        return newDatum;
    };
    Data.prototype.removeById = function (id) {
        var removedDatum;
        this.table = this.table.filter(function (datum) {
            if (datum.id === id) {
                removedDatum = datum;
                return false;
            }
            return true;
        });
        return removedDatum;
    };
    Data.prototype.updateById = function (id, partialDatum) {
        var newDatum;
        this.table = this.table.map(function (d) {
            if (d.id === id) {
                newDatum = __assign(__assign({}, d), partialDatum);
                return newDatum;
            }
            else {
                return d;
            }
        });
        return newDatum;
    };
    Data.prototype.list = function () {
        return this.table;
    };
    Data.prototype.find = function (condition) {
        if (Object.prototype.toString.call(condition) !== '[object Object]')
            return new Error('Condition must be an object literal.');
        // remove key with undefined value
        var fixedCondition = Object.entries(condition).reduce(function (acc, _a) {
            var key = _a[0], value = _a[1];
            if (value !== undefined) {
                // @ts-ignore-next-line
                acc[key] = value;
            }
            return acc;
        }, {});
        if (Object.keys(fixedCondition).length === 0)
            return [];
        return this.table.filter(function (datum) {
            for (var key in fixedCondition) {
                if (datum[key] !== condition[key]) {
                    return false;
                }
            }
            return true;
        });
    };
    return Data;
}());
exports.default = Data;
