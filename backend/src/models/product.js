'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Categorie, Product_detail, Promotion, Comment, Order_detail }) {
      Product.belongsTo(Categorie, {
        foreignKey: "idCategory",
      });
      Product.hasMany(Product_detail, {
        foreignKey: "idProduct",
        as: "product_detail"
      });
      Product.hasMany(Promotion, {
        foreignKey: "idProduct",
        as: "product_promotion"
      });
      Product.hasMany(Comment, {
        foreignKey: "idProduct",
        as: "comments"
      });
      Product.hasMany(Order_detail, {
        foreignKey: "id_Product",
        as: "product"
      });
    }
  }
  Product.init({
    idCategory: DataTypes.STRING,
    name: DataTypes.STRING,
    capacity: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'business'
    },
    parameter: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};