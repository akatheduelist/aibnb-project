const express = require("express");
const router = express.Router();

// Import models used by router
const { Spot, Booking } = require("../../db/models");

// Import middleware used by router
const { requireAuth } = require("../../utils/auth.js");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// Middleware to validate the input for a new Review
const validateNewBooking = [
	check("startDate")
		.exists({ checkFalsy: true })
		.withMessage("Start date is required")
		.custom(async (value, { req }) => {
			const exitstingStartDate = await Booking.findOne({
				where: {
					spotId: req.params.spotId,
					startDate: value,
				},
			});
			if (exitstingStartDate) {
				throw new Error(
					"Start date conflicts with an existing booking"
				);
			}
		}),
	check("endDate").exists({ checkFalsy: true }).isDate(),
	check("endDate").custom(async (value, { req }) => {
		const startDate = new Date(req.body.startDate).getTime();
		const endDate = new Date(value).getTime();
		if (endDate <= startDate) {
			throw new Error("end Date cannot be on or before start Date");
		}
		return value;
	}),
	handleValidationErrors,
];

const validateEditBooking = [
	check("startDate")
		.exists({ checkFalsy: true })
		.withMessage("Start date is required")
		.isDate(),
	check("endDate")
		.exists({ checkFalsy: true })
		.withMessage("End date is required")
		.isDate()
		.custom(async (value, { req }) => {
			const startDate = new Date(req.body.startDate);
			const endDate = new Date(value);

			if (startDate >= endDate) {
				throw new Error("endDate cannot come before startDate");
			}
		}),
	handleValidationErrors,
];

//Edit a Booking
router.put(
	"/:bookingId",
	[requireAuth, validateEditBooking],
	async (req, res, next) => {
		// If user is currently logged in, get userId of user
		const { user } = req;
		const { bookingId } = req.params;
		const { startDate, endDate } = req.body;

		// Get spot based on spotId
		const getBookingById = await Booking.findByPk(bookingId);

		//Couldn't find a Booking with the specified id
		if (!getBookingById) {
			const err = new Error("Booking couldn't be found");
			err.status = 404;
			return next(err);
		}

		// Booking must belong to the current user
		if (getBookingById.userId !== user.id) {
			const err = new Error("Forbidden");
			err.status = 403;
			return next(err);
		}

		// Error response: Can't edit a booking that's past the end date
		const endBookingDate = new Date(endDate);
		const currentDate = new Date();

		if (currentDate > endBookingDate) {
			const err = new Error("Past bookings can't be modified");
			err.status = 403;
			return next(err);
		}

		//Booking conflict
		const queryStartDate = await Booking.findOne({
			where: {
				spotId: getBookingById.id,
				startDate: startDate,
			},
		});
		if (queryStartDate) {
			const err = new Error(
				"Sorry, this spot is already booked for the specified dates"
			);
			err.errors = {
				startDate: "Start date conflicts with an existing booking",
			};
			err.status = 403;
			return next(err);
		}
		const queryEndDate = await Booking.findOne({
			where: {
				endDate: endDate,
			},
		});
		if (queryEndDate) {
			const err = new Error(
				"Sorry, this spot is already booked for the specified dates"
			);
			err.errors = {
				endDate: "End date conflicts with an existing booking",
			};
			err.status = 403;
			return next(err);
		}

		const updateBookingBySpotId = await getBookingById.update({
			spotId: getBookingById.id,
			userId: user.id,
			startDate,
			endDate,
		});

		// Successful Response
		return res.json({
			id: updateBookingBySpotId.id,
			spotId: updateBookingBySpotId.spotId,
			userId: updateBookingBySpotId.userId,
			startDate: updateBookingBySpotId.startDate,
			endDate: updateBookingBySpotId.endDate,
			createdAt: updateBookingBySpotId.createdAt,
			updatedAt: updateBookingBySpotId.updatedAt,
		});
	}
);

// Delete a Booking
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

	// Booking must belong to the current user
	// if (
	// 	findBookingById.userId !== userId ||
	// 	findBookingById.Spot.ownerId !== userId
	// ) {
	// 	const err = new Error("Forbidden");
	// 	err.status = 403;
	// 	return next(err);
	// }

	// Error response: Bookings that have been started can't be deleted
	const currentDate = new Date();
	const bookingStartDate = new Date(findBookingById.startDate);
	if (currentDate > bookingStartDate) {
		const err = new Error(
			"Bookings that have been started can't be deleted"
		);
		err.status = 403;
		return next(err);
	}

	// Delete booking coorisponding to provided bookingId
	if (
		findBookingById.Spot.ownerId === userId ||
		findBookingById.userId === userId
	) {
		await findBookingById.destroy();
	} else {
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
