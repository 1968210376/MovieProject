<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
        <el-breadcrumb-item>轮播列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card class="box-card">
        <!-- 搜索添加区域 -->
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button type="primary"
                       @click="addDialogVisible=true">添加轮播</el-button>
          </el-col>
        </el-row>
        <!-- 轮播列表区域 -->
        <el-table :data="lunbolist"
                  border
                  stripe>
          <el-table-column label="序号"
                           type="index"></el-table-column>
          <el-table-column label="轮播id"
                           prop="id"></el-table-column>
          <el-table-column label="轮播图片地址"
                           prop="pic"
                           :show-overflow-tooltip="false"></el-table-column>
          <el-table-column label="轮播标题"
                           prop="alt"
                           :show-overflow-tooltip="false"></el-table-column>
          <el-table-column label="操作"
                           width="190px">
            <template v-slot="scope">
              <!-- 修改按钮 -->
              <el-button type="primary"
                         icon="el-icon-edit"
                         size="mini"
                         @click="showEditDialog(scope.row.id)"></el-button>
              <!-- 删除按钮 -->
              <el-button type="danger"
                         icon="el-icon-delete"
                         size="mini"
                         @click="removeLunBoById(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 添加轮播的对话框 -->
        <el-dialog title="添加轮播"
                   :visible.sync="addDialogVisible"
                   width="50%"
                   @close="addDialogClosed">
          <!-- 内容主体区域 -->
          <el-form :model="addForm"
                   :rules="addFormRules"
                   ref="addFormRef"
                   label-width="100px">
            <el-form-item label="解析轮播图片地址"
                          prop="pic">
              <el-input v-model="addForm.pic"></el-input>
            </el-form-item>
            <el-form-item label="解析轮播图片标题"
                          prop="alt">
              <el-input v-model="addForm.alt"></el-input>
            </el-form-item>

          </el-form>
          <!-- 底部区 -->
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="addLunBo">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改轮播的对话框 -->
        <el-dialog title="修改轮播"
                   :visible.sync="editDialogVisble"
                   width="50%"
                   @closed="editDialogClosed">
          <!-- 内容主体区域 -->
          <el-form :model="editForm"
                   :rules="editFormRules"
                   ref="editFormRef"
                   label-width="70px">
            <el-form-item label="轮播id"
                          prop="id">
              <el-input v-model="editForm.id"
                        disabled></el-input>
            </el-form-item>
            <el-form-item label="解析轮播图片地址"
                          prop="pic">
              <el-input v-model="editForm.pic"></el-input>
            </el-form-item>
            <el-form-item label="解析轮播图片标题"
                          prop="alt">
              <el-input v-model="editForm.alt"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区 -->
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary"
                       @click="editLunBo">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lunbolist: [],
      // 控制添加轮播对话框的显示与隐藏
      addDialogVisible: false,
      // 添加轮播的表单数据
      addForm: {
        pic: '',
        alt: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        pic: [{
          required: true,
          message: '请输入轮播图地址',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 255,
          message: '轮播图地址的长度在5~255个字符之间',
          trigger: 'blur'
        }
        ],
        alt: [{
          required: true,
          message: '请输入轮播图标题',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 255,
          message: '轮播图标题的长度在1~255个字符之间',
          trigger: 'blur'
        }
        ]

      },
      // 控制修改轮播对话框的显示与隐藏
      editDialogVisble: false,
      // 查询到的轮播信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        pic: [{
          required: true,
          message: '请输入轮播图地址',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 255,
          message: '轮播图地址的长度在5~255个字符之间',
          trigger: 'blur'
        }
        ],
        alt: [{
          required: true,
          message: '请输入轮播图标题',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 255,
          message: '轮播图的标题的长度在1~255个字符之间',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  created () {
    this.getLunBoList()
  },
  methods: {
    async getLunBoList () {
      const { data: res } = await this.$axios.get('my/video/lun')

      if (res.status !== 200) {
        return this.$message.error('查询轮播信息失败!')
      }
      this.lunbolist = res.data
    },
    // 监听添加轮播对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addLunBo () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return false
        // 可以发起添加轮播的网络请求
        const { data: res } = await this.$axios.post('my/video/lun', this.$qs.stringify(this.addForm))
        if (res.status !== 200) {
          this.$message.error('添加轮播失败!')
        }
        this.$message.success('添加轮播成功!')
        // 隐藏添加轮播的对话框
        this.addDialogVisible = false
        // 重新获取轮播列表数据
        this.getLunBoList()
      })
    },
    // 展示编辑轮播的对话框
    async showEditDialog (id) {
      const { data: res } = await this.$axios.get('my/video/lun/' + id)
      if (res.status !== 200) {
        return this.$message.error('查询轮播信息失败!')
      }
      this.editForm = res.data
      this.editDialogVisble = true
    },
    // 监听修改轮播对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改轮播信息并提交
    editLunBo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return false
        // 发起修改轮播信息的数据请求
        const { data: res } = await this.$axios.put('my/video/lun', this.$qs.stringify(this.editForm))
        if (res.status !== 200) {
          return this.$message.error('更新轮播信息失败!')
        }
        // 关闭对话框
        this.editDialogVisble = false
        // 刷新数据列表
        this.getLunBoList()
        // 提示修改成功
        this.$message.success('更新轮播信息成功!')
      })
    },
    // 根据 Id 删除对应的轮播信息
    async removeLunBoById (id) {
      // 弹窗询问是否删除轮播数据
      const confirmResult = await this.$confirm('此操作将永久删除该轮播, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果轮播确认删除，则返回值为字符串 confirm
      // 如果轮播取消了删除，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$axios.delete('my/video/lun/' + id)
      if (res.status !== 200) {
        return this.$message.error('删除轮播失败!')
      }
      this.$message.success('删除轮播成功!')
      this.getLunBoList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
