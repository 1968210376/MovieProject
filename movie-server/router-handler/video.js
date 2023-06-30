//导入处理路径的核心模块
const res = require('express/lib/response')
const path = require('path')
const { array } = require('joi')
//导入数据库操作模块
const db = require('../db/index')

//获取菜单的处理函数
exports.getMenu = (req, res) => {
  const sql = `select * from menu`

  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '获取菜单数据成功!',
      data: results,
    })
  })
}

exports.getMenus = (req, res) => {
  const sql = `select * from menuweb `
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '获取菜单数据成功!',
      data: results,
    })
  })
}
exports.getMenusc = (req, res) => {
  const sql = `select * from video_type where t_pid = ? `
  db.query(sql, req.params.t_id, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '获取菜单数据成功!',
      data: results,
    })
  })
}
exports.getVideoMenu = (req, res) => {
  const sql = `select * from video_type`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '获取视频菜单成功!',
      data: results
    })
  })
}

//获取视频的列表数据的处理函数
exports.getVideoList = (req, res) => {
  if (req.params.search_key) {
    // 定义根据输入信息查询视频信息的 sql 语句 
    const sql = `select * from video where vod_name like ? order by vod_id  desc limit ?,?`
    db.query(sql,[ '%' + req.params.search_key + '%',req.params.pagenum, req.params.pagesize], (err, results) => {
      if (err) return res.cc(err)
      res.send({
        status: 200,
        message: '获取搜索结果成功!',
        data: results
      })
    })
  } else {
    const sql = `select * from video order by vod_id  desc limit ?,?`
    db.query(sql, [req.params.pagenum, req.params.pagesize], (err, results) => {
      if (err) return res.cc(err)
      res.send({
        status: 200,
        message: '获取视频的列表数据成功!',
        data: results,
      })
    })
  }
}

// 通过视频类型获取视频列表的处理函数
exports.getVideoByType = (req, res) => {
  let type = req.params.type_id
  let sql
  if (type === 1 || type === 2) {
    sql = `select * from video where type_id_1 = ${type} order by vod_id  desc limit ?,?`
  } else {
    sql = `select * from video where type_id = ${type} order by vod_id  desc limit ?,?`
  }
  db.query(sql,  [req.params.pagenum, req.params.pagesize], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '视频数据获取成功!',
      data: results
    })
  })

}

// 查询数据总条数的处理函数
exports.count = (req, res) => {
  const sql1 = `select count(vod_id) as total from video`
  db.query(sql1, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '数据总条数获取成功!',
      total: results
    })
  })
}

// 搜索时查询数据总条数的处理函数
exports.counts = (req, res) => {
  const sql = `select count(vod_id) as total from video where vod_name like ?`
  db.query(sql, '%' + req.params.search_key + '%', (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '数据总条数获取成功!',
      total: results
    })
  })
}

// 分类查询数据总条数的处理函数
exports.countstype = (req, res) => {
 const sql = `select count(vod_id) as total from video where type_id = ?`
 db.query(sql, req.params.type_id, (err,results) => {
     if(err) return res.cc(err)
     res.send({
         status:200,
         message:'数据总条数获取成功!',
         total: results
     })
 })
}


//发布新视频的处理函数
exports.addVideo = (req, res) => {
  const videoInfo = {
    //视频名称、视频播放地址、发布状态、所属的分类id
    ...req.body,
    vod_pubdate: new Date(),
  }
  //定义发布新视频的 SQL 语句
  const sql = `insert into video set ?`
  db.query(sql, videoInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('视频发布失败!')
    res.cc('发布视频成功!', 200)
  })
}

// 删除视频的处理函数
exports.deleteVideo = (req, res) => {
  // 定义删除视频信息的 SQL 语句
  const sql = `delete from video where vod_id =?`
  db.query(sql, req.params.vod_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除视频失败!')
    res.cc('删除视频成功!', 200)
  })
}


//根据 id 获取视频信息的处理函数
exports.getVideoById = (req, res) => {
  // 定义根据 id 获取视频信息的 SQL 语句
  const sql = `select * from video where vod_id=?`
  db.query(sql, req.params.vod_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取视频信息数据失败!')
    res.send({
      status: 200,
      message: '获取视频信息数据成功!',
      data: results[0]
    })
  })
}

// 更新视频信息的处理函数
exports.updateVideo = (req, res) => {
  // 定义查询视频名称被占用的sql 语句
  const sql = `select * from video where vod_id <>? and vod_name = ?`
  db.query(sql, [req.body.vod_id, req.body.vod_name], (err, results) => {
    if (err) return res.cc(err)
    // 视频名称被占用
    if (results.length === 1 && results[0].vod_name === req.body.vod_name) return res.cc('视频已存在,请检查后重试!')

    // 更新视频
    // 定义更新视频的 SQL 语句
    const sql = `update video set ? where vod_id=?`
    db.query(sql, [req.body, req.body.vod_id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新视频信息失败!')
      res.cc('更新视频信息成功!', 200)
    })
  })
}



// 解析接口调用的处理函数
exports.jiexi = (req, res) => {
  // 定义调用解析接口的 SQL 语句
  const sql = `select * from jiexi`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '接口数据获取成功!',
      data: results
    })
  })
}

// 根据id获取接口数据的处理函数

exports.jiexiById = (req, res) => {
  // 定义根据 id 获取解析接口信息的 SQL 语句
  const sql = `select * from jiexi where id=?`
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取接口信息数据失败!')
    res.send({
      status: 200,
      message: '获取接口信息数据成功!',
      data: results[0]
    })
  })
}
// 根据修改接口数据的处理函数
exports.updatejiexi = (req,res) => {
    // 定义修改接口信息的 SQL 语句
    const sql = `update jiexi set ? where id = ?`
    db.query(sql,[req.body,req.body.id],(err,results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !==1 ) return res.cc('修改接口信息失败!')
        res.cc('修改接口信息成功!',200)
    })
}

