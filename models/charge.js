'use strict';
module.exports = function(sequelize, DataTypes) {
  var Charge = sequelize.define('Charge', {
    kota: DataTypes.STRING,
    biaya: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Charge;
};
