"use strict";
/*
    Tasks
    ruta: /api/tasks
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const tasks_controller_1 = require("../controllers/tasks.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
const taskRouter = express_1.Router();
taskRouter.get("/", tasks_controller_1.getTasks);
// si alguno de estos dos campos no vienen en la petición de creación de la tarea, nos devolverá el error indicado en el check
taskRouter.post("/", [
    express_validator_1.check('description', 'Description is required').not().isEmpty(),
    express_validator_1.check('taskDate', 'Task date is required').not().isEmpty(),
    validar_campos_1.validarCampos
], tasks_controller_1.createTask);
taskRouter.put("/:id", tasks_controller_1.updateTask);
exports.default = taskRouter;
