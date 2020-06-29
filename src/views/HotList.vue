<template>
  <div class="tv">
    <TopBar />
    <van-tabs v-model="active" animated swipeable>
      <!-- 热度榜 -->
      <van-tab class="hotlist" title="热度榜">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item
            v-for="(item, index) in HotMovies"
            :key="index"
            @click="toDetail(item._id)"
          >
            <van-image class="hotcoverImage" :src="item.coverImage" />
            <h1>{{ item.name }}</h1>
            <h1>{{ item.tag }}</h1>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <!-- 评分榜 -->
      <van-tab class="scorelist" title="评分榜">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item
            v-for="(item, index) in ScoreMovies"
            :key="index"
            @click="toDetail(item._id)"
          >
            <van-image class="scorecoverImage" :src="item.coverImage" />
            <h1>{{ item.name }}</h1>
            <h1>{{ item.tag }}</h1>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import TopBar from "../components/TopBar";
import { Movies } from "@/service/Movies";

export default {
  name: "Tv",
  data() {
    return {
      active: 2,
      HotMovies: [],
      ScoreMovies: []
    };
  },
  filters: {
    spliceStr(str, n) {
      return str.length > n ? str.substr(0, n) + "..." : str;
    }
  },
  components: {
    TopBar
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: "MovieDetail", query: { id } });
    }
  },
  created() {
    Movies(30, 1, "views").then(res => {
      this.HotMovies = res.data.list;
    });
    Movies(30, 1, "score").then(res => {
      this.ScoreMovies = res.data.list;
    });
    if (this.$route.query.active) {
      this.active = this.$route.query.active;
    }
  }
};
</script>

<style scoped>
.hotcoverImage,
.scorecoverImage {
  height: 288px;
}
.hotlist h1:nth-child(2),
.scorelist h1:nth-child(2) {
  padding-top: 10px;
  font-size: 30px;
  line-height: 60px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.hotlist h1:nth-child(3),
.scorelist h1:nth-child(3) {
  font-size: 26px;
  color: #707070;
  line-height: 40px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
