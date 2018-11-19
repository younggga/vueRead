import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import "./plugins/element.js";
Vue.use(VueAwesomeSwiper);
Vue.use(MintUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  let loginname = sessionStorage.getItem("loginname");
  if (loginname || to.name == "login") {
    next();
  } else {
    next("/login");
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
