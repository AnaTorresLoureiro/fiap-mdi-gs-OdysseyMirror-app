# Odyssey Mirror

<p align="start">
  <b>Monitoramento ambiental inteligente inspirado em tecnologias espaciais.</b><br/>
  O Odyssey Mirror integra dados climáticos, bioindicadores e inteligência artificial para apoiar a análise ambiental de regiões monitoradas.
</p>

---

# Preview

<p align="center">
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/1.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/2.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/3.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/4.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/5.jpeg" width="150"/>
</p>

<p align="center">
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/6.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/7.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/8.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/9.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/10.jpeg" width="150"/>
</p>

<p align="center">
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/11.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/12.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/13.jpeg" width="150"/>
</p>


---

# Sobre o Projeto

O **Odyssey Mirror** é uma aplicação mobile desenvolvida em React Native com Expo, criada para monitorar condições ambientais através da combinação de dados climáticos, biodiversidade e inteligência artificial.

A solução foi inspirada em tecnologias utilizadas na observação da Terra, como satélites, sensores e sistemas de monitoramento remoto. O objetivo é demonstrar como diferentes fontes de informação podem ser integradas para gerar análises ambientais mais completas e acessíveis.

Atualmente, o sistema utiliza dados meteorológicos e registros de biodiversidade para avaliar uma região monitorada. Como evolução futura, o projeto prevê a integração com sensores ambientais, dados satelitais e modelos avançados de inteligência artificial capazes de identificar padrões, tendências e possíveis riscos ambientais.

---

# Conexão com o Tema Espacial

O Odyssey Mirror se conecta diretamente ao tema espacial por utilizar conceitos inspirados em sistemas de observação terrestre empregados por agências espaciais e centros de pesquisa.

A plataforma foi concebida com base em uma arquitetura que poderá futuramente integrar:

* Satélites de observação da Terra
* Sensores ambientais distribuídos em campo
* Monitoramento de grupos de animais bioindicadores
* Coleta automatizada de variáveis climáticas
* Inteligência Artificial para correlação e análise dos dados

A proposta é unir tecnologias espaciais e ambientais em uma única plataforma capaz de auxiliar na compreensão do comportamento dos ecossistemas.

---

# Funcionalidades

* Exploração de conceitos relacionados à biodiversidade e tecnologias ambientais
* Seleção de localização diretamente pelo mapa
* Monitoramento de espécies bioindicadoras
* Consulta de dados climáticos em tempo real
* Comparação entre quantidade observada e quantidade esperada
* Classificação ambiental em níveis de risco
* Parecer ambiental gerado por Inteligência Artificial
* Histórico de monitoramentos salvos
* Visualização gráfica dos indicadores coletados

---

# Como Funciona

```text
Usuário seleciona uma região
        ↓
Coleta de dados climáticos (OpenWeather)
        ↓
Coleta de dados de biodiversidade (eBird)
        ↓
Análise dos indicadores ambientais
        ↓
Processamento por Inteligência Artificial
        ↓
Geração de parecer ambiental
        ↓
Salvamento e acompanhamento do monitoramento
```

---

# Arquitetura

```text
React Native + Expo
        │
        ▼
   Odyssey Mirror
        │
 ┌──────┴──────┐
 ▼             ▼
OpenWeather   eBird
Clima         Biodiversidade
        │
        ▼
Inteligência Artificial
        │
        ▼
 Parecer Ambiental
```

---

# Tecnologias

## Frontend

[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge\&logo=react\&logoColor=61DAFB\&labelColor=000000)](https://reactnative.dev)

[![Expo](https://img.shields.io/badge/Expo-FFFFFF?style=for-the-badge\&logo=expo\&logoColor=FFFFFF\&labelColor=000000)](https://expo.dev)

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=F7DF1E\&labelColor=000000)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## APIs e Serviços

[![OpenWeather](https://img.shields.io/badge/OpenWeather-FFB703?style=for-the-badge\&labelColor=000000)](https://openweathermap.org)

[![eBird](https://img.shields.io/badge/eBird-8BC34A?style=for-the-badge\&labelColor=000000)](https://ebird.org)

[![Groq](https://img.shields.io/badge/Groq-FFFFFF?style=for-the-badge\&labelColor=000000)](https://groq.com)

## Bibliotecas

* Expo Router
* AsyncStorage
* React Native Maps
* React Native Chart Kit
* Expo Vector Icons
* Expo Google Fonts

---

# Instalação e Execução

## Pré-requisitos

* Node.js
* Git
* Expo
* Android Studio (recomendado)

> [!NOTE]
> O projeto utiliza Expo SDK 54. Embora seja compatível com Expo Go, recomenda-se utilizar o emulador do Android Studio para maior estabilidade durante os testes.

## Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/odyssey-mirror.git

cd odyssey-mirror
```

## Instalar Dependências

```bash
npm install
```

## Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_OPENWEATHER_API_KEY=SUA_CHAVE_OPENWEATHER

EXPO_PUBLIC_EBIRD_API_KEY=SUA_CHAVE_EBIRD

EXPO_PUBLIC_GROQ_API_KEY=SUA_CHAVE_GROQ
```

## Executar o Projeto

```bash
npx expo start
```

Para abrir no Android:

```bash
a
```

---

# Estrutura do Projeto

```text
app/
├── tabs/
│   ├── index.js
│   ├── search.js
│   ├── history.js
│   └── _layout.js
│
├── monitoring.js
└── _layout.js

service/
├── weatherService.js
├── ebirdService.js
└── llamaService.js

context/
└── MonitoringContext.js

constant/
└── theme.js

assets/
└── preview/
```

---

# Roadmap

* [x] Estrutura inicial da aplicação
* [x] Navegação entre telas
* [x] Integração com OpenWeather
* [x] Integração com eBird
* [x] Sistema de monitoramento ambiental
* [x] Histórico de monitoramentos
* [x] Parecer ambiental com IA
* [x] Dashboard com gráficos
* [ ] Integração com sensores ambientais
* [ ] Integração com dados satelitais
* [ ] Sistema de alertas automáticos
* [ ] Modelos preditivos ambientais

---

# Integrantes

| Nome                               | RM       |
| ---------------------------------- | -------- |
| Ana Laura Torres Loureiro          | RM554375 |
| Murilo Cordeiro Ferreira           | RM556727 |
| Geronimo Augusto Nascimento Santos | RM557170 |
| Ianny Raquel Ferreira De Souza     | RM559096 |

---

FIAP • Global Solution • Engenharia de Software
