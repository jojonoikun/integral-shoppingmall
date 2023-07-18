<template>
  <div>
    <NavHeader />
    <HeaderProduct />
    <div class="container">
      <div class="box">
        <!-- 详情页 -->
        <div class="left">
          <div class="img">
            <img :src="this.good.src" />
          </div>
        </div>
        <div class="right">
          <div class="goodname">
            <p>{{ good.name }}</p>
          </div>
          <div class="price">
            <span
              >兑换价:
              <span style="color: #ff6100"> {{ good.price }}积分 </span></span
            >
          </div>
          <hr style="border: 1px solid #cacaca; background: #cacaca" />
          <div class="row1">
            <div class="fuwu">
              服 &nbsp; &nbsp; &nbsp;&nbsp;务：&nbsp;由中国石油电子充值卡
              提供服务
            </div>
          </div>
          <div class="row2">
            <div class="mianzhi">
              商品面值：
              <span style="color: #ff6100; border: 1px solid #ff6100">
                {{ good.price }}元
              </span>
            </div>
          </div>

          <div class="row3">
            <p class="shu">数&nbsp; &nbsp; &nbsp; &nbsp;量：</p>
            <button onclick="subNum();" id="subNum" class="numbut">-</button>
            <input
              class="shuru"
              value="1"
              readonly="readonly"
              oninput="checkAmount(this);"
              onchange="checkAmount(this);"
            />
            <button onclick="addNum();" id="addNum" class="numbut">+</button>

            <div class="message"><p style="margin-left: 24px">有货</p></div>
          </div>

          <div class="row4">
            <div class="span">
              <span style="color: #c4241b">
                温馨提示：包含积分参与兑换的充值卡不允许退货。</span
              >
            </div>
          </div>

          <div class="row5" id="checkOutBox" style="cursor: pointer">
            <div id="addCart" onclick="addToCart()" class="redbtn">
              <i
                class="el-icon-shopping-cart-2"
                style="width: 20px; margin-top: 0.1rem"
                disabled=""
              ></i
              >加入购物车
            </div>
            <div class="whiteset" onclick="createOrder() ">立即兑换</div>
          </div>
        </div>
      </div>

      <!-- 推荐商品模块 -->
      <div class="container2">
        <RecommendItems />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavHeader from "../components/NavHeader";
import HeaderProduct from "../../src/components/header/HeaderProduct.vue";
import RecommendItems from "../components/common/RecommendItems.vue";
export default {
  data() {
    return {
      phoneMsg: null,
      showid: 0,
      good: {},
    };
  },
  methods: {
    async getCategory(id) {
      console.log("getCategory收到的id:", id);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/searchgoods/${id}`
        );
        // this.$nextTick(() => {
        this.good = response.data;
        console.log("getCategory收到的data:", this.good);
        // });
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    good: {
      handler(newVal) {
        this.$nextTick(() => {
          console.log("更新视图", newVal);
        });
      },
      deep: true, // 设置深度监听
      immediate: true, // 在初始化时立即触发
    },
  },
  components: {
    NavHeader,
    HeaderProduct,
    RecommendItems,
  },
  mounted() {
    // this.$bus.$on("my-event", async (id) => {
    //   console.log("detail详情页收到的id:", id);
    //   await this.getCategory(id); // 等待异步操作完成
    //   console.log("mounted的good:", this.good);
    // });
    this.getCategory(6); // 等待异步操作完成
  },
  beforeDestroy() {
    this.$bus.$off("my-event", this.onMyEvent); // 取消事件监听
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 930px;
  padding-top: 38px;
  padding-bottom: 38px;
  //   background-color: #f5f5f5;

  .box {
    width: 1226px;
    // height: 68px;
    background-color: rgb(255, 255, 255);
    padding-bottom: 28px;
    margin-bottom: 26px;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 1px solid #e0e0e0;
    // border: 1px solid #dfdfdf;

    position: relative;
    //
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .left {
      float: left;
      width: 420px;
      height: 475px;
      margin-right: 20px;
      padding: 0;
      text-align: center;
      //   background-color: pink;

      .img {
        width: 380px;
        height: 380px;
        margin: 0 auto;
        border: 1px solid #dfdfdf;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right {
      float: right;
      width: 765px;
      height: 475px;
      margin-top: 12px;
      //   background-color: green;

      .goodname p {
        font-size: 21px;
        font-weight: 600;
      }
      .price {
        font-size: 17px;
        margin: 22px 0;
      }

      hr {
        border: 1px solid #cacaca;
        background: #cacaca;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .row1 {
        .fuwu {
          font-size: 16px;
          line-height: 16px;
          margin-bottom: 28px;
        }
      }

      .row2 {
        .mianzhi {
          margin-bottom: 24px;
        }
      }
      .row3 {
        p,
        .numbut,
        .shuru {
          float: left;
        }
        p {
          line-height: 28px;
          margin-right: 12px;
        }

        .shuru {
          width: 74px;
          height: 32px;
          line-height: 28px;
          //
          display: block;
          float: left;
          background: #fff;
          text-align: center;
          padding: 0;
          margin: 0;
          text-align: center;
          border: 1px solid #dfdfdf;
        }
        .numbut {
          float: left;
          background: #efefef;
          height: 34px;
          line-height: 28px;
          width: 34px;
          border: 1px solid #e6e6e6;
          text-align: center;
          cursor: pointer;
        }
      }

      .row4 {
        position: relative;
        .span {
          position: absolute;
          left: 0;
          top: 60px;
          margin: 8px 0;
        }
      }
      .row5 {
        position: relative;
        #addCart {
          position: absolute;
          left: 10px;
          top: 130px;
          margin: 8px 0;
          height: 43px;
          font-size: 20px;
          background: #c4241b;
          color: #fff;
          width: 160px;
          padding-left: 10px;
          text-align: center;
          margin-left: 8px !important;
          line-height: 43px;
          height: 43px;
          font-size: 20px;
          box-sizing: border-box;

          i {
            margin-right: 6px;
          }
        }

        .whiteset {
          position: absolute;
          left: 212px;
          top: 130px;
          margin: 8px 0;
          width: 160px;
          background: #fff !important;
          color: #000;
          border: 1px solid #e6e6e6;
          text-align: center;
          line-height: 43px;
          height: 43px;
          font-size: 20px;
          margin-left: 8px !important;
          box-sizing: border-box;
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
