'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      Categorie.hasMany(Product, {
        foreignKey: "idCategory",
        as: "products",
      });
    }
  }
  Categorie.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: DataTypes.STRING,
    note: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'Categorie',
  });
  return Categorie;
};