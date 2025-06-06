import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Carrega variáveis de ambiente do .env na raiz do projeto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Ajuste: só um nível acima (../) a partir de api/index.js





// Agora vêm os outros imports originais do arquivo:
import express from 'express';
import cors from 'cors';
// ... resto dos imports e do código ...




import pg from 'pg';
import { connect, User, Art } from './database/configpostgre.js';





// Import Routes
import userRoute from './routes/user.route.js';
import artRoute from './routes/art.route.js'; // Import Art routes
import exemploeroute from './routes/example.route.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://arte-local-front-end.vercel.app',
  'http://localhost:5173',
  'https://glowing-fiesta-pvj6qqj9g76crx5-5173.app.github.dev'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Register Routes
app.use('/user', userRoute);
app.use('/arts', artRoute); // Use the new art routes
app.use('/protected', exemploeroute);

app.get('/', (req, res) => {
  res.send({ message: 'Seja bem-vindo ao backend do ArteLocal. A API está ativa e pronta para uso.' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Check if the error is a known type or provide a generic message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno no servidor';
  res.status(statusCode).json({ error: message });
});

connect().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('\n Backend do ArteLocal iniciado com sucesso.');
    console.log(` Servidor disponível na porta ${PORT}`);
    console.log(' A API está pronta para receber requisições.');
  });
}).catch(err => {
    console.error("Failed to connect to the database or start the server:", err);
    process.exit(1);
});

// Export app for Vercel serverless function
export default app;

