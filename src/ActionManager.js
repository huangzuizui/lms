const compose = require('./utils/compose').default;

class ActionManager {
  constructor(initContext) {
    this.actions = [];
    this.ctx = {
      ...initContext,
    }
  }

  addAction(action) {
    if (typeof action !== 'function') {
      throw new Error('Action must be a function');
    }
    this.actions.push(action);
  }

  removeAction(action) {
    this.actions = this.actions.filter(a => a !== action);
  }

  run(actionType) {
    return (...args) => {
      this.ctx.actionType = actionType;
      this.ctx.args = args;

      const composedActions = compose(this.actions);
      return composedActions(this.ctx);
    }
  }
}

exports.default = ActionManager;