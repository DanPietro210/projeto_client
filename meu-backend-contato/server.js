// server.js
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001; // Porta para o backend

// === Middlewares ===
// Habilita CORS para todas as rotas. Em produção, você pode querer restringir.
// Se o seu frontend roda em http://localhost:3000, por exemplo:
app.use(cors({ origin: 'https://www.saudeestruturada.com' })); // Adapte para a URL do seu frontend
// Se não especificar 'origin', permite de qualquer origem (cuidado em produção)
// app.use(cors());

app.use(express.json()); // Para o Express entender requisições com corpo em JSON

// === Rota para enviar email ===
app.post('/api/send-email', async (req, res) => {
  const { name, email, company, message } = req.body;

  console.log('Dados recebidos no backend:', req.body); // Log para depuração

  // Validação básica dos campos
  if (!name || !email || !message) {
    console.log('Erro de validação: Campos obrigatórios faltando.');
    return res.status(400).json({ success: false, message: 'Nome, email e mensagem são obrigatórios.' });
  }

  // Configuração do Nodemailer com suas credenciais Zoho (via .env)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "465"),
    secure: parseInt(process.env.EMAIL_PORT || "465") === 465, // true para porta 465 (SSL), false para outras (TLS/STARTTLS na 587)
    auth: {
      user: process.env.EMAIL_USER, // Seu email Zoho
      pass: process.env.EMAIL_PASS, // Sua senha do Zoho ou senha específica de aplicativo
    },
    // Adicione debug para Nodemailer se precisar de mais informações
    // logger: true,
    // debug: true,
  });

  const mailOptions = {
    from: `"<span class="math-inline">\{name\}" <</span>{process.env.EMAIL_USER}>`, // Remetente (pode ser seu próprio e-mail Zoho)
    to: process.env.EMAIL_TO_RECEIVE,          // Seu e-mail Zoho onde você quer receber as mensagens
    replyTo: email,                           // E-mail do usuário que preencheu o formulário
    subject: `Nova Solicitação de Consultoria de: ${company ? company : name}`,
    html: `
      <h2>Nova Solicitação de Consultoria</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email do remetente (para responder):</strong> ${email}</p>
      ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
      <hr>
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>Este e-mail foi enviado a partir do formulário de contato do site.</em></p>
    `,
  };

  try {
    console.log('Tentando enviar email com as opções:', mailOptions);
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso para:', process.env.EMAIL_TO_RECEIVE);
    res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    // Verifique o tipo de erro para dar feedback mais específico se necessário
    let errorMessage = 'Falha ao enviar o email.';
    if (error.code === 'EAUTH') {
        errorMessage = 'Falha na autenticação SMTP. Verifique suas credenciais de e-mail no arquivo .env.';
    } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Conexão recusada pelo servidor SMTP. Verifique as configurações de host e porta.';
    }
    res.status(500).json({ success: false, message: errorMessage, errorDetails: error.message });
  }
});

// Rota de teste para verificar se o servidor está no ar
app.get('/', (req, res) => {
    res.send('Servidor backend para contato está funcionando!');
});


// === Iniciar o servidor ===
app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
  console.log(`Aguardando requisições em http://localhost:${port}/api/send-email`);
});