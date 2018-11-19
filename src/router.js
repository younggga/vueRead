import Vue from "vue";
import Router from "vue-router";
import userCenter from "./views/userCenter.vue";
import shelf from "./views/shelf";
import search from "./views/search";
import rank from "./views/rank";
import category from "./views/category";
import featured from "./views/featured";
import catList from "./views/catlist";
import Book from "./views/book";
import Read from "./views/read";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "shelf",
      component: shelf
    }, //我的书架
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login&register.vue")
    }, //登录和注册
    {
      path: "/search",
      name: "search",
      component: search
    }, //搜索
    {
      path: "/rank",
      name: "rank",
      component: rank
    }, //排名
    {
      path: "/category",
      name: "category",
      component: category
    }, //分类
    {
      path: "/featured",
      name: "featured",
      component: featured
    }, //精选
    {
      path: "/userCenter",
      name: "userCenter",
      component: userCenter
    }, //用户中心
    {
      path: "/catlist/:major",
      name: "catlist",
      component: catList
    }, //二级分类
    {
      path: "/book/:id",
      name: "book",
      component: Book
    },
    {
      path: "/read/:id",
      name: "read",
      component: Read
    }
  ]
});
