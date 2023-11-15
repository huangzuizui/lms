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
var compose_1 = require("./utils/compose");
var ActionManager = /** @class */ (function () {
    function ActionManager(initContext) {
        this.actions = [];
        this.ctx = __assign({}, initContext);
    }
    ActionManager.prototype.addAction = function (action) {
        if (typeof action !== 'function') {
            throw new Error('Action must be a function');
        }
        this.actions.push(action);
    };
    ActionManager.prototype.removeAction = function (action) {
        this.actions = this.actions.filter(function (a) { return a !== action; });
    };
    ActionManager.prototype.run = function (actionType) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.ctx.actionType = actionType;
            _this.ctx.args = args;
            var composedActions = (0, compose_1.default)(_this.actions);
            return composedActions(_this.ctx);
        };
    };
    return ActionManager;
}());
exports.default = ActionManager;
