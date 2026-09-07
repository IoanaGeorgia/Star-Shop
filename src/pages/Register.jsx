import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from "../slices/auth";

export default function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [dataValues, setDataValues] = useState({
        username: "",
        termsAccepted: false,
        email: "",
        password: "",
        retype_password: "",
    });

    const [errors, setErrors] = useState({
        username: [],
        termsAccepted: [],
        email: [],
        password: [],
        retype_password: [],
        call: []
    });

    async function registerUser() {
        const newErrors = {
            username: [],
            termsAccepted: [],
            email: [],
            password: [],
            retype_password: [],
            call: []
        };

        if (!dataValues.username.trim()) {
            newErrors.username.push("Username is required");
        } else if (dataValues.username.trim().length < 2) {
            newErrors.username.push("Username is invalid (too short)");
        }

        if (!dataValues.termsAccepted) {
            newErrors.termsAccepted.push("You must accept the terms and conditions");
        }

        if (!dataValues.retype_password.trim()) {
            newErrors.retype_password.push("Please retype your password");
        } else if (dataValues.retype_password.trim() !== dataValues.password.trim()) {
            newErrors.retype_password.push("Passwords do not match");
        }

        if (!dataValues.password.trim()) {
            newErrors.password.push("Password is required");
        } else if (dataValues.password.trim().length < 6) {
            newErrors.password.push("Password is invalid (too short)");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!dataValues.email.trim()) {
            newErrors.email.push("Email is required");
        } else if (!emailRegex.test(dataValues.email)) {
            newErrors.email.push("Email address is invalid");
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((arr) => arr.length > 0);

        if (!hasErrors) {
            setIsLoading(true)

            const dataToSend = {
                username: dataValues.username.trim(),
                email: dataValues.email.trim(),
                password: dataValues.password.trim(),
                termsAccepted: dataValues.termsAccepted
            };
            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                });
                const data = await response.json();

                if (!response.ok) {
                    setErrors((prevErrors) => ({
                    ...prevErrors,
                    call: ["Registration failed. Please try again"]
                }));
                setIsLoading(false);
                }
                console.log("Register successful:", data);
                dispatch(login(data.data));
                setIsLoading(false);
                setIsSuccess(true);

            } catch (error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    call: ["An error occurred during registration. Please try again."]
                }));
                setIsLoading(false)
            }
        }
    }

    return (

        <div className="side register">
            <div className="secondary-decoration decoration"></div>
            <div className="side-wrapper">
                <p className="title secondary-title">Register</p>
                {isSuccess ? (
                    <div className="success">
                        <p>Registration successful!</p>
                    </div>
                ) : (
                    <form>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={dataValues.username} onChange={(e) => setDataValues({ ...dataValues, username: e.target.value })} placeholder="Enter your username" required />
                            {errors.username &&
                                errors.username.map((error, i) => (
                                    <p className="error" key={i}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={dataValues.email} onChange={(e) => setDataValues({ ...dataValues, email: e.target.value })} placeholder="Enter your email" required />
                            {errors.email &&
                                errors.email.map((error, i) => (
                                    <p className="error" key={i}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="text" id="password" name="password" value={dataValues.password} onChange={(e) => setDataValues({ ...dataValues, password: e.target.value })} placeholder="Enter your password" required />
                            {errors.password &&
                                errors.password.map((error, i) => (
                                    <p className="error" key={i}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div>
                            <label htmlFor="retype_password">Retype Password</label>
                            <input type="text" id="retype_password" name="retype_password" value={dataValues.retype_password} onChange={(e) => setDataValues({ ...dataValues, retype_password: e.target.value })} placeholder="Retype your password" required />
                            {errors.retype_password &&
                                errors.retype_password.map((error, i) => (
                                    <p className="error" key={i}>
                                        {error}
                                    </p>
                                ))}
                        </div>

                        <div>
                            <div className="checkbox-field">
                                <label className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        name="termsAccepted"
                                        checked={dataValues.termsAccepted}
                                        onChange={(e) => setDataValues({ ...dataValues, termsAccepted: e.target.checked })}
                                    />
                                    <span className="checkmark"></span>
                                    I agree to the terms and conditions
                                </label>
                            </div>
                            {errors.termsAccepted &&
                                errors.termsAccepted.map((error, i) => (
                                    <p className="error" key={i}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                        {errors.call && <p className="error">{errors.call}</p>}
                        {isLoading && <p className="center">Loading...</p>}

                        <button onClick={(e) => {
                            e.preventDefault();
                            registerUser();
                        }} className="defaultSmallButton">Register</button>

                        <div className="userAuth">
                            <button onClick={() => navigate("/login")}>Already have an account? Log in here</button>
                        </div>

                    </form>
                )}
            </div>
        </div>
    )
}