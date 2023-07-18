<!--
 * @Author: JOJOcode
 * @Date: 2022-11-09 17:55:53
 * @LastEditTime: 2022-11-17 17:12:09
 * @FilePath: \node-admin\src\views\CreateArticle.vue
-->
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>商品号</th>
          <th>商品名称</th>
          <th>商品图片地址</th>
          <th>商品价格</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(good, index) in goods" :key="good.id">
          <td>{{ good.id }}</td>
          <!-- 商品名称 -->
          <td>
            <template v-if="good.show">
              <input
                type="text"
                v-model="good.name"
                placeholder="商品名称"
                required
              />
            </template>
            <template v-else>
              {{ good.name }}
            </template>
          </td>
          <!-- 商品图片地址 -->
          <td>
            <template v-if="good.show">
              <input type="text" v-model="good.src" placeholder="商品图片地址"
              required pattern = /^[a-zA-Z]+$/; />
            </template>
            <template v-else>
              {{ good.src }}
            </template>
          </td>
          <!-- 商品价格 -->
          <td>
            <template v-if="good.show">
              <input type="text" v-model.number="good.price"
              placeholder="商品价格" required pattern = /^[a-zA-Z]+$/; />
            </template>
            <template v-else>
              {{ good.price }}
            </template>
          </td>
          <!-- 按钮 -->
          <td>
            <button @click="editgood(good, index)" v-if="!good.show">
              Edit
            </button>
            <button @click="savegood(good, index)" v-if="good.show">
              Save
            </button>
            <button @click="addgood(index)" v-if="!good.show">Add</button>
            <button @click="deletegood(good.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GoodsMan",
  data() {
    return {
      goods: [],
      editedgoods: [],
      goods1: [],
    };
  },
  mounted() {
    // 获取商品数据
    this.getGoods();
  },
  methods: {
    async getGoods() {
      axios
        .get("http://localhost:3001/api/goods")
        .then((response) => {
          this.goods = response.data;
          this.goods1 = JSON.parse(JSON.stringify(this.goods));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //修改商品
    editgood(good, index) {
      // this.goods1 = JSON.parse(JSON.stringify(this.goods));
      this.editedgoods = good;
      this.goods[index].show = 1;
    },
    // 提交修改后的商品
    async savegood(good, index) {
      this.goods[index].show = 0;

      if (this.goods.length > this.goods1.length) {
        console.log("修改了商品数据");
        try {
          const response = await axios.put(
            `http://localhost:3001/api/newgood/${good.id}`,
            good
          );
          console.log("put的id", good.id);
          if (response.status === 204) {
            // 发完数据之后重新设置为空
            this.editedgoods = null;
            this.getGoods();
            alert("添加成功!");
          }
        } catch (err) {
          console.error(err);
        }
      }
      // 判断是否修改了数据
      if (
        this.goods.length <= this.goods1.length &&
        this.goods[index].id !== this.goods1.id &&
        this.goods[index].id &&
        this.goods[index].name !== this.goods1.name &&
        this.goods[index].name &&
        this.goods[index].src !== this.goods1.src &&
        this.goods[index].src &&
        this.goods[index].price !== this.goods1.price &&
        this.goods[index].price &&
        JSON.stringify(this.goods) !== JSON.stringify(this.goods1)
      ) {
        console.log("修改了商品数据");
        try {
          const response = await axios.post(
            `http://localhost:3001/api/good/${good.id}`,
            good
          );
          console.log("发送的good", good);
          if (response.status === 204) {
            // 发完数据之后重新设置为空
            this.editedgoods = null;
            this.getGoods();
            alert("修改成功!");
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (!this.goods[index].price) {
        this.goods[index].price = this.goods1[index].price;
        console.log("价格为空或0就重置", this.goods[index].price);
        alert("价格不能为空");
      }
      if (!this.goods[index].src) {
        this.goods[index].src = this.goods1[index].src;
        console.log("地址为空或0就重置", this.goods[index].src);
        alert("地址不能为空");
      }
    },
    // 添加商品
    async addgood(index) {
      // 创建一个新的商品实例对象
      const newGood = {
        id: this.goods.length + 1,
        name: "",
        price: null,
        show: true,
      };
      // 将新的商品实例对象添加到goods数组中的指定位置
      this.goods.splice(index + 1, 0, newGood);
    },
    // 删除商品
    async deletegood(id) {
      console.log("删除该条数据的id:", id);
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/good/${id}`
        );
        if (response.status === 204) {
          alert("删除成功");
          this.getGoods();
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style></style>
