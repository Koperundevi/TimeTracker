/*
 * Sequelize Model for Tasks table
 */

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('Tasks', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'taskId',
    },
    task: { type: Sequelize.STRING, allowNull: false },
    project: { type: Sequelize.STRING, allowNull: false },
    date: { type: Sequelize.DATEONLY, allowNull: false },
    startTime: { type: Sequelize.DATE },
    endTime: { type: Sequelize.DATE },
  }, {
    timestamps: true,
    tableName: 'Tasks',
  });
  model.modelName = 'Tasks';
  return model;
};

