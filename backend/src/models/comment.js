'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      Comment.belongsTo(Product, {
        foreignKey: "idProduct",
      })
    }
  }
  Comment.init({
    idProduct: DataTypes.INTEGER,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      }
    },
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: "private"
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};