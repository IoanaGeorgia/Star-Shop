import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./pages/Header";
import Catalogue from "./pages/Catalogue";
import BuyStar from "./pages/BuyStar";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter basename="/Star-Shop">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/buy-star" element={<BuyStar />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
