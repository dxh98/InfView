<template>
  <div class="mediabox">
    <TopBar />
    <div class="mediaboxmain">
      <h1>最近</h1>
      <div class="historybox">
        <div class="historycard" v-for="(item,index) in historymovies" :key="index">
          <img :src="item.coverImage" alt />
          <h1>{{item.name}}</h1>
          <h1>{{item.tag}}</h1>
        </div>
      </div>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/history.png" alt />
      <h1>历史记录</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/mymovies.png" alt />
      <h1>您的电影</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/collect.png" alt />
      <h1>收藏列表</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/playlist.png" alt />
      <h1>播放列表</h1>
    </div>
    <div class="mediaboxmain">
      <h1>最近收藏</h1>
      <div class="historybox">
        <div class="historycard" v-for="(item,index) in favmovies" :key="index">
          <img :src="item.coverImage" alt />
          <h1>{{item.name}}</h1>
          <h1>{{item.tag}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TopBar from "../components/TopBar";
import { get } from "@/utils/request.js";

export default {
  name: "MediaBox",
  data() {
    return {
      historymovies: [],
      favmovies: []
    };
  },
  components: {
    TopBar
  },
  methods: {},
  mounted() {
    get("/api/v1/movies", {
      page: 6,
      per: 6
    }).then(res => {
      this.historymovies = res.data.list;
    });
    get("/api/v1/movies", {
      page: 12,
      per: 10
    }).then(res => {
      this.favmovies = res.data.list;
    });
  }
};
</script>

<style scoped>
.mediaboxmain {
  padding: 0 40px 40px 40px;
  border-bottom: 1px solid #e6e6e6;
}
.mediaboxmain > h1 {
  font-size: 30px;
  line-height: 80px;
  font-weight: bold;
}
.historybox {
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
.historybox::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.historycard {
  width: 150px;
  margin-right: 36px;
}
.historycard > img {
  width: 150px;
  height: 200px;
}
.historycard > h1:nth-child(2) {
  margin-top: 16px;
  font-size: 30px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.historycard > h1:nth-child(3) {
  margin-top: 10px;
  font-size: 24px;
  color: #707070;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.actionbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
  font-size: 30px;
}
.actionbar > img {
  width: 48px;
  margin: 0 60px 0 60px;
}
.actionbar > h1 {
  font-weight: 600;
}
.mediaboxmain:last-child {
  border-top: 1px solid #e6e6e6;
}
</style>
