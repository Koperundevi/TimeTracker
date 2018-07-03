/**
 * Load all models and set up references
 */

const sequelize = require('../datasource').getSequelize();
const DataTypes = require('sequelize/lib/data-types');

// MySQL Models
const Tasks = require('./Tasks')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);

// Foreign key between Tasks and User
Tasks.belongsTo(User);

module.exports = {
  sequelize,
  Tasks,
  User,
};

/**
 * Init database
 * @param {Boolean} force if true, drop and re-create all tables
 * @returns {Promise}
 */
module.exports.init = force => sequelize.sync({ force });
