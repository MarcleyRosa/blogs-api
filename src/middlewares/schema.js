const Joi = require('joi');

const isName = Joi.string().required();

module.exports = {
    isName,
};