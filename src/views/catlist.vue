<template>
    <section class="catlist-section" ref="catList">
        <backbar></backbar>
        <catbar></catbar>
        <mt-loadmore :top-method="loadTop" ref="loadmore">
            <div style="height: 100%" v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="loading"
                  infinite-scroll-distance="10">
            <booklist></booklist>
            </div>
        </mt-loadmore>
    </section>
</template>

<script>
import { Toast } from "mint-ui";
import { mapActions, mapState, mapMutations } from "vuex";
import backbar from "../components/backbar";
import catbar from "../components/catbar";
import booklist from "../components/booklist";

export default {
  name: "catelist",
  data() {
    return {
      allLoaded: false,
      loading: true
    };
  },
  components: {
    backbar,
    catbar,
    booklist
  },
  methods: {
    ...mapActions(["getminor", "getcatlist"]),
    ...mapMutations(["changebackbar", "reset", "addstart"]),
    loadTop() {
      let that = this;
      this.loading = true;
      this.reset(["bookList", "start"]);
      this.getcatlist({
        gender: this.$route.query["gender"],
        type: this.cattype,
        major: this.$route.params["major"],
        minor: this.catminor,
        start: this.start * 20,
        limit: 20,
        callback: function(data) {
          that.loading = data < that.start * 20;
          that.$refs.loadmore.onTopLoaded();
          Toast({
            message: "下拉刷新成功"
          });
        }
      });
    },
    loadMore() {
      let that = this;
      that.loading = true; // 不可以滑动
      this.addstart();
      this.getcatlist({
        gender: this.$route.query["gender"],
        type: this.cattype,
        major: this.$route.params["major"],
        minor: this.catminor,
        start: this.start * 20,
        limit: 20,
        callback: function(data) {
          if (data < that.start * 20) {
            that.loading = true;
            Toast({
              message: "没有更多书籍了"
            });
          } else {
            that.loading = false;
          }
        }
      });
    }
  },
  computed: {
    ...mapState(["backtitle", "cattype", "catminor", "start"])
  },
  mounted() {
    this.changebackbar(this.$route.params["major"]);
  },
  created() {
    let that = this;
    this.getminor({
      male: this.$route.query["gender"],
      major: this.$route.params["major"],
      callback: function() {
        that.reset(["catminor", "cattype", "bookList", "start"]);
        that.getcatlist({
          gender: that.$route.query["gender"],
          type: that.cattype,
          major: that.$route.params["major"],
          minor: that.catminor,
          start: that.start * 20,
          limit: 20,
          callback: function(data) {
            that.loading = data < that.start * 20;
          }
        });
      }
    });
  }
};
</script>
<style scoped>
.catlist-section {
  padding-top: 240px;
}
</style>
