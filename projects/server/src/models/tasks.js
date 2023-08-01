'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tasks.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    boards_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return tasks;
};