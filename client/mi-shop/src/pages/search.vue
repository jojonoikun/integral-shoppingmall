<template>
  <div>
    <NavHeader />
    <HeaderProduct />
    <div class="container">
      <div class="box">
        <div
          style="
            position: relative;
            height: 42px;
            width: 100%;
            background-color: rgb(229, 216, 208);
            text-align: center;
            line-height: 42px;
            color: #fa571b;
          "
        >
          搜索商品
        </div>
        <dd
          class="col-xs-3"
          v-for="good in goods"
          :key="good.id"
          style="border-top: none; padding: 0 15px"
          @click="goDetails(good.id)"
        >
          <div class="li-img" style="position: relative">
            <img
              class="img-responsive"
              style="width: 110px; height: 110px"
              :src="good.src"
            />
          </div>
          <div
            style="
              white-space: normal;
              height: 50px;
              line-height: 50px;
              overflow: hidden;
            "
            class="img-named"
          >
            {{ good.name }}
          </div>
          <p class="img-des">
            <span>兑换价:{{ good.price }}</span
            >积分
          </p>
        </dd>
      </div>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="8"
          layout="total, prev, pager, next"
          :total="this.goods.length"
        >
        </el-pagination>
      </div>
      <!-- 推荐商品模块 -->
      <div class="container2">
        <RecommendItems />
      </div>
    </div>
    <!-- <NavFooter /> -->
  </div>
</template>

<script>
import axios from "axios";
import NavHeader from "../components/NavHeader";
import HeaderProduct from "../../src/components/header/HeaderProduct.vue";
import NavFooter from "../components/NavFooter";
import RecommendItems from "../components/common/RecommendItems.vue";
export default {
  data() {
    return {
      phoneMsg: null,
      showid: 0,
      goods: [],
      // 默认分页
      currentPage: 1,
      // keyword: "",
    };
  },
  methods: {
    // 不带参请求所有搜索商品
    async getCategory() {
      axios
        .get("http://localhost:3001/api/searchgoods")
        .then((response) => {
          this.goods = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 带参搜索商品
    async getCategorykey() {
      axios
        .get("http://localhost:3001/api/searchgoodskey", {
          params: {
            keyword: this.$route.query.keyword,
          },
        })
        .then((response) => {
          this.goods = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 点击去往详情页
    goDetails(id) {
      // 传给详情页
      this.$bus.$emit("my-event", id);
      console.log("sceach的id:", id);
      this.$router.push("/detail");
    },
  },
  components: {
    NavHeader,
    HeaderProduct,
    NavFooter,
    RecommendItems,
  },
  mounted() {
    // this.getCategory();
    // console.log(this.goods);
    // 检查路由中是否包含关键字参数
    if (this.$route.query.keyword) {
      // this.keyword = this.$route.query.keyword;
      console.log("-------", this.$route.query.keyword);
      this.getCategorykey();
    } else {
      this.getCategory();
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

  .box {
    width: 1226px;
    // height: 68px;
    padding-bottom: 28px;
    margin-bottom: 26px;
    margin-left: auto;
    margin-right: auto;
    border-bottom: 1px solid #e0e0e0;
    border: 1px solid #dfdfdf;

    position: relative;
    //
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .col-xs-3 {
      flex-basis: 20%;
      max-width: 20%;
      padding: 0 15px;
      margin: 10px 10px;
      text-align: center;
      border: 1px solid #dfdfdf !important;

      p {
        margin: 5px 0;

        span {
          color: #fa571b;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }

    .col-xs-3:hover {
      cursor: pointer;
    }
  }

  .block {
    position: relative;
    top: 0;
    left: 0;
    text-align: center;
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
