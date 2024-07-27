const express = require('express')
const router = express.Router()

const Acesso = require('../helpers/acesso')
const Eventos = require('../models/apagardps')
const Usuario = require('../models/Usuario')

let portfolio = [];

router.get("/", (req, res) => {
    let error = ""
    if (req.session.messages != undefined) {
        error = req.session.messages.pop()
    }
    res.render("index", {
        eventos: Eventos.publicos(), 
        email: req.cookies.email,
        error: error,
        portfolio: portfolio})
})

router.get("/intranet", Acesso.estaLogado, (req, res) => {
    res.render("restrito", {eventos: Eventos.privados(), 
                            usuario: req.session.user.nome, 
                            isAdmin: Usuario.isAdmin(req.session.user),
                            portfolio: portfolio})
})

router.get('/criarperfil', Acesso.estaLogado, (req, res) => {
    res.render('perfil');
}); 

router.post("/criarperfil", Acesso.estaLogado, (req, res) => {
    const { nome, url } = req.body;
    const novoPerfil = { nome, url };
    console.log('Criando perfil')
    // Adiciona o novo perfil à lista de perfis
    portfolio.push(novoPerfil);
    res.redirect('/intranet?login=1');
});

router.get("/perfil/:url", (req, res) => {
    const { url } = req.params;
    const perfil = portfolio.find(perfil => perfil.url === url);
    if (!perfil) {
        return res.status(404).send('Perfil não encontrado');
    }
    res.render('perfil', { nome: perfil.nome, url });
});

router.get("/admin", Acesso.ehAdmin, (req, res) => {
    res.render("admin", {eventos: Eventos.todos(), usuario: "Admin"})
})

router.get("/loginautomatico", Acesso.login)

module.exports = router
