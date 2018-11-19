<template>
    <section class="tabbar">
        <router-link :to="{ name: 'shelf' }" class="tab-item" exact>
            <div class="tab-item-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shelf"></use>
                </svg>
            </div>
            <p class="tab-item-label">书架</p>
        </router-link>
        <router-link :to="{ name: 'featured' }" class="tab-item" exact>
            <div class="tab-item-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jingxuan"></use>
                </svg>
            </div>
            <p class="tab-item-label">精选</p>
        </router-link>
        <router-link :to="{ name: 'category' }" class="tab-item" exact>
            <div class="tab-item-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenlei"></use>
                </svg>
            </div>
            <p class="tab-item-label">分类</p>
        </router-link>
        <router-link :to="{ name: 'rank' }" class="tab-item" exact>
            <div class="tab-item-icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-paihang"></use>
                </svg>
            </div>
            <p class="tab-item-label">排行</p>
        </router-link>
    </section>
</template>

<script>
export default {
  name: "footbar"
};
</script>

<style scoped lang="scss">
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  height: 120px;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  .tab-item {
    display: block;
    flex: 1;
    padding: 20px 0;
    color: #000000;

    &.router-link-exact-active {
      color: #31759C;
      fill: #31759C;
    }
  }

  .tab-item-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 4px;

    .icon {
      color: white;
      width: 48px;
      height: 48px;
    }
  }
  .tab-item-label {
    text-align: center;
    font-size: 30px;
  }
}
</style>
