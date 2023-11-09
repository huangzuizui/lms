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
      return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
    }
    return dispatch(0);
  }
}

exports.default = compose;