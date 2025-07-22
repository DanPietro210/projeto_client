// Importa o cliente do Supabase
const { createClient } = require('@supabase/supabase-js');

// A função principal que será executada pelo Netlify
exports.handler = async function(event) {
  // 1. Validar que a requisição é um POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ message: 'Apenas requisições POST são permitidas' }),
    };
  }

  try {
    // 2. Extrair os dados do corpo da requisição
    const { 
        npsScore, motivoPrincipal, motivoOutro, pontosFortes, pontosOutro, 
        melhorias, melhoriasOutro, custoBeneficio, nomeCompleto, 
        dataNascimento, whatsapp, aceitarMensagens 
    } = JSON.parse(event.body);

    // 3. Conectar ao Supabase usando as variáveis de ambiente (mais seguro)
    const supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_KEY
    );

    // 4. Inserir os dados na sua tabela 'cadastros'
    const { data, error } = await supabase
      .from('cadastros') // O nome da sua tabela no Supabase
      .insert([
        { 
          nps_score: npsScore,
          motivo_principal: motivoPrincipal,
          motivo_outro: motivoOutro,
          pontos_fortes: pontosFortes,
          pontos_outro: pontosOutro,
          melhorias: melhorias,
          melhorias_outro: melhoriasOutro,
          custo_beneficio: custoBeneficio,
          nome_completo: nomeCompleto,
          data_nascimento: dataNascimento,
          whatsapp: whatsapp,
          aceita_mensagens: aceitarMensagens,
        }
      ]);

    // 5. Lidar com possíveis erros do banco de dados
    if (error) {
      console.error('Erro do Supabase:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Erro ao salvar no banco de dados', error: error.message }),
      };
    }

    // 6. Retornar uma resposta de sucesso
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Dados salvos com sucesso!', data }),
    };

  } catch (error) {
    console.error('Erro na função:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno do servidor' }),
    };
  }
};
