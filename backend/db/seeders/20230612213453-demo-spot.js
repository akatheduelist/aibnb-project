'use strict';

const { faker } = require("@faker-js/faker");
const { User } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const ids = await User.findAll({
        attributes: ['id']
    })
    await queryInterface.bulkInsert(options,[
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "123 Ocean View Drive",
        city: "Laguna Beach",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Serenity Cove",
        description: "Escape to this tranquil beachfront cottage with panoramic ocean views and a private patio.",
        price: 250
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "456 Forest Way",
        city: "Black Forest",
        state: "Bavaria",
        country: "Germany",
        lat: 38.89787,
        lng: -77.03652,
        name: "Enchanted Forest Retreat",
        description: "Immerse yourself in nature in this charming log cabin surrounded by lush trees and picturesque trails.",
        price: 180
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "789 Sunset Avenue",
        city: "Santorini",
        state: "Santorini",
        country: "Greece",
        lat: 35.04788,
        lng: -90.02595,
        name: "Sunset Paradise",
        description: "Stay in a luxurious villa perched on a cliffside, offering breathtaking views of the famous Santorini sunset.",
        price: 300
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "321 Lagoon Road",
        city: "Bora Bora",
        state: "Bora Bora",
        country: "French Polynesia",
        lat: 35.04788,
        lng: -90.02595,
        name: "Azure Waters",
        description: "Experience paradise in an overwater bungalow surrounded by crystal-clear turquoise lagoons.",
        price: 500
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "987 Mountain View Drive",
        city: "Banff",
        state: "Alberta",
        country: "Canada",
        lat: 35.04788,
        lng: -90.02595,
        name: "Mountain Haven",
        description: "Cozy up in a rustic cabin nestled in the Canadian Rockies, offering breathtaking mountain vistas.",
        price: 220
      },{
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "654 Palm Street",
        city: "Tulum",
        state: "Quintana Roo",
        country: "Mexico",
        lat: 35.04788,
        lng: -90.02595,
        name: "Tropical Oasis",
        description: "Relax in a private jungle villa with a refreshing pool, just minutes away from pristine white sandy beaches.",
        price: 180
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "321 Lakeview Terrace",
        city: "Queenstown",
        state: "Queenstown",
        country: "New Zealand",
        lat: 35.04788,
        lng: -90.02595,
        name: "Tranquil Retreat",
        description: "Unwind in a secluded lakeside cottage surrounded by breathtaking mountains and serene landscapes.",
        price: 300
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "123 Sahara Street",
        city: "Marrakech",
        state: "Marrakech",
        country: "Morocco",
        lat: 35.04788,
        lng: -90.02595,
        name: "Desert Mirage",
        description: "Step into an exotic riad in the heart of the desert, featuring traditional Moroccan architecture and a tranquil courtyard.",
        price: 150
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "987 Coral Way",
        city: "Maldives",
        state: "Maldives",
        country: "Maldives",
        lat: 35.04788,
        lng: -90.02595,
        name: "Island Hideaway",
        description: "Indulge in luxury at a private villa suspended over the crystal-clear waters of the Maldives.",
        price: 600
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "456 Alpine Street",
        city: "Zermatt",
        state: "Valais",
        country: "Switzerland",
        lat: 35.04788,
        lng: -90.02595,
        name: "Alpine Chalet",
        description: "Experience the charm of a traditional Swiss chalet surrounded by snow-capped mountains and pristine alpine landscapes.",
        price: 400
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "789 Sandy Beach Road",
        city: "Byron Bay",
        state: "NSW",
        country: "Australia",
        lat: 35.04788,
        lng: -90.02595,
        name: "Beach Breeze Retreat",
        description: "Enjoy coastal living in a stylish beach house just steps away from the sparkling turquoise waters.",
        price: 250
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "321 Zen Garden Lane",
        city: "Kyoto",
        state: "Kyoto",
        country: "Japan",
        lat: 35.04788,
        lng: -90.02595,
        name: "Zen Garden Villa",
        description: "Immerse yourself in Japanese tranquility at a traditional villa with a beautiful Zen garden and tea house.",
        price: 300
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "123 Safari Trail, , ",
        city: "Maasai Mara",
        state: "Maasai Mara",
        country: "Kenya",
        lat: 35.04788,
        lng: -90.02595,
        name: "Safari Lodge",
        description: "Embark on an unforgettable safari adventure and stay in a luxurious lodge surrounded by the African wilderness.",
        price: 350
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "456 Snowy Way",
        city: "Aspen",
        state: "Colorado",
        country: "USA",
        lat: 35.04788,
        lng: -90.02595,
        name: "Snowy Peaks Cabin",
        description: "Experience a winter wonderland in a cozy log cabin nestled in the snowy peaks of the Colorado Rockies.",
        price: 280
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "789 Paradise Avenue",
        city: "Phuket",
        state: "Phuket",
        country: "Thailand",
        lat: 35.04788,
        lng: -90.02595,
        name: "Paradise Beachfront Villa",
        description: "Unwind in a luxurious beachfront villa with a private pool and stunning views of the Andaman Sea.",
        price: 400
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "987 Rainforest Road",
        city: "Amazonas",
        state: "Amazonas",
        country: "Brazil",
        lat: 35.04788,
        lng: -90.02595,
        name: "Treehouse Haven",
        description: "Stay in a unique treehouse nestled within the lush greenery of the Amazon Rainforest, providing an immersive jungle experience.",
        price: 200
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "123 Castle Road",
        city: "Dublin",
        state: "Dublin",
        country: "Ireland",
        lat: 35.04788,
        lng: -90.02595,
        name: "Coastal Castle",
        description: "Live like royalty in a stunning castle overlooking the rugged Irish coastline.",
        price: 350
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "456 Lakeside Drive",
        city: "Queenstown",
        state: "Queenstown",
        country: "New Zealand",
        lat: 35.04788,
        lng: -90.02595,
        name: "Lakeside Retreat",
        description: "Immerse yourself in nature at a serene lakeside cottage surrounded by majestic mountains.",
        price: 280
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "789 Hidden Gem Lane",
        city: "Cornwall",
        state: "England",
        country: "UK",
        lat: 35.04788,
        lng: -90.02595,
        name: "Hidden Gem Cottage",
        description: "Discover a charming cottage nestled amidst picturesque countryside, offering peace and tranquility.",
        price: 180
      },
      {
        ownerID: faker.number.int({ min: 1, max: ids.length }),
        address: "321 Urban Oasis Street",
        city: "Tokyo",
        state: "Tokyo",
        country: "Japan",
        lat: 35.04788,
        lng: -90.02595,
        name: "Urban Oasis Loft",
        description: "Stay in a modern loft apartment with a rooftop garden, providing a peaceful escape in the heart of bustling Tokyo.",
        price: 220
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options)
  }
};
