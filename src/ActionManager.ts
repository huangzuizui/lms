import compose from './utils/compose';

type TContext = {
  actionType?: string;
  args?: any[];
  [key: string]: any;
}
type TNext = () => Promise<any>;
type TAction = (ctx: TContext, next: TNext) => any;

class ActionManager {
  actions: TAction[];
  ctx: TContext;
  constructor(initContext?: TContext) {
    this.actions = [];
    this.ctx = {
      ...initContext,
    }
  }

  addAction(action: TAction) {
    if (typeof action !== 'function') {
      throw new Error('Action must be a function');
    }
    this.actions.push(action);
  }

  removeAction(action: TAction) {
    this.actions = this.actions.filter(a => a !== action);
  }

  run(actionType: string) {
    return (...args: any[]) => {
      this.ctx.actionType = actionType;
      this.ctx.args = args;

      const composedActions = compose(this.actions);
      return composedActions(this.ctx);
    }
  }
}

export default ActionManager;