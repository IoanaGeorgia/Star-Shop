import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(false);

  const itemsInCart = useSelector((state) => state.cart.items.length);

  useEffect(() => {
    setIsMobile(false);
  }, [location.pathname]);

  return (
    <div className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo}></img>
        <span>StellSi</span>
      </div>

      {!isMobile && (
        <div className="nav-buttons">
          <button onClick={() => navigate("/about")}>About</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button
            onClick={() => navigate("/catalogue")}
            className="defaultSmallButton"
          >
            Catalogue
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="headerCart"
            title="see your cart"
            aria-label="see your cart"
          >
            ★{itemsInCart > 0 && <span>{itemsInCart}</span>}
          </button>
        </div>
      )}

      <button className="mobileToggle" onClick={() => setIsMobile(!isMobile)}>
        ≡
      </button>

      {isMobile && (
        <div className="mobileWrapper">
          <button className="close" onClick={() => setIsMobile(!isMobile)}>
            ×
          </button>
          <div className="nav-buttons">
            <button onClick={() => navigate("/about")}>About</button>
            <button onClick={() => navigate("/contact")}>Contact</button>
            <button
              onClick={() => navigate("/catalogue")}
              className="defaultSmallButton"
            >
              Catalogue
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="headerCart"
              title="See your cart"
              aria-label="see your cart"
            >
              ★ See cart {itemsInCart > 0 && <span>{itemsInCart}</span>}
            </button>

            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo}></img>
              <span>StellSi</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
