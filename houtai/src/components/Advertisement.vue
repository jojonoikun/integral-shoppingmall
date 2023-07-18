<template>
  <div>
    <ul v-for="(ad, index) in adList1" :key="index">
      <li>
        <a href="javascript:;"><img :src="ad.src" /></a>
        <a href="javascript:;"
          ><p>图片:{{ ad.id }} &nbsp; 图片名称：{{ ad.name }}</p></a
        >
      </li>
    </ul>
    <div class="box">
      <div class="input">
        <el-select
          v-model="value"
          placeholder="请选择你要替换的广告图"
          @change="showid"
          style="width: 220px"
        >
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <input
          type="text"
          id="imgname"
          placeholder="请为图片命名"
          style="width: 120px"
          @onblur="hideBorder()"
        />
        <input
          id="src"
          type="text"
          placeholder="请输入图片的网络地址"
          style="width: 140px"
          @onblur="hideBorder()"
        />
        <button type="submit" @click="submitimg">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdvertisementMan",
  data() {
    return {
      adList1: [""],
      // td: "http://",
      options: [
        {
          value: 1,
          label: "图一",
        },
        {
          value: 2,
          label: "图二",
        },
        {
          value: 3,
          label: "图三",
        },
      ],
      value: "",
      imgmessage: { id: "", name: "", src: "" },
    };
  },
  methods: {
    //提交数据更新图片
    async submitimg() {
      const name = document.getElementById("imgname").value;
      const src = document.getElementById("src").value;

      // const src = btoa(url); // 编码为 Base64 字符串
      console.log("src-----", src); // 输出 "aHR0cHM6L"

      this.imgmessage.id = this.value;
      this.imgmessage.name = name;
      this.imgmessage.src = src;
      //
      alert("修改成功!");
      console.log("this.imgmessage-前--", this.imgmessage);
      try {
        const response = await axios.post(
          `http://localhost:3001/api/guanggao/${this.value}`,
          this.imgmessage
        );
        console.log("this.imgmessage-后--", this.imgmessage);
        if (response.status === 204) {
          // 发完数据之后重新设置为空
          this.editedLogistic = null;
          this.loadad();
          alert("修改成功!");
        }
      } catch (err) {
        console.error(err);
      }
    },

    loadad() {
      //获取3张广告图片
      this.axios({
        method: "get",
        // 前台商城写了就没必要后台后端再写一遍
        url: "http://localhost:6789/mimall/ad/adonhome",
      }).then((res) => {
        this.adList1 = res.data.msg;
      });
    },
    //
    showid() {
      // console.log(this.value);
    },
    // input失去焦点就隐藏边框
    hideBorder() {
      const input = document.getElementsByName("input");
      input[0].style.border = "none";
      input[1].style.border = "none";
    },
  },
  mounted() {
    this.loadad();
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
ul {
  display: inline-flex; /* 将ul嵌套在其他元素中时，可以避免占据整行 */
  list-style: none;
}
li {
  flex: 1 1 0; /* 等价于 flex-grow: 1; flex-shrink: 1; flex-basis: 0; */
  // background-color: #eee;
  padding: 10px;
  margin: 10px 30px;

  a {
    text-decoration: none;
    p {
      text-align: center;
      color: pink;
    }
    img {
      width: 316px;
      height: 170px;
      margin-left: 14.5px;
    }
  }
}
.box {
  position: relative;
  margin: 20px auto;
  width: 800px;
  height: 500px;
  // background-color: green;

  .input {
    position: absolute;
    left: 66px;
    top: 0;

    el-option {
      width: 200px;
      text-align: center;
      font-size: 16px;
      line-height: 16px;
    }

    input {
      width: 200px;
      text-align: center;
      margin: 0 10px;
    }
    button[type] {
      width: 120px;
      height: 20px;
      border: 1px solid #ccc;
    }
  }
}
</style>
