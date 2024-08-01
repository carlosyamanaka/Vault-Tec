let profiles = [];

module.exports = {
  newProfile(
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

  updateProfile(
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

  listProfiles() {
    return profiles;
  },

  deleteProfile(url) {
    let i = this.getPositionByUrl(url);
    if (i >= 0) {
      profiles.splice(i, 1);
      return true;
    }
    return false;
  },

  getProfileByUrl(url) {
    for (let i = 0; i < profiles.length; i++) {
      if (url == profiles[i].url) {
        return profiles[i];
      }
    }
    return null;
  },

  getPositionByUrl(url) {
    for (let i = 0; i < profiles.length; i++) {
      if (profiles[i].url == url) {
        return i;
      }
    }
    return -1;
  },

  checkPerfilExists(url) {
    return profiles.find((perfil) => perfil.url === url);
  }
};

