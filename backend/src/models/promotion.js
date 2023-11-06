'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      Promotion.belongsTo(Product, {
        foreignKey: "idProduct",
      })
    }
  }
  Promotion.init({
    idProduct: DataTypes.STRING,
    gift: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};