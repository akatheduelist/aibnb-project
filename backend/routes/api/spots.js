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
    const payload = [];

    for (let i = 0; i < getAllSpots.length; i++) {
        const spot = getAllSpots[i];

        const starRating = await spot.getReviews({
            attributes: ['stars']
        });

        let totalRating = 0;

        for (let j = 0; j < starRating.length; j++) {
            const star = starRating[j];
            totalRating += star.stars;
        }

        let avgRating = (totalRating / starRating.length).toFixed(1);

        const spotData = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating,
            previewImage: "tbt"
        }

        payload.push(spotData)
    }

    return res.json({
        Spots: payload
    });
});

module.exports = router;
