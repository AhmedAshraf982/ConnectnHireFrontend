import React, {useState, useEffect} from "react";
import styled from "styled-components";
import MessageNotify from "./MessageNotify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  width: 250px;
  height: auto;
  background-color: #7393B3;
  border-radius: 5px;
  min-height: 0px;
  position: absolute;
  left: 520px;
  z-index: 999;
  top: 50px;
  display: flex;
  flex-direction: column;
  border: 2px solid #0c6ca1;
  transition: 0.5s all ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "50" : "50")};
  @media screen and (max-width: 768px) {
    transition: 0s all ease-in-out;
    z-index: 1100;
    left: 200px;
    width: 50%;
    top: 272px;
    top: ${({ isOpen }) => (isOpen ? "300" : "-100%")};
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

const MessageDropDown = (props) => {
  const [chats, setChats] = useState([])
  const navigate = useNavigate();
  useEffect(async ()=>{
    let res = await axios.get(`https://young-cliffs-72209.herokuapp.com/chats/${props.username}`)
    setChats(res.data)
  })

  
  return (
    <>
      <Container isOpen={props.showMessage}>
        {/* <Pin>hi</Pin> */}
        {
          props.username == undefined ? "Login to get messages!" : 
          chats.length ? 
          chats.map((chat, index)=>{
            return(
              <MessageNotify chat={chat}
              username = {props.username}
              />
            );
          })
          : "No new messages to show!"
        }
      </Container>
    </>
  );
};

export default MessageDropDown;
