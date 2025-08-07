// Local: /server.js

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

// --- PASSO 1: CONSTRUIR O OBJETO serviceAccount A PARTIR DAS NOVAS VARIÁVEIS ---
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

// --- PASSO 2: INICIALIZAR O FIREBASE ADMIN ---
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (e) {
    console.error('ERRO CRÍTICO AO INICIALIZAR FIREBASE ADMIN:', e);
  }
}

const db = admin.firestore();
const app = express();

// --- Configuração do CORS ---
app.use(cors({ origin: ['https://zayam.com.br', 'http://localhost:5173'] }));
app.use(express.json());

// --- Rota da API ---
app.post('/api/enviar', async (req, res) => {
  try {
    const formData = req.body;
    const docRef = await db.collection('cadastros').add({
      ...formData,
      createdAt: new Date().toISOString()
    });
    res.status(200).json({ message: 'Dados guardados com sucesso!', id: docRef.id });
  } catch (error) {
    console.error('Erro ao salvar no Firestore:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
});

// Exporta o app para a Vercel
module.exports = app;