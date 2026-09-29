import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller";
import { log } from "node:console";

const router = Router()

router.post("/register", register);
router.post("/login", login);

export default router;