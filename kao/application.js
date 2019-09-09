const http = require("http");
const compose = require("./lib/compose");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Kao {
  constructor() {
    // super();
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  callback() {
    console.log(this.middleware);
    const fn = compose(this.middleware);

    const handler = (req, res) => {
      let ctx = this.createContext(req, res);
      this.handleRquest(ctx, fn);
    };

    return handler;
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = (context.request = Object.create(this.request));
    const response = (context.response = Object.create(this.response));

    context.app = request.app = response.app = this;
    context.res = request.res = response.res = res;
    context.req = request.req = response.req = req;

    request.response = response;
    response.request = request;
    request.ctx = response.ctx = context;

    context.orginalUrl = req.orginalUrl = req.url;
    context.state = {};
    return context;
  }

  handleRquest(ctx, fn) {
    console.log(fn.toString(), "fn");
    const onerror = err => {
      throw new Error(err);
    };

    const handleResponse = () => respond(ctx);
    return fn(ctx)
      .then(handleResponse)
      .catch(onerror);
  }

  use(fn) {
    this.middleware.push(fn);
    return this;
  }
}

function respond(ctx) {
  // ...
  const res = ctx.res;
  const body = ctx.body;
  res.end(body);
}

module.exports = Kao;
