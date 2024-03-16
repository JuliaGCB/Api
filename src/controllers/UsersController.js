const { hash, compare } = require ("bcryptjs"); //instalado com o npm // criptografando a senha e comparando ela
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
    /**
     * TER APENAS 5 METODOS *Não precisar ter todos*
     * index - GET para listar vários registros
     * show - GET para exibir um registro especifico
     * create - POST para criar um registro
     * uptade - PUT para atualizar um registro
     * delete - DELETE para remover um registro
     */
    async create(request, response) {
        const { name, email, password} = request.body;
        const database = await sqliteConnection();
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email]);//para confirmar se um e-mail ja esat sendo usado

        if (checkUserExist){
            throw new AppError("Este e-mail já esta em uso.");   
        }

        const hashedPassword = await hash(password, 8); //criptogranfando a senha so usuario

        await database.run("INSERT INTO users (name, email, password)VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );//quero inserir em

        return response.status(201).json();
    };
    async update(request, response) { // para atualizar os dados
        const { name, email, password, old_password} = request.body; //desistruturando do body
        const user_id = request.user.id; //aqui foi mudado pois o id agora é passado dentro da requicição ( pasta middleware)

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if(!user){
            throw new App ("Usuário não encontrado");
        } // se o usuario não for encontrado

        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){ // se ele encontrar um email e um id que for diferente do id do usuario, significa que esta tentando mudar o e-mail que ja existe, de outra pessoa

        throw new AppError ("Este e-mail já está em uso");
        }

        user.name = name ?? user.name; // mudando para o novo nome que ele passou// validando o name
        user.email = email ?? user.email; // mudando para o novo email que ele passou

        if( password && !old_password ){
            throw new AppError ("Você precisa informar a senha antiga apra definir a nova senha");
        } // fazendo a verificação para informar a antiga senha

        if (password && old_password){
            const checkOldPassword = await compare(old_password, user.password);// comparando as senhas se não são a mesma
            
            if(!checkOldPassword){
                throw new AppError ("A senha antiga não confere");
            }
            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')  
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id] // atualizando o usuário // DATATIME é uam funão do proprio banco para atualizar a data
        );

        return response.json(); //mensagem para retornar se foi certo
    }
}
module.exports = UsersController;