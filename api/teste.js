// Local: /api/test.js

const express = require('express');
const cors = require('cors');

const app = express();

// Configura o CORS para permitir seu domínio
app.use(cors({ origin: ['https://zayam.com.br', 'http://localhost:5173'] }));

// Endpoint de teste simples
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'CORS está funcionando corretamente!' });
});

// Exporta o app para a Vercel
module.exports = app;