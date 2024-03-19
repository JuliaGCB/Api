const { Router } = require("express");
const multer = require("multer");
const uploadconfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router();
const upload = multer(uploadconfig.MULTER)


const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

/**
 * patch é para atualizar um campo espeficico que é o avatar 
 */

// mudando o app para usersRoutes
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)// chama a rota avatar, passa pelo middleware, faz upload da imagem e leva para a pasta de upload e cadastra no banco

module.exports = usersRoutes; //estou exportando esse arquivo para quem quiser usar