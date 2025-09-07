import express from "express";
import bodyParser from "body-parser";
import path from "path";
// import expressHbs from "express-handlebars";

// router
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

// Controller
import { get404Controller } from "./controllers/error.js";

// utils
import rootDir from "./utils/path.js";

const app = express();
const PORT = 4000;

// hbs 라는 엔진을 등록하고, 확장자 파일 또한 hbs로 생성한다.
// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
// app.set("view engine", "hbs");

// esj
app.set("view engine", "ejs");

// view engine을 사용하여 pug 파일을 렌더링
// app.set("view engine", "pug");

// key: views, files:folderName key는 express 내부에서 정해진 값으로 변경 불가
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public"))); // 정적으로 서비스 원하는 경로 -> public 폴더로 포워딩

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404Controller);

app.listen(PORT);
