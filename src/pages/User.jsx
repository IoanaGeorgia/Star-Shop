import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/auth";

export default function User() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
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
                            {historyItems.length > 0 && historyItems.map((order) => (<div className="order">
                                <p>Order placed at: {formatDate(order.createdAt)}</p>
                                <p>Total sum: {order.totalSum}</p>
                                <p>Status: {order.status}</p>
                                <p>Shipping address: {formatAddress(order.shippingAddress)}</p>
                                <p>Billing address: {formatAddress(order.billingAddress)}</p>

                                <p><strong>Items in your order:</strong></p>
                                <div className="order-items-wrapper">
                                    {order.items.map((orderItem) => (<div className="order-item">
                                        <p>Name:{orderItem.product.name}</p>
                                        <p>Constellation: {orderItem.product.constellation}</p>
                                        <p>Spectral class: {orderItem.product.spectralClass}</p>
                                        <p>Price: {orderItem.price}</p>

                                    </div>))}
                                </div>
                            </div>))}
                        </div>


                    </div>}
                </div>
                }

            </div>
        </div>


    )
}