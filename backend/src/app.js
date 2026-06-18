const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const mangaRoutes = require('./routes/mangaRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    service: 'MangaBrasil API - N3 Devops',
    status: 'online',
    endpoints: {
      health: '/api/health',
      mangas: '/api/mangas'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'MangaBrasil API - N3 Devops'
  });
});

app.use('/api/mangas', mangaRoutes);

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('A variavel MONGODB_URI nao foi configurada.');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB conectado com sucesso.');
}

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}.`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = {
  app,
  connectDatabase,
  startServer
};
