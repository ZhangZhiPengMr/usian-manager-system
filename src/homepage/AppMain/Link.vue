<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item class="item">{{ gitTitle }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {
    console.log(this.$route.meta.title);
  },
  computed: {
    // 直接当做普通属性调用不加括号
    // 任何data中数据变化立即重新计算
    // 计算属性会缓存
    gitTitle() {
      return this.$route.meta?.title;
    },
  },
};
</script>
<style scoped lang="scss">
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.item {
  border-left: 3px solid rgb(44, 184, 63);
  padding-left: 10px;
}
</style>
