'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    kota: DataTypes.STRING,
    telepon: DataTypes.STRING,
    email: DataTypes.STRING,
    note: DataTypes.STRING,
    ongkir: DataTypes.INTEGER,
    total_berat: DataTypes.INTEGER,
    total_harga: DataTypes.INTEGER,
    is_paid: DataTypes.BOOLEAN,
    no_resi: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Transaction.belongsToMany(models.Product, {through: 'ProductTransactions'});
        Transaction.hasMany(models.ProductTransaction);
      }
    }
  });
  return Transaction;
};
