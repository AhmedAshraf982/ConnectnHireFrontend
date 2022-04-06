import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Conversation from "./Conversation";
import Message from "./Message";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Messenger = styled.div`
  height: calc(100vh-80px);
  display: flex;
`;

const ChatMenu = styled.div`
  flex: 3.5;
  @media screen and (max-width: 768px) {
    flex: 2;
  }
`;

const ChatBox = styled.div`
  flex: 6.5;
  @media screen and (max-width: 768px) {
    flex: 10;
  }
`;

const ChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid grey;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ChatBoxWrapper = styled.div`
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-direction: space-between;
  position: relative;
`;

const ChatBoxTop = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
`;
const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputArea = styled.textarea`
  width: 80%;
  height: 90px;
  padding: 10px;
`;

const SendButton = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #0c6ca1;
  color: black;
`;

const Messages = () => {
  const {username, other} = useParams();
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("")
  const navigate = useNavigate();
  useEffect(async ()=>{
    let res = await axios.get(`https://young-cliffs-72209.herokuapp.com/messages/${username}/${other}`)
    setMessages(res.data)

    res = await axios.get(`https://young-cliffs-72209.herokuapp.com/user/${username}`)
    setUser(res.data)
  }, [user, messages])

  const sendMsg = async() => {
    let obj = {
      sender: username,
      receiver: other,
      read: false,
      msg: msg
    }
    let res = await axios.post("https://young-cliffs-72209.herokuapp.com/message", obj)
    setMsg("")
  }

  return (
    <div style={{backgroundColor:"#28282B"}}>
    <Navbar username={username}
    mode = {user.mode}
    firstname = {user.first}
    />
    <Messenger>
      <ChatBox>
        <ChatBoxWrapper>
          <ChatBoxTop>
            {
              messages.length ?
              messages.map((msg, index)=>{
                return(
                  <Message own={msg.sender == username ? true : false} msg={msg.msg}
                  time={msg.time}
                  />
                );
              }) :
              <p style={{color:"white"}}>No new messages to show!</p>
            }
          </ChatBoxTop>
          <ChatBoxBottom>
            <InputArea placeholder="Enter message..." value={msg}
            onChange={(e) => setMsg(e.target.value)}
            />
            <SendButton onClick={sendMsg}>Send</SendButton>
          </ChatBoxBottom>
        </ChatBoxWrapper>
      </ChatBox>
    </Messenger>
    <Footer />
    </div>
  );
};

export default Messages;
