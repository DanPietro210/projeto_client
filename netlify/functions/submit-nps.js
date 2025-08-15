// netlify/functions/submit-nps.js

import admin from 'firebase-admin';

// Prepara as credenciais do Firebase a partir das variáveis de ambiente
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Garante que a formatação da chave privada esteja correta
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

// Inicializa o App do Firebase (apenas se não tiver sido inicializado antes)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Inicializa o serviço do Firestore
const db = admin.firestore();

export const handler = async (event) => {
  // Garante que a requisição seja do tipo POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ message: 'Method Not Allowed' }) 
    };
  }
  
  try {
    // 1. Parse dos dados recebidos do formulário
    const data = JSON.parse(event.body);

    // 2. Validação Mínima Essencial
    // Verificamos se os campos mais importantes foram enviados.
    if (typeof data.npsScore === 'undefined' || !data.nomeCompleto || !data.whatsapp) {
      return {
        statusCode: 400, // Bad Request
        body: JSON.stringify({ message: 'Dados essenciais (NPS, Nome, WhatsApp) são obrigatórios.' }),
      };
    }

    // 3. Preparar os dados para salvar no Firestore
    //    Criamos um novo objeto com um timestamp (data de criação)
    const newEntry = {
      ...data, // Inclui todos os dados do formulário
      createdAt: new Date().toISOString(), // Adiciona a data e hora do envio
    };

    // 4. Salvar os dados em uma coleção no Firestore
    //    Usamos a coleção 'clientes-nps'. Se ela não existir, o Firestore a cria.
    await db.collection('clientes-nps').add(newEntry);

    console.log('Dados salvos com sucesso no Firestore:', newEntry);

    // 5. Retornar uma resposta de sucesso para o frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Feedback recebido e salvo com sucesso!' }),
    };

  } catch (error) {
    // Tratamento de erros
    console.error('Erro ao processar a requisição:', error);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ message: 'Ocorreu um erro interno no servidor.' }),
    };
  }
};