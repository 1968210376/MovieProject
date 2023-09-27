<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ this.activeName }}</span>
      </div>
      <el-row :gutter="20">
        <el-col
          :xs="12"
          :sm="8"
          :md="4"
          :lg="4"
          :xl="4"
          v-for="card in videoList"
          :key="card.vod_id"
          :name="card.vod_enname"
        >
          <el-card class="cards" :body-style="{ padding: '5px' }">
            <el-image
              v-bind:src="card.vod_pic"
              :alt="card.vod_name"
              :title="card.vod_name"
              @click="PlayVideo(card.vod_play_url)"
            ></el-image>
            <div
              style="padding: 5px; height:20px;overflow:hidden;"
              @click="PlayVideo(card.vod_play_url)"
            >
              <span>{{ card.vod_name }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[12, 24, 36, 48, 100]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeId: '',
      activePath: '',
      activeName: '',
      videoList: [],
      total: 0,
      queryInfo: {
        // 当前页数
        pagenum: 1,
        // 当前每页显示条数
        pagesize: 12
      }
    }
  },
  created () {
    this.activeId = window.localStorage.getItem('activeId')
    this.activePath = window.localStorage.getItem('activePath')
    this.activeName = window.localStorage.getItem('activeName')
    this.getVideoList()
  },
  methods: {
    async getVideoList () {
      // console.log(this.activeId)
      const pagesize = this.queryInfo.pagesize
      const pagenum1 = this.queryInfo.pagenum
      const pagenums = pagesize * (pagenum1 - 1)
      let Id = this.activeId
      if (Id < 6) {
        Id = Id - 1
      }
      const typeId = Id
      console.log(typeId)
      const { data: res } = await this.$axios.get(
        `/my/video/videobytype/${typeId}/${pagenums}/${pagesize}`
      )
      if (res.status !== 200) return this.$message.error(res.msg)
      this.videoList = res.data
      this.getTotal(typeId)
    },
    async getTotal (typeId) {
      const typeIds = typeId
      const { data: res } = await this.$axios.get('my/video/total/' + typeIds)
      if (res.status !== 200) {
        return this.$message.error('获取total失败!')
      }
      this.total = res.total[0].total
    },

    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getVideoList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      console.log(this.queryInfo)
      this.getVideoList()
    },

    PlayVideo (url) {
      const Urls = url
      this.$router.push({ path: '/play', query: { url: Urls } })
    }
  }
}
</script>
<style lang="less" scoped>
.border-card {
  margin: 0;
}
.box-card {
  width: 100%;
  background: #fff;
  color: black;
  overflow: auto;

  .cards {
    width: 90%;
    height: 100%;
    margin: 10px 10px;
    border: 5px solid gainsboro;
    background: #fff;
    color: #000;
    overflow: hidden;
  }
  .cards:hover {
    cursor: pointer;
    border: 5px solid cornflowerblue;
    color: cornflowerblue;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .el-image {
    width: 100%;
    height: 300px;
  }
}
</style>
