<template>
  <div>
    <NavHeader />
    <HeaderProduct />
    <div class="container">
      <div class="success">
        <div class="left">
          <div class="icon">
            <i class="iconfont icon-huaban24"></i>
          </div>
          <div class="text">
            <div class="text1">已成功支付！</div>
            <div class="text2">
              {{ phoneMsg }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="back" @click="backHome">
            <p>返回首页</p>
          </div>

          <div class="settlement" @click="goSettlement">
            <p>继续去购物车结算</p>
          </div>
        </div>
      </div>
      <div class="container2">
        <RecommendItems />
      </div>
    </div>
    <NavFooter />
  </div>
</template>

<script>
import NavHeader from "../components/NavHeader";
import HeaderProduct from "../../src/components/header/HeaderProduct.vue";
import NavFooter from "../components/NavFooter";
import RecommendItems from "../components/common/RecommendItems.vue";
export default {
  data() {
    return {
      phoneMsg: null,
      showid: 0,
    };
  },
  methods: {
    backHome() {
      this.$router.push("/index");
    },
    goSettlement() {
      this.$router.push("/cart");
      location.reload();
    },
  },
  components: {
    NavHeader,
    HeaderProduct,
    NavFooter,
    RecommendItems,
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    if (this.$route.params.phoneMsg) {
      this.phoneMsg = this.$route.params.phoneMsg;
      sessionStorage.setItem("phoneMsg", this.$route.params.phoneMsg);
      this.showid = this.$route.params.showid;
      sessionStorage.setItem("showid", this.showid);
    } else if (sessionStorage.getItem("phoneMsg")) {
      //没有传过来就去sessionStorage中找
      this.phoneMsg = sessionStorage.getItem("phoneMsg");
      this.showid = sessionStorage.getItem("showid");
    } else {
      //这说明没有加入过购物车就进入了这个页面
      this.$router.push("/404");
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 930px;
  padding-top: 38px;
  padding-bottom: 38px;
  background-color: #f5f5f5;

  .success {
    width: 1226px;
    height: 68px;
    padding-bottom: 28px;
    margin-bottom: 26px;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 1px solid #e0e0e0;
    position: relative;
    display: flex;
    justify-content: space-between;

    .left {
      width: 300px;
      height: 64px;
      position: relative;

      .icon {
        .iconfont {
          color: green;
          font-size: 64px;
        }
      }

      .text {
        width: 216px;
        height: 60px;
        position: absolute;
        left: 80px;
        top: 8px;
        .text1 {
          font-size: 24px;
          color: #424242;
          font-family: Helvetica;
          font-weight: 400;
        }
        .text2 {
          font-size: 14px;
          color: #757575;
          font-family: Helvetica;
        }
      }
    }

    .right {
      width: 392px;
      height: 45px;

      .back {
        cursor: pointer;
        float: left;
        width: 182px;
        height: 40px;
        border: 1px solid #b0b0b0;
        text-align: center;
        line-height: 40px;

        p {
          font-size: 14px;
          font-family: Helvetica;
          color: #757575;
        }

        &:hover {
          background-color: #fff;
          border: 1px solid #757575;
        }
      }

      .settlement {
        cursor: pointer;
        float: left;
        width: 182px;
        height: 40px;
        margin-left: 14px;
        background-color: #ff6700;
        text-align: center;
        line-height: 40px;

        p {
          color: #fff;
          font-family: Helvetica;
          font-size: 14px;
        }

        &:hover {
          background-color: #f25807;
        }
      }
    }
  }

  .container2 {
    width: 1226px;
    height: 900px;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 100px;
    position: relative;
  }
}
</style>
