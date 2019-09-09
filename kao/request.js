// 代理node 原生对象 req
const parse = require("parseurl");
const stringify = require("url").format;

module.exports = {
  get url() {
    return this.req.url;
  },

  set url(val) {
    this.req.url = val;
  },
  get method() {
    return this.req.method;
  },

  set method(val) {
    this.req.method = val;
  },
  get path() {
    return parse(this.req).pathname;
  },

  /**
   * Set pathname, retaining the query-string when present.
   *
   * @param {String} path
   * @api public
   */

  set path(path) {
    const url = parse(this.req);
    if (url.pathname === path) return;

    url.pathname = path;
    url.path = null;

    this.url = stringify(url);
  }
};
