import React, { useEffect, useState } from "react";
import classO from "../assets/AST_SC_O.png";
import classA from "../assets/AST_SC_A.png";
import classB from "../assets/AST_SC_B.png";
import classF from "../assets/AST_SC_F.png";
import classG from "../assets/AST_SC_G.png";
import classK from "../assets/AST_SC_K.png";
import classM from "../assets/AST_SC_M.png";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading"
import Error from "./Error";


export default function TopProducts() {
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


  const getSpectralImage = (spectralClass) => {
    const spectralType = spectralClass?.charAt(0);
    return imageBySpectral[spectralType] || classO;
  };


  const fetchStars = async () => {
    setLoading(true);
    setError(false);

    setIsSelected("");
    try {
      const response = await fetch("/api/stars/topstars");

      if (!response.ok) {
        setError(true);
      }

      const data = await response.json();
      if (data.data.length === 0) {
        setError(true);
        setStars([])
      } else {
        setError(false)
        setStars(data.data.slice(1,5));
      }
    } catch (error) {
      setStars([])
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStars();
  }, []);

  return (
    <div className="catalogue top-stars">
      <div className="catalogue-wrapper">
        <p className="title">Top bought</p>
        <div className="star-area">
          {isLoading && (
            <Loading />
          )}

          {isError && (
            <Error />
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
