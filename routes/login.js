const Toastify = require("toastify-js");
const express = require("express");
const router = express.Router();

const Acesso = require("../helpers/acesso");
const Eventos = require("../models/apagardps");

let salvaUsuario = function (req, res, next) {
  if (req.body.lembrar) {
    res.cookie("email", req.body.email, { maxAge: 7 * 24 * 60 * 60 * 1000 });
  } else {
    res.clearCookie("email");
  }
  return next();
};

router.post("/login", salvaUsuario, Acesso.login);
router.get("/logout", Acesso.logout);


router.get("/", (req, res) => {
  let error = "";
  if (req.session.messages != undefined) {
    error = req.session.messages.pop();
  }
  res.render("index", {
    eventos: Eventos.publicos(),
    email: req.cookies.email,
    error: error,
    portfolio: portfolio,
  });
});

router.get("/hub", Acesso.estaLogado, (req, res) => {
  res.render("hub", {
    eventos: Eventos.privados(),
    usuario: req.session.user.nome,
    isAdmin: Usuario.isAdmin(req.session.user),
    portfolio: portfolio,
  });
});

//Mexer!
router.get("/admin", Acesso.ehAdmin, (req, res) => {
  res.render("admin", { eventos: Eventos.todos(), usuario: "Admin" });
}); 

router.get("/loginautomatico", Acesso.login);

module.exports = router;
