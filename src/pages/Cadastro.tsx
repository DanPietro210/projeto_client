// src/pages/Cadastro.tsx (ou onde quer que seu arquivo esteja)

import React, { useState } from 'react';

const Cadastro = () => {
  // Estados para armazenar a pontuação e o comentário do NPS
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  /**
   * Função chamada quando o formulário é enviado.
   * @param {React.FormEvent} event - O evento de submissão do formulário.
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Previne o recarregamento da página

    if (score === null) {
      setMessage('Por favor, selecione uma pontuação.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // 1. Preparando os dados para envio
      const npsData = { score, comment };

      // 2. Fazendo a requisição para a nossa Netlify Function
      // O endpoint da função é sempre '/.netlify/functions/' seguido do nome do arquivo.
      const response = await fetch('/.netlify/functions/submit-nps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(npsData),
      });

      // 3. Verificando a resposta
      if (!response.ok) {
        // Se a resposta não for de sucesso (ex: 400, 500), lançamos um erro.
        throw new Error('Falha ao enviar o NPS.');
      }

      const result = await response.json();
      setMessage(result.message); // Exibe a mensagem de sucesso da função
      
      // Limpar o formulário após o sucesso
      setScore(null);
      setComment('');

    } catch (error) {
      // 4. Tratamento de erro na requisição
      setMessage('Ocorreu um erro ao enviar seu feedback. Tente novamente.');
      console.error(error);
    } finally {
      // Garante que o estado de 'submitting' seja resetado
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Pesquisa de NPS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Qual a probabilidade de você recomendar nosso serviço a um amigo?</p>
          {/* Exemplo de botões para selecionar a nota */}
          <div>
            {[...Array(11).keys()].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setScore(num)}
                style={{ backgroundColor: score === num ? 'lightblue' : 'white' }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        <br />
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Deixe um comentário (opcional)"
            rows={4}
            cols={50}
          />
        </div>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Cadastro;