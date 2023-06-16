const express = require("express");
const router = express.Router();

// Import models used by router
const { Spot, Booking } = require("../../db/models");

// Import middleware used by router
const { requireAuth } = require("../../utils/auth.js");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// Middleware to validate the input for a new Review
const validate = [
	check("review")
		.exists({ checkFalsy: true })
		.withMessage("Review text is required"),
	check("stars")
		.exists({ checkFalsy: true })
		.isInt({ min: 1, max: 5 })
		.withMessage("Stars must be an integer from 1 to 5"),
	handleValidationErrors,
];

// Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res, next) => {
	const { user } = req;

	// If user is currently logged in, get userId of user
	if (user) {
		const safeUser = user.id;

		// Get all bookings owned by the current user
		const getOwnerBookings = await Booking.findAll({
			where: {
				userId: safeUser,
			},
			include: [
				{
					model: Spot,
					attributes: {
						exclude: ["description", "createdAt", "updatedAt"],
					},
				},
			],
		});

		let payload = [];

		getOwnerBookings.forEach((element) => {
			let booking = element.toJSON();
			booking.Spot.previewImage = "image url";
			payload.push(booking);
		});

		return res.json({
			Bookings: payload,
		});
	}
});

module.exports = router;
