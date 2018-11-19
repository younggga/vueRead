<template>
    <div class="catbar">
        <div class="cat-filter">
            <ul class="cat-fliter-list" ref="typeList">
                <li v-for="type in typeList"
                    :class="['cat-filter-item', { active: type.value === selectedType }]"
                    :data-value="type.value"
                    :data-name="type.name"
                    @click="filterChange($event, 'type')">
                    {{ type.name }}
                </li>
            </ul>
        </div>
        <div class="cat-filter">
            <ul class="cat-fliter-list" ref="minorList">
                <li v-for="minor in minorList"
                    :class="['cat-filter-item', { active: minor === selectedMinor }]"
                    :data-value="minor"
                    @click="filterChange($event, 'minor')">
                    {{ minor }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "catbar",
  data() {
    return {
      typeList: [
        {
          value: "hot",
          name: "热门"
        },
        {
          value: "new",
          name: "新书"
        },
        {
          value: "reputation",
          name: "好评"
        },
        {
          value: "over",
          name: "完结"
        },
        {
          value: "monthly",
          name: "包月"
        }
      ],
      selectedType: "hot",
      selectedTypeName: "热门",
      isBrief: false,
      selectedMinor: "全部",
      $docElement: null,
      $body: null
    };
  },
  computed: {
    ...mapState(["minorList", "cattype", "catminor", "start"])
  },
  methods: {
    ...mapMutations(["changeSta", "reset"]),
    ...mapActions(["getcatlist"]),
    filterChange: function(e, type) {
      let that = this;
      let curTargetData = e.currentTarget.dataset;
      if (type === "type") {
        this.selectedType = curTargetData.value;
        this.selectedTypeName = curTargetData.name;
        this.changeSta({ type: "cattype", data: this.selectedType });
        this.reset(["bookList", "start"]);
        this.getcatlist({
          gender: this.$route.query["gender"],
          type: this.cattype,
          major: this.$route.params["major"],
          minor: this.catminor,
          start: this.start * 20,
          limit: this.limit
        });
      } else {
        this.selectedMinor = curTargetData.value;
        let data = this.selectedMinor;
        if (this.selectedMinor === "全部") {
          data = "";
        }
        this.changeSta({ type: "catminor", data: data });
        this.reset(["bookList", "start"]);
        this.getcatlist({
          gender: this.$route.query["gender"],
          type: this.cattype,
          major: this.$route.params["major"],
          minor: this.catminor,
          start: this.start * 20,
          limit: "20"
        });
      }
      this.$emit(
        "filter-change",
        this.selectedType,
        this.selectedMinor === "全部" ? "" : this.selectedMinor
      );
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.catbar {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  font-size: 28px;
  color: #666;
  background-color: #fff;
  z-index: 1;
  .cat-filter {
    position: relative;
    // height: 40px;
    border-bottom: 1px solid #e8e8e8;
    box-sizing: border-box;
  }
  .cat-fliter-list {
    position: relative;
    // overflow: hidden;
    height: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    text-align: left;
    .cat-filter-item {
      padding: 0 10px;
      display: inline-block;
      line-height: 80px;
      &.active {
        color: #ed424b;
      }
    }
  }

  .cat-brief {
    position: relative;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #e8e8e8;
    box-sizing: border-box;
    text-align: center;
    font-size: 24px;

    span {
      padding: 0 4px;

      .icon {
        width: 28px;
        height: 28px;
        margin-left: -6px;
        color: #aaa;
      }
    }
  }
}
</style>
