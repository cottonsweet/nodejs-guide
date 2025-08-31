import express from "express";
import bodyParser from "body-parser";
import path from "path";
import rootDir from "./utils/path.js";

// router
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(PORT);
