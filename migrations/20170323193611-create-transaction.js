'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      kota: {
        type: Sequelize.STRING
      },
      telepon: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      ongkir: {
        type: Sequelize.INTEGER
      },
      total_berat: {
        type: Sequelize.INTEGER
      },
      total_harga: {
        type: Sequelize.INTEGER
      },
      is_paid: {
        type: Sequelize.BOOLEAN
      },
      no_resi: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Transactions');
  }
};