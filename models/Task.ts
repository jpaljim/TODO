import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
    },
    taskDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
    },
  },
  { collection: "tasks" }
);

TaskSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

interface ITask extends Document {
  description: string;
  created: Date;
  taskDate: Date;
  completed: boolean;
}

TaskSchema.pre<ITask>("save", function (next) {
  this.created = new Date();
  this.completed = false;
  next();
});

export const Task = model("task", TaskSchema);
