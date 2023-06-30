//导入定义验证规则的包
const joi = require('joi')


//  string() 值必须是字符串
//  alphanum() 值只能是包含 a-zA-Z0-9 的字符串
//  min(length) 最小长度
//  max(length) 最大长度
//  required() 值是必填项，不能为 undefined
//  pattern(正则表达式) 值必须符合正则表达式的规则


//用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
//密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/) //[\S]---表示，非空白，不含空格、换行、tab等所有空白的6-12位字符
  .required()

//定义 id,nickname,email,user_pic 的验证规则
// integer() 整数
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const user_pic = joi.string().required()

//定义 avatar 的验证规则
//dataUri() 指的是如下格式的字符串数据：
//data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

//验证规则对象 - 注册和登陆表单
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
}
//验证规则对象 - 更新用户的基本信息
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  },
}
//验证规则对象 - 修改密码
exports.update_password_schema = {
  body: {
    //使用 password 这个规则，验证 req.body.okdPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}
//验证规则对象 - 更新用户头像
exports.update_avatar_schema = {
  body: {
    avatar,
  },
}