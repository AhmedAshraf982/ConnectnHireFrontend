import React from "react";
import { Carousel } from "react-bootstrap";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img33.jpg";
import img4 from "../images/img44.jpg";
const Name = () => {
  return(
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop: 100}}>
      <div style={{display:"flex", flexDirection:"column", width:"80%"}}>
        <text style={{fontSize:70, fontWeight:"bold", fontFamily: "lobster"}}>Connect n Hire</text>
        <text style={{fontSize: 30, fontWeight:"bold", marginBottom: 100}}>Start finding talent today—there’s no cost until you hire!</text>
      </div>
    </div>

  );

}
const Header = () => {
  const Data = [
    {
      src: img1,
      alt: "img1",
      head: "Find talent your Way",
      Para: "Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.",
    },
    {
      src: img2,
      alt: "img2",
      head: "Find great work",
      Para: "Meet clients you’re excited to work with and take your career or business to new heights.",
    },
    {
      src: img3,
      alt: "img3",
      head: "Find the Best Startup that Fits you",
      Para: "",
    },
    {
      src: img4,
      alt: "img4",
      head: "Find the Perfect Job that you Deserved",
      Para: "",
    },
  ];
  const ImageStyle = {
    height: "500px",
    objectFit: "cover",
    borderRadius: "10px",
  };
  return (
    <>
    <Name />
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div style={{width: "80%"}}>
    <Carousel fade={true} pause={false}>
      {Data.map((data, index) => (
        
        
        <Carousel.Item interval={2000} key={index}>
            {/* <Carousel.Caption> */}
          {/* </Carousel.Caption> */}
          <div style={{position: "relative"}}>
          <img
            className="d-block w-100"
            style={ImageStyle}
            src={data.src}
            alt={data.alt}
          />
          <div style={{width: "60%", position:"absolute", top: 60, left: 70}}>
          <h3 style={{fontSize: 50, color: "white", fontWeight:"bold", fontFamily: "Rubik"}}>{data.head}</h3>
           <p style={{fontSize: 25, color:"white", marginTop: 50, fontFamily: "Rubik"}}>{data.Para}</p>
          </div>
          </div>
        
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
    </div>
    </>
  );
};

export default Header;
