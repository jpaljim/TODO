"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
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
}, { collection: "tasks" });
TaskSchema.method("toJSON", function () {
    const _a = this.toObject(), { __v } = _a, object = __rest(_a, ["__v"]);
    return object;
});
TaskSchema.pre("save", function (next) {
    this.created = new Date();
    this.completed = false;
    next();
});
exports.Task = mongoose_1.model("task", TaskSchema);
