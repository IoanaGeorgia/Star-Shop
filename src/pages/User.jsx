import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { useDispatch } from "react-redux";
import { login } from "../slices/auth";
import { editUser } from "../slices/auth";
import { useNavigate } from "react-router-dom";

export default function User() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);

    const [historyItems, setHistoryItems] = useState({})
    const [userData, setUserData] = useState([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [errorDelete, setDeleteError] = useState(false)
    const [isDeleteLoading, setDeleteIsLoading] = useState(false)
    const [successDelete, setSuccessDelete] = useState(false)

    const [errorLogOut, setLogOutError] = useState(false)
    const [isLogOutLoading, setLogOutIsLoading] = useState(false)
    const [successLogOut, setSuccessLogOut] = useState(false)

    const [isEditingUserInfo, setIsEditingUserInfo] = useState(false)
    const [errorEdit, setEditError] = useState(false)
    const [isEditLoading, setEditIsLoading] = useState(false)
    const [successEdit, setSuccessEdit] = useState(false)

    const [newData, setNewData] = useState({
        username: user.username,
        email: user.email,
        password: "",
        password_retype: ""
    })

    const [newDataError, setNewDataErrors] = useState({
        username: "",
        email: "",
        password: "",
        password_retype: ""
    })

    useEffect(() => {
        loadHistory()
    }, [])


    async function loadHistory() {
        setError(false)
        setIsLoading(true)
        try {
            const response = await fetch("/api/user/history", {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (!response.ok) {
                setIsLoading(false)
                setError(true);
                return
            }

            const data = await response.json()
            if (data.error) {
                setIsLoading(false)
                setError(true);
                return
            }

            setHistoryItems(data.data.userHistory);
            setUserData(data.data.userInfo);

            setError(false)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setError(true)
        }
    }


    async function deleteUser() {
        setDeleteError(false)
        setDeleteIsLoading(true)
        try {
            const response = await fetch("/api/user/delete", {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (!response.ok) {
                setDeleteIsLoading(false)
                setDeleteError(true);
                return
            }

            const data = await response.json()
            if (data.error) {
                setDeleteIsLoading(false)
                setDeleteError(true);
                return
            }


            setDeleteError(false)
            setDeleteIsLoading(false)
            setSuccessDelete(true)
            dispatch(login(null));


        } catch (error) {
            console.log(error)
            setDeleteIsLoading(false)
            setDeleteError(true)
        }
    }


    async function logout() {
        setLogOutError(false)
        setLogOutIsLoading(true)
        try {
            const response = await fetch("/api/auth/logout", {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (!response.ok) {
                setLogOutIsLoading(false)
                setLogOutError(true);
                return
            }

            const data = await response.json()
            if (data.error) {
                setLogOutIsLoading(false)
                setLogOutError(true);
                return
            }


            setLogOutError(false)
            setLogOutIsLoading(false)
            setSuccessLogOut(true)
            dispatch(login(null));

        } catch (error) {
            console.log(error)
            setLogOutIsLoading(false)
            setLogOutError(true)
        }
    }

    async function editUserInfo(e) {
        e.preventDefault()

        setEditError(false)
        setSuccessEdit(false)

        const newErrors = {
            username: [],
            email: [],
            password: [],
            password_retype: []
        };

        if (!newData.username.trim()) {
            newErrors.username.push("Username is required");
        } else if (newData.username.trim().length < 2) {
            newErrors.username.push("Username is invalid (too short)");
        }

        if (newData.password && newData.password_retype.trim() !== newData.password.trim()) {
            newErrors.password_retype.push("Passwords do not match");
        }

        if (newData.password && newData.password.trim().length < 6) {
            newErrors.password.push("Password is invalid (too short)");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newData.email.trim()) {
            newErrors.email.push("Email is required");
        } else if (!emailRegex.test(newData.email)) {
            newErrors.email.push("Email address is invalid");
        }

        setNewDataErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((arr) => arr.length > 0);

        if (hasErrors) {
            return
        }


        let newUserInfo = {
            username: newData.username,
            email: newData.email,
            password: newData.password
        }

        setEditIsLoading(true)

        try {

            const response = await fetch("/api/user/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(newUserInfo)
            })

            if (!response.ok) {
                setEditIsLoading(false);
                setEditError(true)
                return;
            }

            const data = await response.json()

            if (data) {
                setEditIsLoading(false)
                setSuccessEdit(true)
                dispatch(editUser(data.data))
            }

        } catch (error) {
            setEditIsLoading(false)
            setEditError("There has been an error with editing your data. Please try again later")
        }

    }

    function toggleEditUserInfo() {
        setEditError(false);
        setEditIsLoading(false);
        setSuccessEdit(false);

        setNewData({
            username: user.username,
            email: user.email,
            password: "",
            password_retype: ""
        }
        )
        setNewDataErrors({
            username: "",
            email: "",
            password: "",
            password_retype: ""
        })

        setIsEditingUserInfo(!isEditingUserInfo)
    }


    const formatKeysToSnakeCase = (obj) => {
        const newObj = {};
        for (let key in obj) {
            const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            newObj[newKey] = obj[key];
        }
        return newObj;
    };

    const handleSeeMore = (star) => {
        const formattedStar = formatKeysToSnakeCase(star);
        navigate("/buy-star", { state: { star: formattedStar } });
    };


    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    function formatAddress(address) {
        let string = ""
        const entries = Object.entries(JSON.parse(address));

        for (let i = 0; i < entries.length; i++) {
            const [key, value] = entries[i];
            if (i === entries.length - 1) {
                string += key + ": " + value;
            } else {
                string += key + ": " + value + ", ";
            }
        }
        return string
    }

    return (
        <div className="side user">
            <div className="secondary-decoration decoration"></div>
            <div className="side-wrapper">
                <p className="title secondary-title">Hi, {user?.username || "Guest"}</p>

                <div className="user-info">
                    <p className="subtitle">Account Information</p>
                    <div className="wrapper">
                        <p>Email: {user?.email || "Not available"}</p>
                        <p>Username: {user?.username || "Not available"}</p>
                        <p>Terms accepted: {userData.termsAccepted ? "yes" : "no"}</p>
                        <p>Account created: {userData.createdAt ? formatDate(userData.createdAt) : "Date not available"}</p>
                        <div className="button-wrapper">

                            <button className="defaultSmallButton" onClick={logout} disabled={isLogOutLoading}>Logout</button>
                            {isLogOutLoading && <div className="loading">Logging you out...</div>}
                            {errorLogOut && <div className="error">An error has occured</div>}
                            {successLogOut && <div className="success">You have been successfully logged out. You will be redirected</div>}

                            <button className="defaultSmallButton" onClick={() => { toggleEditUserInfo() }}>Edit account information</button>
                            {isEditingUserInfo && <form>
                                <div>
                                    <label htmlFor="username">New username:</label>
                                    <input id="username" type="text" onChange={(e) => setNewData((prev) => ({ ...prev, username: e.target.value }))} value={newData.username}></input>
                                    {newDataError.username && newDataError.username.map((error, index) => (
                                        <p key={index} className="error">{error}</p>
                                    ))}
                                </div>

                                <div>
                                    <label htmlFor="email">New email:</label>
                                    <input id="email" type="text" onChange={(e) => setNewData((prev) => ({ ...prev, email: e.target.value }))} value={newData.email}></input>
                                    {newDataError.email && newDataError.email.map((error, index) => (
                                        <p key={index} className="error">{error}</p>
                                    ))}
                                </div>


                                <div>
                                    <label htmlFor="pass">New password:</label>
                                    <input id="pass" type="text" onChange={(e) => setNewData((prev) => ({ ...prev, password: e.target.value }))} value={newData.password}></input>
                                    {newDataError.password && newDataError.password.map((error, index) => (
                                        <p key={index} className="error">{error}</p>
                                    ))}
                                </div>

                                <div>
                                    <label htmlFor="pass_re">Retype new password:</label>
                                    <input id="pass_re" type="text" onChange={(e) => setNewData((prev) => ({ ...prev, password_retype: e.target.value }))} value={newData.password_retype}></input>
                                    {newDataError.password_retype && newDataError.password_retype.map((error, index) => (
                                        <p key={index} className="error">{error}</p>
                                    ))}
                                </div>

                                <button className="defaultSmallButton" onClick={(e) => editUserInfo(e)}>Save new info</button>
                                {isEditLoading && <div className="loading">Sending the new data to the database...</div>}
                                {errorEdit && <div className="error">An error has occured</div>}
                                {successEdit && <div className="success">Your data has been successfully edited</div>}
                            </form>}

                            <button className="defaultSmallButton" onClick={deleteUser} disabled={isDeleteLoading}>Delete account</button>
                            {isDeleteLoading && <div className="loading">Deleting your account...</div>}
                            {errorDelete && <div className="error">Could not delete your account</div>}
                            {successDelete && <div className="success">Your account was successfully deleted. You will be redirected</div>}
                        </div>
                    </div>
                </div>


                {isLoading ? <Loading /> : <div>
                    {error ? <Error /> : <div className="user-history">

                        <p className="subtitle">Purchase History</p>
                        <div className="orders-wrapper">
                            {historyItems.length === 0 && <div>No orders yet</div>}
                            {historyItems.length > 0 && historyItems.map((order) => (<div className="order" key={order.createdAt}>
                                <p>Order placed at: {formatDate(order.createdAt)}</p>
                                <p>Total sum: {order.totalSum}</p>
                                <p>Status: {order.status}</p>
                                <p>Shipping address: {formatAddress(order.shippingAddress)}</p>
                                <p>Billing address: {formatAddress(order.billingAddress)}</p>

                                <p><strong>Items in your order:</strong></p>
                                <div className="order-items-wrapper">
                                    {order.items.map((orderItem) => (<div className="order-item" key={orderItem.product.name}>
                                        <p>Name:{orderItem.product.name}</p>
                                        <p>Constellation: {orderItem.product.constellation}</p>
                                        <p>Spectral class: {orderItem.product.spectralClass}</p>
                                        <p>Price: {orderItem.price}</p>
                                        <button
                                            className="defaultSmallButton"
                                            onClick={() => handleSeeMore(orderItem.product)}
                                        >
                                            See more
                                        </button>

                                    </div>))}
                                </div>
                            </div>))}
                        </div>


                    </div>}
                </div>
                }

            </div>
        </div >

    )
}