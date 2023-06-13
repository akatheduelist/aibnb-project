const express = require('express');
const router = express.Router();

// Import models used by router
const { Spot } = require('../../db/models');

// Import middleware used by router
const { requireAuth } = require('../../utils/auth.js');

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    // If user is currently logged in, get userId of user
    if (user) {
        const safeUser = user.id;

        // Get all spots owned by the current user
        const getOwnerSpots = await Spot.findAll({
            where: {
                ownerId: safeUser
            }
        });

        // Create payload array to contain all spot objects
        const payload = [];

        // For each spot get the combined star ratings and average the total in avgRating
        for (let i = 0; i < getOwnerSpots.length; i++) {
            const spot = getOwnerSpots[i];

            // Get the reviews associated with each spot, just the 'stars' attribute
            const starRating = await spot.getReviews({
                attributes: ['stars']
            });

            // Initialize total rating of combined reviews for each spot
            let totalRating = 0;

            // For each star rating related to a spot, add rating to totalRating value
            for (let j = 0; j < starRating.length; j++) {
                const star = starRating[j];
                totalRating += star.stars;
            }

            // Average rating is totalRating / num of ratings
            let avgRating = (totalRating / starRating.length).toFixed(1);

            // Build the requested spot data object
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
                previewImage: "image url"
            };

            // Push spot data object into payload array
            payload.push(spotData);
        };

            return res.json({
                Spots: payload
            });
        }
    });

// Get all Spots
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll();

    // Create payload array to contain all spot objects
    const payload = [];

    // For each spot get the combined star ratings and average the total in avgRating
    for (let i = 0; i < getAllSpots.length; i++) {
        const spot = getAllSpots[i];

        // Get the reviews associated with each spot, just the 'stars' attribute
        const starRating = await spot.getReviews({
            attributes: ['stars']
        });

        // Initialize total rating of combined reviews for each spot
        let totalRating = 0;

        // For each star rating related to a spot, add rating to totalRating value
        for (let j = 0; j < starRating.length; j++) {
            const star = starRating[j];
            totalRating += star.stars;
        }

        // Average rating is totalRating / num of ratings
        let avgRating = (totalRating / starRating.length).toFixed(1);

        // Build the requested spot data object
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
            previewImage: "image url"
        };

        // Push spot data object into payload array
        payload.push(spotData);
    }

    return res.json({
        Spots: payload
    });
});

module.exports = router;
