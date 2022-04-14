import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MessageNotify from "./MessageNotify";
import axios from "axios";

const Container = styled.div`
  width: 250px;
  height: auto;
  background-color: #effffd;
  border-radius: 5px;
  min-height: 0px;
  position: absolute;
  left: 680px;
  z-index: 999;
  top: 50px;
  display: flex;
  flex-direction: column;
  border: 2px solid #42c2ff;
  transition: 0.5s all ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "50" : "50")};
  @media screen and (max-width: 768px) {
    transition: 0s all ease-in-out;
    z-index: 1100;
    left: 200px;
    width: 50%;
    top: 330px;
    top: ${({ isOpen }) => (isOpen ? "310" : "-100%")};
  }
`;

// const Pin = styled.div`
//   position: absolute;
//   top: -5px;
//   left: 15px;
//   height: 15px;
//   width: 65px;

//   background-color: black;
// `;

const NotificationDropDown = (props) => {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `https://young-cliffs-72209.herokuapp.com/user/${props.username}`
      );
      setUser(res.data);
    }
    fetchData();
    // setNotifications(user.notifications.reverse())
  }, [props.username]);
  return (
    <>
      <Container isOpen={props.showNotifications}>
        {/* <Pin>hi</Pin> */}
        {user.username !== undefined
          ? user.notifications.map((noti, index) => {
              //   if(index < 10){
              return <MessageNotify chat={noti} key={index} />;
              //   }
            })
          : "Login to get notifications!"}
      </Container>
    </>
  );
};

export default NotificationDropDown;
