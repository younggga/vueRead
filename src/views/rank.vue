<template>
    <div class="rank">
        <headbar></headbar>
        <template v-if="rank.sexType === 'male'">
            <section class="rank-bar-section">
                <ul class="rank-list">
                    <li v-for="rank in maleRankList"
                        :class="['rank-item', 'fl', {active: rank._id === rankId}]"
                        @click="changeRankId(rank._id)"
                        :key="rank._id">
                        {{ rank.shortTitle }}
                    </li>
                </ul>
            </section>
        </template>
        <template v-else-if="rank.sexType === 'female'">
            <section class="rank-bar-section">
                <ul class="rank-list">
                    <li v-for="rank in femaleRankList"
                        :class="['rank-item', 'fl', {active: rank._id === rankId}]"
                        @click="changeRankId(rank._id)"
                        :key="rank._id">
                        {{ rank.shortTitle }}
                    </li>
                </ul>
            </section>
        </template>
        <section class="book-list-section">
            <booklist v-if="bookList.length > 0"></booklist>
            <div class="no-more" v-if="!isLoading">没有更多了</div>
        </section>
<footbar></footbar>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import headbar from "../components/header";
import footbar from "../components/footer";
import booklist from "../components/booklist";
import axios from "axios";
export default {
  name: "rank",
  components: {
    footbar,
    headbar,
    booklist
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    ...mapActions([""]),
    ...mapMutations(["setHeader", "changeSta"]),
    changeRankId: function(rankId) {
      let that = this;
      this.changeSta({
        type: "rankId",
        data: rankId
      });
      axios.get("api/ranking/" + that.rankId).then(res => {
        console.log(res);
        console.log(res.data);
        that.changeSta({
          type: "bookList",
          data: res.data.ranking.books
        });
      });
    }
  },
  computed: {
    ...mapState([
      "rank",
      "rankId",
      "maleRankList",
      "femaleRankList",
      "bookList"
    ])
  },
  created() {
    let that = this;
    this.setHeader({
      title: "排行",
      type: "rank"
    });
    axios.get("/api/ranking/gender").then(res => {
      this.changeSta({
        type: "maleRankList",
        data: res.data.male
      });
      this.changeSta({
        type: "femaleRankList",
        data: res.data.female
      });
      this.changeSta({
        type: "rankId",
        data: that.maleRankList[0]._id
      });
      axios.get("api/ranking/" + that.rankId).then(res => {
        that.changeSta({
          type: "bookList",
          data: res.data.ranking.books
        });
      });
    });
  }
};
</script>

<style scoped lang="scss">
.rank {
  position: relative;
  height: 100%;
  background: #fff;
  overflow-y: scroll;

  .rank-bar-section {
    width: 160px;
    position: fixed;
    top: 80px;
    left: 0;
    bottom: 120px;
    background-color: #f6f7f9;
    overflow-y: scroll;
    .rank-list {
      width: 100%;
      overflow: hidden;
    }
    .rank-item {
      display: block;
      width: 100%;

      height: 72px;
      line-height: 72px;
      text-align: center;
      border-left: 2px solid #f6f7f9;
      box-sizing: border-box;

      &.active {
        background-color: #fff;
        border-left: 2px solid #ed424b;
      }
    }
  }

  .book-list-section {
    position: relative;
    margin: 80px 0 120px 160px;
    background-color: #fff;
  }
}
</style>