// 添加接口的处理函数
exports.addJiexi = (req,res) => {
    const sql = `insert into jiexi set ?`
    db.query(sql,req.body,(err,results) => {
        if(err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('接口发布失败!')
        res.cc('发布接口成功!', 200)
    })
}

// 删除接口的处理函数
exports.deleteJieXi = (req,res) => {
    const sql = `delete from jiexi where id =?`
    db.query(sql,req.params.id,(err,results) => {
        if(err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除接口失败!')
        res.cc('删除接口成功!', 200)
    })
}

// 根据id 修改视频状态的处理函数
// 定义更新视频的 SQL 语句
exports.changeStatus = (req, res) => {
  const sql = `update video set vod_status=? where vod_id=?`
  db.query(sql, [req.params.vod_status, req.params.vod_id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新视频状态失败!')
    res.cc('更新视频状态成功!', 200)
  })
}

//获取视频分类列表的处理函数
exports.getVideoType = (req, res) => {
  //定义查询视频分类列表的 SQL 语句
  const sql = `select * from video_type order by t_id asc`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '获取视频分类列表成功!',
      data: results,
    })
  })
}
//新增视频分类的处理函数
exports.addVideoType = (req, res) => {
  const sql = `select * from video_type where t_name=? or t_sort=?`
  //执行查重的操作
  db.query(sql, [req.body.t_name, req.body.t_sort], (err, results) => {
    //执行 SQL 语句失败
    if (err) return res.cc(err)

    // 分类名称 和 分类序号 都被占用
    if (results.length === 2) return res.cc('分类名称与分类序号被占用，请更换后重试!')
    if (results.length === 1 && results[0].t_name === req.body.t_name && results[0].t_sort === req.body.t_sort) return res.cc('分类名称与序号被占用,请更换后重试!')
    //分类名称 或 分类序号 被占用
    if (results.length === 1 && results[0].t_name === req.body.t_name) return res.cc('分类名称被占用!')
    if (results.length === 1 && results[0].t_sort === req.body.t_sort) return res.cc('分类序号被占用!')
    //分类名称 和 分类序号 可用
    //新增文章分类
    const sql = `insert into video_type set ?`
    db.query(sql, req.body, (err, results) => {
      //SQL 语句执行失败
      if (err) return res.cc(err)
      //SQL 执行成功，但是影响的行数不等于 1
      if (results.affectedRows !== 1) return res.cc('新增视频分类失败!')
      //新增视频分类成功
      res.cc('新增视频分类成功!', 200)
    })
  })
}

//删除视频分类的处理函数
exports.deleteTypeById = (req, res) => {
  const sql = `delete from video_type where t_id=?`
  db.query(sql, req.body.t_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除视频分类失败!')
    res.cc('删除视频分类成功!', 200)
  })
}

//根据 Id 获取视频分类的处理函数
exports.getVideoTypeById = (req, res) => {
  const sql = `select * from video_type where t_id = ?`
  db.query(sql, req.body.t_id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取视频分类数据失败!')
    res.send({
      status: 200,
      message: '获取视频分类数据成功!',
      data: results[0],
    })
  })
}

//更新视频分类的处理函数
exports.updateTypeById = (req, res) => {
  const sql = `select * from video_type where t_id<>? and (t_name=? or t_sort=?)`
  db.query(sql, [req.body.t_id, req.body.t_name, req.body.t_sort], (err, results) => {
    if (err) return res.cc(err)

    // 分类名称 和 分类序号 都被占用
    if (results.length === 2) return res.cc('分类名称与分类序号被占用,请更换后重试!')
    if (results.length === 1 && results[0].t_name === req.body.t_name && results[0].t_sort === req.body.t_sort) return res.cc('分类名称与序号被占用,请更换后重试!')
    //分类名称 或 分类序号 被占用
    if (results.length === 1 && results[0].t_name === req.body.t_name) return res.cc('分类名称被占用!')
    if (results.length === 1 && results[0].t_sort === req.body.t_sort) return res.cc('分类序号被占用!')
    //分类名称 和 分类序号 都可用
    //更新视频分类
    const sql = `update video_type set ? where t_id=?`
    db.query(sql, [req.body, req.body.t_id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新视频分类失败!')
      res.cc('更新视频分类成功!', 200)
    })
  })
}

// 获取轮播的处理函数
exports.getLunBo = (req, res) => {
  const sql = 'select * from lunbo'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 200,
      message: '获取轮播成功!',
      data: results
    })
  })
}

// 根据id 获取轮播的处理函数
exports.getLunBoById = (req,res) => {
    const sql = `select * from lunbo where id = ? `
    db.query(sql,req.params.id,(err,results) => {
        if(err) return res.cc(err)
        res.send({
            status:200,
            message:'获取轮播成功!',
            data:results[0]
        })
    })
}

// 添加轮播的处理函数
exports.addLunBo = (req, res) => {
  const sql = `insert into lunbo set ?`
  db.query(sql,req.body, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('新增轮播失败!')
    res.cc('新增轮播成功!', 200)
  })
}

//删除轮播的处理函数
exports.deleteLunBoById = (req, res) => {
  const sql = `delete from lunbo where id=?`
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除轮播失败!')
    res.cc('删除轮播成功!', 200)
  })
}

// 更新轮播的处理函数
exports.updateLunBoById = (req, res) => {
  const sql = `update lunbo set ? where id=?`
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新轮播失败!')
    res.cc('更新轮播成功!', 200)
  })
}