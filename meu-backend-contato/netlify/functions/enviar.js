// Local: /meu-backend-contato/netlify/functions/enviar.js

const admin = require('firebase-admin');

// Inicializa o Firebase Admin (apenas se não estiver iniciado)
if (!admin.apps.length) {
  try {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (e) {
    console.error('Erro crítico ao inicializar Firebase Admin:', e);
  }
}

const db = admin.firestore();

// Função principal que o Netlify vai executar
exports.handler = async function(event, context) {
  // Headers de CORS para permitir a comunicação
  const headers = {
    'Access-Control-Allow-Origin': 'https://www.zayam.com.br',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // O Netlify envia uma requisição 'OPTIONS' primeiro para checar o CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Requisição OPTIONS bem-sucedida' })
    };
  }

  // Garante que só estamos aceitando requisições POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }

  try {
    const formData = JSON.parse(event.body);
    const docRef = await db.collection('cadastros').add({
      ...formData,
      createdAt: new Date().toISOString()
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Dados guardados com sucesso!', id: docRef.id })
    };
  } catch (error) {
    console.error('Erro ao salvar no Firestore:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Ocorreu um erro interno no servidor.' })
    };
  }
};