import { Router, Request, Response } from 'express';

const router = Router();

router.get('/health', async (req: Request, res: Response) => {
    res.json({ status: "Servidor Node.js con TypeScript funcionando correctamente" });
});

export default router;