# 积分商城后台管理系统

整个系统分为前台商城和后台电商管理的前端和后端四个模块，前端模块负责页面的展示和用户的交互以及发送ajax请求，后端模块负责系统的逻辑处理和数据库的操作。

前台电商和后台管理系统都将信息存储在 MySQL 数据库中，共用同一个数据库。前台商城和后台电商管理系统的前后端设计均使用同一套技术栈。

系统从三个层级构建的整体架构图：

![image-20230717223809750](C:\Users\火影\AppData\Roaming\Typora\typora-user-images\image-20230717223809750.png)



系统的功能结构图：

![image-20230717223713808](C:\Users\火影\AppData\Roaming\Typora\typora-user-images\image-20230717223713808.png)

## 文件夹

houtai文件夹是系统的前端文件，在那之下的server文件夹是后端文件

## 启动

确保整个积分商城的数据库文件已导入
在Vscode中分别打开这两个文件
对于前端文件，使用：
npm i
npm run serve
对于后端文件，使用：
node index.js
