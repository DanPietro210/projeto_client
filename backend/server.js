const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

// Inicializa o app Express
const app = express();

// --- Configuração do Firebase Admin ---
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (e) {
  console.error('Falha ao inicializar o Firebase Admin. Verifique a variável de ambiente FIREBASE_SERVICE_ACCOUNT_KEY.', e);
}

const db = admin.firestore();

// --- Configuração do CORS ---
// Lista de domínios que podem acessar a API
const allowedOrigins = [
  'https://saudeestruturada.com',
  'http://localhost:5173' // Para testes locais
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (ex: Postman) ou da lista de permitidos
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Acesso negado pela política de CORS'));
    }
  }
}));

// Permite que o Express leia o corpo da requisição em JSON
app.use(express.json());

// --- Definição da Rota ---
// A rota que seu frontend está chamando
app.post('/api/enviar', async (req, res) => {
  try {
    const formData = req.body;
    console.log("Recebido:", formData); // Log para ver os dados no servidor

    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).json({ message: 'Nenhum dado recebido.' });
    }

    const docRef = await db.collection('cadastros').add({
      ...formData,
      createdAt: new Date().toISOString()
    });

    res.status(200).json({ message: 'Dados guardados com sucesso!', id: docRef.id });

  } catch (error) {
    console.error('Erro no servidor ao salvar:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
});

// A Vercel gerencia a porta, então o `app.listen` não é necessário para a publicação,
// mas é útil para testes locais. O ideal é exportar o app.
module.exports = app;