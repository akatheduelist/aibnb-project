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

        if (credential.length > 1 && credential.length < 4) error.credential = "Username must be longer than 4 characters.";
        if (password.length > 1 && password.length < 6) error.password = "Password must be at least 6 characters.";

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
                console.log("Log in User Data => ", data)
                if (data && data.errors) {
                    setErrors(error);
                }
            });
    };

    return (
        <div className="login-form">
                <h2>Log In</h2>
                <form className="form-modal" onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="Username or Email"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    {errors.password && (
                        <p>{errors.password}</p>
                    )}
                    <label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errors.credential && (
                        <p>{errors.credential}</p>
                    )}
                    <button className="red-button login-submit" type="submit" disabled={Object.keys(errors).length > 0}>Log In</button>
                    {errors.failure && (
                        <p>{errors.failure}</p>
                )}
                <div>
                    <button className="link-button medium login-submit" type="submit" onClick={() => {
                        setCredential("Demo-lition");
                        setPassword("password");
                    }}>Log in as Demo User</button>
                </div>
                </form >
            </div>
    );
}

export default LoginFormModal;
