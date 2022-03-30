import React,{useState, useEffect} from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 60%;
  height: 200px;
  margin: 2rem 8.5rem 2rem;
  border: 1px solid #0c6ac1;
  background-color: #7393B3;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    display: none;
    height: 0;
  }
`;

const Date = styled.p`
  margin: 2rem 2rem 0 2rem;
`;

const Timing = styled.p`
  margin: 0 2rem 0 2rem;
`;

const UserName = styled.p`
  margin: 0 2rem 0 2rem;
`;

const Header = (props) => {
  const [date, setDate] = useState(new window.Date());
  useEffect(() => {
    setDate(new window.Date());
  }, [new window.Date()]);
  return (
    <>
      <Container>
        <Date style={{color: "white"}}>
          {date.toLocaleString("default", { month: "long" })} {date.getDate()},{" "}
          {date.getFullYear()}
        </Date>
        <Timing style={{color: "white"}}>
          {date.getHours() >= 0 && date.getHours() < 12
            ? "Good Morning"
            : date.getHours() >= 12 && date.getHours() <= 17
            ? "Good Afternoon!"
            : "Good Evening"}
        </Timing>
        <UserName style={{marginTop: 30, color: "black", fontWeight:"bold"}}>{props.username}</UserName>
      </Container>
    </>
  );
};

export default Header;
