<img src="https://raw.githubusercontent.com/AnaTorresLoureiro/legendary-doodle/refs/heads/main/Design%20sem%20nome%20(1).png"/>

<p align="start">
  <b>Unindo tecnologia espacial e a sabedoria da natureza</b><br/>
  O Odyssey monitora condições ambientais e o comportamento de espécies bioindicadoras para identificar sinais precoces de mudanças e riscos ambientais.
</p>

# Sobre o Projeto

O **Odyssey Mirror** é uma aplicação mobile desenvolvida em React Native com Expo que reúne todas as funcionalidades desenvolvidas para o ecossistema **Odyssey**, centralizando em uma única plataforma a visualização, análise e acompanhamento de informações ambientais.

A solução combina dados climáticos, biodiversidade e inteligência artificial para auxiliar no monitoramento ambiental. Inspirado em tecnologias utilizadas na observação da Terra, como satélites, sensores e sistemas de monitoramento remoto, o projeto demonstra como diferentes fontes de informação podem ser integradas para gerar análises mais completas e acessíveis.

Um dos principais diferenciais do Odyssey é a utilização de **espécies bioindicadoras**, animais capazes de refletir alterações em seu ambiente por meio de mudanças em seu comportamento, presença ou ausência em determinadas regiões. No protótipo atual, o sistema utiliza observações do **Canário-da-terra (*Sicalis flaveola*)**, mas sua arquitetura permite a expansão para diversas outras espécies monitoradas por plataformas de biodiversidade.

Atualmente, o sistema integra dados meteorológicos e registros de biodiversidade para avaliar uma região monitorada, cruzando informações ambientais com observações da fauna local. Dessa forma, o Odyssey busca unir tecnologia e natureza, reconhecendo que os animais também podem atuar como importantes indicadores ambientais.

Como evolução futura, o projeto prevê a integração com sensores ambientais, dados satelitais e modelos avançados de inteligência artificial capazes de identificar padrões, tendências e possíveis riscos ambientais em tempo real, tornando o monitoramento cada vez mais preciso e proativo.


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

# Conheça a solução

<img src="https://raw.githubusercontent.com/AnaTorresLoureiro/legendary-doodle/refs/heads/main/Design%20sem%20nome%20(2).png"  width="500"/>

---

# Preview

<p align="center">
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/1.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/2.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/7.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/3.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/4.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/6.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/14.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/16.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/17.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/18.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/19.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/20.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/21.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/5.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/8.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/9.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/10.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/11.jpeg" width="150"/>
  <img src="https://github.com/AnaTorresLoureiro/legendary-doodle/blob/main/15.jpeg" width="150"/>
</p>

---

# Fluxo

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
┌──────────────────────────────────────────────┐
│              React Native + Expo             │
│        Interface mobile do Odyssey Mirror    │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              Odyssey Mirror                  │
│   Seleção de região, espécie e monitoramento │
└──────────────┬───────────────┬───────────────┘
               │               │
               ▼               ▼
┌───────────────────┐   ┌───────────────────┐
│    OpenWeather    │   │       eBird       │
│ Dados climáticos  │   │ Dados de fauna    │
└─────────┬─────────┘   └─────────┬─────────┘
          │                       │
          └───────────┬───────────┘
                      ▼
┌──────────────────────────────────────────────┐
│          Processamento e Correlação          │
│ Clima + biodiversidade + região monitorada   │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│        Inteligência Artificial / Regras      │
│     Interpretação dos dados ambientais       │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│              Parecer Ambiental               │
│  Status, gráficos, alertas e histórico       │
└──────────────────────────────────────────────┘
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

```txt
ODYSSEYMIRROR/
├── app/
│   ├── tabs/
│   │   ├── _layout.js
│   │   ├── home.js
│   │   ├── search.js
│   │   └── history.js
│   ├── _layout.js
│   └── monitoring.js
│
├── assets/
│
├── components/
│   ├── ChartsContent.js
│   ├── HistoryCard.js
│   ├── HomeSlide.js
│   ├── MiniMetric.js
│   ├── StatusCount.js
│   └── WeatherItem.js
│
├── constant/
│   └── theme.js
│
├── context/
│   └── MonitoringContext.js
│
├── data/
│   └── data.js
│
├── helpers/
│   ├── history.js
│   ├── monitoring.js
│   └── search.js
│
├── hooks/
│   ├── history.js
│   ├── home.js
│   ├── monitoring.js
│   └── search.js
│
├── service/
│   ├── ebirdService.js
│   ├── llamaService.js
│   └── weatherService.js
│
├── styles/
│   ├── history.js
│   ├── home.js
│   ├── monitoring.js
│   └── search.js
│
├── .env
├── .env.example
├── .gitignore
├── app.json
└── package.json
```

---

