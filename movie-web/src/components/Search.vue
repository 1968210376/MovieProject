<template>
  <div>
    <el-card class="box-card">
      <!-- 视频列表区域 -->
      <el-table :data="videolist"
                border
                stripe>
        <el-table-column label="序号"
                         type="index"></el-table-column>
        <el-table-column label="视频名称"
                         prop="vod_name"
                         :show-overflow-tooltip="false"></el-table-column>
        <el-table-column :show-overflow-tooltip="false"
                         label="视频缩略图"
                         prop="vod_pic">
          <template slot-scope="scope">
            <img :src="scope.row.vod_pic"
                 style="width:200px;height300px;">
          </template>
        </el-table-column>

        <el-table-column :show-overflow-tooltip="false"
                         label="视频简介"
                         prop="vod_content">
          <template slot-scope="scope">
            <div v-html="scope.row.vod_content"></div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="false"
                         label="播放"
                         prop="vod_play_url">
          <template slot-scope="scope">
            <div>
              <el-button type="primary"
                         plain
                         @click="playVideo(scope.row.vod_play_url)">播放</el-button>

            </div>
          </template>

        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[2, 4, 8, 16, 32]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      videolist: [],
      total: 0,
      queryInfo: {
        search_key: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示条数
        pagesize: 2
      },
      searchstatus: false
    }
  },
  created () {
    this.queryInfo.search_key = this.$route.query.search_key
    this.searchstatus = true
    this.getVideoList()
  },
  methods: {
    async getVideoList () {
      const pagesize = this.queryInfo.pagesize
      const pagenum1 = this.queryInfo.pagenum
      const pagenum = this.queryInfo.pagesize * (pagenum1 - 1)
      if (this.searchstatus) {
        const { data: res } = await this.$axios.post(`my/video/list/${this.queryInfo.search_key}/${pagenum}/${pagesize}`)
        if (res.status !== 200) {
          return this.$message.error('搜索视频失败!')
        }
        this.$message.success('搜索视频成功!')
        this.videolist = res.data
        this.getTotal()
        this.searchstatus = false
      } else {
        const { data: res } = await this.$axios.get(`my/video/list/${pagenum}/${pagesize}`)
        if (res.status !== 200) {
          return this.$message.error('获取视频列表失败!')
        }
        this.videolist = res.data
      }
      // const list = this.videolist
      // for (const i of list) {
      //   this.videoUrl(i.vod_play_url)
      // }
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
      this.searchstatus = true
      this.getVideoList()
      this.getTotal()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.searchstatus = true
      this.getVideoList()
    },
    playVideo (url) {
      const Urls = url
      // console.log(Urls)
      this.$router.replace({ path: '/play', query: { url: Urls } })
    }
  },
  computed: {
  }
}
</script>
<style lang="less" scoped>
</style>
