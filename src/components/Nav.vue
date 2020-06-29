<template>
  <div class="nav">
    <ul>
      <li @click="tabpage(0, 'Home')">
        <img :src="homeicon" alt />
        <span :class="{ active: isSel == 0 }">首页</span>
      </li>
      <li @click="tabpage(1, 'Sort')">
        <img :src="sorticon" alt />
        <span :class="{ active: isSel == 1 }">分类</span>
      </li>
      <li @click="tabpage(2, 'HotList')">
        <img :src="hotlisticon" alt />
        <span :class="{ active: isSel == 2 }">榜单</span>
      </li>
      <li @click="tabpage(3, 'Informations')">
        <img :src="informationsicon" alt />
        <span :class="{ active: isSel == 3 }">收件箱</span>
      </li>
      <li @click="tabpage(4, 'MediaBox')">
        <img :src="mediaboxicon" alt />
        <span :class="{ active: isSel == 4 }">媒体库</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Nav",
  data() {
    return {
      isSel: 0,
      imageUrl: {
        homepage: require("../assets/icons/home.png"),
        homepage_sel: require("../assets/icons/home-sel.png"),
        sortpage: require("../assets/icons/sort.png"),
        sortpage_sel: require("../assets/icons/sort-sel.png"),
        hotpage: require("../assets/icons/hotlist.png"),
        hotpage_sel: require("../assets/icons/hotlist-sel.png"),
        informationspage: require("../assets/icons/informations.png"),
        informationspage_sel: require("../assets/icons/informations-sel.png"),
        mediaboxspage: require("../assets/icons/mediabox.png"),
        mediaboxpage_sel: require("../assets/icons/mediabox-sel.png")
      }
    };
  },
  computed: {
    homeicon() {
      return this.isSel == 0
        ? this.imageUrl.homepage_sel
        : this.imageUrl.homepage;
    },
    sorticon() {
      return this.isSel == 1
        ? this.imageUrl.sortpage_sel
        : this.imageUrl.sortpage;
    },
    hotlisticon() {
      return this.isSel == 2
        ? this.imageUrl.hotpage_sel
        : this.imageUrl.hotpage;
    },
    informationsicon() {
      return this.isSel == 3
        ? this.imageUrl.informationspage_sel
        : this.imageUrl.informationspage;
    },
    mediaboxicon() {
      return this.isSel == 4
        ? this.imageUrl.mediaboxpage_sel
        : this.imageUrl.mediaboxspage;
    }
  },
  watch: {
    $route() {
      if (this.$route.path == "/") {
        this.isSel = 0;
      }
      if (this.$route.path == "/sort") {
        this.isSel = 1;
      }
      if (this.$route.path == "/hotlist") {
        this.isSel = 2;
      }
      if (this.$route.path == "/informations") {
        this.isSel = 3;
      }
      if (this.$route.path == "/mediabox") {
        this.isSel = 4;
      }
    }
  },
  components: {},
  methods: {
    tabpage(index, name) {
      this.isSel = index;
      this.$router
        .push({
          name: name
        })
        .catch(err => {});
    }
  },
  created() {
    if (window.location.hash.indexOf("sort") > -1) {
      this.isSel = 1;
    }
    if (window.location.hash.indexOf("hotlist") > -1) {
      this.isSel = 2;
    }
    if (window.location.hash.indexOf("informations") > -1) {
      this.isSel = 3;
    }
    if (window.location.hash.indexOf("mediabox") > -1) {
      this.isSel = 4;
    }
  }
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 120px;
  overflow: hidden;
}
.nav ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  border-top: 1px solid #ccc;
}
.nav ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav ul li .active {
  font-weight: bolder;
}
.nav ul li span {
  font-size: 20px;
  margin-top: 5px;
  color: #707070;
}
</style>
