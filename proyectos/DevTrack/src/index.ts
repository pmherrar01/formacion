import dotenv from 'dotenv';
import express from 'express';
import healthRoutes from './routes/health.routes';
import userRoutes from './routes/user.routes';
import projectRoutes from "./routes/project.routes"
import ticketRoutes from "./routes/ticket.routes"

dotenv.config();

const app = express();
const PORT = process.env.SERVERPORT || 4000;

app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/users', userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});