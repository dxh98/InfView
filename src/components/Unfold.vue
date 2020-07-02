<template>
  <span>
    <span v-if="data.length < maxLen">
      <span class="tj">{{ data }}</span>
    </span>
    <span v-else>
      <span class="tj"
        >{{ showBtn ? sliceStr : data }}
        <span class="btnWord" @click="showBtn = !showBtn">{{
          showBtn ? "全文" : "收起"
        }}</span>
      </span>
    </span>
  </span>
</template>

<script type="text/ecmascript-6">
export default {
    name: "",
    data() {
        return {
          showBtn:true
        }
    },
     props: {
        // 数据
        data: {
            type: String,
            default: ''
        },
        // 最大长度
        maxLen: {
            type: Number,
            default: 80
        },
    },
    components: {},
    methods: {},
    computed: {
        sliceStr() {
            if (this.data != null) {
                return this.data.substring(0, this.maxLen) + "...";
            }
            return '';
        }
    },
}
</script>

<style scoped>
.tj {
  text-align: justify;
}

.btnWord {
  color: cornflowerblue;
  cursor: pointer;
  word-break: keep-all;
}
</style>
