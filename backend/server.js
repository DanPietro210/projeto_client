// Local: /server.js

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

// --- PASSO DE DEPURAÇÃO: VERIFICAR O QUE A VERCEL ESTÁ VENDO ---
console.log('--- INICIANDO SERVIDOR ---');
console.log('Verificando variáveis de ambiente recebidas pela Vercel:');
console.log('ID do Projeto Recebido:', process.env.FIREBASE_PROJECT_ID ? 'Sim' : 'NÃO');
console.log('Email do Cliente Recebido:', process.env.FIREBASE_CLIENT_EMAIL ? 'Sim' : 'NÃO');
console.log('Chave Privada Recebida:', process.env.FIREBASE_PRIVATE_KEY ? 'Sim' : 'NÃO');
// -------------------------------------------------------------

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin inicializado com sucesso!'); // Adicionamos um log de sucesso
  } catch (e) {
    console.error('ERRO CRÍTICO AO INICIALIZAR FIREBASE ADMIN:', e.message);
  }
}

const db = admin.firestore();
const app = express();

app.use(cors({ origin: ['https://zayam.com.br', 'http://localhost:5173'] }));
app.use(express.json());

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

module.exports = app;