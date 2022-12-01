const Joi = require('joi');

const isRequiredString = Joi.string().required();
const isDisplayName = Joi.string().required().min(8);
const isEmail = Joi.string().required().email();
const isPassword = Joi.string().required().min(6);

module.exports = {
    isRequiredString,
    isDisplayName,
    isEmail,
    isPassword,
};