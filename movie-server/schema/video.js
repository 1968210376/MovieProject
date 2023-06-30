//定义规则验证的模块
const { string } = require('joi')
const joi = require('joi')

//定义 视频名称、分类id、分类id_1、视频图片、发布状态、视频id
const vod_name = joi.string().required()
const type_id = joi.number().integer().min(0).required()
const type_id_1 = joi.number().integer().min(0).required()
const vod_pic = joi.string().required()
const vod_play_url = joi.string().required()
const vod_status = joi.number().integer().min(0).max(1).required()
const vod_id = joi.number().integer().min(1).required()
const search_key = joi.string().required()
const vod_content = joi.string()
const vod_down_url = joi.string()
const vod_plot_name = joi.string()
const vod_plot_detail = joi.string()
const j_id = joi.number().integer().min(1).required()
const pagenum = joi.number().integer().min(0).required()
const pagesize = joi.number().integer().min(1).required()
const jiexi = joi.string().required()

// 验证规则对象 - 获取视频列表
exports.get_videolist_schema = {
  params: {
    pagenum,
    pagesize
  }
}
//验证规则对象 - 发布视频
exports.add_video_schema = {
  body: {
    vod_name,
    type_id,
    type_id_1,
    vod_pic,
    vod_play_url,
    vod_status,
    vod_content,
    vod_down_url,
    vod_plot_name,
    vod_plot_detail
  },
}

//验证规则对象 - 删除视频
exports.delete_video_schema = {
  params: {
    vod_id,
  }
}

// 验证规则对象 - 根据 id 获取视频信息
exports.get_video_schema = {
  params: {
    vod_id,
  }
}

// 验证规则对象 - 更新视频信息
exports.update_video_schema = {
  body: {
    vod_id,
    vod_name,
    type_id,
    type_id_1,
    vod_pic,
    vod_play_url,
    vod_status,
    vod_content,
  }
}

// 验证规则对象 - 修改视频状态
exports.change_status_schema = {
  params: {

    vod_id,
    vod_status
  }
}

// 验证规则对象 - 搜索视频
exports.search_video_schema = {
  params: {
    search_key,
    pagenum,
    pagesize
  }
}

// 验证规则对象 - 根据分类获取视频数据
exports.getvideo_bytype_schema = {
  params: {
    type_id,
    pagenum,
    pagesize
  }
}



// 验证规则对象 - 根据 id 获取接口数据
exports.jiexi_schema = {
  params: {
    id:j_id
  }
}

// 验证规则对象 - 添加解析接口
exports.add_jiexi_schema = {
    body: {
        jiexi
    }
}

// 验证规则对象 - 修改解析接口
exports.update_jiexi_schema = {
    body: {
        id:j_id,
        jiexi
    }
}





//定义分类Id的校验规则
const t_id = joi.number().integer().min(1).required()
const t_name = joi.string().required()
const t_pid = joi.number().integer().min(0).required()
const t_sort = joi.number().integer().min(1).required()
//校验规则对象 - 新增分类
exports.add_type_schema = {
  body: {
    t_name,
    t_pid,//0 大标题 | 1、2、3、4...哪个大标题的二级标题
    t_sort,//1、2、3、4 ...大标题 | 11、12、13、21、22... 二级标题 
  },
}
//校验规则对象 - 删除分类
exports.delete_type_schema = {
  body: {
    t_id,
  },
}
//校验规则对象 - 根据 Id 获取分类
exports.get_type_schema = {
  body: {
    t_id,
  },
}

//校验规则对象 - 获取子菜单列表
exports.get_menu_schema = {
  params: {
    t_id,
  },
}

//校验规则对象 - 更新分类
exports.update_type_schema = {
  body: {
    t_id,
    t_name,
    t_pid,
    t_sort,
  }
}

const pic = joi.string().required()
const id = joi.number().integer().required()
const alt = joi.string()

// 验证规则对象 - 根据 id 获取轮播
exports.get_lunbo_byId_schema = {
    params:{
        id
    }
}

// 验证规则对象 - 添加轮播
exports.add_lunbo_schema = {
  body: {
    pic,
    alt
  }
}

// 验证规则对象 - 修改轮播
exports.update_lunbo_schema = {
  body: {
    id,
    pic,
    alt
  }
}

// 验证规则对象 - 删除轮播
exports.delete_lunbo_schema = {
  params: {
    id
  }
}