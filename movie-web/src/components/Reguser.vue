<template>
  <div class="login_container">
    <h3 class="welcome">movie-web</h3>
    <div class="login_box">
      <h3 style="text-align:center;color: seashell;">注册</h3>
      <!-- 登陆表单区域 -->
      <el-form ref="loginFormRef"
               :model="loginForm"
               :rules="loginFormRules"
               label-width="65px"
               class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username"
                      label="用户名">
          <el-input v-model="loginForm.username"
                    prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password"
                      label="密码">
          <el-input type='password'
                    v-model="loginForm.password"
                    prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="repassword"
                      label="密码">
          <el-input type='password'
                    v-model="loginForm.repassword"
                    prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="register">注册</el-button>
          <el-button type="primary"
                     @click="login">登录</el-button>

          <el-button type="info"
                     @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var repassword = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 这是登陆表单的数据绑定对象
      loginForm: {
        username: '',
        password: '',
        repassword: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证视频名是否合法
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        //  验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { validator: repassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    register () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios.post('api/reguser', this.$qs.stringify(this.loginForm))
        if (res.status !== 200) return this.$message.error('注册失败！')
        this.$message.success('注册成功！')
        // 1.将登陆成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中除了登陆之外的其他 API 接口，必须在登录之后才能访问
        //   1.2 token 只用在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background: url("../../static/img/bg.jpg") no-repeat 100% 100%;
  height: 100%;
}
.welcome {
  position: absolute;
  // top: 30px;
  left: 30px;
  color: seashell;
}
.login_box {
  width: 450px;
  height: 320px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
