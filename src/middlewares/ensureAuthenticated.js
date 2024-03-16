const { verify }  = require("jsonwebtoken"); 
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
/**
 * fazendo a verificação com o widdleware
 * spli separa a string passando ela para um vetor
 * 
 */
function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT Token não informado", 401); // aqui se o token tem autorização

    }
    const [, token] = authHeader.split(" ");

    try{
        const {sub: user_id} = verify(token, authConfig.jwt.secret); // verificação a configuração do jwt. // sub é o conteudo armazenado. criando um apelido que é o user_id para o token

        request.user = {
            id: Number(user_id),
        };

        return next();
    }catch{
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;
