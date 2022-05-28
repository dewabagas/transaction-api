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
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: 'categoryid',
        as: 'category'
      })

      this.hasMany(models.TransactionHistory, {
        foreignKey: 'id',
        as: 'transactionHistories'
      })

      // this.belongsTo(models.TransactionHistory, {
      //   foreignKey: 'productid',
      //   as: 'transactionHistories'
      // })

    }
  }
  Product.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    categoryid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};