const express = require('express');
const router = express.Router();

// Import models used by router
const { Spot } = require('../../db/models');

// Import middleware used by router
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

// Middleware to validate the input for a new spot
const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal({ force_decimal: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal({ force_decimal: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

// Edit a Spot
router.put('/:spotId', [requireAuth, validateNewSpot], async (req, res, next) => {
    // Get the current logged in users id
    const { user } = req;
    let ownerId;
    if (user) {
        ownerId = user.id;
    }

    // Get the spot related to the provided spotId
    const { spotId } = req.params;
    const findSpotById = await Spot.findOne({
        where: {
            id: spotId
        }
    });

    // If provided spotId is not found respond with 404 error
    if (!findSpotById) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    // If provided spotId is not owned by the current logged in user respond with 403 error
    console.log(findSpotById);
    if (findSpotById.ownerId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    // Update spot with provided info from request body
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const updateSpotById = await findSpotById.update({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    // Respond with values of updated spot
    return res.json({
        id: updateSpotById.id,
        ownerId: updateSpotById.ownerId,
        address: updateSpotById.address,
        city: updateSpotById.city,
        state: updateSpotById.state,
        country: updateSpotById.country,
        lat: updateSpotById.lat,
        lng: updateSpotById.lng,
        name: updateSpotById.name,
        description: updateSpotById.description,
        price: updateSpotById.price,
        createdAt: updateSpotById.createdAt,
        updatedAt: updateSpotById.updatedAt
    });
});

// Delete a Spot
router.delete('/:spotId', [requireAuth], async (req, res, next) => {
    // Get the current logged in users id
    const { user } = req;
    let ownerId;
    if (user) {
        ownerId = user.id;
    }

    // Get the spot related to the provided spotId
    const { spotId } = req.params;
    const findSpotById = await Spot.findOne({
        where: {
            id: spotId
        }
    });

    // If provided spotId is not found respond with 404 error
    if (!findSpotById) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    // If provided spotId is not owned by the current logged in user respond with 403 error
    if (findSpotById.ownerId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    // Delete spot coorisponding to provided spotId
    await findSpotById.destroy();

    // Respond with successful deleted message
    return res.json({
        message: "Successfully deleted"
    });
});

// Create a Spot
router.post('/', [requireAuth, validateNewSpot], async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    // Get the current logged in users id
    const { user } = req;
    let ownerId;
    if (user) {
        ownerId = user.id;
    }

    // Create a new spot and assign it to the current user as ownerId
    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    // Respond with values of created spot
    return res.json({
        address: newSpot.address,
        city: newSpot.city,
        state: newSpot.state,
        country: newSpot.country,
        lat: newSpot.lat,
        lng: newSpot.lng,
        name: newSpot.name,
        description: newSpot.description,
        price: newSpot.price,
        createdAt: newSpot.createdAt,
        updatedAt: newSpot.updatedAt
    });
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
