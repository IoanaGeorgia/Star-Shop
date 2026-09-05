import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../slices/auth";
import { useDispatch } from "react-redux";

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSuccess, setIsSuccess] = useState(false);

    const [dataValues, setDataValues] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: [],
        password: [],
        call: []
    });

    async function loginUser() {
        const newErrors = {
            email: [],
            password: [],
            call: []
        };

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
            try {
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(dataValues)
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Login failed");
                }
                console.log("Login successful:", data);
                dispatch(login(data));
                setIsSuccess(true);
            } catch (error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    call: ["An error occurred during login. Please try again."]
                }));
            }
        }
    }

    return (

        <div className="side login">
            <div className="secondary-decoration decoration"></div>
            <div className="side-wrapper">
                <p className="title secondary-title">Login</p>
                {isSuccess ? (
                    <div className="success">
                        <p>Login successful!</p>
                    </div>
                ) : (
                    <form>
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
                        <input type="password" id="password" name="password" value={dataValues.password} onChange={(e) => setDataValues({ ...dataValues, password: e.target.value })} placeholder="Enter your password" required />
                        {errors.password &&
                            errors.password.map((error, i) => (
                                <p className="error" key={i}>
                                    {error}
                                </p>
                            ))}
                    </div>

                    {errors.call && <p className="error">{errors.call}</p>}

                    <button onClick={(e) => {
                        e.preventDefault();
                        loginUser();
                    }} className="defaultSmallButton">Login</button>

                    <div className="userAuth">
                        <button onClick={() => navigate("/register")}>No account? Register here</button>
                    </div>
                </form>
                )}
            </div>
        </div>

    )
}