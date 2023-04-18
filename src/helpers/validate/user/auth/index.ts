import Joi from 'joi'

const login = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const register = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
})

export default {
    login,
    register
}