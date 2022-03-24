import React from "react";
import styled from "styled-components";

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: ${(props) => (props.own ? "flex-end" : "flex-start")};
`;

const MessageTop = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const MessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.own ? "rgb(245,241,241)" : "#1877f2")};
  color: ${(props) => (props.own ? "black" : "white")};
  max-width: 300px;
`;

const MessageBottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

const Message = (props) => {
  return (
    <>
      <Messages own={props.own}>
        <MessageTop>
          <Image
            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
            alt=""
          />
          <MessageText own={props.own}>{props.msg}</MessageText>
        </MessageTop>
        <MessageBottom>1 hour ago</MessageBottom>
      </Messages>
    </>
  );
};

export default Message;
