// ACTIONS

// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。  进行ajax 请求
// context == store store 实例具有相同方法和属性的 context 对象  context.commit store.commit

// Action 通过 store.dispatch 方法触发：
import axios from "axios";
/*let localbaseURL = "http://localhost:2525";
let normalbaseURL = "http://api.zhuishushenqi.com";
let imgbaseURL = "http://statics.zhuishushenqi.com";
let textbaseURL = "http://chapterup.zhuishushenqi.com/chapter/";*/
axios.defaults.withCredentials = true;
export default {
  getCats({ commit }) {
    axios.get("/api/cats/lv2/statistics").then(res => {
      let newobj = {};
      for (let i in res.data) {
        switch (i) {
          case "male":
            newobj["male"] = {
              title: "男生",
              gender: "male",
              catList: res.data[i]
            };
            break;
          case "female":
            newobj["female"] = {
              title: "女生",
              gender: "female",
              catList: res.data[i]
            };
            break;
          case "press":
            newobj["press"] = {
              title: "出版",
              gender: "press",
              catList: res.data[i]
            };
            break;
          default:
            break;
        }
      }
      commit("getCats", newobj);
    });
  },
  //get 二级分类
  getminor({ commit }, { male, major, callback }) {
    axios.get("/api/cats/lv2").then(res => {
      for (let i = 0; i < res.data[male].length; i++) {
        if (res.data[male][i].major === major) {
          commit("getminor", res.data[male][i].mins);
          if (callback) {
            callback();
          }
          return;
        }
      }
    });
  },
  //get分类列表
  getcatlist(
    { commit },
    { major, type, minor, gender, limit, start, callback }
  ) {
    axios
      .get("/api/book/by-categories", {
        params: {
          gender: gender,
          type: type,
          major: major,
          minor: minor,
          start: start,
          limit: limit
        }
      })
      .then(res => {
        if (callback) {
          callback(res.data.total);
        }
        commit("getcatlist", res.data.books);
      });
  },
  //get 当前书籍详情
  getbook({commit},{id,callback}) {
    let url = "/api/book/" + id;
    axios.get(url).then(res => {
      if (callback) {
        callback();
      }
      commit("getbook", res.data);
    });
  }
};
