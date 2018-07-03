/*
 * Sequelize Model for User table
 */

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const model = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'uID',
    },
    email: {
      type: Sequelize.STRING, allowNull: false, unique: true, field: 'uEmail',
    },
    password: { type: Sequelize.STRING, allowNull: false, field: 'uPassword' },
  }, {
    timestamps: true,
    tableName: 'Users',
  });
  model.modelName = 'users';
  return model;
};
