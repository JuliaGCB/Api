const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete); //usando uma rota para deletar as notas

module.exports = notesRoutes; //estou exportando esse arquivo para quem quiser usar// no caso outro arquivo