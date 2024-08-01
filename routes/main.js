const express = require('express')
const router = express.Router()
const Joi = require("joi");

const Acesso = require("../helpers/acesso");
const Usuario = require("../models/Usuario");

let portfolio = [];

const perfilSchema = Joi.object({
  id: Joi.number(),
  nome: Joi.string().min(3),
  sobrenome: Joi.string().min(3),
  resumo: Joi.string().min(3),
  experiencia: Joi.string().min(3),
  github: Joi.string().min(10),
  linkedin: Joi.string().min(10),
  email: Joi.string().min(3),
  url: Joi.string(),
  projeto: Joi.string().min(3),
});

router.get('/criarperfil', Acesso.estaLogado, (req, res) => {
    res.render('criarPerfil');
}); 

router.post("/criarperfil", Acesso.estaLogado, (req, res) => {
    const {nome, sobrenome, resumo, experiencia, linkedin, github, email, url, projeto } = req.body;
    const novoPerfil = { nome, sobrenome, resumo, experiencia, linkedin, github, email, url, projeto };
    
    const validation = perfilSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    console.log('Criando perfil')
    // Adiciona o novo perfil à lista de perfis
    let perfil = portfolio.find((perfil) => perfil.url === url)
    if (perfil) {
        //Tá com erro aqui, to tentando sobreescrever mas ele ta falando q n eh possivel apos enviar ao cliente
        portfolio[perfil.id] = {
          nome: nome,
          sobrenome: sobrenome,
          resumo: resumo,
          experiencia: experiencia,
          linkedin: linkedin,
          github: github,
          email: email,
          url: url,
          projeto: projeto,
        };
        res.redirect(`/perfil/${perfil.url}`);
    } else {
        portfolio.push(novoPerfil);
        res.redirect(`/perfil/${novoPerfil.url}`);
    }
});

router.get("/perfil/:url", (req, res, next) => {
    const { url } = req.params; //URL TÁ AQUI
    const perfil = portfolio.find(perfil => perfil.url === url);
    if (!perfil) {
        return res.status(404).send('Perfil não encontrado');
    }

    res.render('perfil', { 
        nome: perfil.nome,
        sobrenome: perfil.sobrenome,
        resumo: perfil.resumo,
        experiencia: perfil.experiencia,
        linkedin: perfil.linkedin,
        github: perfil.github,
        email: perfil.email,
        url: perfil.url, 
        projeto: perfil.projeto
    });
});

router.get("/", (req, res) => {
  let error = "";
  if (req.session.messages != undefined) {
    error = req.session.messages.pop();
  }
  res.render("index", {
    email: req.cookies.email,
    error: error,
    portfolio: portfolio,
  });
});

router.get("/hub", Acesso.estaLogado, (req, res) => {
  res.render("hub", {
    usuario: req.session.user.nome,
    isAdmin: Usuario.isAdmin(req.session.user),
    portfolio: portfolio,
  });
});

router.get("/editarPerfil/:url", Acesso.estaLogado, (req, res) => {
  const { url } = req.params; //URL TÁ AQUI
  const perfil = portfolio.find((perfil) => perfil.url === url);
  if (!perfil) {
    return res.status(404).send("Perfil não encontrado");
  }

  res.render("criarPerfil", {
    nome: perfil.nome,
    sobrenome: perfil.sobrenome,
    resumo: perfil.resumo,
    experiencia: perfil.experiencia,
    linkedin: perfil.linkedin,
    github: perfil.github,
    email: perfil.email,
    url: perfil.url, //Deixar a url inalterável
    projeto: perfil.projeto,
  });
})

module.exports = router
