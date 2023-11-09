const compose = (middlewares) => {
  if (!Array.isArray(middlewares)) {
    throw new Error('Middlewares must be an array');
  }
  if (middlewares.some(middleware => typeof middleware !== 'function')) {
    throw new Error('Middleware must be a function');
  }

  return (ctx) => {
    let index = -1;
    const dispatch = (i) => {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middlewares[i];
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  }
}

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