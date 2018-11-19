<template>
    <section class="cat">
        <h3 class="cat-title">{{ category.title }}</h3>
        <ul class="cat-list">
            <li v-for="cat in category.catList" class="cat-item" :key="cat.name">
                <router-link :to="{ name: 'catlist', params: { major: cat.name}, query: { gender: category.gender} }">
                    <p class="cat-name">{{ cat.name }}</p>
                    <p class="cat-count">{{ cat.bookCount }}本</p>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
  name: "cat",
  props: {
    category: Object
  },
  data() {
    return {};
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.cat {
  position: relative;
  background: #fff;
  .cat-title {
    padding: 0 20px;
    height: 120px;
    line-height: 120px;
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
    padding: 20px 0;
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
      line-height: 44px;
    }
    .cat-name {
      font-size: 32px;
      color: #333;
    }
    .cat-count {
      font-size: 24px;
      color: #ccc;
    }
  }
}
</style>
