const Toastify = require("toastify-js");
const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");

login = function (req, res, next) {
  let { email, senha } = req.body;
  let usuario = Usuario.getByLogin(email, senha);
  if (usuario == null) {
    req.session.messages = ["Falha ao realizar o login."];
    
      
    res.redirect("/?login=1");
  } else {
    req.session.user = usuario;
    res.redirect("/intranet?login=1");
  }
};

let salvaUsuario = function (req, res, next) {
  if (req.body.lembrar) {
    res.cookie("email", req.body.email, { maxAge: 7 * 24 * 60 * 60 * 1000 });
  } else {
    res.clearCookie("email");
  }
  return next();
};

let logout = function (req, res, next) {
  req.session.user = null;
  res.redirect("/");
};

router.post("/login", salvaUsuario, login);
router.get("/logout", logout);

module.exports = router;