# Organização dos Arquivos

## app/

Responsável pelas rotas da aplicação utilizando Expo Router.

### app/_layout.js

Layout principal da aplicação.

Responsável por:

* Carregar as fontes globais.
* Configurar a navegação principal.
* Registrar o `MonitoringProvider`.
* Definir as rotas globais da aplicação.

### app/monitoring.js

Tela de monitoramento ambiental.

Exibe:

* Dados climáticos.
* Dados de biodiversidade.
* Status ambiental.
* Parecer inteligente gerado pela IA.
* Gráficos de evolução.
* Histórico de presença da espécie bioindicadora.

### app/tabs/_layout.js

Layout das abas inferiores da aplicação.

Controla a navegação entre:

* Explorar.
* Monitorar.
* Evolução.

### app/tabs/home.js

Tela inicial da aplicação.

Apresenta:

* Espécies bioindicadoras.
* Tecnologias ambientais.
* Satélites de observação da Terra.
* Inteligência artificial.
* Sensores ambientais.
* Carrossel interativo.

### app/tabs/search.js

Tela responsável pela pesquisa e criação de monitoramentos.

Permite:

* Selecionar uma região no mapa.
* Consultar clima atual.
* Buscar espécies bioindicadoras próximas.
* Selecionar uma espécie.
* Iniciar um monitoramento.

### app/tabs/history.js

Tela de histórico.

Exibe:

* Monitoramentos salvos.
* Estatísticas resumidas.
* Quantidade de análises por status.
* Acesso rápido aos detalhes de cada monitoramento.

---

# components/

Componentes reutilizáveis da interface.

### ChartsContent.js

Responsável pela renderização dos gráficos utilizados na tela de monitoramento.

### HistoryCard.js

Card utilizado para exibir um monitoramento salvo no histórico.

### HomeSlide.js

Componente individual utilizado pelo carrossel da Home.

### MiniMetric.js

Exibe métricas resumidas em formato compacto.

### StatusCount.js

Exibe contadores por status ambiental.

Exemplos:

* Estável.
* Atenção.
* Crítico.

### WeatherItem.js

Componente responsável por exibir um dado climático individual.

Exemplos:

* Temperatura.
* Umidade.
* Pressão.
* Vento.

---

# constant/

Arquivos de configuração global.

### theme.js

Centraliza:

* Cores.
* Fontes.
* Tamanhos.
* Tokens visuais da aplicação.

---

# context/

Gerenciamento de estado global.

### MonitoringContext.js

Responsável por:

* Salvar monitoramentos.
* Recuperar monitoramentos.
* Atualizar monitoramentos.
* Compartilhar dados entre telas.

---

# data/

Armazena dados estáticos utilizados pela aplicação.

### data.js

Contém:

* Slides da Home.
* Conteúdo educacional.
* Bioindicadores.
* Tecnologias ambientais.
* URLs de imagens.

---

# helpers/

Funções auxiliares específicas de cada módulo.

### history.js

Funções auxiliares da tela de histórico.

Exemplos:

* Formatação de dados.
* Conversão de parâmetros.
* Montagem de navegação.

### monitoring.js

Funções de apoio para análises ambientais.

Exemplos:

* Cálculo de status.
* Classificação de risco.
* Interpretação de métricas.

### search.js

Funções auxiliares da tela de pesquisa.

Exemplos:

* Formatação de coordenadas.
* Conversão de dados geográficos.

---

# hooks/

Responsáveis pela lógica e comportamento das telas.

### home.js

Controla:

* Modo Natureza.
* Modo Tecnologia.
* Carrossel.
* Slide ativo.

### search.js

Controla:

* Seleção do mapa.
* Busca climática.
* Busca de bioindicadores.
* Seleção de espécie.
* Navegação para monitoramento.

### monitoring.js

Controla:

* Estado da tela de monitoramento.
* Integração com IA.
* Dados dos gráficos.
* Persistência de análises.

### history.js

Controla:

* Listagem de monitoramentos.
* Estatísticas.
* Abertura de detalhes.

---

# service/

Camada responsável por integrações externas.

### weatherService.js

Integração com a API OpenWeather.

Responsável por obter:

* Temperatura.
* Umidade.
* Pressão atmosférica.
* Velocidade do vento.
* Condições climáticas.

### ebirdService.js

Integração com a API eBird.

Responsável por obter:

* Espécies observadas.
* Quantidade de indivíduos.
* Frequência de ocorrência.
* Dados de biodiversidade.

### llamaService.js

Integração com o modelo Llama.

Responsável por gerar:

* Parecer ambiental.
* Resumo inteligente.
* Interpretação dos dados coletados.

---

# styles/

Arquivos responsáveis pela estilização das telas.

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
* [ ] Integração com dados de satélites
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
