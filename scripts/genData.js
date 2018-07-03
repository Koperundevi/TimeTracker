/*
 * This script will be used to seed the database with data from JSON file
 * Note: The script will create new table if it doesn't exist else the existing table
 *       will be truncated before loading the data.
 */


require('../src/bootstrap');

const co = require('co');
const models = require('../src/models');
const logger = require('../src/common/logger');
const usersData = require('./data/users.json');

/**
 * Create Users from JSON file
 */
function* createUsers() {
  const users = [];
  for (let i = 0; i < usersData.data.length; i += 1) {
    users.push(yield models.User.create(usersData.data[i]));
  }
  return users;
}

co(function* coordinate() {
  yield models.init(true);
  yield createUsers();
  logger.info('Data generation succeeded!');
  process.exit(0);
}).catch((err) => {
  logger.error(err);
  logger.info('Error while generating data, Program will exit');
  process.exit(1);
});

