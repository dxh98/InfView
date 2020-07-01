<template>
  <div>
    <van-sticky>
      <div class="topbar">
        <div class="maincomponent">
          <img class="mainlogo" src="@/assets/images/Logo.png" alt />
          <span class="maintitle">InfView</span>
        </div>
        <div class="actions">
          <img @click="goParsing" class="upload" src="@/assets/icons/upload.png" alt />
          <img @click="goSearch" class="search" src="@/assets/icons/search.png" alt />
          <img @click="goUser" class="avatar" :src="this.avatars" alt />
        </div>
      </div>
    </van-sticky>
  </div>
</template>

<script type="text/ecmascript-6">
import { isLogined, getToken } from "../utils/auth";
import { get } from "../utils/request";
export default {
  name: "topbar",
  data() {
    return {
      show: false,
      avatars: require("@/assets/icons/mediabox.png")
    };
  },
  components: {},
  methods: {
    showPopup() {
      this.show = true;
    },
    goSearch() {
      this.$router.push({ name: "Search" });
    },
    goUser() {
      this.$router.push({ name: "User" });
    },
    goParsing() {
      this.$router.push({ name: "ParsingUrl" });
    },
    User() {
      get("/api/v1/userinfo", {
        headers: {
          Authorization: "Beaer " + getToken()
        }
      }).then(res => {
        if (res.data.code == 1) {
          if (res.data.data.avatars !== "") {
            this.avatars = res.data.data.avatars;
          }
        } else {
        }
      });
    }
  },
  created() {
    this.User();
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
  margin-bottom: 5px;
}
.maincomponent {
  display: flex;
  align-items: center;
}
.mainlogo {
  display: block;
  width: 58px;
  height: 40px;
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
  width: 50px;
  margin-left: 50px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 30px 0 50px;
}
</style>
