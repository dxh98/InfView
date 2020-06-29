<template>
  <div class="box" ref="viewbox">
    <div class="sortlist">
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in Movies" :key="index" @click="toDetail(item._id)">
          <van-image class="coverImage" :src="item.coverImage" />
          <h1>{{ item.name }}</h1>
          <h1>{{ item.tag }}</h1>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Movies } from "../service/Movies";
export default {
  name: "SortList",
  props: ["catName"],
  data() {
    return {
      Movies: [],
      page: 1
    };
  },
  filters: {
    spliceStr(str, n) {
      return str.length > n ? str.substr(0, n) + "..." : str;
    }
  },
  watch: {
    catName: {
      handler(newVal, oldVel) {
        if (newVal) {
          this.$refs.viewbox.scrollTop = 0;
          this.page = 1;
          Movies(20, this.page, "views", newVal).then(res => {
            console.log(res);
            this.Movies = res.data.list;
          });
        }
      },
      deep: true
    }
  },
  components: {},
  mounted() {
    this.box = this.$refs.viewbox;
    this.box.addEventListener(
      "scroll",
      () => {
        if (
          this.$refs.viewbox.scrollTop + this.$refs.viewbox.clientHeight ==
          this.$refs.viewbox.scrollHeight - this.page
        ) {
          Movies(20, this.page, "views", this.catName).then(res => {
            console.log(res);
            this.Movies = [...this.Movies, ...res.data.list];
            this.page++;
          });
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
    Movies(20, this.page, "views", this.catName).then(res => {
      console.log(res);
      this.Movies = res.data.list;
      this.page++;
    });
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 1120px;
  overflow-y: auto;
}
.box::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.sortlist {
  width: 100%;
  height: 100%;
}
.coverImage {
  width: 237px;
  height: 320px;
}
.sortlist h1:nth-child(2) {
  padding-top: 10px;
  font-size: 28px;
  line-height: 60px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.sortlist h1:nth-child(3) {
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
