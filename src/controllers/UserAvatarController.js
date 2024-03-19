const knex = require('../database/knex');
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController{

    async update(request, response){
        const user_id = request.user.id;
        const avatarFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("users")
        .where({ id: user_id }).first();

        if(!user){ //verificando se o usuario existe
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
        }

        if(user.avatar){ //verificando se dentro do usuario existe um avatar// se existir apagar a foto antiga para colocar a nova
            await diskStorage.deleteFile(user.avatar); //deletando a foto antiga
        }

        const filename = await diskStorage.saveFile(avatarFilename);
        user.avatar = filename;

        await knex("users").update(user).where({ id: user_id }); // para atualizar somente o usuário espeficico

        return response.json(user);
    }
}


/**
 * Aqui vamos atualizar a imagem do usuario
 * e guardar ela no banco de dados
 */

module.exports = UserAvatarController;