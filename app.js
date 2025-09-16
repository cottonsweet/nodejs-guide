import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";

import path from "path";
import { fileURLToPath } from "url";

import User from "./models/user.js";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import authRoutes from "./routes/auth.js";

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
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("68c6b0d194a3468888dc8ea0");
    req.user = user;
    next();
  } catch (err) {
    console.errror(err);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);

const startServer = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB");

    const user = await User.findOne();
    if (!user) {
      const newUser = new User({
        name: "Max",
        email: "max@test.com",
        cart: {
          items: [],
        },
      });
      await newUser.save();
      console.log("Default user created");
    }

    app.listen(4000);
    console.log("Server running on port 4000");
  } catch (err) {
    console.error(err);
  }
};

startServer();
