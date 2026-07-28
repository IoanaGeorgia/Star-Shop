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
  const [infoIndex, setInfoIndex] = useState(null);
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
      </div>
    );

    if (infoIndex === index) {
      elements.push(
        <div key={`info-${item.year}`} className="info-box">
          {data[index].info}
        </div>
      );
    }
  });

  return (
    <div className="about" id="about">
      <div className="about-section">
        <p className="title">About Stellar Simulacra</p>

        <p className="content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
          eius itaque nesciunt temporibus. Molestiae perferendis ratione natus,
          quia enim quaerat.
        </p>
      </div>

      <p className="about-divider"></p>

      <div className="about-section">
        <p className="title">Our customers</p>
        <p className="content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
          velit quaerat iste ipsam ab. Iure qui inventore veritatis impedit
          expedita quae autem consequatur facilis voluptatum unde nostrum
          distinctio, nobis numquam blanditiis sit! Eveniet quaerat porro nisi,
          voluptatibus illum sit nam.
        </p>
      </div>

    <p className="about-divider"></p>
     
        <div className="about-section">
        <p className="title">Founders</p>
        <p className="content content-founders">

        <img src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww">
        </img>
        <img src="https://community.cisco.com/legacyfs/online/legacy/4/8/6/130684-profile_image_500"></img>
        <img src="https://img.freepik.com/premium-photo/close-up-portrait-young-man_1048944-13970423.jpg"></img>
        <img src="https://i.pinimg.com/280x280_RS/42/b7/d1/42b7d16b862537d85b65e32fb25befa4.jpg"></img>
        <img src="https://media.istockphoto.com/id/1643991653/photo/portrait-of-businessman-pride-and-smile-in-modern-office-with-confidence-opportunity-and.jpg?s=612x612&w=0&k=20&c=z4URmBsqEO5HvdnTeesuLGHxBF1WFotHCtcINPdNqw4="></img>
        
        
        </p>
      </div>

    <p className="about-divider"></p>

      <div className="about-section">
        <p className="title">History every year</p>
        <p className="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, modi?
        </p>

        <div className="timeline-container">{elements}</div>
      </div>
    </div>
  );
}
