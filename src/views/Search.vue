<template>
  <div class="search">
    <van-search shape="round" v-on:input="onChange" v-model="value" placeholder="请输入搜索关键词">
      <template #left>
        <van-image
          @click="onClickLeft"
          class="gobackicon"
          width="22"
          height="22"
          :src="gobackicon"
        />
      </template>
    </van-search>
    <ul v-for="item in searchResult" :key="item.index">
      <li :style="styleObj" @click="toDetail(item._id)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { MoviesSearch } from "../service/Movies";
export default {
  name: "Search",
  data() {
    return {
      gobackicon: require("@/assets/icons/goback.png"),
      value: "",
      searchResult: [],
      styleObj: { display: "none" }
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onChange() {
      if (this.value == "") {
        this.styleObj.display = "none";
      } else {
        this.styleObj.display = "block";
      }
      this.searchResult = [];
      MoviesSearch(10, 1, "score", this.value).then(res => {
        this.searchResult = res.data.list;
      });
    },
    toDetail(id) {
      this.$router.push({ name: "MovieDetail", query: { id } });
    }
  }
};
</script>

<style scoped>
.gobackicon {
  margin-right: 26px;
}
.search > ul {
  width: 80%;
  margin: 0 auto;
  display: flex;
  /* align-items: center; */
}
.search > ul > li {
  width: 100%;
  height: 80px;
  line-height: 80px;
}
</style>
