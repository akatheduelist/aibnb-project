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

//Delete an existing booking.
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
	// Get the current logged in users id
	const { user } = req;
	let userId;
	if (user) {
		userId = user.id;
	}

	// Get the booking related to the provided spotId
	const { bookingId } = req.params;
	const findBookingById = await Booking.findOne({
		where: {
			id: bookingId,
		},
		include: {
			model: Spot,
		},
	});

	// If provided bookingId is not found respond with 404 error
	if (!findBookingById) {
		const err = new Error("Booking couldn't be found");
		err.status = 404;
		return next(err);
	}

	// Booking must belong to the current user or the Spot must belong to the current user
	if (findBookingById.Spot.ownerId !== userId) {
		const err = new Error("Forbidden");
		err.status = 403;
		return next(err);
	}

	const currentDate = new Date();
	const bookingStartDate = new Date(findBookingById.startDate);
	if (currentDate > bookingStartDate) {
		const err = new Error(
			"Bookings that have been started can't be deleted"
		);
		err.status = 404;
		return next(err);
	}

	// Delete booking coorisponding to provided bookingId
	if (
		findBookingById.Spot.ownerId === userId ||
		findBookingById.userId === userId
	) {
		await findBookingById.destroy();
	} else if (findBookingById.userId !== userId) {
		const err = new Error("Forbidden");
		err.status = 403;
		return next(err);
	}

	// Respond with successful deleted message
	return res.json({
		message: "Successfully deleted",
	});
});

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
