const sqlite3 = require("sqlite3");//versão
const sqlite = require("sqlite");//oq vamos usar para se conectar
const path = require("path"); // è uma biblioteca do prorio Node, que resolve o problema com o endereçamento do banco de dados no hambiente

async function sqliteConnection(){ // ele vai criar o arquivo dentro do banco de dados se não tiver, se tiver vai se conectar
    const database = await sqlite.open({ //Aqui diz, espere o sqlite abrir 
        filename: path.resolve(__dirname, "..", "database.db"),// onde vai ficar salvo o arquivo //o dirname pega de forma automatica onde estou no projeto criei um arquivo chamado database.db
        driver: sqlite3.Database
    });
    
    return database;
}

module.exports = sqliteConnection;