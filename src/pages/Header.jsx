import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(false);

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
            onClick={() => navigate("/account")}
            className="defaultSmallButton"
          >
            Account
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
              onClick={() => navigate("/account")}
              className="defaultSmallButton"
            >
              Account
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
