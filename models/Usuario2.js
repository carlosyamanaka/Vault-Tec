let ids = 0;
let profiles = [];

module.exports = {

    newProfile(nome, sobrenome, resumo, experiencia, tecnologias, linkedin, github, email, url) {
        let profile = {
            id: ++ids, 
            nome: nome, 
            sobrenome: sobrenome,
            resumo: resumo, 
            experiencia: experiencia, 
            tecnologias: tecnologias, 
            linkedin: linkedin, 
            github: github, 
            email: email, 
            url: url
        };
        profiles.push(profile);
        return profile;
    },

    updateProfile(id, nome, sobrenome, resumo, experiencia, tecnologias, linkedin, github, email, url) {
        let pos = this.getPositionById(id);
        if (pos >= 0) {
            let profile = profiles[pos];
            profile.nome = nome;
            profile.sobrenome = sobrenome;
            profile.resumo = resumo;
            profile.experiencia = experiencia;
            profile.tecnologias = tecnologias;
            profile.linkedin = linkedin;
            profile.github = github;
            profile.email = email;
        }
    },

    listProfiles() {
        return profiles;
    },

    getProfileById(id) {
        let pos = this.getPositionById(id);
        if (pos >= 0) {
            return profiles[pos];
        }
        return null;
    },

    getPositionById(id) {
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].id == id) {
                return i;
            }
        }
        return -1;
    },

    deleteProfile(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            profiles.splice(i, 1);
            return true;
        }
        return false; 
    }
}