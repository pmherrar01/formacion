import { Router } from "express";
import { listarUsuarios } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middlewares";

const router = Router();


router.get("/listar-usuarios", verifyToken, listarUsuarios)

export default router;