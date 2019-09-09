// 代理 node 原生response 对象
module.exports = {
  get status() {
    return this.res.statusCode;
  },

  set status(code) {
    this.res.statusCode = code;
  }
};
