<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>订单号</th>
          <th>用户名</th>
          <th>商品名称</th>
          <th>商品数量</th>
          <th>商品参数</th>
          <th>商品单价</th>
          <th>总价</th>
          <th>下单时间</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>{{ order.orderid }}</td>
          <td>{{ order.receivername }}</td>
          <td>{{ order.itemname }}</td>
          <!-- 商品数量 -->
          <td>
            <template v-if="order.show">
              <input type="text" v-model.number="order.amount"
              placeholder="商品数量" required pattern = /^[a-zA-Z]+$/; />
            </template>
            <template v-else>
              {{ order.amount }}
            </template>
          </td>
          <!-- 商品参数（颜色） -->
          <td>
            <template v-if="order.show">
              <input type="text" v-model="order.color" placeholder="商品参数"
              required pattern = /^[a-zA-Z]+$/; />
            </template>
            <template v-else>
              {{ order.color }}
            </template>
          </td>
          <td>{{ order.price }}</td>
          <td>{{ order.amount * order.price }}</td>
          <td>{{ order.time }}</td>
          <!-- 按钮 -->
          <td>
            <button @click="editOrder(order, index)" v-if="!order.show">
              Edit
            </button>
            <button @click="saveOrder(order, index)" v-if="order.show">
              Save
            </button>
            <button @click="deleteOrder(order.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrdersMan",
  data() {
    return {
      orders: [],
      editedorders: [],
      orders1: [],
    };
  },
  mounted() {
    // 获取订单数据
    this.getOrders();
  },
  methods: {
    async getOrders() {
      axios
        .get("http://localhost:3001/api/orders")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //修改订单
    editOrder(order, index) {
      this.orders1 = JSON.parse(JSON.stringify(this.orders));
      this.editedorders = order;
      this.orders[index].show = 1;
    },
    // 提交修改后的订单
    async saveOrder(order, index) {
      this.orders[index].show = 0;
      // 判断是否修改了数据
      if (
        this.orders[index].amount !== this.orders1.amount &&
        this.orders[index].amount &&
        this.orders[index].color !== this.orders1.color &&
        this.orders[index].color &&
        JSON.stringify(this.orders) !== JSON.stringify(this.orders1)
      ) {
        // 自动生成当前系统的下单时间
        const moment = require("moment");
        const orderTime = moment().format("YYYY-MM-DD HH:mm:ss");
        // const now = new Date();
        // const orderTime = now.toISOString().slice(0, 19).replace("T", " ");
        this.orders[index].time = orderTime;
        // console.log("editedorders---", this.editedorders);
        console.log("修改了订单数据");
        try {
          const response = await axios.put(
            `http://localhost:3001/api/order/${this.editedorders.id}`,
            this.editedorders
          );
          if (response.status === 204) {
            // 发完数据之后重新设置为空
            this.editedorders = null;
            this.getOrders();
            alert("修改成功!");
          }
        } catch (err) {
          console.error(err);
        }
      }
      if (!this.orders[index].amount) {
        this.orders[index].amount = this.orders1[index].amount;
        console.log("数量为空或0就重置", this.orders[index].amount);
        alert("数量不能为空");
      }
      if (!this.orders[index].color) {
        this.orders[index].color = this.orders1[index].color;
        console.log("参数为空或0就重置", this.orders[index].color);
        alert("参数不能为空");
      }
    },
    // 删除订单
    async deleteOrder(id) {
      console.log("删除该条数据的id:", id);
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/order/${id}`
        );
        if (response.status === 204) {
          alert("删除成功");
          this.getOrders();
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
.table {
  border-collapse: collapse;
  width: 100%;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
  color: #333;
}
</style>
