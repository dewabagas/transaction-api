'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userid',
        as: 'user'
      })

      this.belongsTo(models.Product, {
        foreignKey: 'productid',
        as: 'product'
      })

      // this.hasMany(models.Product, {
      //   foreignKey: 'id',
      //   as: 'product',
      // })
    }
  }
  TransactionHistory.init({
    productid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};