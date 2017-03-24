'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Charges', [{
      kota: 'Yogyakarta',
      biaya: 16000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      kota: 'Manado',
      biaya: 23000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      kota: 'Medan',
      biaya: 19000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      kota: 'Padang',
      biaya: 17000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      kota: 'Jambi',
      biaya: 13000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      kota: 'Maluku',
      biaya: 18000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      kota: 'Depok',
      biaya: 12000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      kota: 'Bekasi',
      biaya: 12000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      kota: 'Bogor',
      biaya: 13000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
