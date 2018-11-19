<template>
    <div class="shelf">
        <headbar></headbar>
        <shelflist></shelflist>
        <footbar></footbar>
        <loading v-if="isShowPageLoading"></loading>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import loading from "../components/loading";
import shelflist from "../components/ShelfList";
import headbar from "../components/header";
import footbar from "../components/footer";
export default {
  methods: {
    ...mapActions([""]),
    ...mapMutations(["setHeader"])
  },
  components: {
    loading,
    headbar,
    footbar,
    shelflist
  },
  mounted() {
  },
  created() {
    this.setHeader({
      title: "我的书架",
      type: "shelf"
    });
  },
  computed:{
    ...mapState(["isShowPageLoading"])
  }
};
</script>
<style lang="scss" scoped>
.shelf {
  box-sizing: border-box;
  padding-top: 80px;
  width: 100%;
  height: 100%;
}
</style>
