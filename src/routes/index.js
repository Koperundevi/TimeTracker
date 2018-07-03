/**
 * Defines the API routes
 */

const _ = require('lodash');
const TasksRoutes = require('./TasksRoutes');
const UserRoutes = require('./UserRoutes');

module.exports = _.extend({}, TasksRoutes, UserRoutes);
