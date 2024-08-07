const Usuario = require('../models/Usuario')

module.exports = {
    estaLogado: function(req, res, next) { //Verifica se está logado e se não estiver, não permite a entrada
        if (req.session.user != undefined && req.session.user != null) {
            return next()
        }
        req.session.messages = ["Usuário não autenticado"]
        res.redirect("/")
    },
    ehAdmin: function(req, res, next) { //Faz a rota de adm
        let logged = false
        if (req.session.user != undefined && req.session.user != null) {
            logged = true
            if (Usuario.isAdmin(req.session.user)) {
                return next()
            }
        }

        if (logged) {
            res.redirect("/hub")
        } else {
            req.session.messages = ["Sem autorização"]
            res.redirect("/")
        }
    },
    login: function (req, res, next) { //Metodo de login
        let { email, senha } = req.body;
        let usuario = Usuario.getByLogin(email, senha);
        if (usuario == process.env.ADMIN || senha == process.env.SENHA) { //Confere o user e senha
            req.session.user = usuario; //Seta o user na session e permite a entrada
            res.redirect("/hub?login=1");
        } else {
            console.log("falha")
          req.session.messages = ["Falha ao realizar o login."];

          res.redirect("/?login=1");
        }
    },

    logout: function (req, res, next) {
        req.session.user = null;
        res.redirect("/");
    },
}