<template>
  <div class="about">
    <h1>欢迎访问梦学谷管理系统</h1>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    axios({
      url: process.env.VUE_APP_BASE_API,
      method: "GET",
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 30px;
}
</style>
