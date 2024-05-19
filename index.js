const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session')
require('dotenv').config();

const appHost = process.env.APP_HOST;
const appUser = process.env.APP_USER;
const appPass = process.env.APP_PASS;


const app = express();
app.use(express.static('public'));
const PORT = 3030;

// Configuração do Mustache

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

let portfolio = [];

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.render('index', { portfolio: portfolio });
});

// Rota para adicionar um novo perfil
app.post('/portfolio', (req, res) => {
    const { nome, url } = req.body;
    const novoPerfil = { nome, url };
    portfolio.push(novoPerfil);
    // Criar uma rota dinâmica para a nova tarefa
    app.get(`/perfil/${url}`, (req, res) => {
        res.render('portfolio', { nome, url});
    });
    res.redirect('/');
});

// Sessão
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
