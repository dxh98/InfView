<template>
  <div>
    <van-nav-bar title="用户登录" left-arrow @click-left="onClickLeft" />
    <div class="login">
      <img class="logo" src="@/assets/images/Logo.png" alt />
      <input v-model="LoginForm.username" type="text" class="username" placeholder="请输入账号" />
      <input
        v-on:input="onChange"
        v-model="LoginForm.password"
        type="password"
        class="password"
        placeholder="请输入密码"
      />
      <van-button :color="this.bgcolor" @click="Login">登录</van-button>
      <a href="#" @click="tabpage">没有账号，我要注册</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { post } from "../utils/request.js";
import { setToken } from "../utils/auth.js";
export default {
  name: "Login",
  data() {
    return {
      LoginForm: {
        username: "",
        password: ""
      },
      bgcolor: "rgba(245, 51, 15, 0.5)"
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.push({ name: "Home" });
    },
    tabpage() {
      this.$router.push({
        name: "Reg"
      });
    },
    onChange(e) {
      const { value } = e.target;
      if (value !== "") {
        this.bgcolor = "rgba(245, 51, 15)";
      } else this.bgcolor = "rgba(245, 51, 15, 0.5)";
    },
    Login() {
      if (this.LoginForm.username == "" || this.LoginForm.password == "") {
        this.$toast.fail({
          message: "账号密码不能为空",
          icon: "warning"
        });
      } else {
        post("/api/v1/auth/login", {
          userName: this.LoginForm.username,
          passWord: this.LoginForm.password
        }).then(res => {
          if (res.data.code == 1) {
            setToken(res.data.token);
            this.$toast.success({
              message: "登录成功",
              icon: "checked"
            });
            this.$router
              .push({
                name: "Home"
              })
              .catch(() => {});
          } else {
            this.$toast.fail({
              message: res.data.msg,
              icon: "warning"
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login .logo {
  margin-top: 50px;
  width: 30%;
}
.login input {
  margin-top: 50px;
  padding: 16px 0;
  width: 90%;
  height: 64px;
  outline: none;
  border-bottom: 1px solid #ccc;
}
.login input::-webkit-input-placeholder {
  color: #ccc;
  font-size: 35px;
  line-height: 50px;
}
.login button {
  width: 80%;
  height: 100px;
  font-size: 32px;
  border: 0;
  border-radius: 50px;
  margin-top: 48px;
  color: white;
  cursor: pointer;
  outline: none;
}
.login a {
  margin-top: 70px;
  padding-left: 400px;
  font-size: 27px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
