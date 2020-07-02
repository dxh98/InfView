<template>
  <div class="passwordUpdate">
    <van-nav-bar id="reset" title="密码修改" left-arrow>
      <template #left>
        <van-icon name="cross" size="18" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <ul>
      <li>
        <h1>旧密码：</h1>
        <input v-model="oldpwd" type="password" placeholder="请输入旧密码" />
      </li>
      <li>
        <h1>新密码：</h1>
        <input v-model="passWord" type="password" placeholder="请输入新密码" />
      </li>
    </ul>
    <van-button @click="updatePassWord" class="updatebtn" color="#f93711">确认修改</van-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { get, post, put } from "@/utils/request.js";
import { delToken } from "@/utils/auth.js";
export default {
  name: "PasswordUpdate",
  data() {
    return {
      oldpwd: "",
      passWord: ""
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    updatePassWord() {
      this.$dialog
        .confirm({
          title: "修改密码",
          message: "修改密码操作不可撤销，是否继续？"
        })
        .then(() => {
          put("/api/v1/userinfo/update_pwd", {
            oldpwd: this.oldpwd,
            passWord: this.passWord
          }).then(res => {
            if (res.data.code == 1) {
              this.$toast({
                message: res.data.msg,
                icon: "checked"
              });
              this.oldpwd = "";
              this.passWord = "";
              setTimeout(() => {
                delToken();
                this.$dialog
                  .confirm({
                    title: "重新登录",
                    message: "当前登录状态失效，是否重新登录"
                  })
                  .then(() => {
                    this.$router.push({ name: "Login" });
                  })
                  .catch(() => {
                    this.$router.push({ name: "Home" });
                  });
              }, 2000);
            } else {
              this.$toast({
                message: res.data.msg,
                icon: "warning"
              });
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
#reset {
  box-shadow: 0 1px 12px -6px black;
}
#reset /deep/ .van-ellipsis {
  font-weight: bolder;
  font-size: 36px;
  margin-left: 190px;
}
.passwordUpdate > ul {
  width: 90%;
  margin: 30px auto 0;
  overflow: hidden;
}
.passwordUpdate > ul > li {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.passwordUpdate > ul > li > h1 {
  font-weight: bolder;
}
.passwordUpdate > ul > li > input {
  width: 400px;
  height: 80px;
  padding-left: 30px;
  border-radius: 40px;
  margin-left: 40px;
  background-color: #e6e6e6;
}
.updatebtn {
  width: 300px;
  height: 80px;
  border-radius: 44px;
  margin: 60px 0 0 210px;
}
</style>
