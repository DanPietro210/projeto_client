// 1. Importar as ferramentas necessárias
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// 2. Carregar a nossa chave secreta do Firebase
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// 3. Iniciar a conexão com o Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 4. Preparar o nosso "cofre" de dados (o Firestore)
const db = admin.firestore();

// 5. Configurar o servidor
const app = express();
const port = process.env.PORT || 3001;

// 6. Configurar permissões e formato de dados
// O 'cors' permite que o seu site (ex: saudeestruturada.com) se comunique com este backend
app.use(cors({ origin: 'https://saudeestruturada.com' })); 
app.use(express.json()); // Permite que o servidor entenda os dados JSON enviados pelo formulário

// 7. Criar o "endpoint" que receberá os dados do formulário de cadastro
app.post('/api/cadastro', async (req, res) => {
  try {
    const formData = req.body;

    // Validação simples para garantir que os dados essenciais chegaram
    if (!formData.nomeCompleto || !formData.whatsapp) {
      return res.status(400).json({ message: 'Campos obrigatórios em falta.' });
    }

    // Adiciona os dados recebidos à coleção "cadastros" no Firestore
    const docRef = await db.collection('cadastros').add({
      ...formData,
      createdAt: new Date().toISOString() // Adiciona um carimbo de data/hora
    });

    // Envia uma resposta de sucesso de volta para o site
    res.status(200).json({ message: 'Dados guardados com sucesso!', id: docRef.id });

  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
});

// 8. Iniciar o servidor e mantê-lo a "ouvir" por novos pedidos
app.listen(port, () => {
  console.log(`Servidor a rodar na porta ${port}`);
});