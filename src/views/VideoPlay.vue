<template>
  <div class="videoplay">
    <van-nav-bar :title="this.name" left-arrow @click-left="onClickLeft" />
    <iframe class="playwindow" :src="this.playUrl" frameborder="0"></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "VideoPlay",
    data() {
        return {
          name:"",
          playUrl:''
        }
    },
    components: {},
    methods: {
      onClickLeft() {
      this.$router.go(-1);
      },
    },
    created(){
      this.name = this.$route.query.name
      this.playUrl = this.$route.query.url
    }
}
</script>

<style scoped>
.playwindow {
  width: 100%;
  height: auto;
}
</style>
