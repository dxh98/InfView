<template>
  <div class="home">
    <TopBar />
    <Banner />

    <!-- 电影列表 -->
    <div class="movielist">
      <div class="singlemovie">
        <van-image
          width="100%"
          height="220px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div>
          <van-image
            class="playicon"
            round
            fit="cover"
            width="20px"
            height="20px"
            :src="playicon"
          />
          <h1>想哭的我戴上了猫的面具</h1>
        </div>
        <div>
          <van-rate
            class="score"
            v-model="score"
            :size="13"
            allow-half
            void-icon="star"
            void-color="#eee"
            readonly
          />
          <p>{{ this.score }}</p>
          <van-button
            class="symbolbtn"
            round
            size="small"
            color="rgba(255,77,26,.5)"
            >动画 奇幻&gt;</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import Banner from "@/components/Banner";

export default {
  name: "Home",
  data() {
    return {
      playicon: require("@/assets/icons/play.png"),
      score: 3.5,
    };
  },
  components: {
    TopBar,
    Banner,
  },
  methods: {},
  computed: {},
};
</script>
<style scoped>
.singlemovie {
  overflow: hidden;
  margin-bottom: 40px;
}
.singlemovie > div:nth-child(2) {
  display: flex;
  align-items: center;
}
.singlemovie > div:nth-child(3) {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.singlemovie > div:nth-child(2) > h1 {
  font-weight: bolder;
}
.singlemovie > div:nth-child(3) > p {
  font-size: 24px;
}
.playicon {
  margin: 30px 20px 0 20px;
}
.score {
  margin: 0 5px 0 74px;
}
.symbolbtn {
  border: 0;
  height: 35px;
  margin-left: 300px;
  margin-right: 20px;
}
</style>
