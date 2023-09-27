<template>
  <div>
    <el-card class="box-card"
             v-for="(item,index) in videomenu"
             :key="item.type_name"
             :name="item.type_en">
      <div slot="header"
           class="clearfix">
        <span>{{item.type_name}}</span>
      </div>
      <el-row :gutter="20">
        <el-col :xs="12"
                :sm="8"
                :md="4"
                :lg="4"
                :xl="4"
                v-for="card in videolist[index]"
                :key="card.vod_id"
                :name="card.vod_enname">

          <el-card class="cards"
                   :body-style="{ padding: '5px' }">

            <el-image v-bind:src="card.vod_pic"
                      :alt="card.vod_name"
                      :title="card.vod_name"
                      lazy
                      @click="PlayVideo(card.vod_play_url)"></el-image>
            <div style="padding: 5px; height:20px;overflow:hidden;"
                 @click="PlayVideo(card.vod_play_url)">
              <span>{{card.vod_name}}</span>
            </div>
          </el-card>
        </el-col>

      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videomenu: [],
      videolist: []

    }
  },
  created () {
    this.getVideoMenu()
  },
  methods: {
    async getVideoMenu () {
      const { data: res } = await this.$axios.get('/my/video/videomenu')
      if (res.status !== 200) return this.$message.error(res.msg)
      this.videomenu = res.data
      console.log(res.data)
      for (let index = 0; index < this.videomenu.length; index++) {
        const { data: res } = await this.$axios.get(`/my/video/videobytype/${this.videomenu[index].type_id}/0/6`)
        if (res.status !== 200) return this.$message.error(res.msg)
        this.videolist[index] = res.data
        this.videolist.push({})
        this.videolist.pop()
      }
    },
    PlayVideo (url) {
      const Urls = url
      this.$router.push({ path: '/play', query: { url: Urls } })
    }
  }
}
</script>
<style lang="less" scoped>
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
    color: sienna;
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
