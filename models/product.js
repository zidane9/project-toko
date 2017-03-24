'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    berat: DataTypes.INTEGER,
    img_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Product.belongsToMany(models.Transaction, {through: 'ProductTransactions'});
        Product.hasMany(models.ProductTransaction);
      }
    }
  });
  return Product;
};
