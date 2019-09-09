# personal-blog-refactoring
个人博客项目重构，原生写node服务端和web端

本来是要用原生node API 来重构博客的，后来突发奇想，koa框架那么优秀，为什么不学习以下呢？于是就有了这个“挂着羊头卖狗肉”的项目了。

目录中的 kao 和 kao-router 参考了koa 和 koa-router 源码，实现了 koa中 对 node request,response 的封装，以及 context 上下文;

不得不说，koa里的 洋葱卷模型 这个需要好好理解以下，还有 compose 对于整体理解koa 的实现核心思路 非常有帮助。

kao-router 实现了 get/post/put/option/delete 方法；以及 router.routes() 核心方法等；个人觉得理解koa-router 的 重点在于理解 router.routes()。

不啰嗦了，意思都在代码里。

