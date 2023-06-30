//导入 express 
const express = require('express')
//创建路由对象
const router = express.Router()

//导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

//导入解析 fromdata 格式表单数据的包
const multer = require('multer')
//导入处理路径的核心模块
const path = require('path')
//创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

//导入视频的路由处理函数模块
const video_handler = require('../router-handler/video')
// 导入需要验证对象
const {
  add_video_schema,
  delete_video_schema,
  get_video_schema,
  get_videolist_schema,
  update_video_schema,
  search_video_schema,
  change_status_schema,
  jiexi_schema,
  add_type_schema,
  delete_type_schema,
  get_type_schema,
  update_type_schema,
  get_menu_schema,
  getvideo_bytype_schema,
  add_lunbo_schema,
  delete_lunbo_schema,
  update_lunbo_schema,
  add_jiexi_schema,
  update_jiexi_schema,
  get_lunbo_byId_schema
} = require('../schema/video')

// 调用菜单的路由
router.get('/menu', video_handler.getMenu)
router.get('/menus', video_handler.getMenus)
router.post('/menus/:t_id', expressJoi(get_menu_schema), video_handler.getMenusc)
router.get('/videomenu', video_handler.getVideoMenu)

//获取视频的列表数据的路由
router.get('/list/:pagenum/:pagesize', expressJoi(get_videolist_schema), video_handler.getVideoList)

//获取视频总条数的路由
router.get('/total', video_handler.count)
router.post('/total/:search_key', video_handler.counts)
router.get('/total/:type_id', video_handler.countstype)

//发布新视频的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('vod_pic'), expressJoi(add_video_schema), video_handler.addVideo)
// 删除视频的路由
router.delete('/delete/:vod_id', expressJoi(delete_video_schema), video_handler.deleteVideo)
// 根据 id 获取视频数据的路由
router.get('/get/:vod_id', expressJoi(get_video_schema), video_handler.getVideoById)
// 更新视频信息的路由
router.put('/update', expressJoi(update_video_schema), video_handler.updateVideo)
// 搜索框搜索获取视频信息的路由
router.post('/list/:search_key/:pagenum/:pagesize', expressJoi(search_video_schema), video_handler.getVideoList)
// 根据id 获取是修改视频状态的路由
router.put('/status/:vod_id/:vod_status', expressJoi(change_status_schema), video_handler.changeStatus)
// 根据分类获取视频数据的路由
router.get('/videobytype/:type_id/:pagenum/:pagesize', expressJoi(getvideo_bytype_schema), video_handler.getVideoByType)


// 解析接口调用的路由
router.get('/jiexi', video_handler.jiexi)
// 根据id获取接口数据的路由
router.get('/jiexi/:id', expressJoi(jiexi_schema), video_handler.jiexiById)
// 修改接口的路由
router.put('/jiexi',expressJoi(update_jiexi_schema),video_handler.updatejiexi)
// 添加接口的路由
router.post(`/jiexi`,expressJoi(add_jiexi_schema),video_handler.addJiexi)
// 删除接口的路由
router.delete(`/jiexi/:id`,video_handler.deleteJieXi)


//获取视频分类列表的路由
router.get('/types', video_handler.getVideoType)
//新增视频分类的路由
router.post('/addtype', expressJoi(add_type_schema), video_handler.addVideoType)
//删除视频分类的路由
router.delete('/deletetype', expressJoi(delete_type_schema), video_handler.deleteTypeById)
//根据 Id 获取视频分类的路由
router.get('/type', expressJoi(get_type_schema), video_handler.getVideoTypeById)
//根据 Id 更新视频分类的路由
router.put('/updatetype', expressJoi(update_type_schema), video_handler.updateTypeById)

// 获取轮播的路由
router.get('/lun', video_handler.getLunBo)
// 根据id获取轮播的路由
router.get('/lun/:id',expressJoi(get_lunbo_byId_schema), video_handler.getLunBoById)
// 添加轮播的路由
router.post('/lun', expressJoi(add_lunbo_schema), video_handler.addLunBo)
// 删除轮播的路由
router.delete('/lun/:id', expressJoi(delete_lunbo_schema), video_handler.deleteLunBoById)
// 修改轮播的路由
router.put('/lun', expressJoi(update_lunbo_schema), video_handler.updateLunBoById)

//向外共享路由对象
module.exports = router