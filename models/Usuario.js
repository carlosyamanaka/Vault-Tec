module.exports = {
    getByLogin: function(email, senha) { //Coletar os dados pelo login
      let usuario = email.substr(0, email.indexOf("@")); //Coletei o nome do usuario a partir da primeira parte do email
      if (usuario != "") {
        return { id: this.toId(email), email: email, nome: usuario };
      }
      return null;
    },

    getByEmail: function(email) { //Coletar os dados pelo Email
      let usuario = email.substr(0, email.indexOf("@")); //Coletei o nome do usuario a partir da primeira parte do email
      return { id: this.toId(email), email: email, nome: usuario };
    },

    isAdmin: function(usuario) { //Verificar se é admin
        let email = usuario.email
        return email == process.env.ADMIN
    },

    toId: function(token) {
        var out = 0, len = token.length;
        for (pos = 0; pos < len; pos++) {
            out += (token.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
        }
        return out % 10000;
    }
}