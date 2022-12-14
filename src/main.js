import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//引入ElementUI组件
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
//吧ElementUI挂载到Vue上
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
