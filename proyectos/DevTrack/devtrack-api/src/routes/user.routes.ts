import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { listarUsuarios } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middlewares";

const router = Router();

router.post('/', createUser);
router.get("/listar-usuarios", verifyToken, listarUsuarios)

export default router;