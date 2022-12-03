const Joi = require('joi');

const isRequiredString = Joi.string().required();
const isDisplayName = Joi.string().required().min(8);
const isEmail = Joi.string().required().email();
const isPassword = Joi.string().required().min(6);
const isToken = Joi.string().required().min(16);

const isPost = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
});

module.exports = {
    isRequiredString,
    isDisplayName,
    isEmail,
    isPassword,
    isToken,
    isPost,
};