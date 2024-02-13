//criando uma organição de importação de rotas que vãoe stayr separadas por arquivos
const { Router } = require("express");

const usersRoutes = require("./users.routes")//grupo de rotas usuário
const notesRoutes = require("./notes.routes")//grupo de rotas de notas
const tagsRoutes = require("./tags.routes")//grupo de rotas de tags

const routes = Router(); // tem todas as rotas da aplicação

routes.use("/users", usersRoutes); //toda vez que alguem for acessar o /users vai ser direcionado para o usersRoutes
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;