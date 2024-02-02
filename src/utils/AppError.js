class AppError { // usando para padronizar os erros que podem aparecer
    message; //variaveis
    statusCode;

    constructor(message, statusCode = 400){
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;