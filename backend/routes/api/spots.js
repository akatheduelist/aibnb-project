const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

// Import models used by router
const {
	Spot,
	SpotImage,
	User,
	Review,
	ReviewImage,
	Booking,
} = require("../../db/models");

// Import middleware used by router
const { requireAuth } = require("../../utils/auth.js");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// Middleware to validate the input for a new spot
const validateNewSpot = [
	check("address")
		.exists({ checkFalsy: true })
		.withMessage("Street address is required"),
	check("city").exists({ checkFalsy: true }).withMessage("City is required"),
	check("state")
		.exists({ checkFalsy: true })
		.withMessage("State is required"),
	check("country")
		.exists({ checkFalsy: true })
		.withMessage("Country is required"),
	check("lat")
		.exists({ checkFalsy: true })
		.isDecimal({ force_decimal: true })
		.withMessage("Latitude is not valid"),
	check("lng")
		.exists({ checkFalsy: true })
		.isDecimal({ force_decimal: true })
		.withMessage("Longitude is not valid"),
	check("name")
		.exists({ checkFalsy: true })
		.isLength({ max: 50 })
		.withMessage("Name must be less than 50 characters"),
	check("description")
		.exists({ checkFalsy: true })
		.withMessage("Description is required"),
	check("price")
		.exists({ checkFalsy: true })
		.withMessage("Price per day is required"),
	handleValidationErrors,
];

// Middleware to validate the input for a new Review
const validateNewReview = [
	check("review")
		.exists({ checkFalsy: true })
		.withMessage("Review text is required"),
	check("stars")
		.exists({ checkFalsy: true })
		.isInt({ min: 1, max: 5 })
		.withMessage("Stars must be an integer from 1 to 5"),
	handleValidationErrors,
];

const validateNewBooking = [
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

// Create a Booking from a Spot based on the Spot's id
router.post(
	"/:spotId/bookings",
	[requireAuth, validateNewBooking],
	async (req, res, next) => {
		// If user is currently logged in, get userId of user
		const { user } = req;
		const { spotId } = req.params;
		const { startDate, endDate } = req.body;

		// Get spot based on spotId
		const getSpotById = await Spot.findByPk(spotId);

		// If provided spotId is not found respond with 404 error
		if (!getSpotById) {
			const err = new Error("Spot couldn't be found");
			err.status = 404;
			return next(err);
		}

		// Spot must NOT belong to the current user
		if (getSpotById.ownerId === user.id) {
			const err = new Error(
				"Booking spot cannot belong to the current user"
			);
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
				spotId: getSpotById.id,
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
				spotId: getSpotById.id,
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

		const createBookingBySpotId = await Booking.create({
			spotId,
			userId: user.id,
			startDate,
			endDate,
		});

		return res.json({
			id: createBookingBySpotId.id,
			spotId: createBookingBySpotId.spotId,
			userId: createBookingBySpotId.userId,
			startDate: createBookingBySpotId.startDate,
			endDate: createBookingBySpotId.endDate,
			createdAt: createBookingBySpotId.createdAt,
			updatedAt: createBookingBySpotId.updatedAt,
		});
	}
);

// Get all Bookings by a Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
	// Get the bookings related to the provided spotId
	const { user } = req;
	const { spotId } = req.params;

	const findSpotById = await Spot.findByPk(spotId);

	const findBookingsBySpotId = await Booking.findAll({
		where: {
			spotId,
		},
	});

	// If provided spotId is not found respond with 404 error
	if (findBookingsBySpotId.length < 1) {
		const err = new Error("Spot couldn't be found");
		err.status = 404;
		return next(err);
	}

	if (findSpotById.ownerId === user.id) {
		const payload = [];

		const bookingUser = await User.findByPk(user.id);
		console.log(bookingUser);

		findBookingsBySpotId.forEach((element) => {
			let booking = element.toJSON();
			booking.user = bookingUser;
			payload.push(booking);
		});

		return res.json({
			Bookings: payload,
		});
	}

	const findBookingsForNonOwners = await Booking.findAll({
		where: {
			spotId,
		},
		attributes: ["id", "startDate", "endDate"],
	});

	return res.json({
		Bookings: findBookingsForNonOwners,
	});
});

