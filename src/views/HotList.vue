<template>
  <div class="tv" ref="viewbox">
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
      hotpage: 1,
      scorepage: 1,
      active: 0,
      HotMovies: [],
      ScoreMovies: []
    };
  },
  filters: {
    spliceStr(str, n) {
      return str.length > n ? str.substr(0, n) + "..." : str;
    }
  },
  watch: {
    // 监听榜单切换,重置数据并回到顶部
    active: function(newVal, oldVel) {
      if (oldVel == 1 && newVal == 0) {
        this.hotpage = 1;
        Movies(30, this.hotpage, "views").then(res => {
          this.HotMovies = res.data.list;
          this.hotpage++;
        });
        this.$refs.viewbox.scrollTop = 0;
      }
      if (oldVel == 0 && newVal == 1) {
        this.scorepage = 1;
        Movies(30, this.scorepage, "score").then(res => {
          this.ScoreMovies = res.data.list;
          this.scorepage++;
        });
        this.$refs.viewbox.scrollTop = 0;
      }
    },
    deep: true
  },
  components: {
    TopBar
  },
  mounted() {
    // 监听ref标识元素内部滚动条滚动高度
    this.box = this.$refs.viewbox;
    this.box.addEventListener(
      "scroll",
      () => {
        if (
          this.$refs.viewbox.scrollTop + this.$refs.viewbox.clientHeight ==
          this.$refs.viewbox.scrollHeight
        ) {
          if (this.active == 0) {
            Movies(30, this.hotpage, "views").then(res => {
              this.HotMovies = [...this.HotMovies, ...res.data.list];
              this.hotpage++;
            });
          }
          if (this.active == 1) {
            Movies(30, this.scorepage, "score").then(res => {
              this.ScoreMovies = [...this.ScoreMovies, ...res.data.list];
              this.scorepage++;
            });
          }
        }
      },
      true
    );
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: "MovieDetail", query: { id } });
    }
  },
  created() {
    Movies(30, this.hotpage, "views").then(res => {
      this.HotMovies = res.data.list;
      this.hotpage++;
    });
    Movies(30, this.scorepage, "score").then(res => {
      this.ScoreMovies = res.data.list;
      this.scorepage++;
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
