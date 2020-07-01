<template>
  <div class="videoplay">
    <van-nav-bar :title="this.name" left-arrow @click-left="onClickLeft" />
    <iframe
      class="playwindow"
      width="100%"
      height="100%"
      allowfullscreen="true"
      scrolling="no"
      frameborder="0"
      border="0"
      marginwidth="0"
      marginheight="0"
      :src="this.playUrl"
    ></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
import { put, get } from "@/utils/request.js";

export default {
  name: "VideoPlay",
  data() {
    return {
      name: "",
      playUrl: "",
      historyList: [],
      isplayed: false,
      isplayedindex: ""
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {
    this.name = this.$route.query.name;
    this.playUrl = this.$route.query.url;
    this.id = this.$route.query.id;
    // 首先判断这个电影id是不是已经在观看历史列表里了
    get("/api/v1/userinfo").then(res => {
      console.log(res.data.data.history.length);
      if (res.data.data.history.length == 0) {
        // 还没有观看历史
        console.log("还没有观看历史");
        const historyindex = { id: this.$route.query.id };
        this.historyList.unshift(historyindex);
        // 加入记录
        put("/api/v1/userinfo/update_info", {
          history: this.historyList
        });
      } else {
        // 有观看历史记录
        this.historyList = res.data.data.history;
        for (let i = 0; i < res.data.data.history.length; i++) {
          const id = res.data.data.history[i].id;
          // 判断电影是否已经存在于记录中
          if (id.indexOf(this.$route.query.id) == -1) {
            // 该电影不存在于播放记录里，加入进去
          } else {
            // 该电影存在于播放记录里
            this.isplayed = true;
            this.isplayedindex = i;
          }
        }
        if (this.isplayed == false) {
          const historyindex = { id: this.$route.query.id };
          this.historyList.unshift(historyindex);
          put("/api/v1/userinfo/update_info", {
            history: this.historyList
          });
        } else {
          const historyindex = { id: this.$route.query.id };
          this.historyList.splice(this.isplayedindex, 1);
          this.historyList.unshift(historyindex);
          put("/api/v1/userinfo/update_info", {
            history: this.historyList
          });
        }
      }
    });
  }
};
</script>

<style scoped>
.videoplay {
  width: 100%;
  height: 100%;
}
.playwindow {
  width: 100%;
  height: 50%;
}
</style>
