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
exports.getTasks = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_1.Task.find();
    res.status(200).json({
        ok: true,
        tasks,
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
    const taskId = req.params._id;
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
