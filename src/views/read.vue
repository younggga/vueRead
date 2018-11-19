<template>
    <div class="read">
        <read-content></read-content>
        <chapter></chapter>
    </div>
</template>

<script>
import readContent from "../components/ReadContent";
import chapter from "../components/Chapter";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "read",
  components: {
    readContent,
    chapter
  },
  methods: {
    ...mapActions(["getbook"]),
    ...mapMutations(["setchaptersshow"])
  },
  mounted() {
    this.getbook({
      id: this.$route.params["id"]
    });
    if (this.$route.query.menu) {
      this.setchaptersshow();
    }
  }
};
</script>

<style scoped>
</style>
