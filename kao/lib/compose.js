const compose = middleware => {
  if (!Array.isArray(middleware))
    throw new TypeError("中间件stack必须是一个数组");

  for (let m of middleware) {
    if (typeof m !== "function") {
      throw new TypeError("中间件必须是一个函数");
    }
  }

  return function(ctx, next) {
    let index = -1;
    return dispatch(0);

    function dispatch(i) {
      if (i <= index) return Promise.reject("bbb");
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) Promise.resolve();

      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
};

module.exports = compose;
