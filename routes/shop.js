import express from "express";

import {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
} from "../controllers/shop.js";

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/cart", getCart);

router.get("/checkout", getCheckout);

export default router;
