'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-716939607822442653/original/1dacb5f4-5a2b-4ba6-883b-c631f9a06524.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-681250879114299891/original/1119f136-ca1c-4347-9289-9c017386df3b.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/8791ae7e-b52d-4e28-8648-6a7657cb4f27.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52904382/original/4d769e69-bffb-423d-b069-ac5738f72d1f.png",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-36767861/original/ffcc6215-0b1c-4e8c-b2e0-473b3c801014.jpeg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/00adf705-3791-40e9-8512-ca5a7d619c11.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-42388319/original/0d34f7da-14ad-469b-a218-1a2668acd428.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/08cae5c5-7679-4a32-b0d6-78621b758768.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50199259/original/70226106-4bf6-4831-8b59-7f303e709e03.jpeg",
        preview: false
      },


    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options);
  }
};
