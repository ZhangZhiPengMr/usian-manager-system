<template>
  <div class="home">
    <p>asdasd asdasd</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {};
  },
  methods: {},
  created() {
    axios({
      url: "/dev-api/",
      method: "GET",
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {},
};
</script>
