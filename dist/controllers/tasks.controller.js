"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../models/Task");
exports.getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Paginación
    const desde = Number(req.query.desde) || 0;
    //De esta forma tenemos el resultado de la primera promesa en la primera constante (taskList) y el resultado de la segunda promesa en total de tareas que hay
    const [taskList, total] = yield Promise.all([
        Task_1.Task.find({}, "description created taskDate completed").skip(desde).limit(5),
        Task_1.Task.countDocuments()
    ]);
    res.status(200).json({
        ok: true,
        taskList,
        total
    });
});
exports.createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new Task_1.Task(Object.assign({}, req.body));
    try {
        const taskDB = yield task.save();
        res.status(201).json({
            ok: true,
            task: taskDB,
        });
    }
    catch (_a) {
        res.status(500).json({
            ok: false,
            msg: "Task creation error.",
        });
    }
});
exports.updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const task = yield Task_1.Task.findById(taskId);
        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: "Task does not exist.",
            });
        }
        const taskToUpdate = Object.assign({}, req.body);
        const taskUpdated = yield Task_1.Task.findByIdAndUpdate(taskId, taskToUpdate, { new: true });
        // Devolvemos el registro actualizado
        res.json({
            ok: true,
            task: taskUpdated,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error updating task.",
        });
    }
});
