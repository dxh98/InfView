<template>
  <div class="userinfoupdate">
    <van-nav-bar id="reset" title="个人信息" left-arrow>
      <template #left>
        <van-icon name="cross" size="18" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <ul>
      <li>
        <h1>头像：</h1>
        <div>
          <input @change="fileSelected" type="file" ref="file" style="display:none" />
          <img @click="selImgHandle" :src="imgSrc" class="avatars" alt />
          <p class="point">点击选择头像</p>
        </div>
      </li>
      <li>
        <h1>昵称：</h1>
        <input v-model="UserInfoForm.nickName" type="text" placeholder="请输入昵称" />
      </li>
      <li>
        <h1>年龄：</h1>
        <input v-model="UserInfoForm.age" type="number" placeholder="请输入年龄" />
      </li>
    </ul>
    <van-button @click="updateInfo" class="updatebtn" color="#f93711">修改</van-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { get, post, put } from "@/utils/request.js";
import { getToken } from "@/utils/auth.js";
import BaseUrl from "@/config/base.js";
export default {
  name: "UserInfoUpdate",
  data() {
    return {
      UserInfoForm: {
        avatar: "",
        nickName: "",
        age: 0
      },
      confirmpassword: "",
      imgSrc: require("@/assets/icons/avatars.png")
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
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
        this.UserInfoForm.avatar = BaseUrl + res.data.info;
      });
    },
    updateInfo() {
      put("/api/v1/userinfo/update_info", {
        avatars: this.UserInfoForm.avatar,
        nickName: this.UserInfoForm.nickName,
        age: this.UserInfoForm.age * 1
      }).then(res => {
        this.$toast({
          message: res.data.msg,
          icon: "checked"
        });
      });
    }
  },
  mounted() {
    get("/api/v1/userinfo", {
      headers: {
        Authorization: "Beaer " + getToken()
      }
    }).then(res => {
      this.UserInfoForm = res.data.data;
      if (res.data.data.avatars == "") {
      } else {
        this.imgSrc = res.data.data.avatars;
      }
    });
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
.userinfoupdate > ul {
  width: 90%;
  margin: 30px auto 0;
  overflow: hidden;
}
.userinfoupdate > ul > li {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.userinfoupdate > ul > li > h1 {
  font-weight: bolder;
}
.avatars {
  margin-left: 60px;
  width: 128px;
  height: 128px;
}
.point {
  color: #ccc;
  font-size: 20px;
  margin-top: 10px;
  margin-left: 56px;
}
.userinfoupdate > ul > li:nth-child(2) > input {
  width: 400px;
  height: 80px;
  padding-left: 30px;
  border-radius: 40px;
  margin-left: 40px;
  background-color: #e6e6e6;
}
.userinfoupdate > ul > li:nth-child(3) > input {
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
  margin: 60px 0 0 180px;
}
</style>
