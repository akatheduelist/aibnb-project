'use strict';

const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

let fakeUsers = []
const demoUser = {
    firstName: 'Demo',
    lastName: 'Lition',
    email: 'demo@user.io',
    username: 'Demo-Lition',
    hashedPassword: bcrypt.hashSync('password')
}
fakeUsers.push(demoUser)
for (let i=0; i<20; i++) {
    fakeUsers.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password())
    })
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, fakeUsers, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
