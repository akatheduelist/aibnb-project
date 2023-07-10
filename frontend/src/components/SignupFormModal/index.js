import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const error = {};

        if (!email.length ||
            !username.length ||
            !firstName.length ||
            !lastName.length ||
            !password.length ||
            !confirmPassword.length) error.length = "Signup fields cannot be empty.";
        if (!username.length || username.length < 4) error.username = "Username field must be more than 4 characters."
        if (!password.length || password.length < 6) error.password = "Password cannot be fewer than 6 characters."

        setErrors(error)
    }, [email, username, firstName, lastName, password, confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const error = {}

            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.message) {
                        error.failure = Object.values(data.errors);
                        setErrors(error)
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    return (
        <>
            <div className="modal-container sign-up">
            <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    {errors.failure && (
                        <span className="validation-errors small medium">{errors.failure}</span>
                )}
                <label>
                    <input
                        type="text"
                            name="firstName"
                            placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                    <span className="validation-errors">
                    {/* {errors.firstName && <p>{errors.firstName}</p>} */}
                    </span>
                <label>
                    <input
                            type="text"
                            name="firstName"
                            placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.lastName && <p>{errors.lastName}</p>} */}
                <label>
                    <input
                            type="text"
                            name="email"
                            placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.email && <p>{errors.email}</p>} */}
                <label>
                    <input
                            type="text"
                            name="username"
                            placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.username && <p>{errors.username}</p>} */}
                <label>
                    <input
                            type="password"
                            name="password"
                            placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.password && <p>{errors.password}</p>} */}
                <label>
                    <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {/* {errors.confirmPassword && (
                    <p>{errors.confirmPassword}</p>
                )} */}
                <button className="red-button" type="submit" disabled={Object.keys(errors).length > 0}>Sign Up</button>
            </form>
            </div>
        </>
    );
}

export default SignupFormModal;
