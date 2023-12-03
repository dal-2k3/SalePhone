'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order_detail }) {
      Order.hasMany(Order_detail, {
        foreignKey: "id_Order",
        as: "order_detail",
      });
    }
  }
  Order.init({
    fullname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    total: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'chờ_xử_lý'
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};