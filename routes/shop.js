import express from "express";
import path from "path";
import rootDir from "../utils/path.js";
import { products } from "./admin.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  const productItems = products;

  // 템플릿으로 데이터 전달
  res.render("shop", {
    pageTitle: "상점",
    productItems: productItems,
    path: "/",
  });
});

export default router;
