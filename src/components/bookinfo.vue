<template>
    <section class="book-info-section">
        <div class="book-detail">
            <img v-if="book.cover" class="book-cover fl" :src="'http://statics.zhuishushenqi.com'+book['cover']" :alt="book.title">
            <div class="book-desc">
                <h2 class="book-title">{{ book.title }}</h2>
                <p class="book-meta red">{{ book.author }}</p>
                <p class="book-meta">{{ book.majorCate }}/{{ book.minorCate }}</p>
                <p class="book-meta">{{ book.wordCount }}字
                    <span class="split-line">|</span> {{ book.isSerial ? '连载中' : '完结'}}
                </p>
            </div>
        </div>
        <div class="book-reader">
            <p class="reader-item"><span class="title">追人气</span><span class="content">{{ book.latelyFollower }}</span></p>
            <p class="reader-item"><span class="title">读者留存率</span><span class="content">{{ book.retentionRatio }}%</span></p>
            <p class="reader-item"><span class="title">日更新字数/天</span><span class="content">{{ book.serializeWordCount }}</span></p>
        </div>
        <div class="book-intro">
            <p class="long-intro">{{ book.longIntro }}</p>
        </div>
        <div class="book-menu">
            <router-link :to="{ name: 'read', params: { id: book['_id'] }, query: { menu: true } }">
                <div class="menu-title fl">目录</div>
                <p class="menu-content fr gray">
                    {{ book.updated | time }}
                    <span class="split-dot">·</span> {{ book.lastChapter }}
                </p>
            </router-link>
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "bookInfo",
  filters: {
    time(update) {
      return moment(update).format("YYYY-MM-DD");
    }
  },
  computed: {
    ...mapState(["book"])
  }
};
</script>

<style lang="scss">
.book-info-section {
  position: relative;
  height: 100%;
  overflow-y: scroll;
  padding-top: 120px;
  text-align: left;
}
.split-line {
  padding: 0 4px;
}
.split-dot {
  padding: 0 1px;
}
.book-detail {
  overflow: hidden;
  padding: 0 30px;
  // border-bottom: 1px solid #ebebeb;

  .book-cover {
    vertical-align: top;
    display: inline-block;
    width: 128px;
    height: 184px;
    margin-right: 20px;
  }

  .book-desc {
    position: relative;
    display: inline-block;
    .book-title {
      color: #333;
      line-height: 1;
      margin: 6px 0 10px;
      font-weight: 500;
    }
    .book-meta {
      font-size: 26px;
      line-height: 1.8;
    }
  }
}
.book-reader {
  display: flex;
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #ebebeb;

  .reader-item {
    flex: 1;
    span {
      display: block;
      line-height: 1.5;

      &.title {
        font-size: 24px;
        color: #999;
      }

      &.content {
        font-size: 32px;
        font-weight: 400;
        color: #222;
      }
    }
  }
}
.book-intro {
  position: relative;
  padding: 20px 30px 0;
  font-size: 28px;
  line-height: 1.5;
  text-align: justify;
  border-top: 1px solid #ebebeb;

  .icon {
    position: absolute;
    bottom: 0;
    right: 30px;
    font-size: 32px;
    transform: rotate(270deg);
    z-index: 99;
    color: #999;
    background: rgba(255, 255, 255, 0.8);
  }

  &.part {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}
.book-menu {
  position: relative;
  margin-top: 20px;
  padding: 0 30px;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  box-sizing: border-box;
  overflow: hidden;
  a {
    display: block;
  }
  .menu-title {
    font-size: 32px;
    line-height: 72px;
    font-weight: 400;
    display: inline-block;
    vertical-align: top;
  }
  .menu-content {
    float: right;
    position: relative;
    font-size: 24px;
    line-height: 72px;
    width: 70%;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 30px;
    display: inline-block;
    .icon {
      position: absolute;
      top: 20px;
      right: 0;
      font-size: 32px;
      color: #999;
      transform: rotate(180deg);
    }
  }
}
</style>
