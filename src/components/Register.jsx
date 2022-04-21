import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modalbackground = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1100;
  transition: 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y:scroll;
  top: 0;
  left: 0;
  transition: 0.2s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

const Container = styled.div`
  overflow-y: auto;
  width: 40%;
  height: 500px;
  background-color: #effffd;
  box-shadow: black 0px 5px 15px;
  display: flex;
  border-radius: 50px;
  flex-direction: column;
  padding: 25px;
  position: relative;
  overflow-y:scroll;
  @media screen and (max-width: 950px) {
    width: 50%;
  }
  @media screen and (max-width: 700px) {
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
  color: #0c6ca1;
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
  color: black;
  margin-top: 10px;
  @media screen and (max-width: 950px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 800px) {
    margin-top: 30px;
  }
  @media screen and (max-width: 700px) {
    margin-top: 100px;
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
  border: 1px solid #0c6ca1;
  border-radius: 1.4rem;
  &:hover {
    border: 1px #023958 solid;
  }
  @media screen and (max-width: 950px) {
    margin: 0.5rem 2rem;
  }
  @media screen and (max-width: 800px) {
    margin: 0.5rem auto;
    width: 50%;
  }
  @media screen and (max-width: 700px) {
    margin: 0.5rem 1.2rem;
    width: auto;
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
  color: #42c2ff;
  background-color: #effffd;
  &:hover {
    transition: 0.2s all ease-in;
    background-color: #42c2ff;
    color: #effffd;
  }
`;

const Text = styled.p`
  color: black;
  font-size: 0.9rem;
  text-align: center;
`;

const Link = styled.a`
  cursor: pointer;
  color: #0c6ca1;
  &:hover {
    border-bottom: 1px solid #023958;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const InputFirst = styled.input`
  width: 35%;
  margin-bottom: 0.5rem;
  margin-left: 3.5rem;
  padding: 0.6rem 1.2rem;
  opacity: 0.8;
  border: none;
  border-radius: 1.4rem;
  border: 1px solid #0c6ca1;
  border-radius: 1.4rem;
  &:hover {
    border: 1px #023958 solid;
  }
  @media screen and (max-width: 950px) {
    margin: 0.5rem 2rem;
  }
  @media screen and (max-width: 800px) {
    margin: 0.5rem auto;
    width: 50%;
  }
  @media screen and (max-width: 700px) {
    margin: 0.5rem 1.2rem;
    width: auto;
  }
`;

const InputLast = styled.input`
  width: 35%;
  margin-bottom: 0.5rem;
  margin-right: 3.5rem;
  margin-left: 1.8rem;
  padding: 0.6rem 1.2rem;
  opacity: 0.8;
  border-radius: 1.4rem;
  border: 1px solid #0c6ca1;
  border-radius: 1.4rem;
  &:hover {
    border: 1px #023958 solid;
  }
  @media screen and (max-width: 950px) {
    margin: 0.5rem 2rem;
  }
  @media screen and (max-width: 800px) {
    margin: 0.5rem auto;
    width: 50%;
  }
  @media screen and (max-width: 700px) {
    margin: 0.5rem 1.2rem;
    width: auto;
  }
`;

const LogoImg = styled.img``;

const Register = (props) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const success = () => {
    toast("Signed up successfully!");
  };

  const incorrect = () => {
    toast("Unfortunately, failed to sign up!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    res = await axios.post("https://young-cliffs-72209.herokuapp.com/signup", {
      first,
      last,
      username,
      email,
    });
    if (res.data === "success") {
      success();
      setTimeout(() => {
        props.closeModal(false);
        navigate(`/`);
      }, 2000);
    } else {
      incorrect();
    }
  };

  return (
    <>
      <Modalbackground
        // onClick={() => props.closeModal(false)}
        isOpen={props.openSignup}
      >
        <Container>
          <CloseButton onClick={() => props.closeModal(false)}>X</CloseButton>
          <Heading>Sign Up</Heading>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <InputFirst
                placeholder="First Name"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
              <InputLast
                placeholder="Last Name"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
            </FormGroup>
            <InputField
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              placeholder="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Sign Up</Button>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              background="#EE0022"
            />
          </Form>
          <Text>
            Already An Account? <Link>Sign In</Link>
          </Text>
        </Container>
      </Modalbackground>
    </>
  );
};

export default Register;
