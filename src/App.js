import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./pages/Header";
import Catalogue from "./pages/Catalogue";
import BuyStar from "./pages/BuyStar";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import Cart from "./pages/Cart";
import ScrollToTop from "./pages/ScrollTotop";
import ParralaxCover from "./pages/ParallaxCover";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestRoute from "./pages/GuestRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./slices/auth";
import User from "./pages/User";
import UserRoute from "./pages/UserRoute";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/auth/me", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((data) => {
        dispatch(login(data.user));
      })
      .catch(() => {
        dispatch(login(null));
      });
  }, [dispatch]);

  return (
     <BrowserRouter>
      <ScrollToTop />
      <Header />
      <ParralaxCover />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/buy-star" element={<BuyStar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<UserRoute />}>
          <Route path="/user" element={<User />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
