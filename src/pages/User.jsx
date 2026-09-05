import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import Error from "./Error";

export default function User() {

    const user = useSelector((state) => state.auth.user);

    const [historyItems, setHistoryItems] = useState({})
    const [userData, setUserData] = useState([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
                setError(true);
                return
            }

            const data = await response.json()
            if (data.error) {
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
                    </div>
                </div>


                {isLoading ? <Loading /> : <div>
                    {error ? <Error /> : <div className="user-history">

                        <p className="subtitle">Purchase History</p>
                        <div className="orders-wrapper">
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