<template>
  <div class="mediabox">
    <TopBar />
    <div class="mediaboxmain">
      <h1>最近观看</h1>
      <div class="historybox">
        <h1 :style="styleObj1" class="tip">您还未看过任何电影...</h1>
        <h1 :style="styleObj3" class="tip">您还未登录...</h1>
        <div
          @click="goDetail(item._id)"
          class="historycard"
          v-for="(item,index) in historymovies"
          :key="index"
        >
          <img :src="item.coverImage" alt />
          <h1>{{item.name}}</h1>
          <h1>{{item.tag}}</h1>
        </div>
      </div>
    </div>
    <div @click="goHistory" class="actionbar">
      <img src="@/assets/icons/history.png" alt />
      <h1>历史记录</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/mymovies.png" alt />
      <h1>您的电影</h1>
    </div>
    <div @click="goFavList" class="actionbar">
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
        <h1 :style="styleObj2" class="tip">您还未收藏过任何电影...</h1>
        <h1 :style="styleObj4" class="tip">您还未登录...</h1>
        <div
          @click="goDetail(item._id)"
          class="historycard"
          v-for="(item,index) in favmovies"
          :key="index"
        >
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
import { getToken, isLogined } from "@/utils/auth.js";
import { getOneMovie } from "@/service/Movies.js";

export default {
  name: "MediaBox",
  data() {
    return {
      styleObj1: { display: "none" },
      styleObj2: { display: "none" },
      styleObj3: { display: "none" },
      styleObj4: { display: "none" },
      historymoviesindex: [],
      favmoviesindex: [],
      historymovies: [],
      favmovies: []
    };
  },
  components: {
    TopBar
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: "MovieDetail", query: { id } });
    },
    goHistory() {
      this.$router.push({ name: "History" });
    },
    goFavList() {
      this.$router.push({ name: "FavList" });
    }
  },
  async mounted() {
    if (isLogined()) {
      await get("/api/v1/userinfo", {
        headers: {
          Authorization: "Beaer " + getToken()
        }
      }).then(res => {
        if (res.data.data.history.length == 0) {
          this.styleObj1.display = "block";
        } else {
          this.historymoviesindex = res.data.data.history;
          this.historymoviesindex = this.historymoviesindex.slice(0, 10);
        }
        if (res.data.data.favList.length == 0) {
          this.styleObj2.display = "block";
        } else {
          this.favmoviesindex = res.data.data.favList;
          this.favmoviesindex = this.favmoviesindex.slice(0, 10);
        }
      });

      for (let i = 0; i < this.historymoviesindex.length; i++) {
        getOneMovie(this.historymoviesindex[i].id).then(res => {
          this.historymovies.push(res.data.data);
        });
      }
      for (let i = 0; i < this.favmoviesindex.length; i++) {
        getOneMovie(this.favmoviesindex[i].id).then(res => {
          this.favmovies.push(res.data.data);
        });
      }
    } else {
      this.styleObj3.display = "block";
      this.styleObj4.display = "block";
    }
  }
};
</script>

<style scoped>
.mediaboxmain {
  width: 670px;
  height: 382px;
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
  line-height: 40px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.historycard > h1:nth-child(3) {
  margin-top: 10px;
  font-size: 24px;
  line-height: 30px;
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
.tip {
  font-size: 30px;
  margin: 40px 0 0 40px;
  color: #cdcdcd;
}
</style>
