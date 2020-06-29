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
export default {
  name: "VideoPlay",
  data() {
    return {
      name: "",
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
    this.name = this.$route.query.name;
    this.playUrl = this.$route.query.url;
    console.log(this.playUrl);
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
