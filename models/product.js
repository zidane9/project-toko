'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    berat: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};