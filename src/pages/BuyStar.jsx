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
                   <h2>{star.name}</h2>
      <div className="star-container-wrapper">
 
        <div className="star-image">
          <img src={imageSrc} alt={star.name} />
        </div>

 
        <div className="star-info">
   
          
          <p>
            <strong>Constellation:</strong> {star.constellation}
          </p>
          <p>
            <strong>Spectral Class:</strong> {star.spectral_class}
          </p>
          <p>
            <strong>Apparent Magnitude:</strong> {star.apparent_magnitude}
          </p>
          <p>
            <strong>Absolute Magnitude:</strong> {star.absolute_magnitude}
          </p>
          <p>
            <strong>Distance (light-years):</strong> {star.distance_light_year}
          </p>
          <p>
            <strong>Right Ascension:</strong> {star.right_ascension}
          </p>
          <p>
            <strong>Declination:</strong> {star.declination}
          </p>
          <button className="buy-star">Buy star</button>
        </div>
      </div>

      <div className="general-info">
      </div>
    </div>
  );
};

export default BuyStar;
