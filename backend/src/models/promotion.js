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
    static associate({ Product, Order_detail }) {
      Promotion.belongsTo(Product, {
        foreignKey: "idProduct",
      });
      Promotion.hasMany(Order_detail, {
        foreignKey: "id_Promotion",
        as: "product_Promotion"
      });
    }
  }
  Promotion.init({
    idProduct: DataTypes.STRING,
    gift: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Promotion',
  });
  return Promotion;
};