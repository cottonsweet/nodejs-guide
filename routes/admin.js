import express from "express";
import path from "path";
import rootDir from "../utils/path.js";

const router = express.Router();

export const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "상품 추가",
    path: "/admin/add-product",
  });
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

export default router;
