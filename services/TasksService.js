const MongoLib = require('../lib/mongo');

class TasksService {
  constructor() {
    this.collection = 'tasks';
    this.mongoDB = new MongoLib();
  }

  async getTasks({ days }) {
    const query = days && { days: { $in: days } };
    const tasks = await this.mongoDB.getAll(this.collection, query);
    return tasks || [];
  }

  async getTask({ taskId }) {
    const task = await this.mongoDB.get(this.collection, taskId);
    return task || {};
  }

  async createTask({ task }) {
    const createTaskId = await this.mongoDB.create(this.collection, task);
    return createTaskId || {};
  }

  async updateTask({ taskId, task } = {}) {
    const updateTask = await this.mongoDB.update(this.collection, taskId, task);
    return updateTask;
  }

  async deleteTask({ taskId }) {
    const deletedTaskId = await this.mongoDB.delete(this.collection, taskId);
    return deletedTaskId;
  }
}
module.exports = TasksService;
