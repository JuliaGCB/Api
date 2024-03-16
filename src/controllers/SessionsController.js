const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');
const authConfig = require('../configs/auth');
const {sign} = require('jsonwebtoken'); //metodo o jsonwebtoken

/**
 * Aqui nessa pagina estamos fazendo a autenticação do usuario
 * Fazendo as configurações parte da integração com o front
 * Depois vamos precisar ir ao insominia e usar uma função dele para guardar o token do usuario
 */

class SessionsController{
    async create(request, response){
        const {email, password} = request.body;

        const user = await knex("users").where({email}).first(); //validando se o usuário existe

        if(!user){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const passwordMatched = await compare(password, user.password); //Validando se a senha esta correta

        if(!passwordMatched){ 
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const { secret, expiresIn } = authConfig.jwt; // criando o Token 
        const token = sign({}, secret, {
            subject: String(user.id), // colocando o id do usuário dentro do token e quando vai expirar
            expiresIn
        })
        


        return response.json({user, token});
    }
}


module.exports = SessionsController;