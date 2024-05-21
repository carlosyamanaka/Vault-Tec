let ids = 0;
let projects = [];

module.exports = {

    newProject(nome, descricao, tecnologias, githubUrl, imagemUrl) {
        let project = {
            id: ++ids, 
            nome: nome, 
            descricao: descricao,
            tecnologias: tecnologias, 
            githubUrl: githubUrl, 
            imagemUrl: imagemUrl, 
        };
        projects.push(project);
        return project;
    },

    listProjects() {
        return projects;
    },
}