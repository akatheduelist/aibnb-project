'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options,[
      {
        spotId: 1,
        userId: 3,
        review: "What a weird place to stay.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 2,
        review: "Lots of guys in hoodies around that know a lot about video games.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 1,
        review: "Developers took all the wifi!",
        stars: 1
      },
      {
        spotId: 2,
        userId: 3,
        review: "Kind of pricey but very swanky.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: "Presendential suite lived up to its name!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: "Pretty sure I saw the ghost of Grover Cleveland.",
        stars: 2
      },
      {
        spotId: 3,
        userId: 3,
        review: "This place rocks my socks!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: "Heard houndogs crying ALL THE TIME!",
        stars: 2
      },
      {
        spotId: 3,
        userId: 1,
        review: "Amazing food... Peanut butter and banana, who knew?!",
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options)
  }
};
