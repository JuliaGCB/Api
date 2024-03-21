require ("express-async-errors"); //importação da biblioteca
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload")

const cors = require ("cors");
const express = require('express'); //importou o express
const routes =  require("./routes")

migrationsRun(); //desse jeito ja consigo usar a função dentro da pasta database

const app = express(); //inicializando o express
app.use(cors()) //habilitando o back-end para que ele possa atender o front
app.use(express.json()); //falando para o node que o arquivo é JSON

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); //Buscando a foto do usuario para ser exibida no insominia

app.use(routes)

app.use((error, request, response, next)  =>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"error",
            message:error.message
        });
    } //erro pelo cliente

    console.error(error);
    //se nçao for o erro do cliente monstrar erro no servidor 500
    return response.status(500).json({
        status:"error",
        message: "Internal Server Error"
    })

    
});

const PORT  = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));