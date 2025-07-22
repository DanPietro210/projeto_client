const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const port = process.env.PORT || 3001;

// --- INÍCIO DA MODIFICAÇÃO ---
// Lista de URLs que têm permissão para aceder ao seu backend
const allowedOrigins = [
  'https://saudeestruturada.com',
  'http://localhost:5173' // Adicionado para facilitar testes locais no futuro
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições se a origem estiver na nossa lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pela política de CORS'));
    }
  }
};

// Usa a nova configuração de CORS mais robusta
app.use(cors(corsOptions));
// --- FIM DA MODIFICAÇÃO ---

app.use(express.json());

// A sua rota de /api/cadastro permanece a mesma
app.post('/api/cadastro', async (req, res) => {
  try {
    const formData = req.body;

    if (!formData.nomeCompleto || !formData.whatsapp) {
      return res.status(400).json({ message: 'Campos obrigatórios em falta.' });
    }
    
    const docRef = await db.collection('cadastros').add({
      ...formData,
      createdAt: new Date().toISOString()
    });

    res.status(200).json({ message: 'Dados guardados com sucesso!', id: docRef.id });

  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor a rodar na porta ${port}`);
});