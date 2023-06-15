const express = require('express');
const router = express.Router();

// Import models used by router
const { Spot, ReviewImage, User, Review } = require('../../db/models');

// Import middleware used by router
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Middleware to validate the input for ********
const validate = [
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

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
        // Get the current logged in users id
        const { user } = req;
        let ownerId;
        if (user) {
            ownerId = user.id;
        }

        // Get the Review related to the provided spotId
        const { reviewId } = req.params;
        const findReviewById = await Review.findByPk(reviewId);

        // If provided reviewId is not found respond with 404 error
        if (!findReviewById) {
            const err = new Error("Review couldn't be found");
            err.status = 404;
            return next(err);
        }

        // If provided reviewId is not owned by the current logged in user respond with 403 error
        if (findReviewById.userId !== ownerId) {
            const err = new Error("Forbidden");
            err.status = 403;
            return next(err);
        }

        // Delete review coorisponding to provided reviewId
        await findReviewById.destroy();

        // Respond with successful deleted message
        return res.json({
            message: "Successfully deleted"
        });
})

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, _next) => {
    const { user } = req;

    // If user is currently logged in, get userId of user
    if (user) {
        const safeUser = user.id;


        // Get all reviews owned by the current user
        const getOwnerReviews = await Review.findAll({
            where: {
                userId: safeUser
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'],
                    }
                },
                {
                    model: Spot,
                    attributes: {
                        exclude: ['description', 'createdAt', 'updatedAt'],
                    }
                },
                {
                    model: ReviewImage,
                    attributes: {
                        exclude: ['reviewId', 'createdAt', 'updatedAt']
                    }
                }
            ],
        });

        let payload = [];

        getOwnerReviews.forEach(element => {
            let review = element.toJSON();
            review.Spot.previewImage = "image url";
            payload.push(review)
        });

        return res.json({
            Reviews: payload
        });
    }
});

module.exports = router;
