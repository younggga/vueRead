<template>
    <section :class="['read-content', skinColor, { night: nightMode }]">
        <div class="read-action-mid" @click="showOpt"></div>
        <div :class="['read-content-header', { 'read-opt': isShowOpt }]">
            <span class="back" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </span>
        </div>
        <div class="read-content-content">
            <h4 :class="[skinColor, { night: nightMode }]">{{ book.title }}</h4>
            <div class="content-list">
                <h3>{{ chapterstitle }}</h3>
                <p :style="{ fontSize: fontSize*2 + 'px' }">{{ readContent.body }}</p>
            </div>
            <button class="nextChapter" @click="nextChapter()">加载下一章</button>
        </div>
        <div :class="['read-content-set', { 'read-opt': isShowSet }]">
            <ul class="read-set-bg-list">
                <li v-for="skin in skinBgList" class="read-set-bg-item" @click="changeBkColor(skin)" :key="skin">
                    <span :class="[skin, { active: skin === skinColor }]">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-selected"></use>
                        </svg>
                    </span>
                </li>
            </ul>
            <div class="read-set-switch">
                <div class="read-set-switch-item">
                    <span :class="{ nochange: fontSize <= 10 }" @click="changeFontSize(false)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-font-reduce"></use>
                        </svg>
                    </span>
                </div>
                <div class="read-set-switch-item">
                    <span :class="{ nochange: fontSize >= 24 }" @click="changeFontSize(true)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-font-add"></use>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div :class="['read-content-footer', { 'read-opt': isShowOpt }]">
            <ul class="footer-tab">
                <li class="footer-tab-item" @click="showMenu">
                    <div class="footer-tab-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-menu"></use>
                        </svg>
                    </div>
                    <p class="footer-tab-label">目录</p>
                </li>
                <li class="footer-tab-item" @click="switchMode">
                    <template v-if="nightMode">
                        <div class="footer-tab-icon">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-day"></use>
                            </svg>
                        </div>
                        <p class="footer-tab-label">日间模式</p>
                    </template>
                    <template v-else>
                        <div class="footer-tab-icon">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-night"></use>
                            </svg>
                        </div>
                        <p class="footer-tab-label">夜间模式</p>
                    </template>
                </li>
                <li class="footer-tab-item" @click="showOptSet">
                    <div class="footer-tab-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-font"></use>
                        </svg>
                    </div>
                    <p class="footer-tab-label">设置</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { Toast } from "mint-ui";
