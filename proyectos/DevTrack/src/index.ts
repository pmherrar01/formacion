import dotenv from 'dotenv';
import express from 'express';
import healthRoutes from './routes/health.routes';

dotenv.config();

const app = express();
const PORT = process.env.SERVERPORT || 4000;

app.use('/api', healthRoutes);

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});