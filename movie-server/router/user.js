const express = require('express')
//创建路由对象
const router = express.Router()

//导入用户路由处理函数对应模块
const user_handler = require('../router-handler/user')

//1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则对象
const { reg_login_schema, update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')




//注册新用户
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)

//登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login)
router.post('/logins', expressJoi(reg_login_schema), user_handler.logins)
//获取用户的基本信息的路由
router.get('/userinfo', user_handler.getUserInfo)
//更新用户的基本信息的路由
router.put('/userinfo', expressJoi(update_userinfo_schema), user_handler.updateUserInfo)
//修改密码的路由
router.put('/updatepwd', expressJoi(update_password_schema), user_handler.updatePassword)
//更新用户头像的路由
router.put('/update/avatar', expressJoi(update_avatar_schema), user_handler.updateAvatar)


module.exports = router