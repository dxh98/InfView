<template>
  <div class="movies">
    <TopBar />
    <div class="sortmovies">
      <div class="leftnavigation">
        <div class="categorylist">
          <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item v-for="item in categoryList" :key="item.index" :title="item" />
          </van-sidebar>
        </div>
      </div>
      <div class="rightlist">
        <!-- <div class="test"></div> -->
        <SortList :catName="catName" />
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import SortList from "../components/SortList";

export default {
  name: "Sort",
  data() {
    return {
      categoryList: [
        "动画",
        "独播",
        "魔幻",
        "纯爱",
        "经典",
        "院线",
        "杜比音效",
        "动作",
        "惊悚",
        "4K",
        "香港地区"
      ],
      activeKey: 0,
      catName: "动画"
    };
  },
  components: {
    TopBar,
    SortList
  },
  methods: {
    onChange(index) {
      this.catName = this.categoryList[index];
    }
  }
};
</script>
<style scoped>
.movies {
  overflow: hidden;
}
.sortmovies {
  display: flex;
}
.leftnavigation {
  /* width: 20%; */
  height: 1120px;
  overflow-y: auto;
}
.categorylist {
  width: 100%;
  height: 2000px;
}
.leftnavigation::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.rightlist {
  flex: 1;
}
</style>
