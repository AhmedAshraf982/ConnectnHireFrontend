import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserDashBoard from "./UserDashBoard";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Settings = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `https://young-cliffs-72209.herokuapp.com/user/${username}`
      );
      setUser(res.data);
    }
    fetchData();
  }, [username]);
  return (
    <>
      <Navbar username={username} mode={user.mode} firstname={user.first} />
      <Header username={username} mode={user.mode} />
      <UserDashBoard username={username} />
      <Footer />
    </>
  );
};

export default Settings;
