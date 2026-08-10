import { useState } from "react";

export default function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: [],
    email: [],
    message: [],
  });

  const handleInput = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newErrors = {
      name: [],
      email: [],
      message: [],
    };

    if (!data.name.trim()) {
      newErrors.name.push("Name is required");
    } else if (data.name.trim().length < 2) {
      newErrors.name.push("Name is invalid (too short)");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email.push("Email is required");
    } else if (!emailRegex.test(data.email)) {
      newErrors.email.push("Email address is invalid");
    }

    if (!data.message.trim()) {
      newErrors.message.push("Message is required");
    } else if (data.message.trim().length < 10) {
      newErrors.message.push(
        "Message is invalid (must be at least 10 characters)",
      );
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((arr) => arr.length > 0);

    if (!hasErrors) {
      console.log("Form submitted successfully:", data);
    }
  };

  return (
    <div className="contact">
      <div className="secondary-decoration decoration"></div>

      <div className="contact-wrapper">
        <p className="title secondary-title">Contact</p>
        <p className=" subtitle">Talk to us</p>

        <div className="card">
          <div>Phone:</div>
          <div><a href="tel:+440744123345">+440744123345</a></div>
        </div>

        <div className="card">
          <div>Email:</div>
          <div><a href="mailto:star_shop@starhoo.com">star_shop@starhoo.com</a></div>
        </div>

        <div className="card">
          <div>Address:</div>
          <div>Longdon Street, Atlanta, Georgia</div>
        </div>

        <div className="form-wrapper">
          <p className="subtitle">Have anything to share with us?</p>
          <p className="subtitle">Leave us a message below:</p>

          <form>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleInput}
                maxLength="255"
            />
            {errors.name &&
              errors.name.map((error, i) => (
                <p className="error" key={i}>
                  {error}
                </p>
              ))}

            <label>Email address:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleInput}
              maxLength="255"
            />
            {errors.email &&
              errors.email.map((error, i) => (
                <p className="error" key={i}>
                  {error}
                </p>
              ))}

            <label>Your message for us:</label>
            <textarea
              name="message"
              value={data.message}
              onChange={handleInput}
              maxLength="1000"
            />
            {errors.message &&
              errors.message.map((error, i) => (
                <p className="error" key={i}>
                  {error}
                </p>
              ))}
            <button className="defaultSmallButton" onClick={submitForm}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
