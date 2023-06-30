//导入数据库操作模块
const db = require('../db/index')
//导入 bcryptjs 包
const bcrypt = require('bcryptjs')
const { results } = require('joi')

//导入生成 Token 的包
const jwt = require('jsonwebtoken')
const config = require('../config')

//注册新用户的处理函数
exports.regUser = (req, res) => {
  //获取表单提交到服务器的用户信息
  const userinfo = req.body
  //对表单中的数据进行合法性验证
  // if (!userinfo.username || !userinfo.password) {
  //     return res.send({status:1,message:'用户名或密码不合法'})
  // }
  //定义 SQL 语句
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userinfo.username, (err, results) => {
    //执行 SQL 语句失败
    if (err) {
      // return res.send({status:1,message:err.message})
      return res.cc(err)
    }
    //用户名被占用
    if (results.length > 0) {
      //return res.send({status:1,message:'用户名被占用,请更换其他用户名'})
      return res.cc('用户名被占用,请更换其他用户名')
    }
    //调用 bcrypt.hashSync() 对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    //定义插入新用户的 SQL 语句 
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      //判断 SQL 语句是否执行成功
      //if(err) return res.send({status:1,message:err.message})
      if (err) return res.cc(err)
      //判断影响行数是否为 1
      //if(results.affectedRows !== 1) return res.send({status:1,message:'用户注册失败,请稍后再试!'})
      if (results.affectedRows !== 1) return res.cc('用户注册失败,请稍后再试!')
      //注册用户成功
      //res.send({status:0,message:'注册成功!'})
      res.cc('注册成功!', 200)

    })
  })

}
//登陆的处理函数
exports.login = (req, res) => {
  //接受表单数据
  const userinfo = req.body
  //定义 SQL 语句
  const sql = 'select * from ev_users where username=?'
  //执行SQL 语句
  db.query(sql, userinfo.username, (err, results) => {
    //执行 SQL 语句失败
    if (err) return res.cc(err)
    //执行 SQL 语句成功，但获取到的结果不等于 1
    if (results.length !== 1) return res.cc('登录失败!')
    //判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败!')

    //在服务器端生成 Token 字符串
    //通过 ES6 的高级语法，快速剔除 密码 和 头像 的值：
    const user = { ...results[0], password: '', user_pic: '' }
    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    //对用户的信息进行加密,生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    //调用 res.send() 将 Token 响应给客户端
    res.send({
      status: 200,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr,
    })
  })
}

//登陆的处理函数
exports.logins = (req, res) => {
  //接受表单数据
  const userinfo = req.body
  //定义 SQL 语句
  const sql = 'select * from ev_userss where username=?'
  //执行SQL 语句
  db.query(sql, userinfo.username, (err, results) => {
    //执行 SQL 语句失败
    if (err) return res.cc(err)
    //执行 SQL 语句成功，但获取到的结果不等于 1
    if (results.length !== 1) return res.cc('登录失败!')
    //判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败!')

    //在服务器端生成 Token 字符串
    //通过 ES6 的高级语法，快速剔除 密码 和 头像 的值：
    const user = { ...results[0], password: '', user_pic: '' }
    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    //对用户的信息进行加密,生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    //调用 res.send() 将 Token 响应给客户端
    res.send({
      status: 200,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr,
    })
  })
}

//获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  //定义 SQL 语句
  //根据用户的 id ，查询用户的基本信息
  //注意：为了防止用户的密码泄露，需排除 password 字段
  const sql = `select id ,username,nickname,email,user_pic from ev_users where id=?`
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.user.id, (err, results) => {
    //执行 SQL 语句失败
    if (err) return res.cc(err)
    //执行 SQL 语句成功，但查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc('获取用户信息失败!')
    //成功，将用户信息响应到客户端
    res.send({
      status: 200,
      message: '获取用户基本信息成功!',
      data: results[0],
    })
  })
}

//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  const sql = `update ev_users set ? where id=?`
  db.query(sql, [req.body, req.body.id], (err, results) => {
    //执行 SQL 语句失败
    if (err) return res.cc(err)
    //执行 SQL 语句成功，但影响的行数不等于 1
    if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败!')
    //修改用户信息成功
    return res.cc('修改用户信息成功!', 200)
  })
}

//更新用户密码的处理函数
exports.updatePassword = (req, res) => {
  //定义根据 id 查询用户数据的 SQL 语句
  const sql = `select * from ev_users where id=?`
  //执行 SQL 语句查询用户是否存在
  db.query(sql, req.user.id, (err, results) => {
    //执行 SQL 语句失败
    if (err) return res.cc(err)
    //检查指定 id 的用户是否存在
    if (results.length !== 1) return res.cc('用户不存在!')
    //判断提交的旧密码是否正确
    // 在头部区域导入 bcryptjs 后，
    // 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
    // compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('原密码错误!')

    //定义更新用户密码的 SQL 语句
    const sql = `update ev_users set password=? where id=?`
    //对新密码进行 bcrypt 加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    //执行 sql 语句，根据 id 更新用户的密码
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      //SQL 语句执行失败
      if (err) return res.cc(err)
      //SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('更新密码失败!')
      //成功
      res.cc('更新密码成功!', 200)
    })
  })
}

//更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic=? where id=?`
  db.query(sql, [req.body.user_pic, req.user.id], (err, results) => {
    //执行 SQL 语句失败
    if (err) return res.cc(err)
    //执行 SQL 语句成功，但影响的行数不等于 1
    if (results.affectedRows !== 1) return res.cc('更新头像失败!')
    //更新用户头像成功
    return res.cc('更新用户头像成功!', 200)
  })
}
