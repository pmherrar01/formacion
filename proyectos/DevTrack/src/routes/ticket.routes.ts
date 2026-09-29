import { Router } from "express";
import { createTicket } from "../controllers/ticket.controller";
import { updateTicketStatus } from "../controllers/ticket.controller";
import { deleteTicket } from "../controllers/ticket.controller";
import { verifyToken } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/",verifyToken, createTicket);
router.patch("/:id", updateTicketStatus);
router.delete("/:id", deleteTicket);

export default router;