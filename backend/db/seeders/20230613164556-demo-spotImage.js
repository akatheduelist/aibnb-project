'use strict'

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: 'https://i.imgur.com/6Fj70nc.jpg',
          preview: true
        },
        {
          spotId: 1,
          url: 'https://i.imgur.com/bnNG7JT.jpg',
          preview: false
        },
        {
          spotId: 1,
          url: 'https://i.imgur.com/rvXd1Iq.jpg',
          preview: false
        },
        {
          spotId: 1,
          url: 'https://i.imgur.com/P2WV1Bc.jpg',
          preview: false
        },
        {
          spotId: 2,
          url: 'https://i.imgur.com/vscMX3x.jpg',
          preview: true
        },
        {
          spotId: 2,
          url: 'https://i.imgur.com/AiJFA7l.jpg',
          preview: false
        },
        {
          spotId: 2,
          url: 'https://i.imgur.com/zPLGJ0D.jpg',
          preview: false
        },
        {
          spotId: 2,
          url: 'https://i.imgur.com/dilqipU.jpg',
          preview: false
        },
        {
          spotId: 3,
          url: 'https://i.imgur.com/dJOhCII.jpg',
          preview: true
        },
        {
          spotId: 3,
          url: 'https://i.imgur.com/Sy3HLEZ.jpg',
          preview: false
        },
        {
          spotId: 3,
          url: 'https://i.imgur.com/WBRerNa.jpg',
          preview: false
        },
        {
          spotId: 3,
          url: 'https://i.imgur.com/zHzhX0m.jpg',
          preview: false
        },
        {
          spotId: 4,
          url: 'https://i.imgur.com/s6OwelO.jpg',
          preview: true
        },
        {
          spotId: 4,
          url: 'https://i.imgur.com/sBB4oOB.jpg',
          preview: false
        },
        {
          spotId: 4,
          url: 'https://i.imgur.com/FyIICwU.jpg',
          preview: false
        },
        {
          spotId: 4,
          url: 'https://i.imgur.com/ej048aq.jpg',
          preview: false
        },
        {
          spotId: 5,
          url: 'https://i.imgur.com/CzodeGU.jpg',
          preview: true
        },
        {
          spotId: 5,
          url: 'https://i.imgur.com/6Ua5BKi.jpg',
          preview: false
        },
        {
          spotId: 5,
          url: 'https://i.imgur.com/FPSesxn.jpg',
          preview: false
        },
        {
          spotId: 5,
          url: 'https://i.imgur.com/rYZhpPJ.jpg',
          preview: false
        },
        {
          spotId: 6,
          url: 'https://i.imgur.com/75ZoMZU.jpg',
          preview: true
        },
        {
          spotId: 6,
          url: 'https://i.imgur.com/lPIyfzy.jpg',
          preview: false
        },
        {
          spotId: 6,
          url: 'https://i.imgur.com/98Eelsl.jpg',
          preview: false
        },
        {
          spotId: 6,
          url: 'https://i.imgur.com/Cas7Ja5.jpg',
          preview: false
        },
        {
          spotId: 7,
          url: 'https://i.imgur.com/5LDOi0v.jpg',
          preview: true
        },
        {
          spotId: 7,
          url: 'https://i.imgur.com/5qVa4Gj.jpg',
          preview: false
        },
        {
          spotId: 7,
          url: 'https://i.imgur.com/J3geQmi.jpg',
          preview: false
        },
        {
          spotId: 7,
          url: 'https://i.imgur.com/acKvoUj.jpg',
          preview: false
        },
        {
          spotId: 8,
          url: 'https://i.imgur.com/9Y4STwk.jpg',
          preview: true
        },
        {
          spotId: 8,
          url: 'https://i.imgur.com/wq2xgXA.jpg',
          preview: false
        },
        {
          spotId: 8,
          url: 'https://i.imgur.com/dRUn6rq.jpg',
          preview: false
        },
        {
          spotId: 8,
          url: 'https://i.imgur.com/bynq1e6.jpg',
          preview: false
        },
        {
          spotId: 9,
          url: 'https://i.imgur.com/i5ClUc9.jpg',
          preview: true
        },
        {
          spotId: 9,
          url: 'https://i.imgur.com/KTvZ4OZ.jpg',
          preview: false
        },
        {
          spotId: 9,
          url: 'https://i.imgur.com/1HqaszO.jpg',
          preview: false
        },
        {
          spotId: 9,
          url: 'https://i.imgur.com/WfOBn2L.jpg',
          preview: false
        },
        {
          spotId: 10,
          url: 'https://i.imgur.com/XFn9cfM.jpg',
          preview: true
        },
        {
          spotId: 10,
          url: 'https://i.imgur.com/t0NXi8H.jpg',
          preview: false
        },
        {
          spotId: 10,
          url: 'https://i.imgur.com/YluFdQ4.jpg',
          preview: false
        },
        {
          spotId: 10,
          url: 'https://i.imgur.com/NOO0E1O.jpg',
          preview: false
        },
        {
          spotId: 11,
          url: 'https://i.imgur.com/wIXtEe9.jpg',
          preview: true
        },
        {
          spotId: 11,
          url: 'https://i.imgur.com/YHrNBm9.jpg',
          preview: false
        },
        {
          spotId: 11,
          url: 'https://i.imgur.com/EnFUWGm.jpg',
          preview: false
        },
        {
          spotId: 11,
          url: 'https://i.imgur.com/wIKCEJq.jpg',
          preview: false
        },
        {
          spotId: 12,
          url: 'https://i.imgur.com/k7pM7TV.jpg',
          preview: true
        },
        {
          spotId: 12,
          url: 'https://i.imgur.com/JtK109n.jpg',
          preview: false
        },
        {
          spotId: 12,
          url: 'https://i.imgur.com/5Vn65ox.jpg',
          preview: false
        },
        {
          spotId: 12,
          url: 'https://i.imgur.com/bb9rpZq.jpg',
          preview: false
        },
        {
          spotId: 13,
          url: 'https://i.imgur.com/3Fvghg7.jpg',
          preview: true
        },
        {
          spotId: 13,
          url: 'https://i.imgur.com/TLIaE3M.jpg',
          preview: false
        },
        {
          spotId: 13,
          url: 'https://i.imgur.com/NJYQcbJ.jpg',
          preview: false
        },
        {
          spotId: 13,
          url: 'https://i.imgur.com/GY9fpBy.jpg',
          preview: false
        },
        {
          spotId: 14,
          url: 'https://i.imgur.com/wTVhpc0.jpg',
          preview: true
        },
        {
          spotId: 14,
          url: 'https://i.imgur.com/lMoBHJF.jpg',
          preview: false
        },
        {
          spotId: 14,
          url: 'https://i.imgur.com/rghSw1Z.jpg',
          preview: false
        },
        {
          spotId: 14,
          url: 'https://i.imgur.com/UxFi3dF.jpg',
          preview: false
        },
        {
          spotId: 15,
          url: 'https://i.imgur.com/ixllGIz.jpg',
          preview: true
        },
        {
          spotId: 15,
          url: 'https://i.imgur.com/w5KXyZe.jpg',
          preview: false
        },
        {
          spotId: 15,
          url: 'https://i.imgur.com/qQGTiIJ.jpg',
          preview: false
        },
        {
          spotId: 15,
          url: 'https://i.imgur.com/jr9laet.jpg',
          preview: false
        },
        {
          spotId: 16,
          url: 'https://i.imgur.com/D4iJACt.jpg',
          preview: true
        },
        {
          spotId: 16,
          url: 'https://i.imgur.com/oJrayWp.jpg',
          preview: false
        },
        {
          spotId: 16,
          url: 'https://i.imgur.com/7cvMtOj.jpg',
          preview: false
        },
        {
          spotId: 16,
          url: 'https://i.imgur.com/OZtB2pn.jpg',
          preview: false
        },
        {
          spotId: 17,
          url: 'https://i.imgur.com/T201n5j.jpg',
          preview: true
        },
        {
          spotId: 17,
          url: 'https://i.imgur.com/fEotxBQ.jpg',
          preview: false
        },
        {
          spotId: 17,
          url: 'https://i.imgur.com/XNcRfPV.jpg',
          preview: false
        },
        {
          spotId: 17,
          url: 'https://i.imgur.com/UViC28o.jpg',
          preview: false
        },
        {
          spotId: 18,
          url: 'https://i.imgur.com/uIpGYtP.jpg',
          preview: true
        },
        {
          spotId: 18,
          url: 'https://i.imgur.com/9LLRZ5z.jpg',
          preview: false
        },
        {
          spotId: 18,
          url: 'https://i.imgur.com/HKoC1cF.jpg',
          preview: false
        },
        {
          spotId: 18,
          url: 'https://i.imgur.com/MpKbJ1V.jpg',
          preview: false
        },
        {
          spotId: 19,
          url: 'https://i.imgur.com/FessFQd.jpg',
          preview: true
        },
        {
          spotId: 19,
          url: 'https://i.imgur.com/yBdBk0Y.jpg',
          preview: false
        },
        {
          spotId: 19,
          url: 'https://i.imgur.com/0qBxbrT.jpg',
          preview: false
        },
        {
          spotId: 19,
          url: 'https://i.imgur.com/pcwr6bP.jpg',
          preview: false
        },
        {
          spotId: 20,
          url: 'https://i.imgur.com/6CuWzsg.jpg',
          preview: true
        },
        {
          spotId: 20,
          url: 'https://i.imgur.com/lWG4vOs.jpg',
          preview: false
        },
        {
          spotId: 20,
          url: 'https://i.imgur.com/ucZutRQ.jpg',
          preview: false
        },
        {
          spotId: 20,
          url: 'https://i.imgur.com/WfaQBnL.jpg',
          preview: false
        }
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options)
  }
}
