<template>
  <div>
    <el-card class='el-container'>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>账号信息</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card class="box-card">
        <el-form ref="userFormRef"
                 :model="userForm"
                 :rules="loginFormRules"
                 label-width="65px"
                 class="login_form">
          <!-- 昵称 -->
          <el-form-item prop="nickname"
                        label="昵称">
            <el-input v-model="userForm.nickname"
                      prefix-icon="el-icon-view"></el-input>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item prop="username"
                        label="用户名">
            <el-input disabled
                      v-model="userForm.username"
                      prefix-icon="el-icon-user"></el-input>
          </el-form-item>

          <!-- 邮箱 -->
          <el-form-item prop="email"
                        label="邮箱">
            <el-input v-model="userForm.email"
                      prefix-icon="el-icon-message"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary"
                       @click="save">保存</el-button>

          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userinfo: [],
      userForm: {
        nickname: '',
        username: '',
        id: '',
        email: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserinfo()
  },
  methods: {
    async getUserinfo () {
      const { data: res } = await this.$axios.get('my/userinfo')
      if (res.status !== 200) {
        return this.$message.error('查询用户信息失败!')
      }
      this.userForm = res.data
    },
    save () {
      this.updataUserInfo()
    },
    updataUserInfo () {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return false
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$axios.put('my/userinfo', this.$qs.stringify(this.userForm))
        if (res.status !== 200) {
          return this.$message.error('更新用户信息失败!')
        }
        return this.$message.success('修改成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.box-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 300px;
}
</style>
