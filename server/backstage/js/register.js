

function register(body, connection, res) {
  let username = body.username;
  let userpwd = body.userpwd;

  // 查询当前最大id并加1作为新id
  let sql_max_id = `select max(id) as max_id from user`;
  connection.query(sql_max_id, function (err, result) {
    if (err) {
      res.json({ status: 3, msg: "服务器错误" });
      return;
    }

    let new_id = result[0].max_id + 1;

    // 将注册信息添加到数据库中
    let sql_add_user = `insert into user(id, userid, username, userpwd) values(${new_id}, '${new_id}', '${username}', '${userpwd}')`;
    connection.query(sql_add_user, function (err, result) {
      if (err) {
        res.json({ status: 3, msg: "用户注册失败" });
        return;
      }
      res.json({ status: 1, msg: "用户注册成功" });
    });
  });
}

module.exports = {
  register,
};
