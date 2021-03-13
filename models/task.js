'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
      Task.belongsTo(models.Category)
    }
  };
  Task.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Title should not be empty'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    due_date: {
      type : DataTypes.DATE,
      validate : {
        isAfter : new Date(Date.now() - 86400000).toISOString().split('T')[0]
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};