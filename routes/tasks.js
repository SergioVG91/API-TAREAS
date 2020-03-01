const express = require('express');
const TasksService = require('../services/TasksService');

const { taskIdSchema, createTaskSchema, updateTaskSchema } = require('../schemas/tasks');
const validationHandler = require('../utils/middlewares/validationHandler');

const tasks = (app) => {
  const router = express.Router();
  const tasksService = new TasksService();
  app.use('/api/tasks', router); //Indicamos cual es la ruta de inicio de esta funcion

  router.get('/', async (req, res, next) => {
    //El next es para manejar un middleware, en este caso manejaremos middleware de error
    try {
      const { days } = req.query;
      const dataTasks = await tasksService.getTasks({ days });
      res.status(200).json({
        data: dataTasks,
        message: 'data listened',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:taskId',
    validationHandler({ taskId: taskIdSchema }, 'params'),
    async (req, res, next) => {
      try {
        const { taskId } = req.params;
        const task = await tasksService.getTask({ taskId });
        res.status(200).json({
          data: task,
          message: 'data retrieved',
        });
      } catch (error) {
        next(error);
      }
    },
  );

  router.post('/', validationHandler(createTaskSchema), async (req, res, next) => {
    try {
      const { body: task } = req;
      const createdTaskId = await tasksService.createTask({ task });
      res.status(201).json({
        data: createdTaskId,
        message: 'data created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:taskId',
    validationHandler({ taskId: taskIdSchema }, 'params'),
    validationHandler(updateTaskSchema),
    async (req, res, next) => {
      try {
        const { taskId } = req.params;
        const { body: task } = req;
        const updatedTaskId = await tasksService.updateTask({
          taskId,
          task,
        });
        res.status(200).json({
          data: updatedTaskId,
          message: 'data updated',
        });
      } catch (error) {
        next(error);
      }
    },
  );

  router.delete(
    '/:taskId',
    validationHandler({ taskId: taskIdSchema }, 'params'),
    async (req, res, next) => {
      try {
        const { taskId } = req.params;
        const deletedTaskId = await tasksService.deleteTask({ taskId });
        res.status(200).json({
          data: deletedTaskId,
          message: 'data deleted',
        });
      } catch (error) {
        next(error);
      }
    },
  );
};

module.exports = tasks;
