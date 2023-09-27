<template>
  <div>
    <el-row>
      <el-col :span="18">

        <template>
          <el-card class="input_video">
            <iframe width="100%;"
                    height="700px;"
                    allowfullscreen="true"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    oallowfullscreen="true"
                    msallowfullscreen="true"
                    name="mapFrame"
                    scrolling="no"
                    frameborder="0"
                    v-bind:src="this.videoPlayUrl"></iframe>
          </el-card>

        </template>

      </el-col>
      <el-col :span="6">
        <el-card class="juji">
          <h3>剧集</h3>
          <el-select v-model="jiexi"
                     @change="jieXiPlays(jiexi)"
                     placeholder="请选择">
            <el-option v-for="(item,index) in jieXi"
                       :key="item.id"
                       :label="'解析接口'+index"
                       :value="item.jiexi">
              <span>{{ '解析接口'+index }}</span>

            </el-option>
          </el-select>
          <div>
            <ul class="ji">
              <li style="float:left;"
                  v-for="(it,ino) in Url[0]"
                  :key="ino">
                <el-button type="primary"
                           plain
                           @click="playUrls(Url[0][ino+1])"
                           v-if="ino%2==0">
                  {{Url[0][ino]}}</el-button>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data () {
    return {

      // VideoList: [],
      // play: [],
      // plays: [],
      playUrl: '',
      playName: '',
      // playUrls: [],
      Url: [],
      // Urls: []
      jieXi: [],
      jiexi: 'https://svip.bljiex.cc/?v=',
      jieXiPlay: 'https://svip.bljiex.cc/?v=',
      videoPlayUrl: ''

    }
  },
  created () {
    this.Urls = this.$route.query.url
    this.videoUrl()
    this.jieXiList()
    if (this.videoPlayUrl === '') {
      this.videoPlayUrl = this.jieXiPlay + this.Url[0][1]
    }
  },
  methods: {
    async jieXiList () {
      const { data: res } = await this.$axios.get('/my/video/jiexi')
      if (res.status !== 200) {
        return this.$message.error('获取解析接口列表失败!')
      }
      this.jieXi = res.data
    },
    videoUrl () {
      const Urla = this.Urls.split('#').join(',').split('$').join(',').split(',')
      // this.plays = this.play
      // this.playUrl = this.plays
      // this.playUrls = this.playUrl
      //  = this.playUrls
      let obj = [{}]
      Urla.forEach((item, index) => { obj[index] = item })
      this.Url.push(obj)
      // console.log(this.Url[0].length)
    },
    jieXiPlays (jiexi) {
      this.jieXiPlay = jiexi
      // console.log(this.jieXiPlay)
    },
    playUrls (url) {
      const videoPlayUrls = url
      this.videoPlayUrl = this.jieXiPlay + videoPlayUrls
      console.log(this.videoPlayUrl)
    }

  }
}
</script>

<style lang="less" scoped>
.ji {
  width: 100%;
  list-style: none;
  margin: 5px 0;
  padding: 0;
}
.ji::after {
  display: block;
  clear: both;
  content: "";
}

.juji {
  width: 100%;
  height: 740px;
  background: white;
  margin: 5px;
  text-align: center;
  overflow: auto;
}
</style>
