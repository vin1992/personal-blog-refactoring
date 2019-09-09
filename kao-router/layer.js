var pathToRegExp = require("path-to-regexp");

module.exports = Layer;

function Layer(path, method, middleware) {
  this.path = path;
  this.methods = [];
  this.stack = Array.isArray(middleware) ? middleware : [middleware];

  this.methods = [method].map(m => m.toUpperCase());
  this.regpath = pathToRegExp(path);
}

Layer.prototype.match = function(path) {
  return this.regpath.test(path);
};
