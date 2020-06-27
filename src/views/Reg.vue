<template>
  <div class="reg">
    <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Reg",
  data() {
    return {};
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped></style>
