<template>
  <div class="banner">
    <van-swipe
      class="my-swipe"
      :autoplay="4000"
      indicator-color="white"
      @change="onChange"
    >
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :v-lazy="image" :src="image" alt="" />
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
            "http://pic1.iqiyipic.com/common/lego/20200626/80a362f210ce46f88cf4b2b8c3634246.jpg?src=focustat_1_20130410_1",
            "http://pic2.iqiyipic.com/common/lego/20200626/28ecccb7ce5e406b95fbd9b244935bc9.jpg?src=focustat_1_20130410_2",
            "http://pic1.iqiyipic.com/common/lego/20200624/9c7c78f0c6fc49bdb585b5462dc9e51b.jpg?src=focustat_1_20130410_3",
            "http://pic2.iqiyipic.com/common/lego/20200621/f6f5ac6ac2bf46e0925a0611bd857d5c.jpg?src=focustat_1_20130410_4",
            "http://pic0.iqiyipic.com/common/lego/20200621/24ce7f6985904c659fe058eb949b14a7.jpg?src=focustat_1_20130410_5",
            "http://pic3.iqiyipic.com/common/lego/20200619/dcc84b361a1a4006ae6f8f8873844a59.jpg?src=focustat_1_20130410_6"
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
  line-height: 40px;
  text-align: center;
  /* background-color: #39a9ed; */
}
.my-swipe {
  margin-top: 15px;
}
.my-swipe img {
  width: 95%;
  border-radius: 20px;
}
</style>
