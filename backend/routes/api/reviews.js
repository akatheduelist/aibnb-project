const express = require('express');
const router = express.Router();

// Import models used by router
const { Spot, ReviewImage, User, Review } = require('../../db/models');

// Import middleware used by router
const { requireAuth } = require('../../utils/auth.js');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Middleware to validate the input for a new Review
const validateNewReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
        // Get the current logged in users id
        const { user } = req;
        let userId;
        if (user) {
            userId = user.id;
        }

        // Get the review related to the provided reviewId
        const { reviewId } = req.params;
        const findReviewById = await Review.findByPk(reviewId);

        // If provided reviewId is not found respond with 404 error
        if (!findReviewById) {
            const err = new Error("Review couldn't be found");
            err.status = 404;
            return next(err);
        }

        // If provided reviewId is not owned by the current logged in user respond with 403 error
        if (findReviewById.userId !== userId) {
            const err = new Error("Forbidden");
            err.status = 403;
            return next(err);
        };

        // Cannot add any more images because there is a maximum of 10 images per resource
        const findReviewImagesById = await ReviewImage.findAll({
            where: {
                reviewId
            }
        });

        if (findReviewImagesById.length > 10) {
            const err = new Error("Maximum number of images for this resource was reached");
            err.status = 403;
            return next(err);
        }

        // Get image info from the request body
        const { url } = req.body;
        const newReviewImage = await ReviewImage.create({
            reviewId,
            url,
        });

        // Return information on the new image for associated spot
        return res.json({
            id: newReviewImage.id,
            url: newReviewImage.url
        });
})

// Edit a Review
router.put('/:reviewId', [ requireAuth, validateNewReview ], async (req, res, next) => {
    // Get the current logged in users id
    const { user } = req;
    let userId;
    if (user) userId = user.id;

    // Get the review related to the provided reviewId
    const { reviewId } = req.params;
    const findReviewById = await Review.findByPk(reviewId);
    console.log(findReviewById)
    // If provided reviewId is not found respond with 404 error
    if (!findReviewById) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }

    // If provided reviewId is not owned by the current logged in user respond with 403 error
    if (findReviewById.userId !== userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    // Update review with provided info from request body
    const { review, stars } = req.body;
    const updateReviewById = await findReviewById.update({
        review,
        stars,
        userId
    });

    // Respond with values of updated spot
    return res.json({
        id: updateReviewById.id,
        userId: updateReviewById.userId,
        spotId: updateReviewById.spotId,
        review: updateReviewById.review,
        stars: updateReviewById.stars,
        createdAt: updateReviewById.createdAt,
        updatedAt: updateReviewById.updatedAt
    });
});

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
});

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
            payload.push(review);
        });

        return res.json({
            Reviews: payload
        });
    }
});

module.exports = router;
