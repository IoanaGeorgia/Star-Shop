import React, { useState, useEffect } from "react";
import classO from "../assets/AST_SC_O.png";
import classA from "../assets/AST_SC_A.png";
import classB from "../assets/AST_SC_B.png";
import classF from "../assets/AST_SC_F.png";
import classG from "../assets/AST_SC_G.png";
import classK from "../assets/AST_SC_K.png";
import classM from "../assets/AST_SC_M.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, deleteItemFromCart, emptyCart } from "../slices/cart";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import TopProducts from "./TopProducts";

export default function Cart() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  const imageBySpectral = {
    O: classO,
    A: classA,
    B: classB,
    F: classF,
    G: classG,
    K: classK,
    M: classM,
  };

  const getSpectralImage = (spectralClass) => {
    const spectralType = spectralClass?.charAt(0);
    return imageBySpectral[spectralType] || classO;
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    differentShipping: false,
    shippingFullName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingZip: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};


    if (!formData.fullName.trim()) {
      newErrors.fullName = "full name is required";
    } else if (formData.fullName.trim().length < 10) {
      newErrors.fullName = "Name has to be at least 10 letters long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zip.trim()) newErrors.zip = "Postal code is required";

    if (formData.differentShipping) {
      if (!formData.shippingFullName.trim()) {
        newErrors.shippingFullName = "Shipping name is required";
      }
      if (!formData.shippingAddress.trim()) {
        newErrors.shippingAddress = "Shipping address is required";
      }
      if (!formData.shippingCity.trim()) {
        newErrors.shippingCity = "Shipping city is required";
      }
      if (!formData.shippingZip.trim()) {
        newErrors.shippingZip = "Shipping postal code is required";
      }
    }

    if(!user){
      newErrors.user = "You have to login or create an account to buy this item!"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let newErrors = {};

    const orderData = {
      userId: user.id,
      totalSum: cartItems.length * 20000,
      billingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      },
      "items": cartItems.map((item) => ({
        price: 20000,
        quantity: item.count ?? 1,
        starDetails: {
          name: item.name,
          constellation: item.constellation,
          right_ascension: item.right_ascension,
          declination: item.declination,
          apparent_magnitude: item.apparent_magnitude,
          absolute_magnitude: item.absolute_magnitude,
          distance_light_year: item.distance_light_year,
          spectral_class: item.spectral_class
        }
      })),
      shippingAddress: formData.differentShipping
        ? {
          fullName: formData.shippingFullName,
          address: formData.shippingAddress,
          city: formData.shippingCity,
          zip: formData.shippingZip,
        }
        : {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
        },
    };

    setLoading(true);
    const response = await fetch(`/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      newErrors.form = "There was an error placing your order. Please try again.";
      setErrors((prev) => ({ ...prev, ...newErrors }));
      setLoading(false)
      return;
    }

    const data = await response.json();
    if (data.error) {
      newErrors.form = "A server error has occured.";
      setErrors((prev) => ({ ...prev, ...newErrors }));
      setLoading(false)
    }

    setSuccess(true);
    setLoading(false)
    dispatch(emptyCart());
  };

  return (
    <div className="cart">
      <div className="decoration secondary-decoration"></div>


      <div className="cart-wrapper">
        <p className="title">Your cart</p>

        {loading ? <Loading />
          : <>{errors.form ? <Error /> :
            <div className="cart-inner-wrapper">
              <div className="item-area">

                {!user && <div className="userAuth">
                  <button onClick={() => navigate("/login")}>Log in</button>
                  or
                  <button onClick={() => navigate("/register")}>Register</button>
                </div>}
                <div className="cart-items">
                  {cartItems.length ? (
                    cartItems.map((star, index) => (
                      <div className="card" key={star.id || star.name || index}>
                        <div>
                          <img
                            src={getSpectralImage(star.spectral_class)}
                            alt={star.name || "Star"}
                          />
                          <span>{star.name}</span>
                        </div>
                        <div className="actions">
                          <div className="changeCount">
                            <button onClick={() => dispatch(addToCart(star))}>
                              +
                            </button>
                            <div>{star.count ?? 1}</div>
                            <button onClick={() => dispatch(removeFromCart(star))}>
                              -
                            </button>
                          </div>

                          <button
                            className="delete"
                            onClick={() => dispatch(deleteItemFromCart(star))}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="error no-items">No items in cart</div>
                  )}
                </div>
              </div>

              {cartItems.length > 0 && <div className="payment-area">
                <p className="subtitle">Order details</p>
                <form onSubmit={handleSubmit} className="checkout-form" noValidate>
                  <p>Billing Information</p>

                  <div>
                    <label htmlFor="fullName">Full name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && <p className="error">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="address">Billing Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && <p className="error">{errors.address}</p>}
                  </div>


                  <div>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="zip">ZIP Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                    {errors.zip && <p className="error">{errors.zip}</p>}
                  </div>


                  <div className="checkbox-field">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        name="differentShipping"
                        checked={formData.differentShipping}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      Ship to a different address
                    </label>
                  </div>

                  {formData.differentShipping && (
                    <div className="shipping-section">
                      <p>Shipping Information</p>

                      <div>
                        <label htmlFor="shippingFullName">Recipient Name</label>
                        <input
                          type="text"
                          id="shippingFullName"
                          name="shippingFullName"
                          value={formData.shippingFullName}
                          onChange={handleChange}
                        />
                        {errors.shippingFullName && (
                          <p className="error">{errors.shippingFullName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="shippingAddress">Shipping Address</label>
                        <input
                          type="text"
                          id="shippingAddress"
                          name="shippingAddress"
                          value={formData.shippingAddress}
                          onChange={handleChange}
                        />
                        {errors.shippingAddress && (
                          <p className="error">{errors.shippingAddress}</p>
                        )}
                      </div>

                      <div className="form-row">
                        <div>
                          <label htmlFor="shippingCity">City</label>
                          <input
                            type="text"
                            id="shippingCity"
                            name="shippingCity"
                            value={formData.shippingCity}
                            onChange={handleChange}
                          />
                          {errors.shippingCity && (
                            <p className="error">{errors.shippingCity}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="shippingZip">ZIP Code</label>
                          <input
                            type="text"
                            id="shippingZip"
                            name="shippingZip"
                            value={formData.shippingZip}
                            onChange={handleChange}
                          />
                          {errors.shippingZip && (
                            <p className="error">{errors.shippingZip}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="defaultSmallButton">Place Order</button>

                  {errors.user && <p className="error">{errors.user}</p>}

                  {!user && <div className="userAuth">
                  <button onClick={() => navigate("/login")}>Log in</button>
                  or
                  <button onClick={() => navigate("/register")}>Register</button>
                </div>}
                </form>
              </div>}

            </div>} </>
        }

      </div>
        <TopProducts />
    </div>
  );
}
