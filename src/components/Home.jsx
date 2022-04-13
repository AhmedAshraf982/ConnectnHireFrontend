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

function App() {
  const [openSignin, setOpenSignin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  let { username } = useParams();
  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `https://young-cliffs-72209.herokuapp.com/user/${username}`
      );
      setUser(res.data);
    }
    fetchData();
  }, [username]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div style={{ backgroundColor: "#EFFFFD" }}>
      <Navbar
        closeLoginModal={setOpenSignin}
        closeSignupModal={setOpenSignup}
        toggle={toggle}
        username={user.username}
        mode={user.mode}
        firstname={user.first}
      />

      <NavSideBar
        isOpen={isOpen}
        toggle={toggle}
        closeLoginModal={setOpenSignin}
        closeSignupModal={setOpenSignup}
      />
      <MessageDropDown />

      <Header />

      <Card
        username={user.username}
        mode={!user.mode ? "selling" : user.mode}
      />

      <Footer />

      <Login closeModal={setOpenSignin} openSignin={openSignin} />
      <Register closeModal={setOpenSignup} openSignup={openSignup} />
    </div>
  );
}

export default App;
