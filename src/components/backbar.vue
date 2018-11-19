<template>
    <section class="backbar">
        <span class="back" @click="$router.go(-1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-back"></use>
            </svg>
        </span>
        <h2>{{ backtitle }}</h2>
    </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "backbar",
  computed: {
    ...mapState(["backtitle"])
  }
};
</script>

<style lang="scss" scoped>
.backbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  overflow: hidden; // width: 100%;
  color: #fff;
  background-color: #31759c;
  z-index: 1;

  .back {
    position: absolute;
    top: 16px;
    left: 10px;
    text-align: center;
    .icon {
      fill: #fff;
      width: 48px;
      height: 48px;
    }
  }

  h2 {
    width: 70%;
    margin: 0 auto;
    font-size: 40px;
    font-weight: 500;
    line-height: 80px;
    text-align: center;
  }
}
</style>
