<template>
  <div>
    <Lint v-if="activeCrumbs"></Lint>
    <router-view></router-view>
  </div>
</template>

<script>
import Lint from "./Link.vue";
export default {
  name: "AppMain",
  components: {
    Lint,
  },
  computed: {
    activeCrumbs() {
      return !(this.$route.path === "/home");
    },
  },
};
</script>

<style scoped></style>
