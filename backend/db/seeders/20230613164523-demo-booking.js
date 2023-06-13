'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options,[
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-06-13',
        endDate: '2023-06-19'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-06-19',
        endDate: '2023-06-26'
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2023-06-26',
        endDate: '2023-07-01'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-06-19',
        endDate: '2023-07-01'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-06-26',
        endDate: '2023-07-04'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2023-07-04',
        endDate: '2023-07-22'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2023-09-12',
        endDate: '2023-09-22'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-09-22',
        endDate: '2023-09-28'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-09-28',
        endDate: '2023-10-10'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options)
  }
};
