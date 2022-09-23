<template>
  <div class="homePage">
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-container>
        <el-aside width="230px">
          <AppAside></AppAside>
        </el-aside>
        <el-main>
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppAside from "./AppAside";
import AppMain from "./AppMain";

export default {
  name: "homepage",
  components: {
    AppHeader,
    AppAside,
    AppMain,
  },
  watch:{
    $route:{
      handler(){
        let info=localStorage.getItem('user')
        if(info==null){
          this.$store.dispatch('user')
        }
      }
    }
  }
};
</script>
<style scoped lang="scss">
.homePage {
  height: 100%;
  width: 100%;
}

.el-header {
  background-color: #2d3a4b;
  color: #fff;
  height: 50px !important;
  line-height: 50px !important;
  padding: 0;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-main {
  background-color: #fff;
  color: #333;
}
</style>
