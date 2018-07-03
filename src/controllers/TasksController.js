/*
 * Define Tasks controller
 */

const TasksService = require('../services/TasksService');

/**
 * Get all Tasks in Database for the given User
 * @param req the request
 * @param res the response
 */
function* getAllTasks(req, res) {
  res.json(yield TasksService.getAllTasks(req.user.uID));
}

/**
 * Get a Task based on the id
 * @param req the request
 * @param res the response
 */
function* getTask(req, res) {
  res.json(yield TasksService.getTask(req.user.uID, req.params.taskId));
}

/**
 * create a Task with given details
 * @param req the request
 * @param res the response
 */
function* createTask(req, res) {
  res.json(yield TasksService.createTask(req.user.uID, req.body));
}

/**
 * Update the Task
 * @param req the request
 * @param res the response
 */
function* updateTask(req, res) {
  res.json(yield TasksService.updateTask(req.user.uID, req.params.taskId, req.body));
}

/**
 * Delete the Task identified by ID
 * @param req the request
 * @param res the response
 */
function* deleteTask(req, res) {
  yield TasksService.deleteTask(req.user.uID, req.params.taskId);
  res.status(204).json();
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
