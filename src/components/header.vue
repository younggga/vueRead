<template>
    <header class="header">
        <h2 class="header-logo">{{ headerTitle }}</h2>
        <nav class="nav-group" v-if="isShow">
            <h3 :class="['nav-item', { active: sexType === 'male' }]" @click="changSex('male')">男生</h3>
            <h3 :class="['nav-item', { active: sexType === 'female' }]" @click="changSex('female')">女生</h3>
        </nav>
        <div class="header-search">
            <router-link :to="{ path: 'search' }">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-search"></use>
                </svg>
            </router-link>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><router-link :to="{ path: 'userCenter' }">个人中心</router-link></el-dropdown-item>
                    <el-dropdown-item divided><span @click="rua()">退出登陆</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "headBar",
  data() {
    return {
      isShow: false,
      sexType: "male"
    };
  },
  methods: {
    ...mapMutations(["changeSextype", "changeSta"]),
    changSex: function(sex) {
      let that = this;
      this.sexType = sex;
      this.changeSextype({
        from: this.$route.name,
        sextype: sex
      });
      if (that.headerType === "rank") {
        let data = "";
        if (that.sexType == "male") {
          console.log(this);
          data = this.maleRankList[0]["_id"];
        } else {
          data = this.femaleRankList[0]["_id"];
        }
        this.changeSta({
          type: "rankId",
          data: data
        });
        axios.get("api/ranking/" + data).then(res => {
          that.changeSta({
            type: "bookList",
            data: res.data.ranking.books
          });
        });
      }
    },
    rua() {
      sessionStorage.removeItem("loginname");
      this.$alert("退出登陆成功", {
        confirmButtonText: "确定",
        showClose: false,
        closeOnClickModal: true
      }).then(function() {
        window.location.reload();
      });
    }
  },
  computed: {
    ...mapState(["headerTitle", "headerType", "maleRankList", "femaleRankList"])
  },
  created() {
    if (this.headerType === "featured" || this.headerType === "rank") {
      this.isShow = true;
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  overflow: hidden;
  // border-bottom: 1px solid #ed424b;
  color: #fff;
  background-color: #31759c;
  box-sizing: border-box;
  z-index: 99;

  h2.header-logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 30px;
    color: #fff;
    font-size: 30px;
  }
  .nav-group {
    margin: 20px auto;
    display: table;
    border: 1px solid #fff;
    border-radius: 8px;
    overflow: hidden;
    .nav-item {
      display: table-cell;
      font-weight: 400;
      line-height: 40px;
      padding: 0 20px;
      color: #fff;
      font-size: 30px;
      &.active {
        color: #666;
        background-color: #fff;
      }
    }
  }

  .header-search {
    position: absolute;
    display: inline-block;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    .el-icon-more {
      font-size: 35px;
      width: 40px;
      padding-left: 20px;
      height: 40px;
    }
    .el-dropdown {
      color: #ffffff;
    }
    .icon {
      transform: translateY(8px);
      width: 40px;
      fill: #fff;
      height: 40px;
    }
  }
}
</style>
