// 将 request 和 response 的 对象属性 代理到 context 上 方便操作
const delegate = require("delegates");

const proto = (module.exports = {});

delegate(proto, "request")
  .access("url")
  .access("method")
  .access("path");
delegate(proto, "response").access("status");
