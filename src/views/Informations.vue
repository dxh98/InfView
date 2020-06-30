<template>
  <div class="informations">
    <TopBar />

    <div
      class="singlemessage"
      v-for="(item,index) in movies"
      @click="toDetail(item._id)"
      :key="index"
    >
      <img :src="item.coverImage" alt />
      <h1>
        <h1>
          <span>推荐电影：&nbsp;</span>
          <span>{{item.name | spliceStr}}</span>
        </h1>
        <span v-for="(item,index) in item.category" :key="index">{{item}}&nbsp;/&nbsp;</span>
        <span>{{item.views}}次观看</span>
        <h1>简介：{{item.tag}}</h1>
      </h1>
      <img :src="item.coverImage" alt />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TopBar from "../components/TopBar";
import { isLogined } from "../utils/auth";
import { Movies } from "../service/Movies";
export default {
  name: "Informations",
  data() {
    return {
      totalcount: 0,
      randomindex: [],
      movies: [],
      searchResult: []
    };
  },
  filters: {
    spliceStr(str) {
      return str.length > 6 ? str.substr(0, 6) + "..." : str;
    }
  },
  components: {
    TopBar
  },
  methods: {
    getIndex() {
      for (let i = 0; i < 10; i++) {
        const str = Math.ceil(Math.random() * 150);
        for (let j = 0; j < this.randomindex.length; j++) {
          if (this.randomindex[j] == str) {
            this.randomindex.splice(j, 1);
            i--;
          }
        }
        this.randomindex.push(str);
      }
    },
    toDetail(id) {
      this.$router.push({ name: "MovieDetail", query: { id } });
    }
  },
  async mounted() {
    await Movies(150, 1, "score").then(res => {
      this.searchResult = [...this.searchResult, ...res.data.list];
    });
    for (let i = 0; i < this.randomindex.length; i++) {
      this.movies.push(this.searchResult[this.randomindex[i]]);
    }
  },
  created() {
    this.getIndex();
  }
};
</script>

<style scoped>
.informations > h1 {
  width: 90%;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
}
.singlemessage {
  position: relative;
  width: 90%;
  height: 128px;
  margin: 40px auto;
  display: flex;
  align-items: center;
}
.singlemessage > h1:nth-child(2) {
  margin-left: 60px;
}
.singlemessage > img:last-child {
  position: absolute;
  right: 0;
}
.singlemessage img:nth-child(1) {
  width: 50px;
  height: 66.66px;
  border-radius: 100% 100% 100% 100%;
}
.singlemessage > h1 > h1:nth-child(1) > span:nth-child(1) {
  font-size: 30px;
  line-height: 40px;
}
.singlemessage > h1 > h1:nth-child(1) > span:nth-child(2) {
  font-size: 30px;
  font-weight: bolder;
  line-height: 40px;
}
.singlemessage > h1 > span,
.singlemessage > h1 > h1:nth-child(6) {
  font-size: 26px;
  color: #707070;
}

.singlemessage img:nth-child(3) {
  width: 100px;
}
</style>
