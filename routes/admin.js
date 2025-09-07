import express from "express";
import { getAddProduct } from "../controllers/products.js";
import { postAddProduct } from "../controllers/products.js";

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

export default router;
