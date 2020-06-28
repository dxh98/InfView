<template>
  <div class="tv">
    <TopBar />
    <van-tabs v-model="active">
      <!-- 热度榜 -->
      <van-tab class="hotlist" title="热度榜">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item v-for="(item, index) in HotMovies" :key="index" to="">
            <van-image class="hotcoverImage" :src="item.coverImage" />
            <h1>{{ item.name | spliceStr(6) }}</h1>
            <h1>{{ item.tag | spliceStr(8) }}</h1>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <!-- 评分榜 -->
      <van-tab class="scorelist" title="评分榜">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item
            v-for="(item, index) in ScoreMovies"
            :key="index"
            to=""
          >
            <van-image class="scorecoverImage" :src="item.coverImage" />
            <h1>{{ item.name | spliceStr(5) }}</h1>
            <h1>{{ item.tag | spliceStr(8) }}</h1>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import TopBar from "../components/TopBar";
import { Movies } from '@/service/Movies'

export default {
  name: "Tv",
  data() {
    return {
      active: 2,
      HotMovies:[],
      ScoreMovies:[]
    };
  },
  filters: {
    spliceStr(str, n) {
      return str.length > n ? str.substr(0, n) + "..." : str;
    },
  },
  components: {
    TopBar
  },
  methods: {},
  created(){
    Movies(30,1,"views").then(res=>{
      this.HotMovies = res.data.list
    })
    Movies(30,1,"score").then(res=>{
      this.ScoreMovies = res.data.list
    })
  }
};
</script>

<style scoped>
.hotcoverImage {
  height: 288px;
}
.hotlist h1:nth-child(2) {
  padding-top: 20px;
  font-size: 28px;
}
.hotlist h1:nth-child(3) {
  font-size: 11px;
  padding-top: 20px;
  color: #707070;
}
.scorecoverImage {
  height: 288px;
}
.scorelist h1:nth-child(2) {
  padding-top: 20px;
  font-size: 28px;
}
.scorelist h1:nth-child(3) {
  font-size: 11px;
  padding-top: 20px;
  color: #707070;
}
</style>
