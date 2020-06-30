<template>
  <div class="user">
    <van-nav-bar id="reset" title="账号" left-arrow>
      <template #left>
        <van-icon name="cross" size="18" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <div class="userinfoshow">
      <img :src="this.userinfo.avatars" alt />
      <div class="userinfo" @click="show = true">
        <span class="nickName">{{this.userinfo.nickName}}</span>
        <span>
          <van-icon class="icons" name="arrow-down" />
        </span>
        <h1 class="userName">{{this.userinfo.userName}}</h1>
      </div>
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
          <div class="block" @click.stop>
            <div class="userinfo-top">
              <h1>账号</h1>
              <div class="userinfodetail">
                <img :src="this.userinfo.avatars" alt />
                <div class>
                  <span class>{{this.userinfo.nickName}}</span>

                  <h1 class>{{this.userinfo.userName}}</h1>
                </div>
              </div>
            </div>
            <div class="userinfo-bottom">
              <div class="actionbar">
                <img src="@/assets/icons/yours.png" alt />
                <h1>您的频道</h1>
              </div>
              <div class="actionbar">
                <img src="@/assets/icons/manageuser.png" alt />
                <h1>管理账号</h1>
              </div>
              <div @click="logout" class="actionbar">
                <img src="@/assets/icons/logout.png" alt />
                <h1>退出登录</h1>
              </div>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
    <a href="#">管理您的&nbsp;InfView&nbsp;账号</a>
    <div class="actionbar">
      <img src="@/assets/icons/fav.png" alt />
      <h1>您的收藏</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/workinghome.png" alt />
      <h1>InfView工作室</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/viewstime.png" alt />
      <h1>观看时长</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/data.png" alt />
      <h1>您在InView的数据</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/switch.png" alt />
      <h1>切换账号</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/payvip.png" alt />
      <h1>付费会员</h1>
    </div>
    <div class="actionbar">
      <img src="@/assets/icons/payus.png" alt />
      <h1>赞助我们</h1>
    </div>
    <div class="toolbar">
      <div class="actionbar">
        <img src="@/assets/icons/site.png" alt />
        <h1>设置</h1>
      </div>
      <div class="actionbar">
        <img src="@/assets/icons/help.png" alt />
        <h1>帮助和反馈</h1>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { get } from "@/utils/request.js";
import { getToken, delToken } from "@/utils/auth.js";
export default {
  name: "User",
  data() {
    return {
      userinfo: "",
      show: false
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    logout() {
      if (confirm("确认注销账户吗？")) {
        delToken();
        this.$router.push({ name: "Home" });
      }
    }
  },
  mounted() {
    get("/api/v1/userinfo", {
      headers: {
        Authorization: "Beaer " + getToken()
      }
    }).then(res => {
      this.userinfo = res.data.data;
    });
  },
  created() {}
};
</script>

<style scoped>
#reset {
  box-shadow: 0 1px 12px -6px black;
}
#reset /deep/ .van-ellipsis {
  font-weight: bolder;
  font-size: 40px;
  margin-left: 190px;
}
.userinfoshow {
  display: flex;
}
.userinfoshow > img {
  width: 80px;
  border-radius: 50%;
  margin: 40px 40px 30px 60px;
}
.userinfo {
  margin-top: 40px;
  overflow: hidden;
}
.userinfo > span:nth-child(1) {
  font-weight: bolder;
  font-size: 30px;
}
.userinfo > span:nth-child(2) {
  display: inline-block;
  margin-left: 30px;
}
.userName {
  margin-top: 10px;
}
.user > a {
  display: block;
  color: blue;
  font-size: 28px;
  padding-bottom: 30px;
  padding-left: 170px;
  border-bottom: #e6e6e6 1px solid;
}
.actionbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
  font-size: 30px;
}
.actionbar > img {
  width: 48px;
  margin: 0 60px 0 60px;
}
.actionbar > h1 {
  font-weight: 600;
}
.toolbar {
  border-top: 1px solid #e6e6e6;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 550px;
  height: 650px;
  background-color: #fff;
}
.userinfo-top {
  width: 450px;
  height: 225px;
  padding: 50px 50px 0;
}
.userinfo-top > h1 {
  font-size: 35px;
  font-weight: bold;
}
.userinfo-bottom {
  width: 100%;
  height: 50%;
  border-top: 1px solid #e6e6e6;
}
.userinfodetail {
  display: flex;
  margin-top: 60px;
  align-items: center;
}
.userinfodetail > img {
  width: 80px;
  border-radius: 50%;
  margin-right: 50px;
}
.userinfodetail > div:nth-child(2) > span {
  font-size: 30px;
  font-weight: bolder;
}
.userinfodetail > div:nth-child(2) > h1 {
  margin-top: 10px;
}
</style>
