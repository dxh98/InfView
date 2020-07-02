<template>
  <div class="videoplay">
    <div class="videoplaybar">
      <div class="playwindowbar" :style="styleObj">
        <iframe
          class="playwindow"
          width="100%"
          height="100%"
          scrolling="no"
          frameborder="0"
          border="0"
          marginwidth="0"
          marginheight="0"
          :src="this.playUrl"
        ></iframe>
      </div>
    </div>
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
      isplayedindex: "",
      conW:'',
      conH:'',
      transform:"",
      styleObj:""
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted(){
    this.conW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.conH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.transform = "rotate(90deg) translate("+((this.conH-this.conW)/2)+"px,"+((this.conH-this.conW)/2)+"px)"
    this.styleObj = {"width":this.conW+"px","height":this.conH+"px","position":"absolute","transform":this.transform,"width":this.conH+"px","height":this.conW+"px", }
    console.log(this.styleObj)
  },
  created() {
    this.name = this.$route.query.name;
    this.playUrl = this.$route.query.url;
    this.id = this.$route.query.id;
    // 首先判断这个电影id是不是已经在观看历史列表里了
    get("/api/v1/userinfo").then(res => {
      if (res.data.data.history.length == 0) {
        // 还没有观看历史
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
.videoplaybar {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;
}
.playwindow {
  width: 100%;
  height: 100%;
}
</style>
