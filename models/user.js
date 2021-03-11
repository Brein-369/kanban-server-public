'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
      User.belongsToMany(models.Category,{through : models.Task})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      unique : {
        msg : "Email should be unique"
      },
      validate : {
        isEmail : {
          msg : 'Please input in email format'
        },
        notEmpty : {
          msg : 'Email should not be empty'
        }
      }
    },
    password: {
      type :  DataTypes.STRING,
      validate : {
        len : {
          args : [6],
          msg : 'Password should be minimal 6 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, option)=>{
    instance.password = hashPassword(instance.password)
  })


  return User;
};