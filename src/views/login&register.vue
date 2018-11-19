<template>
    <div class="login">
        <mt-navbar v-model="active">
            <mt-tab-item id="tab-container1">登录</mt-tab-item>
            <mt-tab-item id="tab-container2">注册</mt-tab-item>
        </mt-navbar>
        <mt-tab-container :swipeable='true' v-model="active">
            <mt-tab-container-item id="tab-container1">
                <div class="loginBox">
                    <h3 class="form-title">login</h3>
                    <el-switch
                            v-model="value4"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="密码登录"
                            inactive-text="验证码登录">
                    </el-switch>
                    <el-form :model="login" ref="login" status-icon :rules="userRule" label-width="10vw" label-position="top">
                        <el-form-item label="手机号" prop="tel">
                            <el-input type="tel" v-model="login.tel" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item v-if="value4" label="密码" prop="password">
                            <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item v-if="!value4"  label="验证码" prop="randCode">
                            <el-input type="text" v-model="login.randCode" autocomplete="off">
                                <template slot="append"><el-button @click="sendRegCode('login',login.getCodeUrl)" type="primary">{{login.getCodeBtn}}</el-button></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="logins()" type="primary">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <div class="registerBox">
                    <h3 class="form-title">register</h3>
                    <el-form :model="register" ref="register" status-icon :rules="userRule" label-width="10vw" label-position="top">
                        <el-form-item label="手机号" prop="tel">
                            <el-input type="number" v-model="register.tel" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input placeholder="长度6-10位，首位英文" type="password" v-model="register.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="randCode">
                            <el-input type="number" v-model="register.randCode" autocomplete="off">
                                <template slot="append"><el-button type="primary" @click="sendRegCode('register',register.getCodeUrl)">{{register.getCodeBtn}}</el-button></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="registers()" type="primary">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      active: "tab-container1",
      value4: true,
      login: {
        tel: null,
        randCode: null,
        getCodeBtn: "获取验证码",
        password: null,
        btnDisabled: false,
        getCodeUrl: "http://localhost:2525/getLoginCode"
      },
      register: {
        tel: null,
        randCode: null,
        password: null,
        getCodeBtn: "获取验证码",
        btnDisabled: false,
        getCodeUrl: "http://localhost:2525/getRegCode"
      },
      userRule: {
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              var MobileRegex = /^1[35678][0-9]{9}$/;
              if (!MobileRegex.test(value)) {
                callback(new Error("手机号码格式不正确！"));
              } else {
                callback();
              }
            },
            message: "请输入正确格式的手机号",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              var pwReg = /^[a-zA-Z][0-9A-Za-z$_]{5,9}$/;
              if (!pwReg.test(value)) {
                callback(new Error("密码格式错误！"));
              } else {
                callback();
              }
            },
            message: "请输入正确格式的密码",
            trigger: "blur"
          }
        ],
        randCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "4位数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapState([""]),
    ...mapActions([""]),
    ...mapMutations([""]),
    //发送验证码
    sendRegCode: function(key, url) {
      //d对应btnDisabled时不让点击事件
      if (this[key].btnDisabled) {
        return false;
      }
      //验证手机号
      let MobileRegex = /^1[35678][0-9]{9}$/;
      if (!MobileRegex.test(this[key].tel)) {
        this.$alert("请输入手机号", {
          type: "error",
          confirmButtonText: "确定",
          closeOnClickModal: true,
          showClose: false
        });
        return false;
      }
      let that = this;
      axios
        .get(url, {
          params: {
            tel: this[key].tel
          }
        })
        .then(res => {
          if (res.data.code != 1) {
            that.$alert(res.data.msg, {
              confirmButtonText: "确定",
              showClose: false,
              closeOnClickModal: true
            });
          } else {
            this[key].getCodeBtn = "请60s后重试";
            this[key].btnDisabled = true;
            this.$alert("验证码发送成功", {
              showClose: false,
              closeOnClickModal: true
            });
            let that = this;
            let index = 60;
            let timer = setInterval(function() {
              index--;
              that[key].getCodeBtn = `请${index}s后重试`;
              if (index == 0) {
                that[key].getCodeBtn = "获取验证码";
                that[key].btnDisabled = false;
                clearInterval(timer);
              }
            }, 1000);
          }
        });
    },
    //注册
    registers: function() {
      //elementui本地验证
      let register = this.$refs.register;
      register.validate(valid => {
        if (valid) {
          let that = this;
          axios
            .get("http://localhost:2525/register", {
              params: {
                tel: this.register.tel,
                password: this.register.password,
                randCode: this.register.randCode
              }
            })
            .then(res => {
              if (res.data.code != 1) {
                that.$alert(res.data.msg, {
                  confirmButtonText: "确定",
                  showClose: false,
                  closeOnClickModal: true
                });
              } else {
                that
                  .$alert("注册成功", {
                    showClose: false,
                    closeOnClickModal: true
                  })
                  .then(function() {
                    //跳转页面
                    that.login.tel = that.register.tel;
                    that.active = "tab-container1";
                  });
              }
            });
        } else {
          return false;
        }
      });
    },
    //登录
    logins: function() {
      //获取login表格对象
      let login = this.$refs.login;
      let data = {
        tel: this.login.tel
      };
      //根据switch判断登录情况
      if (this.value4) {
        data["key"] = this.login.password;
        data["logintype"] = "password";
      } else {
        data["key"] = this.login.randCode;
        data["logintype"] = "logincode";
      }
      //elementUI自带本地验证方法validate
      login.validate(valid => {
        if (valid) {
          let that = this;
          //申请后台接口
          axios
            .get("http://localhost:2525/login", { params: data })
            .then(res => {
              if (res.data.code != 1) {
                that.$alert(res.data.msg, {
                  confirmButtonText: "确定",
                  showClose: false,
                  closeOnClickModal: true
                });
              } else {
                that.$alert("登录成功", {
                  confirmButtonText: "确定",
                  showClose: false,
                  closeOnClickModal: true,
                  callback: function() {
                    //设置session 跳转路径
                    sessionStorage.setItem("loginname", that.login.tel);
                    that.$router.push("/");
                  }
                });
              }
            });
        } else {
          return false;
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="scss">
.login {
  background: url("../assets/902397dda144ad340bf7bcffdda20cf431ad8579.jpg")
    no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  .mint-navbar {
    background-color: inherit;
  }
  .el-form-item__label {
    font-size: 30px;
  }
  .loginBox {
    padding: 20px;
    position: absolute;
    left: 0;
    right: 0;
    top: 200px;
    margin: auto;
    width: 80%;
    background-color: #fff;
    border-radius: 20px;
    .form-title {
      display: block;
      margin: 20px 0;
    }
    .mint-cell {
      padding: 30px 0;
      font-size: 30px !important;
    }
    .el-input {
      line-height: 60px;
      .el-input__inner {
        line-height: 60px;
        height: 60px;
      }
    }
    .el-input-group__append {
      border: 0;
    }
  }
  .registerBox {
    padding: 20px;
    position: absolute;
    left: 0;
    right: 0;
    top: 200px;
    margin: auto;
    width: 80%;
    background-color: #fff;
    border-radius: 20px;
    .form-title {
      display: block;
      margin: 20px 0;
    }
    .mint-cell {
      padding: 30px 0;
      font-size: 30px !important;
    }
    .el-input {
      line-height: 60px;
      .el-input__inner {
        line-height: 60px;
        height: 60px;
      }
    }
    .el-input-group__append {
      border: 0;
    }
  }
}
.mint-tab-item-label {
  font-size: 35px;
}
</style>
