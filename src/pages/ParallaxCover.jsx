import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import par2 from "../assets/par2.png"
import par3 from "../assets/par3.png"
import par4 from "../assets/par4.png"
import par5 from "../assets/par5.png"

export default function ParralaxCover() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="decoration-par">
      <img
        src={logo}
        className="first"
        alt="planet"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      />
      <img
        src={par2}
        className="second"
        alt="planet"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      />
      <img
        src={par3}
        className="third"
        alt="planet"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      />
      <img
        src={par5}
        className="forth"
        alt="planet"
        style={{ transform: `translateY(${scrollY * -0.09}px)` }}
      />

        <img
        src={par4}
        className="fifth"
        alt="planet"
        style={{ transform: `translateY(${scrollY * -0.13}px)` }}
      />
    </div>
  );
}