const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Invalid email"),
	check("firstName")
		.exists({ checkFalsy: true })
		.isAlpha()
		.withMessage("First Name is required"),
	check("lastName")
		.exists({ checkFalsy: true })
		.isAlpha()
		.withMessage("Last Name is required"),
	check("username")
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage("Please provide a username with at least 4 characters."),
	check("username")
		.not()
		.isEmail()
		.withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
	const { firstName, lastName, email, password, username } = req.body;
	const hashedPassword = bcrypt.hashSync(password);

	//Error response: User already exists with the specified email
	const queryEmail = await User.findOne({
		where: {
			email,
		},
	});
	if (queryEmail) {
		const err = new Error("User already exists");
		(err.errors = {
			email: "User with that email already exists",
		}),
			(err.status = 500);
		return next(err);
	}

	//Error response: User already exists with the specified username
	const queryUsername = await User.findOne({
		where: {
			username,
		},
	});
	if (queryUsername) {
		const err = new Error("User already exists");
		(err.errors = {
			email: "User with that username already exists",
		}),
			(err.status = 500);
		return next(err);
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		username,
		hashedPassword,
	});

	const safeUser = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		username: user.username,
	};

	await setTokenCookie(res, safeUser);

	return res.json({
		user: safeUser,
	});
});

module.exports = router;
