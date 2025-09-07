import express from "express";

import {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
  getOrders,
} from "../controllers/shop.js";

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/cart", getCart);

router.get("/orders", getOrders);

router.get("/checkout", getCheckout);

export default router;
