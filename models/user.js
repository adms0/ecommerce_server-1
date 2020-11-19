'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require("../helpers/password.helper")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, { 
        through: models.Cart
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "password is required"
        },
        len: {
          args: [6],
          msg: "password length minimum are six characters"
        }
      }
    },
    role: ["admin"],
  }, {
    hooks: {
      beforeCreate(user) {
        user.role = 'customer'
        user.password = hashPassword(user.password)
      }
    },
      sequelize,
      modelName: 'User',
  })
  return User;
};