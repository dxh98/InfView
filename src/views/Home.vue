<template>
  <div class="home" ref="viewbox">
    <TopBar />
    <Banner />
    <!-- 热度榜推荐 -->
    <div class="hotlist">
      <div class="hotlist-top">
        <h1>热度榜推荐</h1>
        <h1 @click="toHotList">更多 &gt;</h1>
      </div>
      <div class="hotlist-bottom">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item
            v-for="(item, index) in hotlistmovies"
            :key="index"
            @click="toDetail(item._id)"
          >
            <van-image :src="item.coverImage" />
            <h1>{{ item.name }}</h1>
            <h1>{{ item.tag }}</h1>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 评分榜推荐 -->
    <div class="scorelist">
      <div class="scorelist-top">
        <h1>评分榜推荐</h1>
        <h1 @click="toScoreList(1)">更多 &gt;</h1>
      </div>
      <div class="scorelist-bottom">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item
            @click="toDetail(item._id)"
            v-for="(item, index) in scorelistmovies"
            :key="index"
          >
            <van-image :src="item.coverImage" />
            <h1>{{ item.name }}</h1>
            <h1>{{ item.tag }}</h1>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 猜你想看 -->
    <div class="guesslike">
      <div class="guesslike-top">
        <h1>猜你想看</h1>
        <h1 @click="toSort">更多 &gt;</h1>
      </div>
      <div class="guesslike-bottom">
        <van-grid :column-num="3" :gutter="0.5" :border="false">
          <van-grid-item
            v-for="(item, index) in guesslikemovies"
            :key="index"
            @click="toDetail(item._id)"
          >
            <van-image :src="item.coverImage" />
            <h1>{{ item.name }}</h1>
            <h1>{{ item.tag }}</h1>
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
      page: 1
    };
  },
  components: {
    TopBar,
    Banner
  },
  mounted() {
    this.box = this.$refs.viewbox;
    this.box.addEventListener(
      "scroll",
      () => {
        if (
          this.$refs.viewbox.scrollTop + this.$refs.viewbox.clientHeight ==
          this.$refs.viewbox.scrollHeight
        ) {
          Movies(30, this.page, "_id").then(res => {
            this.guesslikemovies = [...this.guesslikemovies, ...res.data.list];
            this.page++;
          });
        }
      },
      true
    );
  },
  methods: {
    getHotListData() {
      const n = Math.ceil(Math.random() * 200);
      Movies(3, n, "views").then(res => {
        this.hotlistmovies = res.data.list;
      });
    },
    getScoreListData() {
      const n = Math.ceil(Math.random() * 200);
      Movies(3, n, "score").then(res => {
        this.scorelistmovies = res.data.list;
      });
    },
    getData() {
      Movies(30, this.page, "_id").then(res => {
        this.guesslikemovies = res.data.list;
        this.pages = res.data.pages;
        this.page++;
      });
    },
    toDetail(id) {
      this.$router.push({ name: "MovieDetail", query: { id } });
    },
    toHotList() {
      this.$router.push({ name: "HotList" });
    },
    toScoreList(index) {
      this.$router.push({ name: "HotList", query: { active: index } });
    },
    toSort() {
      this.$router.push({ name: "Sort" });
    }
  },

  computed: {},
  created() {
    this.getHotListData();
    this.getScoreListData();
    this.getData();
  }
};
</script>
<style scoped>
/* 热度榜推荐 */
.hotlist-top {
  display: flex;
  align-items: center;
  margin: 0 30px 0 20px;
  justify-content: space-between;
}
.hotlist-top h1:nth-child(1) {
  font-weight: bolder;
  margin: 30px 0 10px 0;
}
.hotlist-top h1:nth-child(2) {
  font-size: 20px;
  margin: 30px 0 10px 0;
}
.van-image__img {
  width: 217px;
  height: 289px;
}
.hotlist-bottom h1:nth-child(2),
.scorelist-bottom h1:nth-child(2),
.guesslike-bottom h1:nth-child(2) {
  padding-top: 10px;
  font-size: 30px;
  line-height: 60px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.hotlist-bottom h1:nth-child(3),
.scorelist-bottom h1:nth-child(3),
.guesslike-bottom h1:nth-child(3) {
  font-size: 26px;
  color: #707070;
  line-height: 40px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
/* 评分榜推荐 */
.scorelist-top {
  display: flex;
  align-items: center;
  margin: 0 30px 0 20px;
  justify-content: space-between;
}
.scorelist-top h1:nth-child(1) {
  margin: 15px 0 15px 0;
  font-weight: bolder;
}
.scorelist-top h1:nth-child(2) {
  margin: 15px 0 15px 0;
  font-size: 20px;
}
/* 猜你想看 */
.guesslike-top {
  display: flex;
  align-items: center;
  margin: 20px 30px 0 20px;
  justify-content: space-between;
}
.guesslike-top h1:nth-child(1) {
  margin: 15px 0 15px 0;
  font-weight: bolder;
}
.guesslike-top h1:nth-child(2) {
  margin: 15px 0 15px 0;
  font-size: 20px;
}
</style>
