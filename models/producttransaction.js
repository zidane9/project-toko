'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductTransaction = sequelize.define('ProductTransaction', {
    ProductId: DataTypes.INTEGER,
    TransactionId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    harga: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProductTransaction.belongsTo(models.Product);
        ProductTransaction.belongsTo(models.Transaction);
      }
    }
  });
  return ProductTransaction;
};
