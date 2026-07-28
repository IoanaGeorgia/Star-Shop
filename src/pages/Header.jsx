import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo" onClick={() => navigate("/")}>
        Logo
      </div>

      <div className="nav-buttons">
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/contact")}>Contact</button>
        <button onClick={() => navigate("/account")}>Account</button>
      </div>
    </div>
  );
}
