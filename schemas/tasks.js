const joi = require('@hapi/joi');

const taskIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const taskTitleSchema = joi.string().max(80);
const taskContentSchema = joi.string().max(300);
const taskPrioritySchema = joi.string().max(30);
const taskDaysSchema = joi.array().items(joi.string().max(50));
const taskInitialHour = joi.string().max(20);
const taskFinalHour = joi.string().max(20);
const taskIsComplete = joi.boolean();
const createTaskSchema = {
  title: taskTitleSchema.required(),
  content: taskContentSchema.required(),
  priority: taskPrioritySchema.required(),
  initialHour: taskInitialHour.required(),
  finalHour: taskFinalHour.required(),
  isComplete: taskIsComplete.required(),
  days: taskDaysSchema,
};
const updateTaskSchema = {
  title: taskTitleSchema,
  content: taskContentSchema,
  priority: taskPrioritySchema,
  initialHour: taskInitialHour,
  finalHour: taskFinalHour,
  isComplete: taskIsComplete,
  days: taskDaysSchema,
};
module.exports = {
  taskIdSchema,
  createTaskSchema,
  updateTaskSchema,
};
