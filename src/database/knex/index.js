const config = require("../../../knexfile");
const knex = require("knex");

const connection = knex(config.development) // fazendo a configuração do knex que vai fazer a conexão com o banco de dados


module.exports = connection;