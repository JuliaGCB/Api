const { Router } = require("express");

const UsersController = require("../controllers/UsersController.js");

const usersRoutes = Router();

const usersController = new UsersController();

// mudando o app para usersRoutes
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes; //estou exportando esse arquivo para quem quiser usar