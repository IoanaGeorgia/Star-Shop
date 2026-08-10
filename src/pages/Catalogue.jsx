import React, { useEffect, useState } from "react";
import classO from "../assets/AST_SC_O.png";
import classA from "../assets/AST_SC_A.png";
import classB from "../assets/AST_SC_B.png";
import classF from "../assets/AST_SC_F.png";
import classG from "../assets/AST_SC_G.png";
import classK from "../assets/AST_SC_K.png";
import classM from "../assets/AST_SC_M.png";
import { useNavigate } from "react-router-dom";


export default function Catalogue() {
  const [stars, setStars] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(true);
  const [isSelected, setIsSelected] = useState("");

  const navigate = useNavigate();

  const handleSeeMore = (star) => {
    navigate("/buy-star", { state: { star } });
  };

  const imageBySpectral = {
    O: classO,
    A: classA,
    B: classB,
    F: classF,
    G: classG,
    K: classK,
    M: classM,
  };

  const constellations = [
    "Ursa Major",
    "Ursa Minor",
    "Cassiopeia",
    "Cepheus",
    "Draco",
    "Cygnus",
    "Lyra",
    "Hercules",
    "Perseus",
    "Auriga",
    "Andromeda",
    "Boötes",
  ];

  const getSpectralImage = (spectralClass) => {
    const spectralType = spectralClass?.charAt(0);
    return imageBySpectral[spectralType] || classO;
  };

  async function getStarsByCons(constellation) {
    setLoading(true);
    setError(false);
    setIsSelected(constellation);
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/stars?constellation=${constellation}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": "6oXjVCvrX7p3HCkLv/wttQ==GWagAeh4QbPVEqfk",
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        setError(true);
      }

      const data = await response.json();
      if (data.length === 0) {
        setError(true);
      } else {
        setStars(data);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  const fetchStars = async () => {
    setLoading(true);
    setError(false);

    setIsSelected("");
    try {
      // const name = 'vega';
      const response = await fetch(
        `https://api.api-ninjas.com/v1/stars?max_distance_light_year=10000`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": "6oXjVCvrX7p3HCkLv/wttQ==GWagAeh4QbPVEqfk",
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        setError(true);
      }

      const data = await response.json();
      if (data.length === 0) {
        setError(true);
      } else {
        setStars(data);
        console.log(data);
      }
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStars();
  }, []);

  return (
    <div className="catalogue" id="catalogue">
      <div className="decoration"></div>
      <div className="catalogue-wrapper-header">
        <p className="title secondary-title">
          Check out our selection of stars
        </p>
      </div>
      <div className="catalogue-wrapper">
        <ul className="catalogue-cons">
          <li
            onClick={() => fetchStars()}
            className={isSelected === "" ? "defaultSmallButton" : ""}
          >
            See all
          </li>
          {constellations.length &&
            constellations.map((constellation) => (
              <li
                onClick={() => getStarsByCons(constellation)}
                className={
                  isSelected === constellation ? "defaultSmallButton" : ""
                }
              >
                {constellation}
              </li>
            ))}
        </ul>

        <div className="star-area">
          {isLoading && (
            <div className="loadingData">
              <div className="loader"></div>
              <span>...loading</span>
            </div>
          )}

          {isError && (
            <div className="errorData">
              <p> There has been an error. Please try again later.</p>
            </div>
          )}

          {!isLoading &&
            stars.map((star, index) => (
              <div className="star-product-wrapper" key={index}>
                <div className="star-product-wrapper-inner">
                  <img
                    src={getSpectralImage(star.spectral_class)}
                    alt={star.name}
                  />

                  <div className="content">
                    <p className="title">{star.name}</p>
                    <li>{star.constellation}</li>

                    <button
                      className="default-glow"
                      onClick={() => handleSeeMore(star)}
                    >
                      See more
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
