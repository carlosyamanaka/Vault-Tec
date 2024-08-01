const express = require('express');
const router = express.Router();

const Acesso = require("../helpers/acesso");
const Usuario = require("../models/Usuario");
const Perfil = require("../models/Perfil");
const Validacao = require("../helpers/validacao");



router.get('/criarperfil', Acesso.estaLogado, (req, res) => {
    res.render('criarPerfil');
}); 

router.post("/criarperfil", Acesso.estaLogado, (req, res) => {
  //Dados recebidos do formulário
  const {
    nome,
    sobrenome,
    resumo,
    experiencia,
    linkedin,
    github,
    email,
    url,
    projeto,
  } = req.body;

  const codErr = Validacao.validaPerfil(req.body); //Puxa a validação dos campos do perfil
  if (codErr) { //Se tiver erro, para a execucao e retorna o erro
    const errors = codErr.details.map((detail) => detail.message);
    return res.status(422).send(errors);

  }
  
  let perfil = Perfil.checkPerfilExists(url); //Se for uma url já existente vai ocorrer uma edição
  if (perfil) {
    Perfil.updateProfile(
      nome,
      sobrenome,
      resumo,
      experiencia,
      linkedin,
      github,
      email,
      url,
      projeto
    );
    res.redirect(`/perfil/${perfil.url}`);
  } else {
    console.log("Criando novo perfil");
    Perfil.newProfile(
      nome,
      sobrenome,
      resumo,
      experiencia,
      linkedin,
      github,
      email,
      url,
      projeto,
    );
    // Adiciona o novo perfil à lista de perfis
    res.redirect(`/perfil/${url}`);
  }
});

router.get("/perfil/:url", (req, res, next) => {
    const { url } = req.params; //URL TÁ AQUI
    let perfil = Perfil.checkPerfilExists(url);
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
    portfolio: Perfil.listProfiles()
  });
});

router.get("/hub", Acesso.estaLogado, (req, res) => {
  res.render("hub", {
    usuario: req.session.user.nome,
    isAdmin: Usuario.isAdmin(req.session.user),
    portfolio: Perfil.listProfiles()
  });
});

//Para editar perfil reutilizei o mustache criarPerfil, puxo os dados do perfil e coloco no value
//E para enviar os dados utilizo novamente a rota criarPerfil, mas não faço um novo push e sim edito
router.get("/editarPerfil/:url", Acesso.estaLogado, (req, res) => {
  const { url } = req.params; //URL TÁ AQUI
  let perfil = Perfil.checkPerfilExists(url)
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
    url: perfil.url,
    readonly: "readonly", //URL inalteravel na edição
    projeto: perfil.projeto,
  });
})

router.get("/excluirperfil/:url", Acesso.estaLogado, (req, res) => {
  const { url } = req.params;
  Perfil.deleteProfile(url);
  console.log("Perfil excluido");
  res.redirect("/");
})

module.exports = router
