// @ts-nocheck
import ActionManager from '../src/ActionManager';

describe('Test ActionManager', () => {
  it('should success add only functions action', () => {
    const actionManager = new ActionManager();
    const action = () => {
    };
    actionManager.addAction(action);
    expect(actionManager.actions).toEqual([action]);

    const action1 = {};
    const error = () => actionManager.addAction(action1);
    expect(error).toThrowError('Action must be a function');
  });

  it('should success run functions action', () => {
    const actionManager = new ActionManager({
      list: [0]
    });
    // @ts-ignore-begin
    const action1 = (ctx, next) => {
      ctx.list.push(1);
      next();
      return ctx;
    };
    const action2 = (ctx, next) => {
      ctx.list.push(2);
      next();
    };
    const action3 = (ctx, next) => {
      ctx.list.push(3);
      next();
    };
    actionManager.addAction(action1);
    actionManager.addAction(action2);
    actionManager.addAction(action3);
    actionManager.run()().then((ctx) => {
      expect(ctx.list).toEqual([0, 1, 2, 3]);
    })
    // @ts-ignore-end
  });

  it('should success remove action', () => {
    // @ts-ignore-begin
    const actionManager = new ActionManager({
      list: [0]
    });
    const action1 = (ctx, next) => {
      ctx.list.push(1);
      next();
      return ctx;
    };
    const action2 = (ctx, next) => {
      ctx.list.push(2);
      next();
    };
    const action3 = (ctx, next) => {
      ctx.list.push(3);
      next();
    };
    actionManager.addAction(action1);
    actionManager.addAction(action2);
    actionManager.addAction(action3);
    actionManager.removeAction(action2);
    actionManager.run()().then((ctx) => {
      expect(ctx.list).toEqual([0, 1, 3]);
    })
    // @ts-ignore-end
  });

  it('should success run action with args', () => {
    const actionManager = new ActionManager();
    const action1 = (ctx, next) => {
      console.log('args', ctx.args);
    };
    actionManager.addAction(action1);
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
    });
    actionManager.run()('foo', 'bar');
    expect(consoleLogSpy).toHaveBeenCalledWith('args', ['foo', 'bar']);
    consoleLogSpy.mockRestore();
  })

  it('should success run action with action type', () => {
    const actionManager = new ActionManager();
    const action1 = (ctx, next) => {
      console.log('actionType', ctx.actionType);
    };
    actionManager.addAction(action1);
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
    });
    actionManager.run('foo')();
    expect(consoleLogSpy).toHaveBeenCalledWith('actionType', 'foo');
    consoleLogSpy.mockRestore();
  })
});