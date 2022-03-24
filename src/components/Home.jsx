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
import axios from 'axios';

function App() {
  const [openSignin, setOpenSignin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({}) 

  let { username } = useParams();
  useEffect( async ()=>{
    let res = await axios.get(`https://young-cliffs-72209.herokuapp.com/user/${username}`)
    setUser(res.data)
  }, [user])

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
        <Navbar
          closeLoginModal={setOpenSignin}
          closeSignupModal={setOpenSignup}
          toggle={toggle}
          username={user.username}
          mode = {user.mode}
          firstname={user.first}
        />

        <NavSideBar
          isOpen={isOpen}
          toggle={toggle}
          closeLoginModal={setOpenSignin}
          closeSignupModal={setOpenSignup}
        />
        <MessageDropDown />
        {/* <JobDetails /> */}
        <Header username={user.username} />
        {/* <UserDashBoard /> */}
        <Card username={user.username}
                mode = {!user.mode ? "selling" : user.mode}
          />
        {/* <JobDetails /> */}
          {/* <SubmitProposal /> */}
          {/* <UserDashBoard /> */}
         
        <Footer />

      <Login closeModal={setOpenSignin} openSignin={openSignin} />
      <Register closeModal={setOpenSignup} openSignup={openSignup} />
    </>
  );
}

export default App;
