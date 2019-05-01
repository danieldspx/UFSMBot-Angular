# UFSMBot-Angular

Este projeto foi criado com propósitos educacionais.

[![](https://img.shields.io/badge/app-online-brightgreen.svg)](https://ufsmbot.herokuapp.com) [![](https://img.shields.io/badge/app-front--end-brightgreen.svg)](https://github.com/danieldspx/UFSMBot-Angular) [![](https://img.shields.io/badge/app-back--end-brightgreen.svg)](https://github.com/danieldspx/UFSMBot-NodeJS) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/danieldspx/UFSMBot-Angular/issues) [![](http://inch-ci.org/github/danieldspx/UFSMBot-NodeJS.svg?branch=develop)](http://inch-ci.org/github/danieldspx/UFSMBot-Angular)

## Instalação
Para poder rodar este projeto localmente você vai precisar do:
 - Node
 - NPM


Quando ambos estiverem instalados é preciso instalar o Angular CLI e o TypeScript:

    npm install -g @angular/cli

    npm install -g typescript

## Executar aplicação

### Dependências

Após clonar o projeto acesse a pasta do mesmo e instale todas as dependências necessárias

    npm install

### Configurar variáveis de acesso
Após criar o seu projeto no Firebase (Veja como no README do [UFSMBot-NodeJS](https://github.com/danieldspx/UFSMBot-NodeJS)), devemos configurar o Angular para se comunicar com o seu banco de dados. Acesse o o seu projeto no [Firebase](https://console.firebase.google.com/) e vá em:

    Project Overview > Settings > Geral

![](https://imgur.com/Du0PFJR.png)

Quando chegar nesta seção clique no seguinte ícone:

![](https://imgur.com/1QX0NE1.png)

Vai abrir algo assim:

![](https://imgur.com/yuJWZzD.png)Feito isto, abra o projeto acesse

    UFSMBot-Angular/src/environments

Observe que temos 2 arquivos, o `environment.ts` e o `environment.prod.ts`, atualize ambos os arquivos com as informações que obtivemos no Firebase. Esssas informações são públicas, e ninguém pode fazer nada com o seu projeto com elas, a menos que as regras no seu Cloud Firestore não estejam vulneráveis ou não configuradas.

### Configurar o Endpoint de acesso
Sempre que você quiser testar o seu servidor rodando em Node.js localmente você precisa ter certeza que o angular está fazendo requisições no lugar certo. Acesse o arquivo para configurar a URI em:

    src/app/configs/app.config.ts

Altere a propriedade `apiURI` para a que você deseja, se você quer testar apenas localmente configure assim:

    localhost:5000

## Development server

Rode `ng serve` para o servidor de desenvolvimento. Acesse`http://localhost:4200/`. O aplicativo vai atualizar automaticamente caso você altere algo no projeto.

**Obs.:** `http://localhost:4200/` é o endereço para acessar o aplicativo rodando em Angular. o `http://localhost:5000/` é para acessar o aplicativo rodando em Node.js

## Build

Rode `ng build` para fazer o build do projeto. Os arquivos do build serão salvos na pasta `dist/` . Utilize o `--prod` para fazer um build de produção.

### Build com o Back-end
Para integrar o Build ao Back-end, pegue os arquivos gerados e coloque na pasta `public/`.
