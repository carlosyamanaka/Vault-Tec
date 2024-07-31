const express = require('express')
const router = express.Router()
const Joi = require("joi");

const Acesso = require("../helpers/acesso");

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
    const { nome, sobrenome, resumo, experiencia, linkedin, github, email, url, projeto } = req.body;
    const novoPerfil = { nome, sobrenome, resumo, experiencia, linkedin, github, email, url, projeto };
    const validation = perfilSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    console.log('Criando perfil')
    // Adiciona o novo perfil à lista de perfis
    portfolio.push(novoPerfil);
    res.redirect(`/perfil/${novoPerfil.url}`);
});

router.get("/perfil/:url", (req, res) => {
    const { url } = req.params;
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

module.exports = router
