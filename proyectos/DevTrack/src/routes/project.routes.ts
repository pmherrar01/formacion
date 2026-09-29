import { Router } from "express";
import { createProject } from "../controllers/project.controller";
import { getProjects } from "../controllers/project.controller";
import { getProjectById } from "../controllers/project.controller";
import { verifyToken } from "../middlewares/auth.middlewares";
import { isAdmin } from "../middlewares/auth.middlewares";
import { deleteProject } from "../controllers/project.controller";


const router = Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById)
router.delete("/:id", verifyToken, isAdmin, deleteProject)

export default router;