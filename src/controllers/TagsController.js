const knex = require('../database/knex');

class TagsController {
    async index(request, response){
        const user_id  = request.user.id; // buscando o user id dos parametros

        const tags = await knex("tags")
        .where({user_id})
        .groupBy("name") //agrupando as tags por nome, para não se repetir

        return response.json(tags);
    }
}

module.exports = TagsController;