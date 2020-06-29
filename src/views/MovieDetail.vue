<template>
  <div class="moviedetail">
    <van-nav-bar fixed placeholder class="topbar" title="详情" left-arrow @click-left="onClickLeft" />
    <!-- 带背景颜色的部分 -->
    <div class="moviedetail-main">
      <div class="moviedetail-top">
        <img :src="this.moviedata.coverImage" alt />
        <div class="movieinfo">
          <h1>{{ this.moviedata.name }}</h1>
          <span v-for="item in this.moviedata.mainActors" :key="item.index">{{ item }}&nbsp;/&nbsp;</span>
          <span>{{ this.moviedata.releaseTime }}上映</span>
          <h1>
            <span v-for="item in this.moviedata.category" :key="item.index">{{ item }}&nbsp;/&nbsp;</span>
            <span>{{ this.moviedata.views }}次观看</span>
          </h1>
          <h1 class="duration">时长&nbsp;{{ this.moviedata.duration }}</h1>
        </div>
      </div>

      <!-- 评分 -->
      <div class="score">
        <h1>电影评分</h1>
        <div>
          <h1>{{ this.score }}</h1>
          <h1>
            <van-rate :size="10" allow-half v-model="value" readonly />
            <h1>{{ this.scorenumber }}人评分</h1>
          </h1>
        </div>
      </div>
      <div class="action">
        <van-button hairline icon="play-circle-o" color="#841703" @click="toPlay">立即播放</van-button>
        <van-button hairline icon="like-o" color="#841703">立即收藏</van-button>
      </div>
    </div>

    <!-- 剧情简介 -->
    <h1>剧情简介</h1>
    <h1>{{ this.moviedata.desc }}</h1>
  </div>
</template>

<script type="text/ecmascript-6">
import { getOneMovie } from "../service/Movies";
import { isLogined } from "../utils/auth";
export default {
  name: "MovieDetail",
  data() {
    return {
      moviedata: "",
      bgcolor: "",
      value: 0,
      score: 0,
      scorenumber: 0
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toPlay() {
      this.$router.push({
        name: "VideoPlay",
        query: { url: this.moviedata.playUrl, name: this.moviedata.name }
      });
    },
    getbgcolor() {
      let R = Math.ceil(Math.random() * 80);
      let G = Math.ceil(Math.random() * 80);
      let B = Math.ceil(Math.random() * 80);
      let A = 0.9;
      this.bgcolor = "rgb(" + R + "," + G + "," + B + "," + A + ")";
      this.styleObj = "background:" + this.bgcolor;
    }
  },
  created() {
    getOneMovie(this.$route.query.id).then(res => {
      this.moviedata = res.data.data;
      this.value = res.data.data.score / 2;
      this.score = res.data.data.score.toFixed(1);
      this.scorenumber = Math.ceil((res.data.data.views / 3) * 2);
    });
  }
};
</script>

<style scoped>
.moviedetail {
  background: #e6e6e6;
}
.topbar {
  box-shadow: 0 1px 12px -6px black;
}
.moviedetail-main {
  overflow: hidden;
  background: #931a04;
}
.moviedetail-top {
  display: flex;
  align-items: flex-start;
  padding-top: 40px;
  padding-bottom: 40px;
}
.moviedetail-top img:nth-child(1) {
  width: 280px;
  margin-left: 40px;
  margin-right: 40px;
}
.movieinfo {
  margin-right: 40px;
}
.movieinfo h1:nth-child(1) {
  color: white;
  font-size: 50px;
  margin-bottom: 30px;
}
.movieinfo > span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 30px;
}
.movieinfo > h1 > span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 30px;
}
.duration {
  color: rgba(255, 255, 255, 0.7);
  font-size: 30px;
  margin-top: 40px;
}
/* 电影评分 */
.score {
  width: 90%;
  margin: 0 auto;
}
.score > h1 {
  color: white;
  font-size: 30px;
  line-height: 80px;
  margin-left: 30px;
}
.score > div {
  display: flex;
  align-items: center;
}
.score > div > h1:nth-child(1) {
  color: white;
  font-size: 70px;
  margin: 0 30px;
}
.score > div > h1:nth-child(2) > h1 {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 15px;
}
.action {
  margin: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
/* 剧情简介 */
.moviedetail > h1:nth-child(3) {
  font-size: 36px;
  margin-left: 40px;
  line-height: 130px;
  color: #818181;
}
.moviedetail > h1:nth-child(4) {
  font-size: 34px;
  margin: 0 40px;
  line-height: 50px;
}
</style>
