'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductTransaction = sequelize.define('ProductTransaction', {
    productId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    harga: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductTransaction;
};