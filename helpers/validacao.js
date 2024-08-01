const Joi = require("joi");

const perfilSchema = Joi.object({
  nome: Joi.string().min(3),
  sobrenome: Joi.string().min(3),
  resumo: Joi.string().min(3),
  experiencia: Joi.string().min(3),
  github: Joi.string().min(10),
  linkedin: Joi.string().min(10),
  email: Joi.string().min(3).email(),
  url: Joi.string().alphanum(),
  projeto: Joi.string().min(3),
});

module.exports = {
  validaPerfil: function (body) {
    const validation = perfilSchema.validate(body, { abortEarly: false });
    if (validation.error) {
        return validation.error
    }
  },
};
