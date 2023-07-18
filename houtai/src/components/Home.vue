<template>
  <el-container class="box">
    <el-header style="text-align: center">
      <span style="line-height: 60px; font-size: 21px; font-weight: 600">
        欢迎登录积分商城后台管理系统</span
      >
      <div class="user" style="float: right; line-height: 16px">
        你好！<span style="margin-right: 33px; margin-left: 22px">{{
          $store.state.username
        }}</span>
        <button style="margin: 13px 8px" @click="loginout()">退出系统</button>
      </div>
    </el-header>
    <el-container class="w">
      <el-aside>
        <el-row class="tac">
          <el-col>
            <el-menu router :default-openeds="['1']">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>功能选择</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/Goods">商品管理</el-menu-item>
                  <el-menu-item index="/Logistics">物流管理</el-menu-item>
                  <el-menu-item index="/Advertisement">广告管理</el-menu-item>
                  <el-menu-item index="/Orders">订单管理</el-menu-item>
                  <!-- <el-menu-item index="/Login">登录</el-menu-item> -->
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    loginout() {
      //退出时删除cookie
      // this.$cookie.delete("userId");
      // console.log("退出时删除的userId", this.$cookie.delete("userId"));
      console.log("删除前的userId", this.$store.state.userId);
      //退出时删除userid
      this.$store.commit("setUserId", null);
      console.log("退出时删除后的userId应该为空", this.$store.state.userId);
      //
      this.$router.push("/Login");
    },
  },
  created() {
    // console.log(
    //   "this.$store.state.username----userId----isLoggedIn--",
    //   this.$store.state.username,
    //   this.$store.state.userId,
    //   this.$store.state.isLoggedIn
    // );
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.box {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.el-header {
  height: 15%;
  background-color: #ccc;
}

.w {
  display: flex;
  flex-direction: row;
  height: 85%;
}

.el-aside {
  width: 15% !important;
  height: 100%;
  background-color: #eee;
}

.el-main {
  /* width: 85%; */
  height: 100%;
  background-color: #fff;
}
.el-icon-menu {
  text-align: center;
}
</style>
