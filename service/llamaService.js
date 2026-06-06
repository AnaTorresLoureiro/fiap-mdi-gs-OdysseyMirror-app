const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

const MODEL = 'llama-3.3-70b-versatile';

export async function generateStatusInsight(monitoringData) {
  return callGroq(buildStatusPrompt(monitoringData), {
    temperature: 0.3,
    maxTokens: 120,
  });
}

export async function generateMonitoringSummary(monitoringData) {
  return callGroq(buildSummaryPrompt(monitoringData), {
    temperature: 0.5,
    maxTokens: 350,
  });
}

async function callGroq(prompt, options = {}) {
  if (!GROQ_API_KEY) {
    throw new Error('Chave da Groq não encontrada.');
  }

  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content:
              'Você é um especialista em monitoramento ambiental, biodiversidade, clima, bioindicadores e análise territorial.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: options.temperature ?? 0.4,
        max_tokens: options.maxTokens ?? 250,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.log('================ GROQ ERROR ================');
    console.log('Status:', response.status);
    console.log(errorText);
    console.log('===========================================');

    throw new Error(
      `Erro ${response.status} ao consultar a IA.`
    );
  }

  const data = await response.json();

  const content =
    data?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    console.log('Resposta da Groq:', JSON.stringify(data, null, 2));

    throw new Error(
      'A IA retornou uma resposta vazia.'
    );
  }

  return content;
}

function buildStatusPrompt(data) {
  return `
Analise os dados abaixo e gere um texto curto para o status ambiental.

REGRAS:
- Máximo 30 palavras.
- Não use listas.
- Não use markdown.
- Considere clima e biodiversidade ao mesmo tempo.
- Não cite todos os números.
- Seja objetivo.

DADOS:

Local:
${data.location.city}, ${data.location.country}

Espécie:
${data.species.commonName}

Clima:
Temperatura ${data.weather.temperature}°C
Umidade ${data.weather.humidity}%
Pressão ${data.weather.pressure} hPa
Vento ${data.weather.windSpeed} m/s

Biodiversidade:
Quantidade atual ${data.biodiversity.currentQuantity}
Quantidade esperada ${data.biodiversity.expectedQuantity}
Quantidade últimos 30 dias ${data.biodiversity.totalLast30DaysQuantity}

Status calculado:
${data.status.label}
`;
}

function buildSummaryPrompt(data) {
  return `
Você é um analista ambiental.

Crie um parecer ambiental baseado nos dados abaixo.

REGRAS:
- Entre 80 e 150 palavras.
- Não use markdown.
- Não faça lista.
- Interprete os dados.
- Relacione clima e biodiversidade.
- Considere a quantidade observada versus a esperada.
- Considere o histórico disponível.
- Não invente informações externas.
- Não diga que existe desastre sem evidência.

DADOS:

Local:
${data.location.city}, ${data.location.country}

Coordenadas:
${data.location.coordinates}

Espécie:
${data.species.commonName}
${data.species.scientificName}

Clima:
Temperatura ${data.weather.temperature}°C
Umidade ${data.weather.humidity}%
Pressão ${data.weather.pressure} hPa
Vento ${data.weather.windSpeed} m/s
Condição ${data.weather.condition}

Biodiversidade:
Quantidade atual ${data.biodiversity.currentQuantity}
Quantidade esperada ${data.biodiversity.expectedQuantity}
Quantidade últimos 30 dias ${data.biodiversity.totalLast30DaysQuantity}

Área analisada:
Raio ${data.biodiversity.radiusKm} km

Período atual:
${data.biodiversity.currentPeriodDays} dias

Período histórico:
${data.biodiversity.baselinePeriodDays} dias

Status:
${data.status.label}

Justificativa:
${data.status.reason}
`;
}