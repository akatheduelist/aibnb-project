const express = require("express");
const router = express.Router();

// Import models used by router
const { ReviewImage, Spot, Review } = require("../../db/models");

// Import middleware used by router
const { requireAuth } = require("../../utils/auth.js");

// Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
	const { user } = req;
	const { imageId } = req.params;

	// Find image by imageId
	const getImageById = await ReviewImage.findByPk(imageId, {
		include: {
			model: Review,
			include: {
				model: Spot,
			},
		},
	});

	//Error response: Couldn't find a Review Image with the specified id
	if (!getImageById) {
		const err = new Error("Spot Image couldn't be found");
		err.status = 404;
		return next(err);
	}

	//Require proper authorization: Spot must belong to the current user
	if (getImageById.Review.Spot.ownerId !== user.id) {
		const err = new Error("Forbidden");
		err.status = 403;
		return next(err);
	}

	//Delete an existing image for a Spot.
	getImageById.destroy();

	// Respond with successful deleted message
	return res.json({
		message: "Successfully deleted",
	});
});

module.exports = router;
