//导入 mysql 模块
const express = require("express");
const mysql = require("mysql");
//创建数据库连接对象
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "movie",
});

//测试 mysql 模块能否正常工作
// db.query('select 1',(err,result) => {
//     //mysql 模块工作期间报错了
//     if(err) return console.log(err.message)
//     //能够成功的执行的 SQL 语句
//     console.log(result)
// } )

//向外共享 db 数据库连接对象
module.exports = db;
