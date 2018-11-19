<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

img {
  vertical-align: middle;
  border: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
.el-dropdown-menu {
  margin-top: 10px;
}
.el-dropdown-menu__item {
  font-size: 35px !important;
  line-height: 60px !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.login {
  .mint-tab-item-label {
    font-size: 35px;
  }
  .mint-tab-container {
    width: 100%;
    position: absolute;
    top: 70px;
    bottom: 0;
  }
}
.el-message-box {
  width: 80% !important;
  font-size: 30px !important;
  .el-message-box__content {
    font-size: inherit;
  }
  .el-message-box__headerbtn {
    font-size: inherit;
  }
}
</style>
