// netlify/functions/submit-nps.js

/**
 * Handler da função serverless para receber os dados de NPS.
 *
 * @param {object} event - Contém os dados da requisição (incluindo o corpo).
 * @param {object} context - Contém informações sobre o contexto da função.
 */
export const handler = async (event, context) => {
  try {
    // 1. Parse dos dados recebidos:
    // O Netlify envia os dados da requisição no corpo (body) do objeto 'event'.
    // Os dados chegam como uma string, então usamos JSON.parse para transformá-los em um objeto.
    const data = JSON.parse(event.body);
    const { score, comment } = data;

    // 2. Validação simples:
    // Verificamos se a pontuação (score) foi enviada.
    if (typeof score === 'undefined') {
      return {
        statusCode: 400, // Bad Request (Requisição Inválida)
        body: JSON.stringify({ message: 'A pontuação (score) é obrigatória.' }),
      };
    }

    // --- A MÁGICA ACONTECE AQUI ---
    // Neste ponto, você faria algo com os dados recebidos.
    // Por exemplo, você poderia:
    // - Salvar em um banco de dados (como FaunaDB, Firebase, etc.).
    // - Enviar para uma planilha do Google Sheets.
    // - Enviar uma notificação para o Slack.
    //
    // Por enquanto, vamos apenas simular o sucesso e retornar os dados.
    console.log('NPS Recebido:', { score, comment });

    // 3. Retorno de sucesso:
    // Se tudo deu certo, retornamos um status 200 (OK) e uma mensagem de sucesso.
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'NPS recebido com sucesso!',
        data: { score, comment },
      }),
    };

  } catch (error) {
    // 4. Tratamento de erros:
    // Se qualquer erro ocorrer no bloco 'try', nós o capturamos aqui.
    console.error('Erro ao processar NPS:', error);
    return {
      statusCode: 500, // Internal Server Error (Erro Interno do Servidor)
      body: JSON.stringify({ message: 'Ocorreu um erro no servidor.' }),
    };
  }
};