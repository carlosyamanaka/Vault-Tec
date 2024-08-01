let profiles = [];

//Utilizei o URL como ID, pois ele é único

module.exports = {
  newProfile( //Criar novo perfil
    nome,
    sobrenome,
    resumo,
    experiencia,
    linkedin,
    github,
    email,
    url,
    projeto
  ) {
    let profile = {
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
    profiles.push(profile);
    return profile;
  },

  updateProfile( //Editar perfil
    nome,
    sobrenome,
    resumo,
    experiencia,
    linkedin,
    github,
    email,
    url,
    projeto
  ) {
    let pos = this.getPositionByUrl(url);
    if (pos >= 0) {
      let profile = profiles[pos];
      profile.nome = nome;
      profile.sobrenome = sobrenome;
      profile.resumo = resumo;
      profile.experiencia = experiencia;
      profile.linkedin = linkedin;
      profile.github = github;
      profile.email = email;
      profile.projeto = projeto;
    } else {
      console.log("Perfil não encontrado")
    }
  },

  listProfiles() { //Listar todos os perfis
    return profiles;
  },

  deleteProfile(url) { //Deletar perfil pela url
    let i = this.getPositionByUrl(url);
    if (i >= 0) {
      profiles.splice(i, 1);
      return true;
    }
    return false;
  },

  getProfileByUrl(url) { //Puxar os dados do perfil pela url
    for (let i = 0; i < profiles.length; i++) {
      if (url == profiles[i].url) {
        return profiles[i];
      }
    }
    return null;
  },

  getPositionByUrl(url) { //Puxar a posição do perfil pela url
    for (let i = 0; i < profiles.length; i++) {
      if (profiles[i].url == url) {
        return i;
      }
    }
    return -1;
  },

  checkPerfilExists(url) { //Verificar se a url é uma existente, utilizado para identificar se vai ocorrer uma edição ou criação de novo Perfil
    return profiles.find((perfil) => perfil.url === url);
  }
};

