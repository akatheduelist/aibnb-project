'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options,[
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "1600 Pennsylvania Avenue NW 20500",
        city: "Washington",
        state: "District of Columbia",
        country: "United States of America",
        lat: 38.89787,
        lng: -77.03652,
        name: "The White House",
        description: "Landmark, historic home & office of the United States president, with tours for visitors.",
        price: 1000000
      },
      {
        ownerId: 3,
        address: "312 Elvis Presley Boulevard",
        city: "Memphis",
        state: "Tennessee",
        country: "United States of America",
        lat: 35.04788,
        lng: -90.02595,
        name: "Graceland",
        description: "Elvis Presley's famed estate featuring mansion tours, exhibits, a car museum & 2 jets.",
        price: 12
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options)
  }
};
