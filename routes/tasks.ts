/*
    Tasks
    ruta: /api/tasks
*/

import { Router } from "express";
import { check } from "express-validator";

import { getTasks, createTask, updateTask } from "../controllers/tasks.controller";
import { validarCampos } from "../middlewares/validar-campos";

const taskRouter = Router();

taskRouter.get("/", getTasks);

// si alguno de estos dos campos no vienen en la petición de creación de la tarea, nos devolverá el error indicado en el check
taskRouter.post("/",[
    check('description','Description is required').not().isEmpty(),
    check('taskDate','Task date is required').not().isEmpty(),
    validarCampos
], createTask);


taskRouter.put("/:id", updateTask);

export default taskRouter;
