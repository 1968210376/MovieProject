<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>视频管理</el-breadcrumb-item>
      <el-breadcrumb-item>视频列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索添加区域 -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.search_key"
                    clearable
                    @clear="changeSearchStatus">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="searchVideo"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="addDialogVisible=true">添加视频</el-button>
        </el-col>
      </el-row>
      <!-- 视频列表区域 -->
      <el-table :data="videolist"
                border
                stripe>
        <el-table-column row-style="height:20px"
                         label="序号"
                         type="index"></el-table-column>
        <el-table-column label="视频id"
                         prop="vod_id"></el-table-column>
        <el-table-column label="视频名称"
                         prop="vod_name"
                         :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="视频类型"
                         prop="type_id"></el-table-column>
        <el-table-column label="视频类型1"
                         prop="type_id_1"></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         label="视频缩略图"
                         prop="vod_pic"></el-table-column>
        <el-table-column label="视频状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.vod_status"
                       :active-value="0"
                       :inactive-value="1"
                       @change="videoStatusChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         label="视频简介"
                         prop="vod_content"></el-table-column>
        <el-table-column label="下载地址"
                         prop="vod_down_url"></el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         label="播放地址"
                         prop="vod_play_url">
        </el-table-column>
        <el-table-column label="操作"
                         width="190px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       @click="showEditDialog(scope.row.vod_id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="removeVideoById(scope.row.vod_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[10, 15, 20, 40, 50]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加视频的对话框 -->
    <el-dialog title="添加视频"
               :visible.sync="addDialogVisible"
               width="50%"
               @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm"
               :rules="addFormRules"
               ref="addFormRef"
               label-width="100px">
        <el-form-item label="视频名称"
                      prop="vod_name">
          <el-input v-model="addForm.vod_name"></el-input>
        </el-form-item>
        <el-form-item label="视频类型"
                      prop="type_id">
          <el-input v-model="addForm.type_id"></el-input>
        </el-form-item>
        <el-form-item label="视频类型1"
                      prop="type_id_1">
          <el-input v-model="addForm.type_id_1"></el-input>
        </el-form-item>
        <el-form-item label="视频缩略图"
                      prop="vod_pic">
          <el-input v-model="addForm.vod_pic"></el-input>
        </el-form-item>
        <el-form-item label="视频状态">
          <template>
            <el-switch v-model="addForm.vod_status"
                       :active-value="0"
                       :inactive-value="1"
                       @change="videoStatusChanged(scope.row)">
            </el-switch>
          </template>
        </el-form-item>
        <el-form-item label="视频简介"
                      prop="vod_content">
          <el-input v-model="addForm.vod_content"></el-input>
        </el-form-item>
        <el-form-item label="下载地址"
                      prop="vod_down_url">
          <el-input v-model="addForm.vod_down_url"></el-input>
        </el-form-item>
        <el-form-item label="分集类型"
                      prop="vod_plot_name">
          <el-input v-model="addForm.vod_plot_name"></el-input>
        </el-form-item>
        <el-form-item label="分集详情"
                      prop="vod_plot_detail">
          <el-input v-model="addForm.vod_plot_detail"></el-input>
        </el-form-item>
        <el-form-item label="播放地址"
                      prop="vod_play_url">
          <el-input v-model="addForm.vod_play_url"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addVideo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改视频的对话框 -->
    <el-dialog title="修改视频"
               :visible.sync="editDialogVisble"
               width="50%"
               @closed="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="editForm"
               :rules="editFormRules"
               ref="editFormRef"
               label-width="70px">
        <el-form-item label="视频id"
                      prop="vod_id">
          <el-input v-model="editForm.vod_id"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="视频名称"
                      prop="vod_name">
          <el-input v-model="editForm.vod_name"></el-input>
        </el-form-item>
        <el-form-item label="视频分类"
                      prop="type_id">
          <el-input v-model="editForm.type_id"></el-input>
        </el-form-item>
        <el-form-item label="视频分类1"
                      prop="type_id_1">
          <el-input v-model="editForm.type_id_1"></el-input>
        </el-form-item>
        <el-form-item label="视频缩略图"
                      prop="vod_pic">
          <el-input v-model="editForm.vod_pic"></el-input>
        </el-form-item>
        <el-table-column label="视频状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.vod_status"
                       :active-value="0"
                       :inactive-value="1"
                       @change="videoStatusChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-form-item label="视频简介"
                      prop="vod_content">
          <el-input v-model="editForm.vod_content"></el-input>
        </el-form-item>
        <el-form-item label="下载地址"
                      prop="vod_down_url">
          <el-input v-model="editForm.vod_down_url"></el-input>
        </el-form-item>
        <el-form-item label="播放地址"
                      prop="vod_play_url">
          <el-input v-model="editForm.vod_play_url"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisble = false">取 消</el-button>
        <el-button type="primary"
                   @click="editVideoInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取视频列表的参数对象
      queryInfo: {
        search_key: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示条数
        pagesize: 10
      },
      searchstatus: false,
      videolist: [],
      total: 0,
      // 控制添加视频对话框的显示与隐藏
      addDialogVisible: false,
      // 添加视频的表单数据
      addForm: {
        vod_name: '',
        type_id: '',
        type_id_1: '',
        vod_pic: '',
        vod_status: '',
        vod_content: '',
        vod_down_url: '',
        vod_play_url: '',
        vod_plot_name: '',
        vod_plot_detail: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        vod_name: [{
          required: true,
          message: '请输入视频名',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 20,
          message: '视频名的长度在1~20个字符之间',
          trigger: 'blur'
        }
        ],
        type_id: [
          {
            required: true,
            message: '请输入视频类型',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 2,
            message: '视频类型的长度在1~2位数字之间',
            trigger: 'blur'
          }
        ],
        type_id_1: [
          {
            required: true,
            message: '请输入视频类型1',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 2,
            message: '视频类型1的长度在1~2位数字之间',
            trigger: 'blur'
          }
        ],
        vod_pic: [
          {
            required: true,
            message: '请输入缩略图网址',
            trigger: 'blur'
          },
          {
            min: 10,
            max: 35,
            message: '缩略图网址的长度在10~35个字符之间',
            trigger: 'blur'
          }
        ],
        vod_plot_name: [
          {
            required: true,
            message: '请输入分级类型',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 20,
            message: '分级类型的长度在0~20个字符之间',
            trigger: 'blur'
          }
        ],
        vod_plot_detail: [
          {
            required: true,
            message: '请输入分集详情',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 255,
            message: '分集详情的长度在0~255个字符之间',
            trigger: 'blur'
          }
        ],

        vod_content: [
          {
            required: true,
            message: '请输入视频简介',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 200,
            message: '视频简介的长度在0~200个字符之间',
            trigger: 'blur'
          }
        ],
        vod_play_url: [
          {
            required: true,
            message: '请输入播放地址',
            trigger: 'blur'
          },
          {
            min: 10,
            max: 255,
            message: '播放地址的长度在10~255个字符之间',
            trigger: 'blur'
          }
        ],
        vod_down_url: [
          {
            required: true,
            message: '请输入下载地址',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 255,
            message: '下载地址的长度在0~255个字符之间',
            trigger: 'blur'
          }
        ]

      },
      // 控制修改视频对话框的显示与隐藏
      editDialogVisble: false,
      // 查询到的视频信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        vod_name: [{
          required: true,
          message: '请输入视频名',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 20,
          message: '视频名的长度在1~20个字符之间',
          trigger: 'blur'
        }
        ],
        type_id: [
          {
            required: true,
            message: '请输入视频类型',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 20,
            message: '视频类型的长度在1~2位数字之间',
            trigger: 'blur'
          }
        ],
        type_id_1: [
          {
            required: true,
            message: '请输入视频类型1',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 20,
            message: '视频类型1的长度在1~2位数字之间',
            trigger: 'blur'
          }
        ],
        vod_pic: [
          {
            required: true,
            message: '请输入缩略图网址',
            trigger: 'blur'
          },
          {
            min: 10,
            max: 255,
            message: '缩略图网址的长度在10~255个字符之间',
            trigger: 'blur'
          }
        ],
        vod_plot_name: [
          {
            required: true,
            message: '请输入分级类型',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 20,
            message: '分级类型的长度在0~20个字符之间',
            trigger: 'blur'
          }
        ],
        vod_plot_detail: [
          {
            required: true,
            message: '请输入分集详情',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 255,
            message: '分集详情的长度在0~255个字符之间',
            trigger: 'blur'
          }
        ],
        vod_content: [
          {
            required: true,
            message: '请输入视频简介',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 2555,
            message: '视频简介的长度在0~2555个字符之间',
            trigger: 'blur'
          }
        ],
        vod_play_url: [
          {
            required: true,
            message: '请输入播放地址',
            trigger: 'blur'
          },
          {
            min: 10,
            message: '播放地址的长度在10个字符以上',
            trigger: 'blur'
          }
        ],
        vod_down_url: [
          {
            required: true,
            message: '请输入下载地址',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 255,
            message: '下载地址的长度在0~255个字符之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getVideoList()
  },
  methods: {
    async getVideoList () {
      const pagesize = this.queryInfo.pagesize
      const pagenum1 = this.queryInfo.pagenum
      const pagenum = this.queryInfo.pagesize * (pagenum1 - 1)
      if (this.searchstatus === true) {
        const { data: res } = await this.$axios.post(`my/video/list/${this.queryInfo.search_key}/${pagenum}/${pagesize}`)
        if (res.status !== 200) {
          return this.$message.error('搜索视频失败!')
        }
        this.$message.success('搜索视频成功!')
        this.videolist = res.data
        this.getTotal()
      } else {
        const { data: res } = await this.$axios.get(`my/video/list/${pagenum}/${pagesize}`)
        if (res.status !== 200) {
          return this.$message.error('获取视频列表失败!')
        }
        this.videolist = res.data
        this.getTotal()
      }
    },
    async getTotal () {
      if (this.searchstatus) {
        const { data: res } = await this.$axios.post(`my/video/total/${this.queryInfo.search_key}`)
        if (res.status !== 200) {
          return this.$message.error('获取total失败!')
        }
        this.total = res.total[0].total
      } else {
        const { data: res } = await this.$axios.get('my/video/total')
        if (res.status !== 200) {
          return this.$message.error('获取total失败!')
        }
        this.total = res.total[0].total
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getVideoList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getVideoList()
    },
    // 监听 switch 开关的状态改变
    async videoStatusChanged (videoinfo) {
      const vid = videoinfo.vod_id
      const vstatus = videoinfo.vod_status
      const { data: res } = await this.$axios.put('my/video/status/' + vid + '/' + vstatus)
      if (res.status !== 200) {
        videoinfo.vod_status = !videoinfo.vod_status
        return this.$message.error('更新视频状态失败!')
      }
      this.$message.success('更新视频状态成功!')
    },
    // 监听添加视频对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addVideo () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return false
        // 可以发起添加视频的网络请求
        const { data: res } = await this.$axios.post('my/video/add', this.$qs.stringify(this.addForm))
        if (res.status !== 200) {
          this.$message.error('添加视频失败!')
        }
        this.$message.success('添加视频成功!')
        // 隐藏添加视频的对话框
        this.addDialogVisible = false
        // 重新获取视频列表数据
        this.getVideoList()
        this.getTotal()
      })
    },
    // 展示编辑视频的对话框
    async showEditDialog (id) {
      const { data: res } = await this.$axios.get('my/video/get/' + id)

      if (res.status !== 200) {
        return this.$message.error('查询视频信息失败!')
      }
      this.editForm = res.data
      this.editDialogVisble = true
    },
    // 监听修改视频对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改视频信息并提交
    editVideoInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return false
        // 发起修改视频信息的数据请求
        const { data: res } = await this.$axios.put('my/video/update', this.$qs.stringify(this.editForm))
        if (res.status !== 200) {
          return this.$message.error('更新视频信息失败!')
        }
        // 关闭对话框
        this.editDialogVisble = false
        // 刷新数据列表
        this.getVideoList()
        this.getTotal()
        // 提示修改成功
        this.$message.success('更新视频信息成功!')
      })
    },
    // 根据 Id 删除对应的视频信息
    async removeVideoById (id) {
      // 弹窗询问视频是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果视频确认删除，则返回值为字符串 confirm
      // 如果视频取消了删除，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$axios.delete('my/video/delete/' + id)

      if (res.status !== 200) {
        return this.$message.error('删除视频失败!')
      }
      this.$message.success('删除视频成功!')
      this.getVideoList()
      this.getTotal()
    },
    // 搜索框搜索视频
    searchVideo () {
      this.searchstatus = true
      this.getVideoList()
    },
    changeSearchStatus () {
      this.searchstatus = false
      this.getVideoList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
