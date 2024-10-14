const express = require("express");
const app = express();
const cors = require("cors"); // 引入cors库
const PORT = 3000;

// 使用cors中间件，允许所有来源的请求
app.use(cors());

// 模拟数据
const data = [
  { id: 1, name: "John", age: 32, phoneNumber: "1812313123123323" },
  { id: 2, name: "Jim", age: 42, phoneNumber: "1812313123123323" },
  { id: 3, name: "Joe", age: 22, phoneNumber: "1812313123123323" },
  { id: 4, name: "Jack", age: 28, phoneNumber: "1812313123123323" },
  { id: 5, name: "Lucy", age: 36, phoneNumber: "1812313123123323" },
  { id: 6, name: "Lily", age: 26, phoneNumber: "1812313123123323" },
  { id: 7, name: "Linda", age: 29, phoneNumber: "1812313123123323" },
  { id: 8, name: "Luna", age: 33, phoneNumber: "1812313123123323" },
  { id: 9, name: "Lily", age: 26, phoneNumber: "1812313123123323" },
  { id: 10, name: "Linda", age: 29, phoneNumber: "1812313123123323" },
  { id: 11, name: "Luna", age: 33, phoneNumber: "1812313123123323" },
];

// 处理分页和数据过滤
app.post("/api/getTableData", (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  // 将 page 和 pageSize 转换为数字类型
  const currentPage = parseInt(page, 10);
  const currentPageSize = parseInt(pageSize, 10);

  // 计算开始和结束的索引
  const startIndex = (currentPage - 1) * currentPageSize;
  const endIndex = startIndex + currentPageSize;

  // 分页数据
  const pageData = data.slice(startIndex, endIndex);

  // 返回 Ant Design Table 格式的数据
  res.json({
    ret: 0,
    msg: "成功",
    data: {
      records: data,
      total: data.length,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
