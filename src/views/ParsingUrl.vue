<template>
  <div class="parsingurl">
    <van-search v-model="value" show-action placeholder="请输入电影播放页网址" @search="onSearch">
      <template #left>
        <van-image
          @click="onClickLeft"
          class="gobackicon"
          width="22"
          height="22"
          :src="gobackicon"
        />
      </template>
      <template #action>
        <div class="playbtn" @click="onSearch">播放</div>
      </template>
    </van-search>
    <h1 class="tip">不正确的电影播放网址会导致解析失败...</h1>
    <h1 class="tutorialtext">1.&nbsp;复制电影播放页地址栏中的播放网址</h1>
    <img class="tutorial" src="@/assets/images/showactions.png" alt />
    <h1 class="tutorialtext">2.&nbsp;在上方输入框粘贴网址，点击播放</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "ParsingUrl",
  data() {
    return {
      gobackicon: require("@/assets/icons/goback.png"),
      value: "",
      parsingurl: ""
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch() {
      if (this.value == "") {
        this.$toast.fail({
          message: "播放网址不能为空",
          icon: "warning"
        });
      } else {
        this.parsingurl = "https://jx.sigujiexi.com/?url=" + this.value;
        this.$router.push({
          name: "ParsingPlay",
          query: { url: this.parsingurl }
        });
      }
    }
  }
};
</script>

<style scoped>
.gobackicon {
  margin-right: 26px;
}
.playbtn {
  margin: 0 20px;
}
.tip {
  font-size: 30px;
  margin: 40px 0 100px 90px;
  color: #cdcdcd;
}
.tutorial {
  display: block;
  width: 600px;
  margin: 0 auto;
}
.tutorialtext {
  width: 600px;
  margin: 40px auto;
  font-size: 30px;
  color: #8a8a8a;
}
</style>
