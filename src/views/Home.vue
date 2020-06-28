<template>
  <div class="home">
    <TopBar />
    <Banner />
    <!-- 热度榜推荐 -->
    <div class="hotlist">
      <div class="hotlist-top">
        <h1>热度榜推荐</h1>
        <h1>更多 &gt;</h1>
      </div>
      <div class="hotlist-bottom">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item
            v-for="(item, index) in hotlistmovies"
            :key="index"
            to=""
          >
            <van-image :src="item.coverImage" />
            <h1>{{ item.name | spliceStr(5) }}</h1>
            <h1>{{ item.tag | spliceStr(8) }}</h1>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 评分榜推荐 -->
    <div class="scorelist">
      <div class="scorelist-top">
        <h1>评分榜推荐</h1>
        <h1>更多 &gt;</h1>
      </div>
      <div class="scorelist-bottom">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item
            v-for="(item, index) in scorelistmovies"
            :key="index"
            to=""
          >
            <van-image :src="item.coverImage" />
            <h1>{{ item.name | spliceStr(5) }}</h1>
            <h1>{{ item.tag | spliceStr(8) }}</h1>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 猜你想看 -->
    <div class="guesslike">
      <div class="guesslike-top">
        <h1>猜你想看</h1>
        <h1>更多 &gt;</h1>
      </div>
      <div class="guesslike-bottom">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item
            v-for="(item, index) in guesslikemovies"
            :key="index"
            to=""
          >
            <van-image :src="item.coverImage" />
            <h1>{{ item.name | spliceStr(5) }}</h1>
            <h1>{{ item.tag | spliceStr(8) }}</h1>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import Banner from "@/components/Banner";
import { Movies } from "@/service/Movies.js";

export default {
  name: "Home",
  data() {
    return {
      playicon: require("@/assets/icons/play.png"),
      score: 3.5,
      hotlistmovies: [],
      scorelistmovies: [],
      guesslikemovies: [],
    };
  },
  filters: {
    spliceStr(str, n) {
      return str.length > n ? str.substr(0, n) + "..." : str;
    },
  },
  components: {
    TopBar,
    Banner,
  },
  methods: {
    getHotListData() {
      Movies(3, 1, "views").then((res) => {
        console.log(res);
        this.hotlistmovies = res.data.list;
      });
    },
    getScoreListData() {
      Movies(3, 1, "score").then((res) => {
        console.log(res);
        this.scorelistmovies = res.data.list;
      });
    },
    getData() {
      Movies(30, 1, "_id").then((res) => {
        console.log(res);
        this.guesslikemovies = res.data.list;
      });
    },
  },
  computed: {},
  created() {
    this.getHotListData();
    this.getScoreListData();
    this.getData();
  },
};
</script>
<style scoped>
/* 热度榜推荐 */
.hotlist-top {
  display: flex;
  align-items: center;
  margin: 20px 30px 0 20px;
  justify-content: space-between;
}
.hotlist-top h1:nth-child(1) {
  font-weight: bolder;
}
.hotlist-top h1:nth-child(2) {
  font-size: 20px;
}
.hotlist-bottom h1:nth-child(2) {
  padding-top: 20px;
  font-size: 28px;
}
.hotlist h1:nth-child(3) {
  font-size: 11px;
  padding-top: 20px;
  color: #707070;
}
/* 评分榜推荐 */
.scorelist-top {
  display: flex;
  align-items: center;
  margin: 20px 30px 0 20px;
  justify-content: space-between;
}
.scorelist-top h1:nth-child(1) {
  font-weight: bolder;
}
.scorelist-top h1:nth-child(2) {
  font-size: 20px;
}
.scorelist-bottom h1:nth-child(2) {
  padding-top: 20px;
  font-size: 28px;
}
.scorelist h1:nth-child(3) {
  font-size: 11px;
  padding-top: 20px;
  color: #707070;
}
/* 猜你想看 */
.guesslike-top {
  display: flex;
  align-items: center;
  margin: 20px 30px 0 20px;
  justify-content: space-between;
}
.guesslike-top h1:nth-child(1) {
  font-weight: bolder;
}
.guesslike-top h1:nth-child(2) {
  font-size: 20px;
}
.guesslike-bottom h1:nth-child(2) {
  padding-top: 20px;
  font-size: 28px;
}
.guesslike h1:nth-child(3) {
  font-size: 11px;
  padding-top: 20px;
  color: #707070;
}
</style>
