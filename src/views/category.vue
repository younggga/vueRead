<template>
    <div class="category">
    <headbar></headbar>
        <div class="catsviews">
            <cat v-for="category in categories" :category="category" v-if="category !== null" :key="category.title"></cat>
        </div>
<footbar></footbar>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import headbar from "../components/header";
import footbar from "../components/footer";
import cat from "../components/Cat";
export default {
  name: "category",
  components: {
    footbar,
    headbar,
    cat
  },
  methods: {
    ...mapActions(["getCats"]),
    ...mapMutations(["setHeader"])
  },
  mounted() {

  },
  computed: {
    ...mapState(["categories", "headerType"])
  },
  created() {
    this.setHeader({
      title: "分类",
      type: "category"
    });
    this.getCats();
  }
};
</script>

<style lang="scss">
.catsviews {
  overflow-y: scroll;
  padding: 80px 0 120px 0;
}
.cat {
  position: relative;
  background: #fff;
  .cat-title {
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    font-weight: 400;
  }
  .cat-list {
    position: relative;
    overflow: hidden;
  }
  .cat-item {
    display: inline-block;
    width: 33.3%;
    box-sizing: border-box;
    text-align: center;
    padding: 10px 0;
    &:nth-child(3n + 1) {
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }
    &:nth-child(3n + 2) {
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }
    &:nth-child(3n + 3) {
      border-bottom: 1px solid #f0f0f0;
    }
    &:nth-child(1) {
      border-top: 1px solid #f0f0f0;
    }
    &:nth-child(2) {
      border-top: 1px solid #f0f0f0;
    }
    &:nth-child(3) {
      border-top: 1px solid #f0f0f0;
    }
    p {
      line-height: 22px;
    }
    .cat-name {
      font-size: 16px;
      color: #333;
    }
    .cat-count {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
