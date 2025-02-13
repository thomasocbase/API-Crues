import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/crues', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));