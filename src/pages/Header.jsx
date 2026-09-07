import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  const [isMobile, setIsMobile] = useState(false);

  const itemsInCart = useSelector((state) => state.cart.items.length);

  useEffect(() => {
    setIsMobile(false);
  }, [location.pathname]);

  function formatUsername(username) {
    if (!username) return "";
    return username.charAt(0).toUpperCase();
  }

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
          >
            Catalogue
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="headerCart"
            title="see your cart"
            aria-label="see your cart"
          >
            See cart{itemsInCart > 0 && <span>{itemsInCart}</span>}
          </button>

          {user ? (
            <button onClick={() => navigate("/user")} title="view your profile" aria-label="view your profile" className="user-info">
              <span>Hi, {formatUsername(user.username)}</span>
            </button>
          ) : <button
            onClick={() => navigate("/login")}
            title="register or login"
            aria-label="redirect to login page"
                className="defaultSmallButton"
          >
            Login
          </button>}
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
            >
              Catalogue
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="headerCart"
              title="See your cart"
              aria-label="see your cart"
            >
              See cart {itemsInCart > 0 && <span>{itemsInCart}</span>}
            </button>


            {user ? (
              <button onClick={() => navigate("/user")} title="view your profile" aria-label="view your profile" className="user-info">
                <span>See your account</span>
              </button>
            ) : <button
              onClick={() => navigate("/login")}
              title="register or login"
              aria-label="redirect to login page"
                            className="defaultSmallButton"
            >
              Login or register
            </button>}

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
