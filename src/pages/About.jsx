import { useRef, useEffect, useState } from "react";
const data = [
  { year: 1970, info: "Sold first star" },
  { year: 1972, info: "Registered second buyer" },
  { year: 1976, info: "Sold 37 stars" },
  { year: 1981, info: "Sold star “Alpha Centauri”" },
  { year: 1985, info: "Reached 1,000 stars sold" },
  { year: 1988, info: "Sold star “Betelgeuse”" },
  { year: 1992, info: "Hit 10,000 stars sold" },
  { year: 1995, info: "Sold star “Vega Prime”" },
  { year: 2000, info: "Celebrated 100,000 stars sold" },
  { year: 2004, info: "Sold star “Rigel Blue”" },
  { year: 2010, info: "Half a million stars sold" },
  { year: 2013, info: "Sold star “Sirius Light”" },
  { year: 2016, info: "Introduced personalized star certificates" },
  { year: 2019, info: "Sold star “Orion Blaze”" },
  { year: 2022, info: "Reached 900,000 stars sold" },
  { year: 2024, info: "Hit 1 million stars sold!" },
];

export default function About() {
  const [infoIndex, setInfoIndex] = useState(0);
  const [infoInnerIndex, setInfoInnerIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, data.length);
  }, []);

  const handleClick = (clickedIndex) => {
    const clickedTop = itemRefs.current[clickedIndex].offsetTop;

    let lastInRowIndex = clickedIndex;
    for (let i = clickedIndex + 1; i < data.length; i++) {
      if (itemRefs.current[i].offsetTop !== clickedTop) break;
      lastInRowIndex = i;
    }

    if (infoIndex === lastInRowIndex) {
      setInfoIndex(null);
    } else {
      setInfoIndex(lastInRowIndex);
    }

    setInfoInnerIndex(clickedIndex);
  };

  const elements = [];

  data.forEach((item, index) => {
    elements.push(
      <div
        key={item.year}
        className="year-box"
        onClick={() => handleClick(index)}
        ref={(el) => (itemRefs.current[index] = el)}
      >
        {item.year}
      </div>,
    );

    if (infoIndex === index) {
      elements.push(
        <div key={`info-${item.year}`} className="info-box">
          {data[infoInnerIndex].info}
        </div>,
      );
    }
  });

  return (
    <div className="about" id="about">
      <div className="decoration"></div>

      <main>
        <div className="about-section">
          <p className="subtitle">About Stellar Simulacra</p>

          <p className="content">
            We are committed to rendering the most breathtaking celestial
            phenomena with sub-atomic precision. From ancient red giants to
            newborn nebulae, we bring the cosmos directly to your domain.
          </p>
          <p className="content">
            Utilizing quantum-grade spatial projection and real-time
            astronomical telemetry, our systems recreate cosmic environments
            that bridge the gap between imagination and physical reality.
          </p>
        </div>

        <div className="about-section">
          <p className="subtitle">Mission</p>
          <p className="content">
            To democratize deep-space exploration by delivering hyper-accurate
            celestial simulations to every screen and physical space on Earth
            and beyond. We aim to collapse the distance between human
            imagination and the farthest reaches of the cosmos.
          </p>
          <p className="content">
            Through relentless innovation in spatial rendering and real-time
            astrophysics, we build the foundational engine that inspires the
            next generation of space explorers, artists, and scientific
            pioneers.
          </p>
        </div>

        <div className="about-section">
          <p className="subtitle">Our customers</p>
          <p className="content">
            Built for visionary creators, researchers, and space enthusiasts
            worldwide. Whether you are designing immersive digital worlds or
            curating deep-space exhibits, our patrons rely on us for unmatched
            astronomical fidelity.
          </p>
          <p className="content">
            From orbital habitats to ground-based observatories, our global
            clientele leverages our simulations to push the boundaries of
            spatial art, interactive education, and celestial storytelling.
          </p>
        </div>

        <div className="about-section">
          <p className="subtitle">Founders</p>
          <p className="content">
            These are the people who have build everything that StellSi is
            today.
          </p>
          <div className="content content-founders">
            <div className="founder">
              <div
                className="content"
                style={{
                  backgroundImage:
                    'url("https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww")',
                }}
              ></div>
              <div className="name">Jon Pierre Lebolis</div>
            </div>

            <div className="founder">
              <div
                className="content"
                style={{
                  backgroundImage:
                    'url("https://community.cisco.com/legacyfs/online/legacy/4/8/6/130684-profile_image_500")',
                }}
              ></div>
              <div className="name">Jane Rivera</div>
            </div>

            <div className="founder">
              <div
                className="content"
                style={{
                  backgroundImage:
                    'url("https://img.freepik.com/premium-photo/close-up-portrait-young-man_1048944-13970423.jpg")',
                }}
              ></div>
              <div className="name">Ilya Ronova</div>
            </div>

            <div className="founder">
              <div
                className="content"
                style={{
                  backgroundImage:
                    'url("https://i.pinimg.com/280x280_RS/42/b7/d1/42b7d16b862537d85b65e32fb25befa4.jpg")',
                }}
              ></div>
              <div className="name">Claudia Goldi</div>
            </div>

            <div className="founder">
              <div
                className="content"
                style={{
                  backgroundImage:
                    'url("https://media.istockphoto.com/id/1643991653/photo/portrait-of-businessman-pride-and-smile-in-modern-office-with-confidence-opportunity-and.jpg?s=612x612&w=0&k=20&c=z4URmBsqEO5HvdnTeesuLGHxBF1WFotHCtcINPdNqw4=")',
                }}
              ></div>
              <div className="name">Hersson Washington</div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <p className="subtitle">History</p>
          <p className="content">
            Found in 1970, StellSi is one of the oldest and most prestigius star
            selling company in the universe. See below more about our parcourse
            through the years.
          </p>

          <div className="timeline-container">{elements}</div>
        </div>

        <div className="about-section">
          <p className="subtitle">Policy and ethical guide</p>
          <p className="content">
            We are committed to the responsible synthesis of celestial data.
            Every simulated star system adheres to strict scientific integrity,
            ensuring that our digital renders honor real-world astronomical laws
            without misrepresenting celestial physics.
          </p>
          <p className="content">
            Our platform safeguards open access to space visualization while
            enforcing strict standards against deceptive digital alterations. We
            empower creators to explore the universe transparently, ethically,
            and with complete data provenance.
          </p>
        </div>
      </main>
    </div>
  );
}
