<!--
 * @Author: JOJOcode
 * @Date: 2022-11-09 17:55:53
 * @LastEditTime: 2022-11-17 17:09:57
 * @FilePath: \node-admin\src\views\EditArticle.vue
-->
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>物流号</th>
          <th>用户名</th>
          <th>收货地区</th>
          <th>收货具体地址</th>
          <th>电话</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(logistic, index) in logistics" :key="logistic.id">
          <td>{{ logistic.id }}</td>
          <td>{{ logistic.username }}</td>
          <td>
            <template v-if="logistic.show">
              <input type="text" v-model="logistic.region" placeholder="城市" />
            </template>
            <template v-else>
              {{ logistic.region }}
            </template>
          </td>
          <td>
            <template v-if="logistic.show">
              <input
                type="text"
                v-model="logistic.address"
                placeholder="详细地址"
              />
            </template>
            <template v-else>
              {{ logistic.address }}
            </template>
          </td>
          <!-- <td >{{ logistic.phone }}</td> -->
          <td>
            <template v-if="logistic.show">
              <input
                type="text"
                v-model="logistic.phone"
                pattern="^1\d{10}$"
                placeholder="电话"
              />
            </template>
            <template v-else>
              {{ logistic.phone }}
            </template>
          </td>
          <!-- 编辑按钮 -->
          <td>
            <button
              @click="editLogistic(logistic, index)"
              v-if="!logistic.show"
            >
              Edit
            </button>
            <button @click="saveLogistic(logistic, index)" v-if="logistic.show">
              Save
            </button>
            <button @click="deleteLogistic(logistic.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogisticsMan",
  data() {
    return {
      logistics: [],
      editedLogistic: [],
    };
  },
  mounted() {
    // 获取订单数据
    this.getLogistics();
  },
  methods: {
    // 获取订单数据
    async getLogistics() {
      axios
        .get("http://localhost:3001/api/logistics")
        .then((response) => {
          this.logistics = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 修改表单
    editLogistic(logistic, index) {
      this.editedLogistic = logistic;
      this.logistics[index].show = 1;
      // console.log("this.editedLogistic", this.editedLogistic);
      // console.log("index,show", index, logistic.show);
    },
    //提交数据更新
    async saveLogistic(logistic, index) {
      this.logistics[index].show = 0;
      // console.log("editedLogistic---", this.editedLogistic);
      try {
        const response = await axios.put(
          `http://localhost:3001/api/logistics/${this.editedLogistic.id}`,
          this.editedLogistic
        );
        if (response.status === 204) {
          // 发完数据之后重新设置为空
          this.editedLogistic = null;
          this.getLogistics();
          alert("修改成功!");
        }
      } catch (err) {
        console.error(err);
      }
    },
    // 删除该条数据
    async deleteLogistic(id) {
      console.log("删除该条数据的id:", id);
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/logistics/${id}`
        );
        if (response.status === 204) {
          alert("删除成功");
          this.getLogistics();
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}

table th {
  background-color: #f2f2f2;
  color: #333;
}
table {
  border-collapse: collapse;
  width: 100%;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
  color: #333;
}

/* 合并相同单元格 */
td:first-child:not(:last-child) {
  border-right-width: 0;
}

/* td:not(:first-child):not(:last-child) {
  border-left-width: 0;
} */

/* 编辑和删除按钮样式 */
button {
  margin: 0 8px;
  padding: 10px 10px;
  background-color: #eee;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #898484;
}

.center {
}
</style>
