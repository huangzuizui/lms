const compose = require('../src/utils/compose').default;
describe('Test compose', () => {
  it('should compose middleware', () => {
    const middleware1 = async (ctx, next) => {
      ctx.arr.push(1);
      await next();
      ctx.arr.push(6);
    }
    const middleware2 = async (ctx, next) => {
      ctx.arr.push(2);
      await next();
      ctx.arr.push(5);
    }
    const middleware3 = async (ctx, next) => {
      ctx.arr.push(3);
      await next();
      ctx.arr.push(4);
    }
    const ctx = { arr: [] };
    const composed = compose([middleware1, middleware2, middleware3]);
    composed(ctx).then(() => {
      expect(ctx.arr).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  it('should throw error when middlewares is not an array', () => {
    const errorMessage = 'Middlewares must be an array';
    const error = () => compose();
    expect(error).toThrowError(errorMessage);
    const error1 = () => compose('abc');
    expect(error1).toThrowError(errorMessage);
    const error2 = () => compose(123);
    expect(error2).toThrowError(errorMessage);
    const error3 = () => compose({});
    expect(error3).toThrowError(errorMessage);
    const error4 = () => compose(() => {});
    expect(error4).toThrowError(errorMessage);
  });

  it('should throw error when middlewares is not an array of functions', () => {
    const errorMessage = 'Middleware must be a function';
    const error = () => compose([() => {}, 'abc']);
    expect(error).toThrowError(errorMessage);
    const error1 = () => compose([() => {}, 123]);
    expect(error1).toThrowError(errorMessage);
    const error2 = () => compose([() => {}, {}]);
    expect(error2).toThrowError(errorMessage);
    const error3 = () => compose([() => {}, () => {}]);
    expect(error3).not.toThrowError(errorMessage);
  });

  it('should throw error when next() called multiple times', () => {
    const middleware1 = async (ctx, next) => {
      ctx.arr.push(1);
      await next();
      ctx.arr.push(6);
      await next();
    }
    const middleware2 = async (ctx, next) => {
      ctx.arr.push(2);
      await next();
      ctx.arr.push(5);
    }
    const middleware3 = async (ctx, next) => {
      ctx.arr.push(3);
      await next();
      ctx.arr.push(4);
    }
    const ctx = { arr: [] };
    const composed = compose([middleware1, middleware2, middleware3]);
    composed(ctx).catch((err) => {
      expect(err.message).toEqual('next() called multiple times');
    });
  });

  it('should success when next() not called', () => {
    const middleware1 = async (ctx, next) => {
      ctx.arr.push(1);
    }
    const middleware2 = async (ctx, next) => {
      ctx.arr.push(2);
    }
    const middleware3 = async (ctx, next) => {
      ctx.arr.push(3);
    }
    const ctx = { arr: [] };
    const composed = compose([middleware1, middleware2, middleware3]);
    composed(ctx).then(() => {
      expect(ctx.arr).toEqual([1]);
    });
  });
});