/*
 * Define Task related end points
 */

const { jwt } = require('../../app-constants').Passports;

module.exports = {
  '/tasks': {
    post: {
      controller: 'TasksController',
      method: 'createTask',
      auth: jwt,
    },
    get: {
      controller: 'TasksController',
      method: 'getAllTasks',
      auth: jwt,
    },
  },
  '/tasks/:taskId': {
    patch: {
      controller: 'TasksController',
      method: 'updateTask',
      auth: jwt,
    },
    delete: {
      controller: 'TasksController',
      method: 'deleteTask',
      auth: jwt,
    },
    get: {
      controller: 'TasksController',
      method: 'getTask',
      auth: jwt,
    },
  },
};
