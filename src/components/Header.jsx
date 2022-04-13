import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from "../images/image1.jpeg";
import img2 from "../images/image2.jpeg";
import img3 from "../images/image3.jpeg";
import img4 from "../images/image4.jpeg";

const Header = () => {
  const Data = [
    {
      src: img1,
      alt: "img1",
      head: "Image 1",
      Para: "Hellor World ",
    },
    {
      src: img2,
      alt: "img2",
      head: "Image 1",
      Para: "Hellor World ",
    },
    {
      src: img3,
      alt: "img3",
      head: "Image 1",
      Para: "Hellor World ",
    },
    {
      src: img4,
      alt: "img4",
      head: "Image 1",
      Para: "Hellor World ",
    },
  ];
  const ImageStyle = {
    height: "300px",
    objectFit: "cover",
  };
  return (
    <Carousel fade={true} pause={false}>
      {Data.map((data, index) => (
        <Carousel.Item interval={2000} key={index}>
          <img
            className="d-block w-100"
            style={ImageStyle}
            src={data.src}
            alt={data.alt}
          />
          <Carousel.Caption>
            <h3>{data.head}</h3>
            <p>{data.Para}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Header;
