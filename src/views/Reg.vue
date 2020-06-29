<template>
  <div>
    <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft" />
    <div class="reg">
      <input @change="fileSelected" type="file" ref="file" style="display:none" />
      <img @click="selImgHandle" :src="imgSrc" class="avatars" alt />
      <p class="point">请选择头像</p>
      <input v-model="RegForm.username" type="text" placeholder="请输入账号" />
      <input v-model="RegForm.nickName" type="text" placeholder="请输入昵称" />
      <input v-model="RegForm.password" type="password" placeholder="请输入密码" />
      <input v-model="confirmpassword" type="password" placeholder="确认密码" />
      <button @click="Reg">注册</button>

      <a href="#" @click="tabpage">已有账号，我要登录</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { post } from "@/utils/request.js";

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
    Reg() {
      if (this.RegForm.username == "" || this.RegForm.password == "") {
        alert("账号密码不能为空");
      } else {
        if (this.RegForm.password == this.confirmpassword) {
          post("/api/v1/auth/reg", {
            userName: this.RegForm.username,
            passWord: this.RegForm.password,
            avatars: this.RegForm.avatar,
            nickName: this.RegForm.nickName
          }).then(res => {
            if (res.data.code == 1) {
              alert("用户注册成功");
              this.$router.push({
                name: "Login"
              });
            }
          });
        } else {
          alert("密码不一致");
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
        // this.imgSrc = `http://106.14.70.106:8800` + res.data.info;
        // this.RegForm.avatar = `http://106.14.70.106:8800` + res.data.info;
        this.imgSrc = `http://localhost:8800` + res.data.info;
        this.RegForm.avatar = `http://localhost:8800` + res.data.info;
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
  font-size: 10px;
  margin-top: 0.5rem;
}
.reg input::-webkit-input-placeholder {
  color: #ccc;
  font-size: 35px;
  line-height: 50px;
}
.reg input {
  margin-top: 1.3rem;
  padding: 0.5rem 0;
  width: 90%;
  height: 2rem;
  outline: none;
  border-bottom: 0.01rem solid #ccc;
}
.reg button {
  width: 80%;
  height: 100px;
  font-size: 32px;
  border: 0;
  border-radius: 1.5rem;
  margin-top: 1.5rem;
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
