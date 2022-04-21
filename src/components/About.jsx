import Navbar from "./Navbar";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import Card from "./Card";
import Login from "./Login";
import Register from "./Register";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import JobDetails from "./JobDetails";
import SubmitProposal from "./SubmitProposal";
import Header from "./Header";
import UserDashBoard from "./UserDashBoard";
import NavSideBar from "./NavSideBar";
import MessageDropDown from "./MessageDropDown";
import JobSubmitPage from "./JobSubmitPage";
import axios from "axios";
import "./About.css";

import img1 from "../images/image1.jpeg";
import img2 from "../images/image2.jpeg";
import img3 from "../images/image3.jpeg";
import img4 from "../images/image4.jpeg";

const About = () => {
  const { username, other } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData(){    let res = await axios.get(
      `https://young-cliffs-72209.herokuapp.com/user/${username}`
    );
    setUser(res.data);
    }
    fetchData();
  },[username]);
  return (
    <div style={{ backgroundColor: "#EFFFFD" }}>
      <Navbar
        username={user.username}
        mode={user.mode}
        firstname={user.first}
      />
      <Header />
      <MessageDropDown user={user.username} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", marginTop: 50 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              className="img"
              src={img1}
              style={{ width: "50%", padding: 50 }}
            />
            <img
              className="img"
              src={img2}
              style={{ width: "50%", padding: 5 }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              className="img"
              src={img3}
              style={{ width: "50%", padding: 5 }}
            />
            <img
              className="img"
              src={img4}
              style={{ width: "50%", padding: 50 }}
            />
          </div>
          <div
            style={{
              marginTop: 50,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <text
              style={{
                color: "black",
                fontSize: 40,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              About Us:
            </text>
            <div style={{ marginTop: 50 }}>
              <text style={{ color: "black", fontSize: 25, textAlign: "center"}}>
                An affordable platform for people in Pakistan with easier access
                to job opportunities of free lancing and helps to connect with
                clients without any hassle and to earn passive income. The
                bidding feature will help freelancers to choose project
                according to their need of knowledge and skills.
              </text>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
