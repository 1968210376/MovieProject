<template>
  <div>
    <!-- <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in lunbo"
                        :key="item.vod_id"
                        :index="item.vod_enname">
        <img :src="item.vod_pic"
             :alt="item.vod_name">
      </el-carousel-item>
    </el-carousel> -->
    <template>
      <el-carousel :interval="4000"
                   type="card"
                   height="350px">
        <el-carousel-item v-for="item in lunbo"
                          :key="item.id"
                          :index="item.alt">
          <div class="demo-image__placeholder">
            <div class="block">
              <el-image :src="item.pic"
                        @click="check(item.alt)"></el-image>
            </div>
            <div class="block">
              <el-image :src="item.pic">
                <div slot="placeholder"
                     class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </div>
          </div>
          <!-- <img :src="item.pic"
               :alt="item.alt"> -->
        </el-carousel-item>
      </el-carousel>
    </template>
    <div>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      lunbo: []

    }
  },
  methods: {
    async getlunbo () {
      const { data: res } = await this.axios.get('/my/video/lun')
      this.lunbo = res.data
    },
    check (name) {
      const Name = name
      this.searchstatus = true
      this.$router.replace({ path: '/search', query: { search_key: Name } })
    }
  },
  created () {
    this.getlunbo()
  }
}

</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item {
  .el-image {
    width: 100%;
    height: 350px;
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
