import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());

// 定义存储文件的规则，包括文件的保存路径和文件名。
const storage = multer.diskStorage({
  // 指定文件存储的目录。
  destination: function (req, file, cb) {
    try {
      // 如果不存在uploads文件夹，则创建uploads文件夹。 确保文件夹在项目根目录
      // eslint-disable-next-line no-undef
      fs.mkdirSync(path.join(process.cwd(), "uploads"));
    } catch (e) {
      console.error(e);
    }
    // 指定文件保存的路径。
    // eslint-disable-next-line no-undef
    cb(null, path.join(process.cwd(), "uploads"));
  },
  // 定义上传文件的文件名。
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, uniqueSuffix);
  },
});

// 设置上传文件的默认存储目录，配合 storage 进一步自定义文件存储
const upload = multer({
  dest: "uploads/",
  storage,
});

app.post("/upload", upload.single("file"), function (req, res, next) {
  console.log("req.file", req.file);
  console.log("req.body", req.body);

  res.end(
    JSON.stringify({
      message: "success",
    })
  );
});

app.listen(3333);
