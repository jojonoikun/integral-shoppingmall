/*
 * @Author: JOJOcode
 * @Date: 2022-11-09 20:12:34
 * @LastEditTime: 2022-11-12 10:27:16
 * @FilePath: \node-admin\server\index.js
 */

const express = require("express");
// 定义一个模型
const mysql = require("mysql");
const app = express();
// 设置cookie
const cookieParser = require("cookie-parser");

// 允许跨域  让前后端不同端口允许访问
app.use(require("cors")());
//让express识别前端提交过来的数据
app.use(express.json());
app.use(cookieParser());

// 创建MySQL连接池
const pool = mysql.createPool({
  connectionLimit: 10, //可能对前台项目影响
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mimall",
});

// 设置允许跨域请求
app.use((req, res, next) => {
  // 设置允许访问的来源
  res.setHeader("Access-Control-Allow-Origin", "*");

  // 设置允许的请求方法和请求头
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // 允许发送cookie
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// 登录
app.post("/api/login", (req, res) => {
  const { username, userpwd } = req.query;

  pool.query(
    "SELECT * FROM admin WHERE username=? AND pwd=?",
    [username, userpwd],
    (error, results) => {
      if (error) {
        throw error;
      }
      // 如果查询结果为空，则返回错误信息
      if (results.length === 0) {
        return res.status(401).send("登录失败");
      } else {
        // 设置 cookie，保存登录状态 { httpOnly: true } 是设置 cookie 的可选参数之一，它的作用是让 cookie 无法通过 JavaScript 访问（只能在 HTTP 请求中使用）。这样做可以增加 cookie 的安全性，防止了跨站脚本攻击。
        res.cookie("userId", results, { maxAge: 900000, httpOnly: true });
        // 否则，返回成功登录的信息和响应体results
        res.send({ results, success: "登录成功" });
      }
    }
  );
});

// // 验证用户登录状态的中间件
// function authMiddleware(req, res, next) {
//   const userId = req.cookies.userId; // 假设使用 cookie 来保存用户登录状态

//   if (!userId) {
//     // 如果没有登录，则返回未经授权的错误信息
//     return res.status(401).json({ message: "未经授权无权访问s" });
//   }
//   // 检查用户登录状态是否有效，例如：是否存在该用户，是否登录状态过期等
//   // 如果登录状态有效，则允许继续访问下一个中间件或路由处理函数
//   next();
// }

// // 需要验证登录状态的路由
// app.get("/api/protected", authMiddleware, (req, res) => {
//   res.json({ message: "Authorized request" });
// });

// 查询所有订单
app.get("/api/orders", (req, res) => {
  pool.query("SELECT * FROM userorder", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});
// 更新订单信息
app.put("/api/order/:id", (req, res) => {
  const { id } = req.params;
  const { amount, color, time } = req.body;

  pool.query(
    "UPDATE userorder SET amount = ?,color = ?, time = ? WHERE id = ?",
    [amount, color, time, id],
    (error, results) => {
      if (error) throw error;
      res.sendStatus(204);
    }
  );
});

// 查询所有物流
app.get("/api/logistics", (req, res) => {
  pool.query("SELECT * FROM useraddress ", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// 更新物流信息
app.put("/api/logistics/:id", (req, res) => {
  const { id } = req.params;
  const { username, userid, region, address, phone } = req.body;
  console.log(req.body);
  pool.query(
    "UPDATE useraddress SET username = ?, userid = ?, region = ?, address = ?, phone = ? WHERE id = ?",
    [username, userid, region, address, phone, id],
    (error, results) => {
      if (error) throw error;
      res.sendStatus(204);
    }
  );
});

// 删除物流数据
app.delete("/api/logistics/:id", async (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM useraddress WHERE id = ?", [id], (error, results) => {
    if (error) throw error;
    res.sendStatus(204);
  });
});

// 查询所有商品
app.get("/api/goods", (req, res) => {
  pool.query("SELECT * FROM searchgoods ", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// 按orderid订单号查询我的订单---------- "SELECT * FROM userorder "
app.get("/api/dingdan/:orderid", async (req, res) => {
  const { orderid } = req.params;
  pool.query(
    "SELECT * FROM userorder WHERE orderid = ?",
    [orderid],
    (error, results) => {
      if (error) throw error;
      console.log(orderid);
      res.send(results);
    }
  );
});

// 按userid订单号查询用户所有订单---------- "SELECT * FROM userorder "
app.get("/api/dingdanall/:userid", async (req, res) => {
  const { userid } = req.params;
  pool.query(
    "SELECT * FROM userorder WHERE userid = ?",
    [userid],
    (error, results) => {
      if (error) throw error;
      console.log(userid);
      res.send(results);
    }
  );
});

// 删除订单数据
app.delete("/api/order/:id", async (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM userorder WHERE id = ?", [id], (error, results) => {
    if (error) throw error;
    res.sendStatus(204);
  });
});

// 修改商品
app.post("/api/good/:id", (req, res) => {
  const { id } = req.params;
  const { name, src, price } = req.body;

  pool.query(
    "UPDATE searchgoods SET name = ?,src = ?, price = ? WHERE id = ?",
    [name, src, price, id],
    (error, results) => {
      if (error) throw error;
      res.sendStatus(204);
    }
  );
});

// 添加商品
app.put("/api/newgood/:id", (req, res) => {
  const { id } = req.params;
  const { name, src, price } = req.body;
  console.log("添加的id", id);
  pool.query(
    "INSERT INTO searchgoods (`show`, name, src, price,id) VALUES (?,?, ?, ? ,?)",
    [0, name, src, price, id],
    (error, results) => {
      if (error) throw error;
      res.sendStatus(204);
    }
  );
});

// 删除商品
app.delete("/api/good/:id", async (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM searchgoods WHERE id = ?", [id], (error, results) => {
    if (error) throw error;
    res.sendStatus(204);
  });
});

// 更新广告图
// app.put("/api/guanggao/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, src } = req.body;
//   console.log(id, name, src);
//   console.log(req.body);
//   pool.query(
//     "UPDATE adonhome SET showid = ?, name = ?, src = ? WHERE id = ?",
//     [0, name, src, id],
//     (error, results) => {
//       if (error) throw error;
//       res.sendStatus(204);
//     }
//   );
// });

// 更新广告图
app.post("/api/guanggao/:id", (req, res) => {
  const { id } = req.params;
  // const { name, src } = req.body;
  let name = "中石化66";
  let src = "6666";

  pool.query(
    "UPDATE adonhome SET showid = ?, name = ?, src = ? WHERE id = ?",
    [0, name, src, id],
    (error, results) => {
      if (error) throw error;
      res.sendStatus(204);
    }
  );
});

// 查询所有搜索页商品
app.get("/api/searchgoods", (req, res) => {
  pool.query("SELECT * FROM searchgoods", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// 根据id返回对应的搜索商品
app.get("/api/searchgoods/:id", (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM searchgoods WHERE id=?", id, (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

// 根据关键字返回对应的搜索商品
app.get("/api/searchgoodskey", (req, res) => {
  const keyword = req.query.keyword;
  pool.query(
    "SELECT * FROM searchgoods WHERE name LIKE ?",
    [`%${keyword}%`],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.listen(3001, () => {
  console.log("http://localhost:3001");
});
