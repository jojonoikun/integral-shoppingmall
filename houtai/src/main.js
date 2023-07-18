import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import VueCookies from "vue-cookie";
// 引入ElementUI样式
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";

Vue.use(router);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.config.productionTip = false;
//原型上添加一个axios  ,使用的时候this.axios即可
Vue.prototype.axios = axios;
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
