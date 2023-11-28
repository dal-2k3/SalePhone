'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, Order_detail }) {
      Product_detail.belongsTo(Product, {
        foreignKey: "idProduct",
      });
      Product_detail.hasMany(Order_detail, {
        foreignKey: "id_Product_detail",
        as: "product_detail"
      });
    }
  }
  Product_detail.init({
    idProduct: DataTypes.STRING,
    color: DataTypes.TEXT,
    price: DataTypes.STRING,
    quantity: DataTypes.STRING,
    discount: DataTypes.STRING,
    image: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'business'
    },

  }, {
    sequelize,
    modelName: 'Product_detail',
  });
  return Product_detail;
};