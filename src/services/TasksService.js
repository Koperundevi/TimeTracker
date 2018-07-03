/*
 * Tasks Service Implementation
 */

const Tasks = require('../models').Tasks; // eslint-disable-line
const _ = require('lodash');
const joi = require('joi');
const errors = require('common-errors');

/**
 * Get all Tasks for the current User
 * @param userId - Current User ID
 */
function* getAllTasks(userId) {
  const result = yield Tasks.findAll({
    where: { userId },
    order: [['date', 'ASC'], ['startTime', 'ASC']],
  });
  return result;
}

getAllTasks.schema = {
  userId: joi.number().min(1).required(),
};

/**
 * Get an Task by ID
 * @param userId - Current User ID
 * @param inputId - Id of Task to be looked up in Database
 */
function* getTask(userId, inputId) {
  const result = yield Tasks.findOne({ where: { id: inputId } });
  if (result === null) {
    throw errors.HttpStatusError(404, `Task with ID = ${inputId} does not exist.`);
  } else if (result.userId !== userId) {
    throw errors.HttpStatusError(403, `You do not have rights to access Task with ID = ${inputId}.`);
  }
  return result;
}

getTask.schema = {
  userId: joi.number().min(1).required(),
  inputId: joi.number().min(1).required(),
};

/**
 * Create an Task with given details
 * @param userId - Current User ID
 * @param entity - Input body
 */
function* createTask(userId, entity) {
  if (entity.startTime > entity.endTime) {
    throw errors.HttpStatusError(400, 'startTime should be lesser than endTime');
  }

  const result = yield Tasks.create({
    task: entity.task,
    project: entity.project,
    date: entity.date,
    startTime: entity.startTime,
    endTime: entity.endTime,
    userId,
  });

  return result;
}

createTask.schema = {
  userId: joi.number().min(1).required(),
  entity: joi.object().keys({
    task: joi.string().required(),
    project: joi.string().required(),
    date: joi.date().iso().required(),
    startTime: joi.date().iso(),
    endTime: joi.date().iso(),
  }).required(),
};

/**
 * Update an Task with given details
 * @param userId - Current User ID
 * @param inputId - Id of the Task to be updated
 * @param entity - Data to be updated
 */
function* updateTask(userId, inputId, entity) {
  if (entity.startTime > entity.endTime) {
    throw errors.HttpStatusError(400, 'startTime should be lesser than endTime');
  }

  const check = yield Tasks.findOne({ where: { id: inputId }, raw: true });

  if (check === null) {
    throw new errors.ValidationError(`Task with ID = ${inputId} does not exist.`);
  } else if (check.userId !== userId) {
    throw errors.HttpStatusError(403, `You do not have rights to update Task with ID = ${inputId}.`);
  } else {
    const updData = _.extend(check, entity);
    yield Tasks.update(
      updData,
      { where: { id: inputId } },
    );
    return updData;
  }
}

updateTask.schema = {
  userId: joi.number().min(1).required(),
  inputId: joi.number().min(1).required(),
  entity: joi.object().keys({
    task: joi.string(),
    project: joi.string(),
    date: joi.date().iso(),
    startTime: joi.date().iso(),
    endTime: joi.date().iso(),
  }).required(),
};

/**
 * Delete an Task with given Id
 * @param userId - Current User ID
 * @param inputId - Id of the Task to be deleted
 */
function* deleteTask(userId, inputId) {
  const check = yield Tasks.findOne({ where: { id: inputId } });

  if (check === null) {
    throw errors.HttpStatusError(404, `Task with ID = ${inputId} does not exist.`);
  } else if (check.userId !== userId) {
    throw errors.HttpStatusError(403, `You do not have delete to access Task with ID = ${inputId}.`);
  }

  yield Tasks.destroy({ where: { id: inputId } }, { force: true });

  return true;
}

deleteTask.schema = {
  userId: joi.number().min(1).required(),
  inputId: joi.number().min(1).required(),
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
