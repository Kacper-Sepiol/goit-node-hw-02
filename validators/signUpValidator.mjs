import Joi from "joi";

export const signUpValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.required(),
});

export const verifyEmail = Joi.object({
    email: Joi.string().email().required(),
});
