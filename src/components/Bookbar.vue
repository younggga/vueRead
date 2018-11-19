<template>
<section class="book-bar">
	<div class="book-bar-item" v-show="!isAdded" @click="addToShelf()">
		<div class="book-bar-icon">
			<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-add_shelf"></use>
                </svg>
		</div>
		<p class="book-bar-content">加入书架</p>
	</div>
	<div class="book-bar-item" v-show="isAdded">
		<div class="book-bar-icon">
			<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shelf_added"></use>
                </svg>
		</div>
		<p class="book-bar-content">已加入书架</p>
	</div>
	<div class="book-bar-item read">
		<router-link :to="{ name: 'read', params: { id: book['_id'] }}">
			<p class="book-bar-content">立即阅读</p>
		</router-link>
	</div>
</section>
</template>
<script>
import { Toast } from "mint-ui";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "bookbar",
  data() {
    return {
      isAdded: false
    };
  },
  methods: {
    addToShelf: function() {
      let that = this;
      let user = sessionStorage.getItem("loginname");
      let bookid = this.$route.params.id;
      axios
        .get("http://localhost:2525/jionshelf", {
          params: {
            user,
            bookid
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            Toast({
              message: res.data.msg
            });
          }
          that.isAdded = true;
        });
    }
  },
  computed: {
    ...mapState(["book"])
  },
  created() {
    let that = this;
    let user = sessionStorage.getItem("loginname");
    let bookid = this.$route.params.id;
    axios
      .get("http://localhost:2525/isjionshelf", {
        params: {
          user,
          bookid
        }
      })
      .then(res => {
        that.isAdded = res.data.code == 1;
      });
  }
};
</script>

<style lang="scss">
.book-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  height: 120px;
  background-color: #fff;

  .book-bar-item {
    display: block;
    flex: 1;
    padding: 20px 0;
    font-size: 24px;
    color: #999;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    &.read {
      font-size: 32px;
      color: #fff;
      background: #ed424b;
      line-height: 80px;
      border-top-color: #ed424b;
    }
  }

  .book-bar-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 8px;

    .icon {
      width: 48px;
      height: 48px;
    }
  }
  .book-bar-content {
    text-align: center;
  }
}
</style>
