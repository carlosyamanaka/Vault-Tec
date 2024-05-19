const Usuario = require('../models/Usuario')

module.exports = {
    estaLogado: function(req, res, next) {
        if (req.session.user != undefined && req.session.user != null) {
            return next()
        }
        req.session.messages = ["Usuário não autenticado"]
        res.redirect("/")
    },
    ehAdmin: function(req, res, next) {
        let logged = false
        if (req.session.user != undefined && req.session.user != null) {
            logged = true
            if (Usuario.isAdmin(req.session.user)) {
                return next()
            }
        }

        if (logged) {
            res.redirect("/intranet")
        } else {
            req.session.messages = ["Sem autorização"]
            res.redirect("/")
        }
    },
    login: function(req, res, next) {
        let usuario = Usuario.getByEmail(process.env.ADMIN)
        req.session.user = usuario
        res.redirect("/admin")
    }
}