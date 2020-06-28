<template>
  <div class="sortlist">
    <van-grid :column-num="2">
      <van-grid-item
        v-for="(item, index) in Movies"
        :key="index"
        @click="toDetail(item._id)"
      >
        <van-image class="coverImage" :src="item.coverImage" />
        <h1>{{ item.name | spliceStr(7) }}</h1>
        <h1>{{ item.tag | spliceStr(7) }}</h1>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script type="text/ecmascript-6">
import { Movies } from "../service/Movies"
export default {
    name: "SortList",
    props:["catName"],
    data() {
        return {
          Movies:[]
        }
    },
    filters: {
    spliceStr(str, n) {
      return str.length > n ? str.substr(0, n) + "..." : str;
    },
    },
    watch:{
      catName: {
      handler(newVal, oldVel) {
        if(newVal){
          Movies(20,1,"_id",newVal).then(res=>{
            this.Movies = res.data.list
          })
        }
      },
      deep: true
    }
    },
    components: {},
    methods: {
      toDetail(id) {
        this.$router.push({ name: "MovieDetail", query: { id } });
      },
    },
    created(){
      Movies(20,1,"_id",this.catName).then(res=>{
            this.Movies = res.data.list
          })
    }
}
</script>

<style scoped>
.coverImage {
  width: 237px;
  height: 320px;
}
.sortlist h1:nth-child(2) {
  padding-top: 20px;
  font-size: 28px;
}
.sortlist h1:nth-child(3) {
  font-size: 11px;
  padding-top: 20px;
  color: #707070;
}
</style>