// Create a Review for a Spot based on the Spot's id
router.post(
	"/:spotId/reviews",
	[requireAuth, validateNewReview],
	async (req, res, next) => {
		// If user is currently logged in, get userId of user
		const { user } = req;
		const { spotId } = req.params;
		const { review, stars } = req.body;

		// Get all spots owned by the current user
		const getOwnerBookings = await Review.findOne({
			where: {
				userId: user.id,
				spotId,
			},
		});

		if (getOwnerReviews) {
			const err = new Error("User already has a review for this spot");
			err.status = 500;
			return next(err);
		}

		const findReviewsBySpotId = await Review.findOne({
			where: {
				spotId,
			},
		});

		// If provided spotId is not found respond with 404 error
		if (!findReviewsBySpotId) {
			const err = new Error("Spot couldn't be found");
			err.status = 404;
			return next(err);
		}

		if (user) {
			let safeUser = user.id;
			// Post a new review related to the provided spotId

			const spot = Number(spotId);

			const createReviewBySpotId = await Review.create({
				review,
				stars,
				spotId: spot,
				userId: safeUser,
			});

			res.status(201);
			return res.json({
				id: createReviewBySpotId.id,
				userId: createReviewBySpotId.userId,
				spotId: createReviewBySpotId.spotId,
				review: createReviewBySpotId.review,
				stars: createReviewBySpotId.stars,
				createdAt: createReviewBySpotId.createdAt,
				updatedAt: createReviewBySpotId.updatedAt,
			});
		}
	}
);

// Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
	// Get the reviews related to the provided spotId
	const { spotId } = req.params;
	const findReviewsBySpotId = await Review.findAll({
		where: {
			spotId,
		},
		include: [
			{
				model: User,
				attributes: ["id", "firstName", "lastName"],
			},
			{
				model: ReviewImage,
				attributes: ["id", "url"],
			},
		],
	});

	// If provided spotId is not found respond with 404 error
	if (findReviewsBySpotId.length < 1) {
		const err = new Error("Spot couldn't be found");
		err.status = 404;
		return next(err);
	} else {
		return res.json({
			Reviews: findReviewsBySpotId,
		});
	}
});

// Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
	// Get the current logged in users id
	const { user } = req;
	let ownerId;
	if (user) {
		ownerId = user.id;
	}

	// Get the spot related to the provided spotId
	const findSpotById = await Spot.findByPk(req.params.spotId);

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

	// Get image info from the request body
	const { url, preview } = req.body;
	const newSpotImage = await SpotImage.create({
		spotId: req.params.spotId,
		url,
		preview,
	});

	// Return information on the new image for associated spot
	return res.json({
		id: newSpotImage.id,
		url: newSpotImage.url,
		preview: newSpotImage.preview,
	});
});

// Get all Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
	const { user } = req;

	// If user is currently logged in, get userId of user
	if (user) {
		const safeUser = user.id;

		// Get all spots owned by the current user
		const getOwnerSpots = await Spot.findAll({
			where: {
				ownerId: safeUser,
			},
		});

		// Create payload array to contain all spot objects
		const payload = [];

		// For each spot get the combined star ratings and average the total in avgRating
		for (let i = 0; i < getOwnerSpots.length; i++) {
			const spot = getOwnerSpots[i];

			// Get the reviews associated with each spot, just the 'stars' attribute
			const starRating = await spot.getReviews({
				attributes: ["stars"],
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
				previewImage: "image url",
			};

			// Push spot data object into payload array
			payload.push(spotData);
		}

		return res.json({
			Spots: payload,
		});
	}
});

// Edit a Spot
router.put(
	"/:spotId",
	[requireAuth, validateNewSpot],
	async (req, res, next) => {
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
				id: spotId,
			},
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

		// Update spot with provided info from request body
		const {
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		} = req.body;
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
			price,
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
			updatedAt: updateSpotById.updatedAt,
		});
	}
);

// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
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
			id: spotId,
		},
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
		message: "Successfully deleted",
	});
});

// Get details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
	// Get the spot related to the provided spotId
	const { spotId } = req.params;
	const findSpotById = await Spot.findByPk(spotId);

	// If provided spotId is not found respond with 404 error
	if (!findSpotById) {
		const err = new Error("Spot couldn't be found");
		err.status = 404;
		return next(err);
	}

	// Get images related to specific spotId
	const findImagesBySpotId = await SpotImage.findAll({
		where: {
			spotId,
		},
		attributes: {
			exclude: ["spotId", "createdAt", "updatedAt"],
		},
	});

	// Get owner related to specific spotId
	const { ownerId } = findSpotById;
	const findSpotOwnerById = await User.findByPk(ownerId, {
		attributes: {
			exclude: ["username"],
		},
	});

	// Get the number of reviews associated with this spot
	const findReviewsById = await Review.findAll({
		where: {
			spotId,
		},
	});
	const numOfReviews = findReviewsById.length;

	// Calculate the average star rating associated with this spot
	let totalRating = 0;
	for (let i = 0; i < numOfReviews; i++) {
		const star = findReviewsById[i];
		totalRating += star.stars;
	}
	const avgStarRating = (totalRating / numOfReviews).toFixed(1);

	// Respond with spot information requested by spotId
	return res.json({
		id: findSpotById.id,
		ownerId: findSpotById.ownerId,
		city: findSpotById.state,
		country: findSpotById.country,
		lat: findSpotById.lat,
		lng: findSpotById.lng,
		name: findSpotById.name,
		descriptions: findSpotById.description,
		createdAt: findSpotById.createdAt,
		updatedAt: findSpotById.updatedAt,
		numReviews: numOfReviews,
		avgStarRating,
		SpotImages: findImagesBySpotId,
		Owner: findSpotOwnerById,
	});
});

// Create a Spot
router.post("/", [requireAuth, validateNewSpot], async (req, res) => {
	const {
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	} = req.body;

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
		price,
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
		updatedAt: newSpot.updatedAt,
	});
});

const validateQueryFilters = [
	check("page")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Page must be greater than or equal to 1"),
	check("size")
		.optional()
		.isInt({ min: 1 })
		.withMessage("Page must be greater than or equal to 1"),
	check("maxLat")
		.optional()
		.isInt()
		.withMessage("Maximum latitude is invalid"),
	check("minLat")
		.optional()
		.isInt()
		.withMessage("Minimum latitude is invalid"),
	check("minLng")
		.optional()
		.isInt()
		.withMessage("Maximum longitude is invalid"),
	check("maxLng")
		.optional()
		.isInt()
		.withMessage("Maximum longitude is invalid"),
	check("minPrice")
		.optional()
		.isInt({ min: 0 })
		.withMessage("Minimum price must be greater than or equal to 0"),
	check("maxPrice")
		.optional()
		.isInt({ min: 0 })
		.withMessage("Maximum price must be greater than or equal to 0"),
	handleValidationErrors,
];

// Get all Spots
router.get("/", validateQueryFilters, async (req, res, next) => {
	// Add Query Filters to Get All Spots
	const { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
		req.query;

	let offset;
	if (page >= 1 && page <= 10) {
		offset = size * (page - 1);
	} else {
		offset = 0;
	}

	let limit;
	if (size >= 1 && size <= 20) {
		limit = size;
	} else {
		limit = 20;
	}

	const getAllSpots = await Spot.findAll({
		limit,
		offset,
	});

	// Create payload array to contain all spot objects
	const payload = [];

	// For each spot get the combined star ratings and average the total in avgRating
	for (let i = 0; i < getAllSpots.length; i++) {
		const spot = getAllSpots[i];

		// Get the reviews associated with each spot, just the 'stars' attribute
		const starRating = await spot.getReviews({
			attributes: ["stars"],
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
			previewImage: "image url",
		};

		// Push spot data object into payload array
		payload.push(spotData);
	}

	return res.json({
		Spots: payload,
		page: offset,
		size: limit,
	});
});

module.exports = router;
