import express from "express";
import bodyParser from "body-parser";
import path from "path";

// router
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

// utils
import rootDir from "./utils/path.js";

const app = express();
const PORT = 4000;

// view engine을 사용하여 pug 파일을 렌더링
app.set("view engine", "pug");
// key: views, files:folderName key는 express 내부에서 정해진 값으로 변경 불가
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public"))); // 정적으로 서비스 원하는 경로 -> public 폴더로 포워딩

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(400).render("404", {
    pageTitle: "404-Not Found Page",
    content: "페이지를 찾을 수 없습니다.",
  });
});

app.listen(PORT);
