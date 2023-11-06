'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 10,
        max: 50,
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: /^[0-9]+$/,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "staff"
    },
    address: DataTypes.STRING,

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active'
    },

  },
    {
      sequelize,
      modelName: 'User',
    });
  return User;
};