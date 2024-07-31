module.exports = {
    publicos: function() {
        return [
            "Participação na aula síncrona",
            "Correção das atividades sugeridas",
            "Apresentação do trabalho da disciplina 1",
            "Leitura do livro da semana"
        ]
        // mustache.render
    },
    privados: function() {
        return [
            "Apresentação do currículo do curso",
            "Inauguração do site",
            "Participação da maratona"
        ]
        // mustache.render
    },
    todos: function() {
        return this.publicos().concat(this.privados())
    }
}