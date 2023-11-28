'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Product, Product_detail, Promotion }) {
      Order_detail.belongsTo(Order, {
        foreignKey: "id_Order",
      });
      Order_detail.belongsTo(Product, {
        foreignKey: "id_Product",
      });
      Order_detail.belongsTo(Product_detail, {
        foreignKey: "id_Product_detail",
      });
      Order_detail.belongsTo(Promotion, {
        foreignKey: "id_Promotion",
      });
    }
  }
  Order_detail.init({
    id_Order: DataTypes.STRING,
    id_Product: DataTypes.STRING,
    id_Product_detail: DataTypes.STRING,
    id_Promotion: DataTypes.STRING,
    quantity: DataTypes.STRING,
    totalDetail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order_detail',
  });
  return Order_detail;
};