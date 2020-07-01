<template>
  <div id="app">
    <router-view class="main"></router-view>
    <Nav v-show="!hideNav" />
  </div>
</template>

<script>
import Nav from "./components/Nav";
export default {
  data() {
    return {
      hideNav: false //默认是显示的
    };
  },
  components: {
    Nav
  },
  watch: {
    $route() {
      if (this.$route.meta.hideNav) {
        this.hideNav = true;
      } else {
        this.hideNav = false;
      }
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
}
#app {
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  overflow: auto;
}
.main::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
