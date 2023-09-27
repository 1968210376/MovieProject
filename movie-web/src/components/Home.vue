<template>
  <div style="width: 100%;height: 100%;overflow: auto;">
    <template>
      <el-backtop></el-backtop>
    </template>
    <el-container class="home-container">
      <el-header>
        <el-menu
          class="menu"
          :default-active="activePath"
          text-color="#000"
          active-text-color="#409eff"
          mode="horizontal"
          background-color="#fff"
          router
        >
          <!-- 头部区域 -->

          <img src="../../static/img/logo.png" alt="video-私人影视" />
          <span class="itemName">movie-web</span>
          <!-- 一级菜单 无子菜单 -->
          <el-menu-item
            :index="item.type_en"
            v-for="item in noChildren"
            @click="saveNavState(item.type_en, item.id, item.type_name)"
            :key="item.type_id"
          >
            <!-- 一级菜单的模板 -->
            <template slot="title">
              <!-- 文本 -->
              <span>{{ item.type_name }}</span>
            </template>
          </el-menu-item>
          <!-- 一级菜单 有子菜单 -->
          <el-submenu
            :index="item.type_en"
            v-for="item in hasChildren"
            @click="saveNavState(item.type_en)"
            :key="item.type_id"
          >
            <!-- 一级菜单的模板 -->
            <template slot="title">
              <!-- 文本 -->
              <span>{{ item.type_name }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.type_en + ''"
              v-for="subItem in item.children"
              :key="subItem.type_id + ''"
              @click="
                saveNavState(
                  subItem.type_en,
                  subItem.type_id,
                  subItem.type_name
                )
              "
            >
              <!-- 二级菜单的模板 -->
              <template slot="title">
                <!-- 文本 -->
                <span>{{ subItem.type_name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <div style="width:30%;margin-left:50px">
            <el-input
              placeholder="请输入内容"
              v-model="queryInfo.search_key"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                index="/search"
                @click="searchVideo"
              ></el-button>
            </el-input>
          </div>

          <el-popover placement="bottom" trigger="hover">
            <el-button @click="drawer = true" type="primary"
              >用户信息</el-button
            >
            <el-button @click="logout">退出</el-button>
            <el-button
              style="position:absolute;right:0px;top:-7px;"
              slot="reference"
            >
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              >
              </el-avatar>
            </el-button>
          </el-popover>
          <el-drawer
            title="用户信息管理"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose"
          >
            <el-card class="box-card">
              <el-form
                ref="userFormRef"
                :model="userForm"
                :rules="loginFormRules"
                label-width="65px"
                class="login_form"
              >
                <!-- 昵称 -->
                <el-form-item prop="nickname" label="昵称">
                  <el-input
                    v-model="userForm.nickname"
                    prefix-icon="el-icon-view"
                  ></el-input>
                </el-form-item>
                <!-- 用户名 -->
                <el-form-item prop="username" label="用户名">
                  <el-input
                    disabled
                    v-model="userForm.username"
                    prefix-icon="el-icon-user"
                  ></el-input>
                </el-form-item>

                <!-- 邮箱 -->
                <el-form-item prop="email" label="邮箱">
                  <el-input
                    v-model="userForm.email"
                    prefix-icon="el-icon-message"
                  ></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                  <el-button type="primary" @click="save">保存</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-drawer>
        </el-menu>
      </el-header>
      <el-main>
        <div>
          <router-view :key="$route.fullPath"></router-view>
        </div>
      </el-main>
      <el-footer>
        <div class="banquan">
          <p>
            Design By <span class="ban">Dang Zhiguo</span>
            <!-- <span>友情链接：</span> <a @click="linkDownload('http://www.jiugev.xyz/h5')">www.jiugev.xyz/h5</a> || -->
            <span> 备案号：</span
            ><a href="https://beian.miit.gov.cn/" target="_blank"
              >
              豫ICP备2023022868号
              </a
            >
          </p>
          <p>
            本站不提供任何视听上传储存服务，所有内容均来至网络自动采集，只提供web页面浏览服务，并不提供影片资源存储，也不参与任何视频录制、上传.
          </p>

          <p>
            若本站收录的节目无意侵犯了贵司权利，请给我们来信，我们会及时处理和删除，谢谢！Copyright
            © 2022 movie-web
          </p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      direction: 'rtl',
      visible: false,
      activePath: '',
      activeId: '',
      activeName: '',
      menulist: [],
      menulists: [],
      menu: [],
      queryInfo: {
        search_key: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示条数
        pagesize: 10
      },
      searchstatus: false,
      userInfo: {},
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
    this.getMenuList()
    this.getUserInfo()
    this.activePath = window.localStorage.getItem('activePath')
    if (!this.activePath) {
      this.activePath = '/home'
    }
  },
  methods: {
    logout () {
      window.localStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$axios.get('get/menus')
      if (res.status !== 200) return this.$message.error(res.msg)
      this.menulist = res.data
      // eslint-disable-next-line no-eval
      this.menulist[1].children = eval('(' + this.menulist[1].children + ')')
      // eslint-disable-next-line no-eval
      this.menulist[2].children = eval('(' + this.menulist[2].children + ')')
      this.menu = this.menulist
      console.log(this.menulist)
      const list = this.menu
      for (const i of list) {
        if (!i.children) {
          delete i.children
        }
      }
      this.menulists = list
      // console.log(this.menulists)
      // console.log(this.noChildren)
      // console.log(this.hasChildren)
    },
    saveNavState (activePath, activeId, activeName) {
      console.log(activePath, activeId, activeName)
      window.localStorage.setItem('activePath', activePath)
      this.activePath = activePath
      window.localStorage.setItem('activeId', activeId)
      this.activeId = activeId
      window.localStorage.setItem('activeName', activeName)
      this.activeName = activeName
    },
    linkDownload (url) {
      window.open(url, '_blank') // 新窗口打开外链接
    },
    searchVideo () {
      this.searchstatus = true
      const search = this.queryInfo.search_key
      this.$router.push({ path: '/search', query: { search_key: search } })
      this.queryInfo.search_key = ''
    },
    async getUserInfo () {
      const { data: res } = await this.$axios.get('/my/userinfo')
      if (res.status !== 200) return this.$message.error(res.msg)
      this.userInfo = res.data
      this.userForm = res.data
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          // this.save()
          done()
        })
        .catch(_ => {})
    },
    save () {
      this.updataUserInfo()
    },
    updataUserInfo () {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return false
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$axios.put(
          'my/userinfo',
          this.$qs.stringify(this.userForm)
        )
        if (res.status !== 200) {
          return this.$message.error('更新用户信息失败!')
        }
        return this.$message.success('修改成功')
      })
    }
  },
  computed: {
    noChildren () {
      return this.menulists.filter(item => !item.children)
    },
    hasChildren () {
      return this.menulists.filter(item => item.children)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home-container {
  width: 100%;
}
.menu {
  width: 100%;
  overflow: hidden;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  color: #000;
  font-size: 20px;
  .el-menu {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    img {
      height: 70px;
      margin-left: 15px;
    }
    span {
      margin-left: 15px;
      margin-right: 35px;
    }
  }
}

.el-main {
  background-color: #fff;
}
.el-footer {
  width: 100%;
  text-align: center;
  font-size: 14px;
  div {
    padding: 15px;
  }
  .ban {
    font-family: "华文行楷";
    font-size: 18px;
    color: chocolate;
  }
  .banquan {
    font-size: 12px;
    color: gray;
  }
  a {
    text-decoration: none;
    color: brown;
    cursor: pointer;
  }
}
</style>
