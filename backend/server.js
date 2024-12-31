import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import { configDotenv } from 'dotenv';
configDotenv();

import userRouter from './src/routes/user.routes.js';
import expenseRouter from './src/routes/expense.routes.js';
import logger from './src/middleware/logger.js';

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());

app.use(logger);

app.use('/users', userRouter); 
app.use("/expenses", expenseRouter);

app.use((req, res, next) => {
  const start = Date.now(); // Início do timer

  res.on('finish', () => {
    const duration = Date.now() - start; // Calcula o tempo de execução
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`);
    console.log("Request body:", req.body);
  });

  next(); // Continua para a próxima rota ou middleware
});

// Configuração do Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

app.get('/', (req, res) => {
  res.send('Backend rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
