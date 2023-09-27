//导入 express 模块
const express = require("express");
//创建 express 的服务器实例
const app = express();

//导入 joi 验证模块
const joi = require("joi");

//配置 cors 跨域
//导入 cors 中间件
const cors = require("cors");
//将 cors 注册为全局中间件
app.use(cors());

//配置解析表单数据的中间件
//注意：这个中间件只能解析 application/x-www-form-urlencided 格式的表单数据
app.use(express.urlencoded({ extended: false }));

//封装 res.cc 函数，注意：一定要在路由之前进行
app.use((req, res, next) => {
  //status 默认值为202,表示失败的情况
  //err 的值，可能为一个错误对象也可能是一个错误的描述字符串
  res.cc = function (err, status = 202) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

//在路由之前配置解析 Token 的中间件
const expressJwt = require("express-jwt");
const config = require("./config");
//使用 .unless({path:[/^\/api\//]}) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);

//导入并使用用户的路由模块
const userRouter = require("./router/user");
app.use("/api", userRouter);
//注意：以/my开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use("/my", userRouter);
//导入并使用视频的路由模块
const videoRouter = require("./router/video");
//为视频的路由挂载统一的访问前缀 /my/video
app.use("/my/video", videoRouter);
// 导入并使用菜单的路由模块
const getMenu = require("./router/video");
app.use("/get", getMenu);

// 托管静态资源文件
app.use("/uploads", express.static("./uploads"));

//定义错误级别中间件
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.cc(err);
  //捕获身份认证失败的错误
  if (err.name === "UnauthorizedError") return res.cc("身份验证失败!");
  //未知的错误
  res.cc(err);
});

//调用 app.listen 方法，指定端口号并启动 web 服务器
app.listen(3999, function () {
  console.log("api server running at http://127.0.0.1:3999");
});
