import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";
import dotenv from "dotenv";

// import User from "./models/user.js";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { get404 } from "./controllers/error.js";

import { DB_URL } from "./utils/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   // 사용자 컬렉션에서 첫 번째 사용자를 찾거나 생성
//   User.findFirstUser()
//     .then((user) => {
//       if (user) {
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         console.log("Using existing user:", user._id);
//         next();
//       } else {
//         // 사용자가 없으면 새로 생성
//         console.log("No users found, creating new user...");
//         const newUser = new User("Test User", "test@example.com", {
//           items: [],
//         });
//         return newUser.save().then((result) => {
//           // 새로 생성된 사용자
//           const user = result.ops[0];
//           req.user = new User(user.name, user.email, user.cart, user._id);
//           console.log("New user created:", user._id);
//           next();
//         });
//       }
//     })
//     .catch((err) => {
//       console.log("Error with user:", err);
//       req.user = null;
//       next();
//     });
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoose
  .connect(DB_URL)
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.error(err));
