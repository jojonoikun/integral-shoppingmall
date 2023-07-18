import Vue from "vue";
import Router from "vue-router";
import Advertisement from "../components/Advertisement";
import Logistics from "../components//Logistics";
import Goods from "../components/Goods";
import Orders from "../components/Orders";
import Login from "../components/Login";
import Home from "../components/Home";
import store from "../store";
// 在vue router的导航守卫如beforeEach()中是无法直接通过this.$store去操作vuex,解决方式是在router的index.js中引入初始化好的store

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/Login",
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true, // 添加需要登录访问的标记
      },
      children: [
        {
          path: "/Goods",
          name: "Goods",
          component: Goods,
        },
        {
          path: "/Logistics",
          name: "Logistics",
          component: Logistics,
        },
        {
          path: "/Advertisement",
          name: "Advertisement",
          component: Advertisement,
        },
        {
          path: "/Orders",
          name: "Orders",
          component: Orders,
        },
      ],
    },
  ],
});

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置定时器是因为登陆时跳转回数据userId可能还未改变
  setTimeout(() => {
    const isLogin = store.state.userId; // 检查用户是否已登录
    // console.log("检查一下router的store.state", store.state);
    console.log("登陆前的store.state.userId----", store.state.userId);
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // 检查目标路由是否需要登录访问
      if (!isLogin) {
        // 如果用户未登录，则提示权限不足
        alert("权限不足，请先登录");
        next({
          path: "/Login", //是否与home冲突
          query: {
            redirect: to.fullPath, // 记录用户原本要访问的路径
          },
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }, 600);
});

export default router;
