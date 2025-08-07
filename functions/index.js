const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { logger } = require("firebase-functions");
const axios = require("axios");

// --- INFORMAÇÕES SENSÍVEIS (LEIA A RECOMENDAÇÃO DE SEGURANÇA ABAIXO) ---
const ZAPSTER_API_URL = "https://api.zapsterapi.com/v1/wa/messages";
// ATENÇÃO: Mova estas chaves para a configuração de ambiente do Firebase!
const ZAPSTER_BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTM0ODY4NTksImlzcyI6InphcHN0ZXJhcGkiLCJzdWIiOiI3OGI1MTU3NC0zNmJhLTRhZDYtOWIzNy0wNTVlMTE1MzhjODAiLCJqdGkiOiI3YTJmZmNiNi1kYjhmLTRjZWUtYTAyNC1jZmU1MThiMmY3M2YifQ.niiaW4eR12390gc93USRkDIGgG3oWiBjVirbEIwJGDc";
const ZAPSTER_INSTANCE_ID = "hdaorelezpelivlzekld3";

/**
 * Função para gerar um código de cupom alfanumérico.
 * @param {number} length - O comprimento do código.
 * @returns {string} - O cupom gerado.
 */
function gerarCupom(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Função que escuta a coleção "cadastros"
exports.enviarMensagemZapster = onDocumentCreated("cadastros/{cadastroId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.log("Nenhum dado associado ao evento, saindo.");
    return;
  }

  const dadosCliente = snapshot.data();
  const nomeCliente = dadosCliente.nomeCompleto;
  const telefoneCliente = dadosCliente.whatsapp;

  if (!nomeCliente || !telefoneCliente) {
    logger.error("Documento não contém 'nomeCompleto' ou 'whatsapp'.", dadosCliente);
    return;
  }

  // Limpa o número de telefone e garante o código do país "55"
  let numeroLimpo = telefoneCliente.replace(/\D/g, '');
  if (numeroLimpo.length === 11) {
    numeroLimpo = "55" + numeroLimpo;
  }

  logger.info(`Preparando mensagem para ${nomeCliente} no número ${numeroLimpo}.`);

  const cupom = gerarCupom(8);

  const mensagem = `Olá, ${nomeCliente}! Obrigado por sua avaliação.
Como agradecimento, use o código abaixo para ganhar 10% de desconto no valor total da sua próxima conta.
Cupom: ${cupom}
Basta apresentar a mensagem e este cupom de uso único no caixa.
Até a próxima,
Equipe Restaurante Sabor Divino`; // CORRIGIDO: Removido o acento grave extra

  const dadosParaZapster = {
    recipient: numeroLimpo,
    text: mensagem
  };

  const headers = {
    'Authorization': `Bearer ${ZAPSTER_BEARER_TOKEN}`,
    'Content-Type': 'application/json',
    'X-Instance-ID': ZAPSTER_INSTANCE_ID
  };

  logger.info("Enviando dados para o Zapster...", { url: ZAPSTER_API_URL, headers, body: dadosParaZapster });

  try {
    await axios.post(ZAPSTER_API_URL, dadosParaZapster, { headers: headers });
    logger.info("Mensagem enviada com sucesso para o Zapster.");
  } catch (error) {
    if (error.response) {
      logger.error("Erro da API do Zapster:", {
        status: error.response.status,
        data: error.response.data
      });
    } else {
      logger.error("Erro ao enviar requisição para o Zapster:", error.message);
    }
  }
});