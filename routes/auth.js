import express from "express";

import authController from "../controllers/auth.js";

const router = express.Router();

router.get("/login", authController);

export default router;
