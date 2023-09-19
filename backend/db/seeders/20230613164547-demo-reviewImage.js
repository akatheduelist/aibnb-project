'use strict'

const { faker } = require('@faker-js/faker')
const { Review } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    const ids = await Review.findAll({
      attributes: ['id']
    })
    let fakeReviewImages = []
    for (let i = 0; i < 40; i++) {
      fakeReviewImages.push({
        reviewId: faker.number.int({ min: 1, max: ids.length }),
        url: faker.image.urlLoremFlickr({ category: 'vacation' })
      })
    }
    await queryInterface.bulkInsert(options, fakeReviewImages, {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options)
  }
}
