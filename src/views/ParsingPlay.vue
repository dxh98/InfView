<template>
  <div class="parsingplay">
    <van-nav-bar title="电影播放" left-arrow @click-left="onClickLeft" />
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
export default {
  name: "ParsingPlay",
  data() {
    return {
      playUrl: ""
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {
    this.playUrl = this.$route.query.url;
  }
};
</script>

<style scoped>
.parsingplay {
  width: 100%;
  height: 100%;
}
.playwindow {
  width: 100%;
  height: 50%;
}
</style>
