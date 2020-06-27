<template>
  <div class="banner">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      @change="onChange"
    >
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "Banner",
    data() {
        return {
          images: [
            require("@/assets/images/banner1.jpg"),
            require("@/assets/images/banner2.jpg"),
            require("@/assets/images/banner3.jpg"),
            require("@/assets/images/banner4.jpg"),
            require("@/assets/images/banner5.jpg"),
          ],
        }
    },
    components: {},
    methods: {
      onChange(index) {
      },
    }
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe img {
  width: 100%;
  height: 228px;
}
</style>
