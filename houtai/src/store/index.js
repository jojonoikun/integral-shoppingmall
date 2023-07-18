import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const actions = {
  setUserId(context, userId) {
    context.commit("setUserId", userId);
  },
  setIsLoggedIn(context, isLoggedIn) {
    context.commit("setIsLoggedIn", isLoggedIn);
  },
  setName(context, username) {
    context.commit("setName", username);
  },
};

const mutations = {
  setUserId(state, userId) {
    state.userId = userId;
  },
  setIsLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  setName(state, username) {
    state.username = username;
  },
};

const state = {
  // 设置登录默认值
  userId: null, // 用户ID
  isLoggedIn: false, // 是否登录
  username: "", // 用户名
};

const getters = {};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
