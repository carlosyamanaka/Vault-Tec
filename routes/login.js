const express = require("express");
const router = express.Router();

const Acesso = require("../helpers/acesso");

let salvaUsuario = function (req, res, next) { //Salvando a sessao nos cookies
  if (req.body.lembrar) {
    res.cookie("email", req.body.email, { maxAge: 7 * 24 * 60 * 60 * 1000 });
  } else {
    res.clearCookie("email");
  }
  return next();
};

router.post("/login", salvaUsuario, Acesso.login);
router.get("/logout", Acesso.logout);

router.get("/loginautomatico", Acesso.login);

module.exports = router;
