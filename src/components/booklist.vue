<template>
    <section class="book-list-comm">
        <ol class="book-list-content">
            <li class="book-list-li book-list-li-comm" v-for="(book,i) in bookList" :key="i">
                <router-link :to="{ name: 'book', params: {id: book['_id']} }">
                    <img class="book-list-book-cover fl" :src="imgsrc + book.cover">
                    <template>
                        <div class="book-list-book-info book-list-book-info-rank">
                            <h3 class="book-title">{{ book.title }}</h3>
                            <p class="book-info">
                                <span class="book-author fl gray">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-author"></use>
                                    </svg>
                                    {{ book.author }}
                                </span>
                            </p>
                            <p class="book-summary text-line-comm gray">{{ book.shortIntro }}</p>
                            <p class="book-info">
                                <span class="red">
                                    {{ book.retentionRatio }}%留存
                                </span>
                                <span class="split-line">|</span>
                                <span class="blue">
                                    {{ book.latelyFollower}}人气
                                </span>
                            </p>
                        </div>
                    </template>
                </router-link>
            </li>
        </ol>
    </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "bookList",
  data() {
    return {
      imgsrc: "http://statics.zhuishushenqi.com"
    };
  },
  computed: {
    ...mapState(["bookList"])
  }
};
</script>

<style scoped lang="scss">
.book-list-comm {
  text-align: left;
  position: relative;

  .book-list-li {
    padding: 20px 30px 20px 0;
    border-bottom: 1px solid #f0f1f2;

    &.book-list-li-comm {
      padding-left: 20px;
    }

    a {
      display: block;
      overflow: hidden;
    }
    .book-list-book-cover {
      display: inline-block;
      width: 132px;
      height: 176px;
      margin-right: 20px;
      float: left;
    }

    .book-list-book-info {
      position: relative;
      overflow: hidden;

      .book-title {
        color: #333;
        line-height: 1;
        padding-top: 10px;
        margin-bottom: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .book-summary {
        font-size: 24px;
        line-height: 1.6;
      }
      .book-info {
        overflow: hidden;
        margin-top: 16px;
        line-height: 1.2;

        span {
          display: inline-block;
        }
        .book-author {
          margin-top: 4px;
          font-size: 26px;

          .icon {
            width: 32px;
            height: 32px;
          }
        }
        .book-tags {
          margin: 6px 0;
        }
        em.small-tag {
          font-size: 20px;
          padding: 1px;
        }
        em.gray {
          border: 1px solid #969ba3;
        }
        em.red {
          border: 1px solid #ed424b;
        }
        em.blue {
          border: 1px solid #4284ed;
        }
      }
    }
    .book-list-book-info-rank {
      .book-summary {
        -webkit-line-clamp: 1;
        margin: 10px 0;
      }
      .book-title {
        margin-bottom: 10px;
      }
      .book-info {
        margin-top: 16px;
        .split-line {
          padding: 0 6px;
        }
      }
    }
  }
}
</style>
