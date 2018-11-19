// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation

// 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)

// 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数

export default {
  //设置headbar标题和是否出现性别选项
  setHeader(state, { title, type }) {
    state.headerTitle = title;
    state.headerType = type;
  },
  //
  getCats(state, data) {
    state.categories = data;
  },
  //set sextype
  changeSextype(state, data) {
    state[data.from].sexType = data.sextype;
    if (data.callback) {
      data.callback();
    }
  },
  // backbar title
  changebackbar(state, data) {
    state.backtitle = data;
  },
  //minor
  getminor(state, data) {
    state.minorList = ["全部"].concat(data);
  },
  //
  changeSta(state, { type, data }) {
    state[type] = data;
  },
  //
  reset(state, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === "bookList") {
        state["bookList"] = [];
      } else if (data[i] === "cattype") {
        state["cattype"] = "hot";
      } else if (data[i] === "start") {
        state["start"] = "0";
      } else {
        state[data[i]] = "";
      }
    }
  },
  //
  getcatlist(state, data) {
    state.bookList = state.bookList.concat(data);
  },
  //start+1
  addstart(state) {
    state["start"] = state.start * 1 + 1 + "";
  },
  //存储当前书籍信息
  getbook(state, data) {
    state["book"] = data;
  },
  //修改字体
  setfontsize(state, fontSize) {
    state.fontSize = fontSize;
  },
  //夜间模式
  setnight(state, isNight) {
    state.nightMode = isNight;
  },
  //
  setcolor(state, skinColor) {
    state.skinColor = skinColor;
  },
  //夜间模式
  setnightmode(state, isNight) {
    state.nightMode = isNight;
  },
  setchaptersshow(state) {
    if (state.chaptersshow) {
      state.chaptersshow = false;
    } else {
      state.chaptersshow = true;
    }
  },
  //isShowPageLoading
  setshow(state, data) {
    state.isShowPageLoading = data;
  }
};
