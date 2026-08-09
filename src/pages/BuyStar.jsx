import { useLocation, useNavigate } from "react-router-dom";

import classO from "../assets/AST_SC_O.png";
import classA from "../assets/AST_SC_A.png";
import classB from "../assets/AST_SC_B.png";
import classF from "../assets/AST_SC_F.png";
import classG from "../assets/AST_SC_G.png";
import classK from "../assets/AST_SC_K.png";
import classM from "../assets/AST_SC_M.png";
import table from "../assets/table.png";

const getSpectralImage = (spectralClass) => {
  const imageBySpectral = {
    O: classO,
    A: classA,
    B: classB,
    F: classF,
    G: classG,
    K: classK,
    M: classM,
  };

  const spectralType = spectralClass?.charAt(0);
  return imageBySpectral[spectralType];
};

const BuyStar = () => {
  const { state } = useLocation();
  const star = state?.star;
  const navigate = useNavigate();

  if (!star) {
    return (
      <div id="buy-star-container">
        <p>
          No star data available.{" "}
          <button onClick={() => navigate(-1)}>Go back</button>
        </p>
      </div>
    );
  }

  const imageSrc = getSpectralImage(star.spectral_class);

  return (
    <div id="buy-star-container">
      <div className="secondary-decoration decoration"></div>
      <div className="buy-wrapper">
        <p className="title">{star.name}</p>
        <div className="star-container-wrapper">
          <div className="star-image">
            <img src={imageSrc} alt={star.name} />
          </div>

          <div className="star-info card">
            <p>
              <span>Constellation:</span> {star.constellation}
            </p>
            <p>
              <span>Spectral Class:</span> {star.spectral_class}
            </p>
            <p>
              <span>Apparent Magnitude:</span> {star.apparent_magnitude}
            </p>
            <p>
              <span>Absolute Magnitude:</span> {star.absolute_magnitude}
            </p>
            <p>
              <span>Distance (light-years):</span> {star.distance_light_year}
            </p>
            <p>
              <span>Right Ascension:</span> {star.right_ascension}
            </p>
            <p>
              <span>Declination:</span> {star.declination}
            </p>

            <p className="price">456576 EE</p>
          </div>
        </div>
      </div>

      <div className="buy-btn">
        <button className="defaultSmallButton">Add to cart</button>
      </div>
    </div>
  );
};

export default BuyStar;
