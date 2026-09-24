import { Router } from "express";
import { createProject } from "../controllers/project.controller";
import { getProjects } from "../controllers/project.controller";
import { getProjectById } from "../controllers/project.controller";

const router = Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById)

export default router;