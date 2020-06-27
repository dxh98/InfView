<template>
  <div class="search">
    <van-search shape="round" v-model="value" placeholder="请输入搜索关键词">
      <template #left>
        <van-image
          @click="onClickLeft"
          class="gobackicon"
          width="25"
          height="25"
          :src="gobackicon"
        />
      </template>
    </van-search>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Search",
  data() {
    return {
      gobackicon: require("@/assets/icons/goback.png"),
      value: ""
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.gobackicon {
  margin-right: 26px;
}
</style>
