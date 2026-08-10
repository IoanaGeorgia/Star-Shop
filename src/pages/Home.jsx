import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className="home">
      <div className="decoration"></div>

      <div id="landingPage" className="main landing">
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
          <div className="info-wrapper card">
            <div className="number"> 1</div>
            <div className="divider">
              <div></div>
            </div>
            <div>
              <p>
                Trace your place among the cosmos. Every star in our catalog is
                uniquely registered and charted in the official celestial
                registry, complete with precise coordinates and custom naming
                rights. Claim a timeless piece of the night sky for yourself or
                someone extraordinary.
              </p>
              <button
                className="default-glow"
                onClick={() => navigate("/catalogue")}
              >
                See selection
              </button>
            </div>
          </div>

          <div className="info-wrapper card">
            <div className="number"> 2</div>
            <div className="divider">
              <div></div>
            </div>
            <div>
              <p>
                For millennia, light has traveled across light-years just to
                reach your eyes. When you register a star with us, you aren't
                just buying a name—you are permanently linking a memory, a
                story, or a legacy to a burning beacon in deep space. Receive
                physical constellation maps, high-resolution astronomical
                renders, and verified observatory coordinates.
              </p>
            </div>
          </div>

          <div className="info-wrapper card">
            <div className="number"> 3</div>
            <div className="divider">
              <div></div>
            </div>
            <div>
              <p>
                From circumpolar beacons that never set to brilliant binaries in
                Ursa Major and Cygnus, explore our curated selection of
                visible-magnitude stars. Filter by constellation, brightness, or
                distance to find the perfect star that resonates with your
                journey.
              </p>
              <button
                className="default-glow"
                onClick={() => navigate("/catalogue")}
              >
                See selection
              </button>
            </div>
          </div>
        </div>

        <div id="hero-reasons">
          <p className="title">Credentials</p>
          <div className="reason-wrapper card">
            <div className="text">
              <p className="title">Sustainable Stellar Cataloging</p>
              <p>
                We partner exclusively with deep-sky observatories and optical
                survey networks to ensure every listed star is accurately mapped
                without celestial overlap. Our ethical registry protocol
                guarantees that your claimed star remains uniquely
                yours—cataloged, verified, and preserved in our permanent public
                archive.
              </p>
            </div>
          </div>

          <div className="reason-wrapper card">
            <div className="text">
              <p className="title">Certificates Recognized by the ESA</p>
              <p>
                Every registration comes with an official certificate of
                registry, cross-referenced with astronomical databases
                recognized by major space agencies. Complete with exact right
                ascension, declination, and spectral class, your ownership
                document is both a personal keepsake and a scientifically
                accurate record.
              </p>
              <a href="https://www.esa.int/" target="_blank">
                Visit the ESA website →
              </a>
            </div>
          </div>
        </div>

        <div id="reviews">
          <p className="title">What people say</p>
          <div className="reviews-wrapper">
            {reviews.map((review, index) => (
              <div key={index} className="card">
                <p>"{review.text}"</p>
                <p>
                  {review.name}, from {review.galaxy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div class="contact-area">
          <div className="contact-texts">
            <p className="title">Contact us</p>

            <Link to="/contact">Contact page → </Link>

            <div className="contact-info">
              <p>
                Phone number: <a href="tel:+440744123345">+440744123345</a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:star_shop@starhoo.com">star_shop@starhoo.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
