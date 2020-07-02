<template>
  <div>
    <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft" />
    <div class="reg">
      <input @change="fileSelected" type="file" ref="file" style="display:none" />
      <img @click="selImgHandle" :src="imgSrc" class="avatars" alt />
      <p class="point">请选择头像</p>
      <input v-model="RegForm.username" type="email" placeholder="请输入账号（邮箱）" />
      <input v-model="RegForm.nickName" type="text" placeholder="请输入昵称（4-12位汉字和字母组成）" />
      <input v-model="RegForm.password" type="password" placeholder="请输入密码（8-16位字母和数字组成）" />
      <input v-model="confirmpassword" v-on:input="onChange" type="password" placeholder="确认密码" />
      <van-button :color="this.bgcolor" @click="Reg">注册</van-button>

      <a href="#" @click="tabpage">已有账号，我要登录</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { post } from "@/utils/request.js";
import BaseUrl from "@/config/base.js";

export default {
  name: "Reg",
  data() {
    return {
      RegForm: {
        username: "",
        password: "",
        avatar: "",
        nickName: ""
      },
      bgcolor: "rgba(245, 51, 15, 0.5)",
      confirmpassword: "",
      imgSrc: require("@/assets/icons/avatars.png")
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.push({ name: "Home" });
    },
    tabpage() {
      this.$router.push({
        name: "Login"
      });
    },
    onChange(e) {
      const { value } = e.target;
      if (this.confirmpassword == this.RegForm.password) {
        this.bgcolor = "rgba(245, 51, 15)";
      } else {
        this.bgcolor = "rgba(245, 51, 15, 0.5)";
      }
    },
    Reg() {
      if (
        this.RegForm.username == "" ||
        this.RegForm.password == "" ||
        this.RegForm.nickName == ""
      ) {
        this.$toast.fail({
          message: "账号、昵称和密码不能为空",
          icon: "warning"
        });
      } else {
        var userNamereg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        // 正则验证账号(邮箱格式)
        if (userNamereg.test(this.RegForm.username)) {
          var nickNamereg = /^[\u4e00-\u9fa5a-zA-Z-z]{4,12}$/;
          // 正则验证用户昵称
          if (nickNamereg.test(this.RegForm.nickName)) {
            var passwordreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            // 正则验证密码
            if (passwordreg.test(this.RegForm.password)) {
              if (this.RegForm.password == this.confirmpassword) {
                post("/api/v1/auth/reg", {
                  userName: this.RegForm.username,
                  passWord: this.RegForm.password,
                  avatars: this.RegForm.avatar,
                  nickName: this.RegForm.nickName
                }).then(res => {
                  if (res.data.code == 1) {
                    this.$toast.success({
                      message: "用户注册成功",
                      icon: "checked"
                    });
                    this.$router.push({
                      name: "Login"
                    });
                  }
                  if (res.data.code == "error") {
                    this.$toast.fail(res.data.message);
                  }
                });
              } else {
                this.$toast.fail({
                  message: "密码不一致",
                  icon: "warning"
                });
              }
            } else {
              this.$toast.fail({
                message: "密码格式不正确！8-16位数字和字母组成",
                icon: "warning"
              });
            }
          } else {
            this.$toast.fail({
              message: "昵称的格式不正确！4-12位汉字和字母组成",
              icon: "warning"
            });
          }
        } else {
          this.$toast.fail({
            message: "账号（邮箱）的格式不正确",
            icon: "warning"
          });
        }
      }
    },
    selImgHandle() {
      this.$refs.file.click();
    },
    fileSelected(e) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]); // 获取当前的图片信息
      post("/api/v1/common/file_upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        this.imgSrc = BaseUrl + res.data.info;
        this.RegForm.avatar = BaseUrl + res.data.info;
      });
    }
  }
};
</script>

<style scoped>
.reg {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.reg img {
  width: 144px;
  margin-top: 64px;
}
.reg .point {
  color: #ccc;
  font-size: 24px;
  margin-top: 20px;
}
.van-cell-group {
  width: 80%;
}
.reg input::-webkit-input-placeholder {
  color: #ccc;
  font-size: 35px;
  line-height: 50px;
}
.reg input {
  margin-top: 30px;
  padding: 16px 0;
  width: 90%;
  height: 70px;
  outline: none;
  border-bottom: 1px solid #ccc;
}
.reg button {
  width: 80%;
  height: 100px;
  font-size: 32px;
  border: 0;
  border-radius: 50px;
  margin-top: 48px;
  color: white;
  background-color: #fab3b3;
}
.reg a {
  margin-top: 70px;
  padding-left: 400px;
  font-size: 27px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
