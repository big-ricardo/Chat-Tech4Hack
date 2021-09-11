# Chat Tech4HACKATON

---

## Descrição do Projeto

HACKATON Tech4Humans

O que foi feito como aplicação?
Nós utilizamos o SignalR da Azure para a criação de uma aplicação com Login, Register e ChatRoom de broadcast e ao clicar em um Username você consegue mandar uma mensagem privada. Utilizamos em conjunto a API da GoTiT.

Objetivo de uso da API do GOTIT.
Utilizamos a API para retornar as emoções e sentimentos em cada mensagem enviada dentro da ChatRoom.

Como instalar a aplicação com suas devidas configurações?
Como instalar o banco de dados?
Como executar?
Foi descrito no (#Rodando).

Como utilizar?
É necessário rodar a aplicação nos terminais, abrindo assim a URL localhost com a aplicação, onde você entra e clica em "Sign up for free" se não tiver conta, realizando o cadastro, logo depois você será redirecionado a uma rota de login, nela faça login entrando com suas credenciais e clicando em "Sign in". Ao realizar esses passos ira abrir uma tela com as rooms disponíveis ai só acessar uma para ir para o Chat.

---

<hr></hr>

## Conteúdo

- [Tecnologias](#Tecnologias)
- [Status](#Status)
- [Rodando](#Rodando)
- [Futuro](#Futuro)
- [Autores](#Autores)

## Tecnologias

- [Node.JS](https://nodejs.org/en/) Version: 10, 12 ou 14.
- [React.JS](https://pt-br.reactjs.org/) Version: 17.0.2
- [PostgreSQL](https://www.postgresql.org/)
- Axios version: 0.21.1
- SignalR

## Status

- Finalizado.

## Rodando

### Começando:

É necessário que já esteja instalado em sua máquina:

- [Node.JS](https://nodejs.org/en/) Version: 10, 12 ou 14.
- [PostgreSQL](https://www.postgresql.org/).
- Um editor de código, nós usamos o [VSCode](https://code.visualstudio.com/).

### Primero passo:

Crie uma pasta e execute o comando git clone nela:

```
# No terminal digite:
git clone https://github.com/Luiss1569/Chat-Tech4Hack.git
```

### Segundo passo:

Baixe as depêndencias:
O diretório Chat-Tech4Hack foi criado em sua máquina, entre no diretorio.

<h2>FrontEnd</h2>
No terminal rode:

```
# Vá até a pasta:
cd Chat-Tech4Hack/frontend
# Instale as depêndencias:
npm install
```

<h2>BackEnd</h2>

```
# Volte uma pasta com: cd ..
# Vá até a pasta:
cd Chat-Tech4Hack/backend
# Instale as depêndencias:
npm install
```

### Terceiro passo:

Entre no site o pgAdmin e baixe para uma melhor facilidade na visualização da DataBase https://www.pgadmin.org/download/. Ou ultilize o terminal com os comandos de visualização da DataBase. De qualquer maneira você já deve ter conta no PostgreSQL para ter um username e password. É possível criar uma conta depois da instalação do pgAdmin ou diretamente no terminal.  
Entre no site da GoTiT https://www.gotit.ai/ e crie uma conta, pegando seu username, password e chave API.

Entre no editor de código e entre no backend e crie uma pasta chamada .env:
Adicionte o seguinte conteúdo trocando para seus dados do Banco de Dados:

```
TOKEN_SECRET=CHAVESECRETA

DATABASE_USERNAME=seu username aqui (by default é postgres)
DATABASE_PASSWORD=sua senha do banco aqui
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_DATABASE=nome da sua data base aqui

GOTIT_USERNAME=seu username da GoTiT aqui
GOTIT_PASSWORD=seu password da GoTiT aqui
GOTIT_URI=https://api.gotit.ai/NLU/v1.5
```
No Backend crie um file chamada local.settings.json e nele coloque o seguinte código
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureSignalRConnectionString": passe o endpoint da azure aqui,
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "http://localhost:8080,https://azure-samples.github.io,passe a url do front end aqui",
    "CORSCredentials": true
  }
}

```

Entre no editor de código e entre no frontend e crie uma pasta chamada .env:
Adicionte o seguinte conteúdo trocando para seus dados do Banco de Dados:

```
REACT_APP_MYAPI_URI=http://localhost:7071
```

### Quarto passo:

Crie o Banco e a Table com o migration do Sequelize:
Após alterar o .env, entre no terminal:

```
# Vá até a pasta:
cd Chat-Tech4Hack/backend
# Criando a DataBase:
npm sequelize db:create
# Criando a Table:
npm sequelize-cli db:migrate
```

### Quinto passo:

Rode a aplicação:
Abra dois terminais diferntes:

<h2>FronEnd</h2>

```
# Vá até a pasta:
cd Chat-Tech4Hack/frontend
# Rode a aplicação:
npm start
```

<h2>BackEnd</h2>

```
# Vá até a pasta:
cd Chat-Tech4Hack/backend
# Rode a aplicação:
func start
```

Se você seguiu os passos corretamente irá abrir uma aba no seu navegador principal, onde estará rodando a aplicação.

<h2>Criar uma Room</h2>
Infelizmente não foi possível adicionar uma página para criar uma nova room, sendo assim você deve criar uma conta e fazer login pelo site, 
com isso você será direcionado para a rota "/rooms". Não tendo nada pois não possui nenhuma room cadastrada em seu nome, para criar você deve acessar o seu Chrome DevTools 
ir "Application" depois em "Local Storage" terá um campo chamado token, você deve copia-lo.

Agora você deve acessar um simulador de chamadas API, ex: Postman, Insomina...
Com ele aberto, você ira adicionar a rota onde o backend está rodando, comumente "http://localhost:7071"  e adicionar "/api/room" ficando então "http://localhost:7071/api/room".
Colocar o método da chamada para "post", no corpo da requisição você irá adicionar um objeto json contendo o nome da room que você deseja criar:

```
{
  "name": "nome da room"
}
```
Agora adicionar no cabeçalho da requisição um campo token onde você irá adicionar o token que foi copiado.

Com isso só enviar a requisição e atualizar a página do react, onde a room já ira aparecer para você, com isso só clicar nela que você será redirecionado para a tela de chat. 

## Testar.
Agora é só entrar na room, abra uma nova guia na tela incial do projeto sem fechar a anterior, crie e faça  login com uma nova conta, agora entre na room ja criada e faça o teste do chat, não esqueça de manter a primeira tela aberta, senão você entrará em duas telas com o mesmo login!!!


## Autores

<img src="https://avatars.githubusercontent.com/u/78224429?s=400&u=2dd2a42c63a60f2a1f519a16828ef8f0aa755467&v=4" width="100px;" alt=""/>
<b>Diovana Tavares dos Reis</b> 🐣 <br>
Feito com ❤️ por Diovana Tavares 🤝 Entre em contato! <br><br>
<a href="https://www.instagram.com/diovana_tavares/"> 
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" />
</a>&nbsp;&nbsp; <br>
<a href="mailto:diovanatavaresr@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
</a>&nbsp;&nbsp; <br>

<img src="https://pps.whatsapp.net/v/t61.24694-24/206849768_196039702456718_4788098615142983361_n.jpg?ccb=11-4&oh=b4a3d0472e61716dd44f4bbeaaef3f96&oe=611AE981" width="100px;" alt=""/>
<b>Luis Ricardo Santos</b> 👾 <br>
Feito com ❤️ por Luis Ricardo 🤝 Entre em contato! <br><br>
<a href="https://www.instagram.com/luisricar_do/"> 
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" />
</a>&nbsp;&nbsp; <br>
<a href="mailto:luisricardo0626@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
</a>&nbsp;&nbsp; <br>

--- Copyright (c) 2021 Código e documentação: Diovana Tavares dos Reis & Luis Ricardo Santos ---
