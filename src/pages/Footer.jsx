import logo from "../assets/logo.png";

import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="logo" onClick={() => navigate("/")}>
          <img src={logo}></img><span>StellSi</span>
      </div>
        <p>All rights reserved</p>
    </footer>
  );
}
