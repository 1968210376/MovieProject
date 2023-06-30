<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>接口管理</el-breadcrumb-item>
        <el-breadcrumb-item>接口列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card class="box-card">
        <!-- 搜索添加区域 -->
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button type="primary"
                       @click="addDialogVisible=true">添加接口</el-button>
          </el-col>
        </el-row>
        <!-- 接口列表区域 -->
        <el-table :data="jiexilist"
                  border
                  stripe>
          <el-table-column label="序号"
                           type="index"></el-table-column>
          <el-table-column label="接口id"
                           prop="id"></el-table-column>
          <el-table-column label="接口地址"
                           prop="jiexi"
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
                         @click="removeJieXiById(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 添加解析接口的对话框 -->
        <el-dialog title="添加解析接口"
                   :visible.sync="addDialogVisible"
                   width="50%"
                   @close="addDialogClosed">
          <!-- 内容主体区域 -->
          <el-form :model="addForm"
                   :rules="addFormRules"
                   ref="addFormRef"
                   label-width="100px">
            <el-form-item label="解析接口地址"
                          prop="jiexi">
              <el-input v-model="addForm.jiexi"></el-input>
            </el-form-item>

          </el-form>
          <!-- 底部区 -->
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="addJieXi">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改接口的对话框 -->
        <el-dialog title="修改接口"
                   :visible.sync="editDialogVisble"
                   width="50%"
                   @closed="editDialogClosed">
          <!-- 内容主体区域 -->
          <el-form :model="editForm"
                   :rules="editFormRules"
                   ref="editFormRef"
                   label-width="70px">
            <el-form-item label="解析接口id"
                          prop="id">
              <el-input v-model="editForm.id"
                        disabled></el-input>
            </el-form-item>
            <el-form-item label="解析接口链接"
                          prop="jiexi">
              <el-input v-model="editForm.jiexi"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区 -->
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary"
                       @click="editJieXi">确 定</el-button>
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
      jiexilist: [],
      // 控制添加解析接口对话框的显示与隐藏
      addDialogVisible: false,
      // 添加解析接口的表单数据
      addForm: {
        jiexi: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        jiexi: [{
          required: true,
          message: '请输入接口',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 255,
          message: '解析接口地址的长度在5~255个字符之间',
          trigger: 'blur'
        }
        ]

      },
      // 控制修改解析接口对话框的显示与隐藏
      editDialogVisble: false,
      // 查询到的解析接口信息对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        jiexi: [
          {
            required: true,
            message: '请输入解析接口地址',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 255,
            message: '解析接口地址的长度在5~255位数字之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getJieXiList()
  },
  methods: {
    async getJieXiList () {
      const { data: res } = await this.$axios.get('my/video/jiexi')

      if (res.status !== 200) {
        return this.$message.error('查询解析接口信息失败!')
      }
      this.jiexilist = res.data
    },
    // 监听添加接口对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addJieXi () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return false
        // 可以发起添加解析接口的网络请求
        const { data: res } = await this.$axios.post('my/video/jiexi', this.$qs.stringify(this.addForm))
        if (res.status !== 200) {
          this.$message.error('添加解析接口失败!')
        }
        this.$message.success('添加解析接口成功!')
        // 隐藏添加解析接口的对话框
        this.addDialogVisible = false
        // 重新获取解析接口列表数据
        this.getJieXiList()
        this.getTotal()
      })
    },
    // 展示编辑解析接口的对话框
    async showEditDialog (id) {
      const { data: res } = await this.$axios.get('my/video/jiexi/' + id)
      if (res.status !== 200) {
        return this.$message.error('查询接口信息失败!')
      }
      this.editForm = res.data
      this.editDialogVisble = true
    },
    // 监听修改解析接口对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改解析接口信息并提交
    editJieXi () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return false
        // 发起修改解析接口信息的数据请求
        const { data: res } = await this.$axios.put('my/video/jiexi', this.$qs.stringify(this.editForm))
        if (res.status !== 200) {
          return this.$message.error('更新解析接口信息失败!')
        }
        // 关闭对话框
        this.editDialogVisble = false
        // 刷新数据列表
        this.getJieXiList()
        // 提示修改成功
        this.$message.success('更新解析接口信息成功!')
      })
    },
    // 根据 Id 删除对应的解析接口信息
    async removeJieXiById (id) {
      // 弹窗询问解析接口是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该接口, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果解析接口确认删除，则返回值为字符串 confirm
      // 如果解析接口取消了删除，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$axios.delete('my/video/jiexi/' + id)
      if (res.status !== 200) {
        return this.$message.error('删除解析接口失败!')
      }
      this.$message.success('删除解析接口成功!')
      this.getJieXiList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
