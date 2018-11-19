<template>
    <section class="search">
        <section class="search-header">
		<span class="search-back" @click="$router.go(-1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-search-back"></use>
            </svg>
		</span>
            <div class="search-input-section">
                <input type="text" class="search-input" ref="searchInput"  placeholder="请输入您要搜索的关键字" @keyup.enter="searchByKeyword">
                <span class="search-icon" @click="searchByKeyword()">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-search"></use>
                </svg>
			</span>
            </div>
        </section>
        <div class="pdt">
            <template v-if="showthis">
                <section class="search-hot search-section">
                    <h4>热门搜索</h4>
                    <ul class="search-keyword-list">
                        <li class="search-keyword" @click="searchByKeyword(hot.word)" v-for="hot in hotKeywords">{{ hot.word }}</li>
                    </ul>
                </section>
            </template>
        <booklist v-if="bookList.length > 0"></booklist>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import booklist from "../components/booklist";
import axios from "axios";
export default {
  name: "search",
  components: {
    booklist
  },
  data() {
    return {
      hotKeywords: [],
      showthis: true
    };
  },
  computed: {
    ...mapState(["bookList"])
  },
  created() {
    let that = this;
    that.changeSta({
      type: "bookList",
      data: ""
    });
    //得到热词
    axios.get("/api/book/search-hotwords").then(res => {
      that.hotKeywords = res.data.searchHotWords.slice(0, 20);
    });
  },
  methods: {
    ...mapMutations(["changeSta"]),
    searchByKeyword: function(key) {
      let that = this;
      let keyword = key || this.$refs.searchInput.value;
      axios
        .get("/api/book/fuzzy-search", {
          params: {
            query: keyword
          }
        })
        .then(res => {
          that.showthis = false;
          that.changeSta({
            type: "bookList",
            data: res.data.books
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pdt {
  padding-top: 100px;
}
.search {
  position: relative;
  overflow: hidden;
  background-color: #f6f7f9;

  .search-header {
    position: fixed;
    top: 0;
    left: 0;
    height: 80px;
    width: 100%;
    background-color: #31759c;
    z-index: 99;

    .search-back {
      position: absolute;
      top: 20px;
      left: 10px;
      width: 40px;
      height: 40px;
      .icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
        fill: #fff;
        color: #fff;
      }
    }
    .search-input-section {
      padding: 16px 30px 14px 70px;
      overflow: hidden;
    }
    .search-input {
      width: 100%;
      height: 50px;
      color: rgb(100, 218, 237);
      background-color: #31759c;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
    }

    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: rgb(94, 224, 237);
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: rgb(94, 224, 237);
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: rgb(94, 224, 237);
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: rgb(94, 224, 237);
    }

    .search-icon {
      position: absolute;
      top: 20px;
      right: 30px;
      width: 40px;
      height: 40px;
      .icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
        fill: #fff;
        color: #fff;
      }
    }
  }

  .search-section {
    position: relative;
    padding: 0 20px 40px;
    overflow: hidden;
    margin-bottom: 20px;
    background-color: #fff;

    h4 {
      line-height: 60px;
      border-bottom: 1px solid rgb(198, 199, 201);

      span.clear-all {
        float: right;
      }
    }

    .search-keyword-list {
      padding: 20px;

      .search-keyword {
        display: inline-block;
        font-size: 24px;
        margin: 10px;
        padding: 10px;
        color: rgb(140, 140, 140);
        border: 1px solid rgb(198, 199, 201);
        border-radius: 40px;
      }
    }
  }
}
</style>
