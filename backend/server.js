const express = require('express');
const cors = require('cors');
// const admin = require('firebase-admin'); // Comentado por enquanto
// require('dotenv').config();

// ... (toda a parte de inicialização do Firebase pode ser comentada) ...

const app = express();

// --- Configuração do CORS ---
app.use(cors({ origin: ['https://zayam.com.br', 'https://www.zayam.com.br', 'http://localhost:5173'] }));
app.use(express.json());

// --- Rota da API (versão de teste) ---
app.post('/api/enviar', async (req, res) => {
  console.log('Endpoint /api/enviar foi chamado!');
  console.log('Corpo da requisição:', req.body);
  
  // Apenas respondemos com sucesso, sem tocar no Firebase.
  res.status(200).json({ message: 'Servidor respondeu com sucesso (teste sem Firebase)!' });
});

// Exporta o app para a Vercel
module.exports = app;