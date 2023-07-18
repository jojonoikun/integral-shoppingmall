<template>
  <div>
    <div class="site-header">
      <div class="container">
        <div class="header-logo">
          <a href="/" class="milogo"
            ><img src="http://www.jf.95504.net/upload/webresource/webLogo.png"
          /></a>
        </div>
        <div class="header-navi">
          <ul class="nav-list">
            <TopAds category="Xiaomi手机" />
            <TopAds category="Redmi 红米" />
            <TopAds category="电视" />
            <TopAds category="笔记本" />
            <TopAds category="平板" />
            <TopAds category="加油充值卡" />
            <TopAds category="路由器" />
          </ul>
        </div>
        <div class="header-search">
          <form action="" class="search-form clearfix">
            <input
              @focus="changeSearch"
              @blur="disChangeSearch"
              id="input"
              type="text"
              v-model="keyword"
              placeholder="中国石油20元电子充值加油卡"
            />
            <div class="search" id="search" @click="clicksearch">
              <i class="iconfont icon-chaxun"></i>
            </div>
          </form>
          <div class="searchRecommend" id="searchRecommend">
            <div class="recommendedItem">全部商品</div>
            <div class="recommendedItem">电子充值加油卡</div>
            <div class="recommendedItem">螺丝刀</div>
            <div class="recommendedItem">汽车用品</div>
            <div class="recommendedItem">休闲零食</div>
            <div class="recommendedItem">排插</div>
            <div class="recommendedItem">净水器</div>
            <div class="recommendedItem">小米手机</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopAds from "./TopAds";
export default {
  data() {
    return {
      //搜索的关键字
      keyword: "",
    };
  },
  components: {
    TopAds,
  },
  methods: {
    changeSearch() {
      let search = document.getElementById("search");
      search.style.borderColor = "red";
      let searchRecommend = document.getElementById("searchRecommend");
      searchRecommend.style.display = "block";
    },
    disChangeSearch() {
      let search = document.getElementById("search");
      search.style.borderColor = "#d7d7d7";
      let searchRecommend = document.getElementById("searchRecommend");
      searchRecommend.style.display = "none";
    },
    // clicksearch() {
    // this.$router.push("/search");
    // },

    // 判断是否带参跳转
    async clicksearch() {
      if (this.keyword === "") {
        console.log(this.keyword);
        // 如果 keyword 为空，则直接跳转路由
        this.$router.push("/search");
        return;
      }
      // 跳转到搜索结果页，并将关键字作为参数传递给组件
      else console.log(this.keyword);

      this.$router.replace({
        name: "search",
        query: { keyword: this.keyword },
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
* {
  font-size: 12px;
}
.site-header {
  z-index: 20;
  height: 100px;
  position: relative;

  .container {
    width: 1226px;
    margin-right: auto;
    margin-left: auto;
    height: 40px;

    .header-logo {
      float: left;
      width: 62px;
      margin-top: 0px;
      margin-left: -6px;

      .milogo {
        background-color: rgba(0, 0, 0, 0);
        color: #757575;
        text-decoration: none;
        text-align: left;
        position: relative;
        display: block;
        width: 242px;
        height: 100px;
        overflow: hidden;

        img {
          // width: 48px;
          // height: 48px;
        }
      }
    }

    .header-navi {
      float: left;
      margin-left: 140px;
      width: 650px;

      .nav-list {
        z-index: 10;
        float: left;
        width: 1100px;
        height: 88px;
        // margin-left: 88px;
        margin-left: 125px;
        padding: 12px 0 0 30px;
        list-style-type: none;
        font-size: 16px;

        .nav-category {
          position: relative;
          float: left;
          width: 127px;
          padding-right: 15px;
        }
      }
    }
    .header-search {
      float: right;
      width: 296px;
      margin-top: 25px;
      position: relative;

      &:hover {
        .search-form {
          .search {
            border-right: 1px solid #808080;
            border-top: 1px solid #808080;
            border-bottom: 1px solid #808080;
          }
        }
      }

      .search-form {
        position: relative;
        width: 296px;
        height: 50px;
        display: flex;
        align-items: center;

        .search {
          width: 51px;
          height: 100%;
          position: relative;
          border-right: 1px solid #d7d7d7;
          border-top: 1px solid #d7d7d7;
          border-bottom: 1px solid #d7d7d7;
          i {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 18px;
          }

          &:hover {
            background-color: #ff6700;
            cursor: pointer;

            i {
              color: #fff;
            }
          }
        }

        input {
          border: none;
          box-sizing: border-box;
          border: 1px solid #e0e0e0;
          width: 245px;
          height: 52px;
          padding-left: 14px;
          font-size: 16px;
          outline: none;
        }
        &:hover {
          input {
            border: 1px solid #808080;
          }
        }
        input:focus {
          border: 1px #ff6700 solid;
          &.search {
            border-right: 1px solid red;
            border-top: 1px solid #d7d7d7;
            border-bottom: 1px solid #d7d7d7;
          }
        }
      }

      .searchRecommend {
        position: absolute;

        display: none;
        width: 242px;
        height: 236px;
        border: 1px solid #ff6700;
        background-color: #fff;

        .recommendedItem {
          width: 243px;
          height: 29.6px;
          font-size: 12px;
          color: #333;
          font-family: Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
            Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
          position: relative;
          left: 15px;
          top: 7px;
        }
      }
    }
  }
}

a {
  text-decoration: none;
}
</style>
