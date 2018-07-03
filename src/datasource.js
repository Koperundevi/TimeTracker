/**
 * Initialize data source connections
 */

const config = require('config');
const Sequelize = require('sequelize');
const logger = require('./common/logger');

Sequelize.Promise = global.Promise;
let sequelizeInstance = null;

/**
 * Get mysql sequelize instance
 * @returns {*}
 */
const getSequelize = () => {
  if (sequelizeInstance === null) {
    sequelizeInstance = new Sequelize(config.MYSQL_URL, { logging: config.LOG_LEVEL === 'debug' });
    sequelizeInstance
      .authenticate()
      .then(() => {
        logger.info('Connection has been established successfully.');
      })
      .catch((err) => {
        logger.error('Unable to connect to the database:', err);
      });
  }
  return sequelizeInstance;
};

module.exports = {
  getSequelize,
};
