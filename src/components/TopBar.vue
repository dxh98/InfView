<template>
  <div>
    <van-sticky>
      <div class="topbar">
        <div class="maincomponent">
          <img class="mainlogo" src="@/assets/images/Logo.png" alt />
          <span class="maintitle">InfView</span>
        </div>
        <div class="actions">
          <img class="upload" src="@/assets/icons/upload.png" alt />
          <img @click="goSearch" class="search" src="@/assets/icons/search.png" alt />
          <img class="avatar" src="@/assets/icons/sort.png" alt />
        </div>
      </div>
    </van-sticky>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "topbar",
  data() {
    return {};
  },
  components: {},
  methods: {
    goSearch() {
      this.$router.push({ name: "Search" });
    }
  }
};
</script>

<style scoped>
.topbar {
  width: 100%;
  height: 100px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 12px -6px black;
}
.maincomponent {
  display: flex;
}
.mainlogo {
  display: block;
  width: 58px;
  margin-left: 30px;
}
.maintitle {
  font-weight: bolder;
  font-size: 40px;
  margin-left: 10px;
}
.actions {
  display: flex;
  align-items: center;
}
.upload {
  width: 45px;
  height: 40px;
}
.search {
  /* background: #ccc; */
  width: 50px;
  margin-left: 50px;
}
.avatar {
  border-radius: 50%;
  margin: 0 30px 0 50px;
}
</style>
