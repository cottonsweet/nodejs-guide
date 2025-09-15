import express from "express";

import { getLogin, postLogin } from "../controllers/auth.js";

const router = express.Router();

router.get("/login", getLogin);
router.get("/login", postLogin);

export default router;
