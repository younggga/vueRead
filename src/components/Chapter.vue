<template>
    <section :class="['chapter', { show: chaptersshow }]">
        <div class="chapter-back">
            <span class="back" @click="setchaptersshow()">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </span>
            <h3 v-if="book">{{ book.title }}</h3>
        </div>
        <div class="chapter-list-section">
            <div class="chapter-bar">正文卷</div>
            <ul class="chapter-list">
                <li :class="['chapter-item',{ active: chapter.title === chapterstitle }]"
                    v-for="chapter in chapters"
                    @click="selectChapter(chapter.link,chapter.title)">
                    <p>{{ chapter.title }}
                        <span class="vip fr" v-if="chapter.isVip">
                            <svg class="icon red" aria-hidden="true">
                                <use xlink:href="#icon-lock"></use>
                            </svg>
                        </span>
                    </p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "chapter",
  data() {
    return {
      sort: true
    };
  },
  computed: {
    ...mapState(["book", "chapters", "chaptersshow", "chapterstitle"])
  },
  methods: {
    ...mapMutations(["setchaptersshow", "changeSta"]),
    selectChapter: function(link, title) {
      let that = this;
      that.changeSta({
        type: "readContent",
        data: {}
      });
      that.changeSta({
        type: "chapterstitle",
        data: title
      });
      link = link.replace(/\//g, "%2F").replace(/\?/g, "%3F");
      axios.get("/chapterapi/" + link).then(res => {
        that.changeSta({
          type: "readContent",
          data: {}
        });
        that.changeSta({
          type: "readContent",
          data: res.data.chapter
        });
        that.setchaptersshow();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.chapter {
  width: 100%;
  overflow: hidden;
  text-align: left;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 9999;
  background-color: #fff;
  transform: translateX(-100%);
  transition: transform 0.15s;

  &.show {
    transform: translateX(0);
  }
  .chapter-back {
    position: relative;
    overflow: hidden;
    height: 80px;
    color: #fff;
    background-color: #ed424b;
    z-index: 1;

    .back {
      position: absolute;
      top: 16px;
      left: 10px;
      text-align: center;
      .icon {
        fill: #fff;
        width: 48px;
        height: 48px;
      }
    }

    h3 {
      width: 70%;
      margin: 0 auto;
      line-height: 80px;
      text-align: center;
      font-weight: 400;
    }
  }
  .chapter-head {
    font-size: 26px;
    font-weight: 500;
    padding: 0 40px;
    line-height: 80px;
    .icon {
      font-size: 26px;
    }
  }
  .chapter-list-section {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .chapter-bar {
    line-height: 72px;
    padding-left: 40px;
    color: #969ba3;
    background-color: #f6f7f9;
  }
  .chapter-list {
    position: absolute;
    top: 72px;
    right: 0;
    bottom: 0;
    left: 20px;
    overflow: auto; // padding-left: 20px;
  }
  .chapter-item {
    padding: 30px 40px 30px 0;
    border-top: 1px solid #f0f1f2;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.active {
      color: #ed424b;
    }
    .icon {
      fill: red;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
  }
}
</style>
