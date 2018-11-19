<template>
    <div class="featured">
    <headbar></headbar>
        <div class="swiper-banner">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(slide,index) in swipers" :key="index" v-if="slide.type === 'c-bookdetail'">
                <router-link :to="{ name: 'book', params: { id: slide.link } }">
                    <img :src="slide.img" :alt="slide.title">
                </router-link>
            </swiper-slide>
        </swiper>
        </div>
        <div>暂无对应API以后开发</div>
    <footbar></footbar>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import axios from "axios";
import footbar from "../components/footer";
import headbar from "../components/header";
export default {
  name: "featured",
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: true
      },
      swipers: []
    };
  },
  components: {
    footbar,
    headbar
  },
  methods: {
    ...mapState([""]),
    ...mapActions([""]),
    ...mapMutations(["setHeader"])
  },
  created() {
    let that = this;
    this.setHeader({
      title: "精选",
      type: "featured"
    });
    axios
      .get("/api/recommendPage/node/spread/575f74f27a4a60dc78a435a3", {
        params: {
          pl: "ios"
        }
      })
      .then(res => {
        that.swipers = res.data.data;
      });
  }
};
</script>

<style scoped lang="scss">
.swiper-banner {
  padding-top: 80px;
  width: 100%;
  height: 240px;

  .swiper-container {
    height: 100%;
    width: 100%;
    z-index: 99;
  }

  img {
    height: 100%;
    width: 100%;
  }
}
</style>
