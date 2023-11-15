type TMiddlewares = Array<(ctx: any, next: () => Promise<any>) => Promise<any>>;
const compose = (middlewares: TMiddlewares) => {
  if (!Array.isArray(middlewares)) {
    throw new Error('Middlewares must be an array');
  }
  if (middlewares.some(middleware => typeof middleware !== 'function')) {
    throw new Error('Middleware must be a function');
  }

  return (ctx: any) => {
    let index = -1;
    const dispatch = (i: number): any => {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middlewares[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
    }
    return dispatch(0);
  }
}

export default compose;