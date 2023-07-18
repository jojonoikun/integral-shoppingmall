<template>
  <div id="app">
    <router-view :to="$route"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    to() {
      return this.$route;
    },
  },
  mounted() {
    // 检查是否有 userId 的 cookie，如果有，则设置用户id到 Vuex 中
    if (this.$cookie.get("userId")) {
      this.$store.commit("setUserId", this.$cookie.get("userId"));
      this.$store.commit("setIsLoggedIn", true);
    }
  },
  methods: {},
};
</script>

<style>
@import url(../public/MyFont/iconfont.css);
@import url(../public/MyFontColor/iconfont.css);
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}

img {
  vertical-align: top;
  border: none;
}
</style>
