import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller";
import { log } from "node:console";
import { verifyToken } from "../middlewares/auth.middlewares";
import { perfil } from "../controllers/auth.controller";

const router = Router()

router.post("/register", register);
router.post("/login", login);
router.get("/perfil", verifyToken, perfil)

export default router;