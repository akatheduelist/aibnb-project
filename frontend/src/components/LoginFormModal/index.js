import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const error = {};

        if (credential.length < 4) error.credential = "Username must be longer than 4 characters.";
        if (password.length < 6) error.password = "Password must be at least 6 characters.";

        setErrors(error);
    }, [credential, password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const error = {};

        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    error.failure = "The provided credentials were invalid."
                    setErrors(error)
                }
            });
    };

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                {errors.password && (
                    <p>{errors.password}</p>
                )}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p>{errors.credential}</p>
                )}
                <button type="submit" disabled={Object.keys(errors).length > 0}>Log In</button>
                {errors.failure && (
                    <p>{errors.failure}</p>
                )}
            </form>
        </>
    );
}

export default LoginFormModal;
