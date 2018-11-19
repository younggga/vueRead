// 单一状态树
// 用一个对象就包含了全部的应用层级状态

export default {
  headerTitle: "", //页面标题
  headerType: "", //页面类型
  categories: null, //分类
  rank: {
    sexType: "male"
  }, //rank页面性别
  featured: {
    sexType: "male"
  }, //featured页面性别
  backtitle: "", //backbar标题
  minorList: ["全部"], //二级分类列表
  cattype: "hot", //选择排序规则
  catminor: "", //当前二级分类
  bookList: [], //显示书籍列表
  start: "0", //列表跳过多少章
  book: null, //当前书籍
  nightMode: false, //是否夜间模式
  skinColor: "", //阅读页面背景色
  fontSize: 12, //设置页面字体大小
  chapters: [], //章节目录
  chaptersshow: false, //是否显示章节目录
  readContent: {}, //当前阅读章节
  chapterstitle: "", //当前章节名
  rankId: "",
  maleRankList: [],
  femaleRankList: [],
  isShowPageLoading: true
};
