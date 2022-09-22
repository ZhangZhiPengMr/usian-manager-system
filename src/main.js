import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"
//引入全局样式
import "./style/reset.css"
import "./style/common.css"
//引入ElementUI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
//吧ElementUI挂载到Vue上
Vue.use(ElementUI);
Vue.prototype.$axios = axios
console.log("--" + process.env.VUE_APP_BASE_API);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
