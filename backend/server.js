import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import { configDotenv } from 'dotenv';
import next from 'next';  // Import Next.js to handle the frontend

configDotenv();

import userRouter from './src/routes/user.routes.js';
import expenseRouter from './src/routes/expense.routes.js';
import logger from './src/middleware/logger.js';

const app = express();

// Next.js setup
const dev = process.env.NODE_ENV == 'production';
const nextApp = next({ dev, dir: '../frontend' });  // Point Next.js to the frontend folder
const handle = nextApp.getRequestHandler();

// Prepare the Next.js app
nextApp.prepare().then(() => {
  // Middlewares
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }));

  app.use(express.json());
  app.use(logger);

  // API Routes (Handled by Express)
  app.use('/users', userRouter); 
  app.use("/expenses", expenseRouter);

  // Custom logging middleware
  app.use((req, res, next) => {
    const start = Date.now(); // Início do timer

    res.on('finish', () => {
      const duration = Date.now() - start; // Calcula o tempo de execução
      console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`);
      console.log("Request body:", req.body);
    });

    next(); // Continua para a próxima rota ou middleware
  });

  // Sequelize setup
  const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, {
      dialect: 'postgres',
      protocol: 'postgres',
      host: process.env.DATABASE_HOST,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Adjust based on your security needs
        }
      },
    }
  );

  sequelize.authenticate()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

  // Serve the Next.js pages (frontend)
  app.all('*', (req, res) => {
    return handle(req, res); // Passes the request to Next.js
  });

  // Start the Express server
  
});

module.exports = app;
