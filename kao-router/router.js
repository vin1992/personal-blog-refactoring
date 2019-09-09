const methods = require("methods");
const compose = require("../kao/lib/compose");
const Layer = require("./layer");

module.exports = Router;

function Router() {
  if (!(this instanceof Router)) {
    return new Router();
  }
  this.stack = [];
}

methods.forEach(method => {
  Router.prototype[method] = function(path, middleware) {
    this.register(path, method, middleware);
    return this;
  };
});

Router.prototype.register = function(path, method, middleware) {
  var stack = this.stack;
  var router;
  console.log(path, method, middleware);
  router = new Layer(path, method, middleware);

  stack.push(router);

  return this;
};

Router.prototype.routes = function() {
  var router = this;
  var dispatch = function dispatch(ctx, next) {
    var path = ctx.path;
    var matched = router.match(path, ctx.method);

    if (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path);
    } else {
      ctx.matched = matched.path;
    }

    ctx.router = router;

    if (!matched.route) return next();

    var matchedLayer = matched.pathAndMethod;
    var mostSpecificLayer = matchedLayer[matchedLayer.length - 1];
    ctx._matchedRoute = mostSpecificLayer.path;

    layerChain = matchedLayer.reduce(function(acc, layer) {
      return [].concat(layer.stack);
    }, []);
    return compose(layerChain)(ctx, next);
  };

  dispatch.router = router;

  return dispatch;
};

Router.prototype.match = function(path, method) {
  var layers = this.stack;
  var layer;

  var matched = {
    path: [],
    pathAndMethod: [],
    route: false
  };

  for (let i = 0; i < layers.length; i++) {
    layer = layers[i];

    if (layer.match(path)) {
      matched.path.push(layer);
      console.log(layer.methods, method, ~layer.methods.indexOf(method));
      if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
        matched.pathAndMethod.push(layer);
        if (layer.methods.length > 0) {
          matched.route = true;
        }
      }
    }
  }

  return matched;
};
