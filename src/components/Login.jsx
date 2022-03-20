import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Modalbackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  overflow-y: auto;
  width: 30%;
  height: 500px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  border-radius: 50px;
  flex-direction: column;
  padding: 25px;
  position: relative;
  @media screen and (max-width: 950px) {
    width: 50%;
  }
  @media screen and (max-width: 650px) {
    width: 100vh;
    height: 100vh;
    border-radius: 0;
  }
`;

const CloseButton = styled.button`
  font-size: 25px;
  font-weight: bold;
  position: absolute;
  top: 2.2rem;
  right: 2rem;
  border: none;
  background-color: transparent;
  color: #006400;
  cursor: pointer;
  @media screen and (max-width: 950px) {
    top: 2rem;
    right: 3rem;
  }
`;

const Heading = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #38b000;
  margin-top: 10px;
  @media screen and (max-width: 950px) {
    margin-top: 100px;
  }
  @media screen and (max-width: 650px) {
    margin-top: 250px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const InputField = styled.input`
  font-weight: bold;
  margin: 1rem 3.5rem;
  padding: 0.6rem 1.2rem;
  opacity: 0.8;
  border: 1px solid #70e000;
  border-radius: 1.4rem;
  &:hover {
    border: 1px #38b000 solid;
  }
  @media screen and (max-width: 950px) {
    margin: 1rem 2rem;
  }
  @media screen and (max-width: 650px) {
    font-size: 1.2rem;
    margin: 1rem 1.6rem;
  }
`;

const Button = styled.button`
  font-weight: bold;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 1.5rem;
  display: flex;
  margin: 0.8rem auto;
  cursor: pointer;
  color: #fff;
  background-color: #38b000;
  &:hover {
    transition: 0.2s all ease-in;
    background-color: #006400;
  }
`;

const Text = styled.p`
  color: black;
  font-size: 0.9rem;
  text-align: center;
`;

const Link = styled.a`
  cursor: pointer;
  color: green;
  &:hover {
    border-bottom: 1px solid green;
  }
`;

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (userName.trim() && password.trim()) {
      if (userName.charAt("@")) {
        res = await axios.post("localhost:5050", {
          email: userName,
          password,
        });
      } else {
        res = await axios.post("localhost:5050", {
          userName,
          password,
        });
      }
      if (res === "success") {
        console.log("Success");
      } else {
        console.log("Error");
      }
    } else {
      console.log("No Data");
    }
  };

  return (
    <>
      <Modalbackground>
        <Container>
          <CloseButton onClick={() => props.closeModal(false)}>X</CloseButton>
          <Heading>Sign In</Heading>
          <Form onSubmit={handleSubmit}>
            <InputField
              placeholder="UserName/Email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></InputField>
            <InputField
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></InputField>
            <Button type="submit">Sign In</Button>
          </Form>

          <Text>
            Create An Account? <Link>Sign Up</Link>
          </Text>
        </Container>
      </Modalbackground>
    </>
  );
};

export default Login;
