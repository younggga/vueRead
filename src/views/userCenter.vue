<template>
  <div class="home">
    <mt-field label="username" placeholder="Input username" v-model="tel"></mt-field>
    <mt-field label="验证码" v-model="code">
      <mt-button type="default" @click="getcode()">获取验证码</mt-button>
    </mt-field>
    <mt-button type="primary" @click="login()">登录</mt-button>
</div>
</template>

<script>
import { Toast } from "mint-ui";
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      tel: "",
      code: ""
    };
  },
  components: {},
  methods: {
    getcode: function() {
      let that = this;
      let reg = /^1[35678][0-9]{9}$/;
      if (reg.test(that.tel)) {
        axios
          .get("http://localhost:2525/getcode", {
            params: {
              tel: that.tel
            }
          })
          .then(res => {
            if (res.data.code === 1) {
              Toast({
                message: "验证码发送成功"
              });
            } else {
              Toast({
                message: res.data.msg
              });
            }
          });
      } else {
        Toast({
          message: "手机号格式错误"
        });
      }
    },
    login: function() {
      let that = this;
      let telreg = /^1[35678][0-9]{9}$/;
      let codereg = /^[0-9]{4}$/;
      if (!telreg.test(this.tel)) {
        Toast({
          message: "手机号格式错误"
        });
        return false;
      }
      if (!codereg.test(this.code)) {
        Toast({
          message: "验证码格式错误"
        });
        return false;
      }
      axios
        .get("http://localhost:2525/loginto", {
          params: {
            tel: that.tel,
            code: that.code
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            Toast({
              message: "登录成功"
            });
            sessionStorage.setItem("login", that.tel);
            that.$route.push("/");
          } else {
            Toast({
              message: "验证码错误"
            });
          }
        });
    }
  }
};
</script>
