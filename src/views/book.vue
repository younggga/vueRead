<template>
<div class="book">
    <backbar></backbar>
    <bookinfo></bookinfo>
    <bookbar></bookbar>
</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import backbar from "../components/backbar";
import bookinfo from "../components/bookinfo";
import bookbar from "../components/Bookbar";
export default {
  name: "book",
  components: {
    backbar,
    bookinfo,
    bookbar
  },
  methods: {
    ...mapActions(["getbook"]),
    ...mapMutations(["changebackbar"])
  },
  mounted() {
    this.changebackbar("书籍详情");
    this.getbook({
      id: this.$route.params["id"]
    });
  },
  computed: {
    ...mapState(["book"])
  }
};
</script>

<style scoped lang="scss">
</style>
