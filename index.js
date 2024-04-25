const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();
app.use(express.static('public'));
const PORT = 3000;

// Configuração do Mustache

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Definição da lista de tarefas
let tasks = [];

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota para a página inicial (lista de tarefas)
app.get('/', (req, res) => {
    res.render('index', { tasks: tasks });
});

// Rota para adicionar uma nova tarefa
app.post('/tarefa', (req, res) => {
    const { nome, url } = req.body;
    const novaTarefa = { nome, url };
    tasks.push(novaTarefa);
    // Criar uma rota dinâmica para a nova tarefa
    app.get(`/${url}`, (req, res) => {
        res.render('tarefa', { nome });
    });
    res.redirect('/');
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
