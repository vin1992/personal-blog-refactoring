const port = 3001;

const Kao = require("./kao/application");
const Router = require("./kao-router/router");

const app = new Kao();
const router = new Router();

// 注册路由的
router.get("/", (ctx, next) => {
  // todo
  ctx.status = 200;
  ctx.body = "hello world";
});

router.get("/node", (ctx, next) => {
  ctx.status = 200;
  ctx.body = "hello node";
});

app.use(router.routes());

app.listen(port, () => {
  console.log(`本地服务已启动，端口号: ${port}`);
});

/* 

let template = ``;

let tpl_path = "./view/index.html";

fs.readFile(tpl_path, (err, data) => {
  if (err) throw err;
  template = data.toString();
});

// template = fs.readFileSync(tpl_path);

http
  .createServer((req, res) => {
    // res.setHeader("Content-type", "text/html");
    // res.setEncoding("utf8");
    console.log(req.url);
    if (req.url == "/") {
      res.writeHead(200, { "Content-type": "text/html;charset=utf8" });
      res.write(template);
      res.end("中国");
    } else {
      res.writeHead(200, { "Content-type": "text/html;charset=utf8" });
      res.write(template);
      res.end("美国");
    }
  })
  .listen(1024, () => {
    console.log("服务成功被启动");
  }); */
