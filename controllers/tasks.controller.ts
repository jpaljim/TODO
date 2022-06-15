import { Response, response } from "express";
import { Task } from "../models/Task";

export const getTasks = async (req: any, res: Response) => {

  // Paginación
  const desde = Number(req.query.desde) || 0;

  //De esta forma tenemos el resultado de la primera promesa en la primera constante (taskList) y el resultado de la segunda promesa en total de tareas que hay
  const [taskList, total] = await Promise.all(
    [
      Task.find({}, "description created taskDate completed").skip(desde).limit(5),
      Task.countDocuments()
    ]
  );

  res.status(200).json({
    ok: true,
    taskList,
    total
  });
};

export const createTask = async (req: any, res: Response) => {
  const task = new Task({
    ...req.body,
  });

  try {
    const taskDB = await task.save();
    res.status(201).json({
      ok: true,
      task: taskDB,
    });
  } catch {
    res.status(500).json({
      ok: false,
      msg: "Task creation error.",
    });
  }
};

export const updateTask = async (req: any, res: Response) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        ok: false,
        msg: "Task does not exist.",
      });
    }

    const taskToUpdate = {
      ...req.body,
    };

    const taskUpdated = await Task.findByIdAndUpdate(taskId, taskToUpdate, { new: true });

    // Devolvemos el registro actualizado
    res.json({
      ok: true,
      task: taskUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error updating task.",
    });
  }
};
