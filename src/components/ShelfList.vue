<template>
	<mt-loadmore :top-method="loadTop" ref="loadmore">
<section class="shelf-list">
	<div v-if="noshelf">您的书架还没有书 去挑两本吧！</div>
	<ul class="shelf-book-list" v-if="shelfBookList.length > 0">
		<li v-for="book in shelfBookList" :key="book._id" class="shelf-book-item">
			<router-link :to="{ name: 'read', params: { id: book._id }}">
				<img :src="'http://statics.zhuishushenqi.com'+book.cover" alt="book.title" class="cover fl">
				<div class="book-info">
					<h4 class="title">
							{{ book.title }}
							<span class="time red">{{ book.updated | time}}</span>
						</h4>
					<p class="meta author">
						{{ book.author }}&nbsp;&nbsp;著
					</p>
					<p class="meta">
						连载至：&nbsp;&nbsp;{{ book.lastChapter }}
					</p>
				</div>
			</router-link>
			<span class="delete" @click="deleteBook(book._id)">
	                <svg class="icon" aria-hidden="true">
	                    <use xlink:href="#icon-delete"></use>
	                </svg>
				</span>
		</li>
	</ul>
</section>
		</mt-loadmore>
</template>

<script>
import { Toast } from "mint-ui";
import { mapMutations } from "vuex";
import moment from "moment";
import axios from "axios";
export default {
  name: "shelfList",
  data() {
    return {
      noshelf: false,
      shelfBookList: [],
      allLoaded: false,
      loading: true
    };
  },
  filters: {
    time(updated) {
      moment.locale("zh-cn");
      return moment(updated).fromNow();
    }
  },
  computed: {},
  created() {
    let that = this;
    that.setshow(true);
    let user = sessionStorage.getItem("loginname");
    axios("http://localhost:2525/showshelf", {
      params: { user }
    }).then(res => {
      if (!res.data[0]) {
        that.noshelf = true;
      } else {
        let data = [];
        for (let i = 0; i < res.data.length; i++) {
          axios.get("/api/book/" + res.data[i]["bookid"]).then(res => {
            data.push(res.data);
          });
          setTimeout(function() {
            that.shelfBookList = data;
            that.setshow(false);
          }, 500);
        }
      }
    });
  },
  methods: {
    ...mapMutations(["setshow"]),
    deleteBook: function(bookid) {
      let that = this;
      let user = sessionStorage.getItem("loginname");
      axios("http://localhost:2525/delshelf", {
        params: { user, bookid }
      }).then(res => {
        if (res.data.code == 1) {
          let index = that.shelfBookList.indexOf("bookid");
          that.shelfBookList.splice(index, 1);
          Toast({
            message: "删除成功"
          });
        }
      });
    },
    loadTop: function() {
      let that = this;
      let user = sessionStorage.getItem("loginname");
      axios("http://localhost:2525/showshelf", {
        params: { user }
      }).then(res => {
        if (!res.data[0]) {
          that.noshelf = true;
        } else {
          let data = [];
          for (let i = 0; i < res.data.length; i++) {
            axios.get("/api/book/" + res.data[i]["bookid"]).then(res => {
              data.push(res.data);
            });
          }
          setTimeout(function() {
            that.shelfBookList = data;
            that.$refs.loadmore.onTopLoaded();
            Toast({
              message: "下拉刷新成功"
            });
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.mint-loadmore {
  height: 100%;
}
.shelf-list {
  text-align: left;
  overflow-y: scroll;
  height: 100%;
  padding-left: 30px;
  .shelf-book-list {
    height: 100%;
  }
  .shelf-book-item {
    position: relative;
    padding: 20px 0;
    overflow: hidden;
    border-bottom: 1px solid #ebebeb;
  }
  .cover {
    display: inline-block;
    width: 84px;
    height: 120px;
    margin-right: 20px;
    vertical-align: top;
  }

  .book-info {
    display: inline-block;
    position: relative;
    font-size: 24px;
    padding-right: 20px;

    .title {
      font-size: 28px;
      color: #000;
      line-height: 1;
      padding: 4px 0 6px;

      .time {
        font-weight: 400;
        margin-left: 10px;
        border: 1px solid #ed424b;
        border-radius: 16px;
        padding: 1px 8px;
        font-size: 20px;
      }
    }
    .meta {
      line-height: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-right: 60px;

      &.author {
        margin: 18px 0;
      }
    }
  }
  .delete {
    position: absolute;
    right: 20px;
    bottom: 20px;

    .icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