import loading from "../components/loading";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "readContent",
  computed: {
    ...mapState([
      "book",
      "nightMode",
      "skinColor",
      "fontSize",
      "readContent",
      "chapters",
      "chapterstitle"
    ])
  },
  components: {
    loading
  },
  data() {
    return {
      isAdded: false,
      isShowOpt: false,
      isShowSet: false,
      num: 0,
      title: "",
      skinBgList: [
        "skin-default",
        "skin-blue",
        "skin-green",
        "skin-pink",
        "skin-dark",
        "skin-light"
      ]
    };
  },
  created() {
    //get正文
    let that = this;
    axios
      .get("/api/mix-atoc/" + that.$route.params.id, {
        params: {
          view: "chapters"
        }
      })
      .then(res => {
        let chapters = res.data["mixToc"]["chapters"];
        let link = chapters[that.num].link;
        that.changeSta({
          type: "chapterstitle",
          data: chapters[that.num].title
        });
        that.changeSta({
          type: "chapters",
          data: chapters
        });
        link = link.replace(/\//g, "%2F").replace(/\?/g, "%3F");
        axios
          .get("/chapterapi/" + link)
          .then(res => {
            that.changeSta({
              type: "readContent",
              data: res.data.chapter
            });
          })
          .catch(function(error) {
            if (error) {
              Toast({
                message: "本书还未收录，试试其他的？"
              });
            }
          });
      });
  },
  methods: {
    ...mapMutations([
      "setfontsize",
      "setcolor",
      "setnight",
      "setnightmode",
      "changeSta",
      "setchaptersshow"
    ]),
    nextChapter: function() {
      let that = this;
      this.num = this.num + 1;
      that.changeSta({
        type: "readContent",
        data: {}
      });
      let link = that.chapters[that.num].link;
      that.changeSta({
        type: "chapterstitle",
        data: that.chapters[that.num].title
      });
      link = link.replace(/\//g, "%2F").replace(/\?/g, "%3F");
      axios.get("/chapterapi/chapter" + link).then(res => {
        that.changeSta({
          type: "readContent",
          data: res.data.chapter
        });
      });
    },
    showMenu: function() {
      this.isShowOpt = this.isShowSet = false;
      /*this.$emit("show-menu");*/
      this.setchaptersshow();
    },
    switchMode: function() {
      this.isShowSet = false;
      this.setnightmode(!this.nightMode);
    },
    showOpt() {
      if (this.isShowOpt || this.isShowSet) {
        this.isShowOpt = this.isShowSet = false;
      } else {
        this.isShowOpt = true;
      }
    },
    showOptSet() {
      this.isShowSet = true;
    },
    changeFontSize(isAdd) {
      if ((this.fontSize >= 30 && isAdd) || (this.fontSize <= 10 && !isAdd)) {
        return;
      }
      let size = this.fontSize;
      isAdd ? size++ : size--;
      this.setfontsize(size);
    },
    changeBkColor(skin) {
      this.setnight(false);
      this.setcolor(skin);
    }
  }
};
</script>

<style lang="scss">
.read-content {
  position: relative;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.85);
  min-height: 100%;
  fill: #fff;
  .read-content-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    overflow: hidden;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.9);
    transform: translateY(-100%);
    transition: transform 0.15s;
    z-index: 99;

    .back {
      position: absolute;
      top: 16px;
      left: 10px;
      text-align: center;
      .icon {
        width: 48px;
        height: 48px;
      }
    }
  }
  .read-content-content {
    position: relative;
    overflow: hidden;
    padding: 20px 30px 160px;
    font-size: 28px;
    h4 {
      font-size: 24px;
      color: #666;
      background-color: #fff;
      font-weight: 400;
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0;
      line-height: 60px;
      padding-left: 30px;
      z-index: 9;
    }
    .content-list {
      h3 {
        margin: 60px 0 40px;
        font-size: 40px;
      }
      p {
        text-indent: 2em;
        margin: 0.5em 0;
        letter-spacing: 0;
        line-height: 1.8;
      }
    }
    button.nextChapter {
      position: absolute;
      bottom: 40px;
      left: 10%;
      display: block;
      width: 80%;
      font-size: 32px;
      line-height: 72px;
      border: none;
      border-radius: 200px;
      color: #fff;
      background-color: #ed424b;
      z-index: 9999;
      outline: none;
    }
  }
  .read-content-set {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 100px;
    font-size: 28px;
    overflow: hidden;
    opacity: 0;
    display: none;
    transition: opacity 0.15s;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.9);

    .read-set-bg-list {
      display: flex;
      padding: 20px 0;
      overflow: hidden;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .read-set-bg-item {
        flex: 1;
        text-align: center;
        span {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid rgba(0, 0, 0, 0.9);

          .icon {
            position: absolute;
            top: 12px;
            left: 14px;
            font-size: 32px;
            color: #ed424b;
            opacity: 0;
          }

          &.active {
            border-color: #ed424b;
            .icon {
              opacity: 1;
            }
          }
        }
      }
    }
    .read-set-switch {
      padding: 20px 0;
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .read-set-switch-item {
        .icon {
          width: 40px;
          height: 40px;
        }
        flex: 1;
        span {
          display: inline-block;
          width: 80%;
          margin: 0 10%;
          border: 1px solid #fff;
          border-radius: 100px;
          line-height: 72px;
          text-align: center;
          font-size: 40px;
          color: #fff;

          &.nochange {
            opacity: 0.6;
          }
        }
      }
    }
  }
  .read-content-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    overflow: hidden;
    font-size: 24px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.9);
    transform: translateY(100%);
    transition: transform 0.15s;
    z-index: 9999;

    .footer-tab {
      position: relative;
      display: flex;
      padding: 14px 0;
    }
    .footer-tab-item {
      flex: 1;
      text-align: center;

      .icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
      }

      .footer-tab-label {
        margin-top: 8px;
      }
    }
  }
  .read-opt {
    transform: translate(0%, 0%);
    opacity: 1;
    display: block;
  }

  .read-action-mid {
    position: fixed;
    width: 60%;
    height: 40%;
    top: 30%;
    left: 20%;
    z-index: 1000;
  }
}

.skin-default {
  background-color: #c4b395;
}

.skin-blue {
  background-color: #c3d4e6;
}

.skin-green {
  background-color: #c8e8c8;
}

.skin-pink {
  background-color: #f8c9c9;
}

.skin-dark {
  background-color: #3e4349;
}

.skin-light {
  background-color: #f6f7f9;
}

.night {
  color: rgba(255, 255, 255, 0.5);
  background-color: #1a1a1a;
}
</style>
