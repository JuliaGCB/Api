const sqliteConnection = require ('../../sqlite');
const createUsers = require ('./createUsers')

async function migrationsRun(){
    const schemas = [
        createUsers //vertor// Pegar todas as migrations
    ].join(' ');//remover os espaços// juntar todas e usar como paramentro um "NADA"
    sqliteConnection().then(db => db.exec(schemas)) //chamando as migrations
    .catch(error => console.error(error));// tratar o erro
}

module.exports = migrationsRun