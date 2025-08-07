// Importa a biblioteca axios para fazer requisições HTTP
const axios = require('axios');

// ------------------------------------------------------------------
//                PREENCHA COM SUAS INFORMAÇÕES
// ------------------------------------------------------------------

// Seu Token de API, encontrado no painel da Zapster
const ZAPSTER_API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTM0ODY4NTksImlzcyI6InphcHN0ZXJhcGkiLCJzdWIiOiI3OGI1MTU3NC0zNmJhLTRhZDYtOWIzNy0wNTVlMTE1MzhjODAiLCJqdGkiOiI3YTJmZmNiNi1kYjhmLTRjZWUtYTAyNC1jZmU1MThiMmY3M2YifQ.niiaW4eR12390gc93USRkDIGgG3oWiBjVirbEIwJGDc';

// O ID da sua instância da Zapster
const ZAPSTER_INSTANCE_ID = 'hdaorelezpelivlzekld3';

// Número do destinatário no formato DDI + DDD + NÚMERO (ex: 5521999998888)
const numeroDestinatario = '5521979672102'; 

// A mensagem que você quer enviar
const mensagem = 'Olá! Esta é uma mensagem de teste enviada via API da Zapster. ✨';

// ------------------------------------------------------------------
//                      O CÓDIGO DA REQUISIÇÃO
// ------------------------------------------------------------------

// Linha antiga e provavelmente incorreta
const url = `https://api.zapsterapi.com/v1/wa/instances/${ZAPSTER_INSTANCE_ID}/messages/text`;

// Monta o corpo (payload) da requisição conforme a documentação
const payload = {
  recipient: numeroDestinatario,
  message: mensagem
};

// Configura os cabeçalhos (headers) da requisição com seu token
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${ZAPSTER_API_TOKEN}`
};

// Função para enviar a mensagem
async function enviarMensagemZapster() {
  console.log('Tentando enviar mensagem...');

  try {
    const resposta = await axios.post(url, payload, { headers: headers });
    
    console.log('Mensagem enviada com sucesso!');
    console.log('Resposta da API:', resposta.data);

  } catch (erro) {
    console.error('Ocorreu um erro ao enviar a mensagem.');
    // A API da Zapster costuma dar detalhes do erro dentro de 'error.response.data'
    if (erro.response) {
      console.error('Detalhes do erro:', erro.response.data);
    } else {
      console.error('Erro:', erro.message);
    }
  }
}

// Chama a função para executar o envio
enviarMensagemZapster();