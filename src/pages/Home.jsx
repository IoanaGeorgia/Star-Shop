import cart from "../assets/2ac4b15fb8a0ae8a35bfe3cab321fd77.png";
import hero1 from "../assets/05253843a0a8fa1c6a146ea1471be571.png";
import image1 from "../assets/celestial-harmony-comet-and-sunrise-4722619.jpg";
import image2 from "../assets/celestial-serenity-a-starry-night-sky-141635779.jpg";
import image3 from "../assets/majestic-celestial-landscape-4784227.jpg";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const reviews = [
    {
      text: "An incredible journey through the stars!",
      name: "Lena M.",
      galaxy: "Andromeda",
    },
    {
      text: "Stellar views and amazing locals!",
      name: "Tariq A.",
      galaxy: "Milky Way",
    },
    {
      text: "Peaceful and full of cosmic wonder.",
      name: "Nina P.",
      galaxy: "Triangulum",
    },
    {
      text: "A must-visit for any space traveler.",
      name: "Carlos R.",
      galaxy: "Whirlpool",
    },
    {
      text: "Unexpected beauty beyond the nebula.",
      name: "Akira Y.",
      galaxy: "Sombrero",
    },
    {
      text: "Galactic cuisine is out of this world!",
      name: "Mira V.",
      galaxy: "Large Magellanic Cloud",
    },
  ];

  return (
    <div>
      <div id="landingPage" className="main">
        <div className="hero">
          <p>Stellar Simulacra</p>
          <p className="subtitle">Go beyond horizons</p>
          <div className="landing-decoration"></div>
          <div className="button_wrapper">
            <button
              className="shop_button"
              onClick={() => navigate("/catalogue")}
            >
              See selection
            </button>
          </div>
        </div>

        <div className="hero-info">
          <div className="info-wrapper">
            <div className="number"> 1</div>
            <div className="divider">
              <div></div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates aut, recusandae laborum incidunt quidem officia
                tenetur numquam odio voluptas totam reiciendis, sed ipsam
                nostrum amet, repellat nihil voluptatum saepe ipsa vel
                voluptatibus placeat exercitationem illum sunt. Eius culpa
                beatae sed impedit magnam doloremque, reiciendis perspiciatis,
                quisquam vel fugit necessitatibus? Obcaecati.
              </p>
              <button className="default-glow">See selection</button>
            </div>
          </div>

          <div className="info-wrapper">
            <div className="number"> 2</div>
            <div className="divider">
              <div></div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates aut, recusandae laborum incidunt quidem officia
                tenetur numquam odio voluptas totam reiciendis, sed ipsam
                nostrum amet, repellat nihil voluptatum saepe ipsa vel
                voluptatibus placeat exercitationem illum sunt. Eius culpa
                beatae sed impedit magnam doloremque, reiciendis perspiciatis,
                quisquam vel fugit necessitatibus? Obcaecati.
              </p>
            </div>
          </div>

          <div className="info-wrapper">
            <div className="number"> 3</div>
            <div className="divider">
              <div></div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates aut, recusandae laborum incidunt quidem officia
                tenetur numquam odio voluptas totam reiciendis, sed ipsam
                nostrum amet, repellat nihil voluptatum saepe ipsa vel
                voluptatibus placeat exercitationem illum sunt. Eius culpa
                beatae sed impedit magnam doloremque, reiciendis perspiciatis,
                quisquam vel fugit necessitatibus? Obcaecati.
              </p>
              <button className="default-glow">See selection</button>
            </div>
          </div>
        </div>

        <div id="hero-reasons">
          <p className="title">Credentials</p>
          <div className="reason-wrapper">
            <img src={image1}></img>
            <div className="text">
              <p className="title">Safe star farming</p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
                amet magnam recusandae sed, dolor optio odio necessitatibus
                reiciendis provident, saepe, eius totam facere dolorum?
                Voluptatum soluta cupiditate temporibus necessitatibus
                dignissimos!
              </p>
            </div>
          </div>

          <div className="reason-wrapper">
            <div className="text">
              <p className="title">Certificates recognise by the ESA</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatem voluptatum quisquam quasi nemo inventore, veritatis
                suscipit earum distinctio velit temporibus?{" "}
              </p>
              <a href="https://www.esa.int/" target="_blank">
                Visit the ESA website →{" "}
              </a>
            </div>

            <img src={image2}></img>
          </div>
        </div>

        <div id="reviews">
          <p className="title">What people say</p>
          <div className="reviews-wrapper">
            {reviews.map((review, index) => (
              <div key={index}>
                <p>"{review.text}"</p>
                <p>
                  {review.name}, from {review.galaxy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="contact">
          <img className="contact-bg" src={image3}></img>
          <div className="contact-texts">
            <p className="title">Contact us</p>

            <a href="https://www.esa.int/" target="_blank">
              Contact page →{" "}
            </a>

            <p className="subtitle">
              Want to know more about our offers?<br></br>
              Set up a call with one of our consultants and find out what best
              works for you
            </p>

            <div className="contact-info">
              <p>
                <b>Phone number:</b> +440744123345
              </p>
              <p>
                <b>Email:</b> star_shop@starhoo.com
              </p>
              <p>
                <b>Physical address:</b> 224 Alpha Andromedae, Andromeda,
                6763456242 light years away from main{" "}
              </p>
              <p>
                <b>Ethereal address:</b> 4334.566.654.657.9{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
