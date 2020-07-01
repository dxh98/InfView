<template>
  <div class="history">
    <van-nav-bar fixed placeholder id="reset" title="历史记录" left-arrow>
      <template #left>
        <van-icon name="cross" size="18" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <h1 :style="styleObj" class="tip">您还未看过任何电影...</h1>
    <div class="hotlist">
      <van-grid :column-num="3" :gutter="0.5" :border="false">
        <van-grid-item
          v-for="(item, index) in historyMovies"
          :key="index"
          @click="toDetail(item._id)"
        >
          <van-image class="hotcoverImage" :src="item.coverImage" />
          <h1>{{ item.name }}</h1>
          <h1>{{ item.tag }}</h1>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { get } from "@/utils/request.js";
import { getToken } from "@/utils/auth.js";
import { getOneMovie } from "@/service/Movies.js";
export default {
  name: "History",
  data() {
    return {
      styleObj: { display: "none" },
      historyMoviesindex: [],
      historyMovies: []
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toDetail(id) {
      this.$router.push({ name: "MovieDetail", query: { id } });
    }
  },
  async mounted() {
    await get("/api/v1/userinfo", {
      headers: {
        Authorization: "Beaer " + getToken()
      }
    }).then(res => {
      if (res.data.data.history.length == 0) {
        this.styleObj.display = "block";
      } else {
        this.historyMoviesindex = res.data.data.history;
      }
    });
    for (let i = 0; i < this.historyMoviesindex.length; i++) {
      getOneMovie(this.historyMoviesindex[i].id).then(res => {
        this.historyMovies.push(res.data.data);
      });
    }
  }
};
</script>

<style scoped>
#reset {
  border-bottom: 1px solid #e6e6e6;
}
#reset /deep/ .van-ellipsis {
  font-weight: bolder;
  font-size: 36px;
  margin-left: 190px;
}
.hotcoverImage {
  height: 288px;
}
.hotlist h1:nth-child(2) {
  padding-top: 10px;
  font-size: 30px;
  line-height: 60px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.hotlist h1:nth-child(3) {
  font-size: 26px;
  color: #707070;
  line-height: 40px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.tip {
  font-size: 30px;
  margin: 40px 0 0 40px;
  color: #cdcdcd;
}
</style>
