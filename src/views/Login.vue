<template>
  <div class="login">
    <van-nav-bar title="用户登录" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Login",
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
