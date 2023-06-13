const express = require('express');

// Import usefull tools
// const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

// Import models used by router
const { Spot } = require('../../db/models');

const router = express.Router();

// Returns all the spots
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll();

    return res.json({
        Spots: getAllSpots
    });
})

module.exports = router;
