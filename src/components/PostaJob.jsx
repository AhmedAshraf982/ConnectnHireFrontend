import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 80%;
  height: auto;
  min-height: 80%;
  background-color: #7393b3;
  display: flex;
  flex-direction: column;
  margin: 1rem 5rem 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    transition: 0.8s all ease-in-out;
  }
`;

const Heading = styled.h5`
  text-align: left;
  font-size: 1.5rem;
  background-color: #28282b;
  color: white;
  padding: 1rem;
  @media screen and (max-width: 768px) {
    text-align: center;
    transition: 0.3s all ease-in-out;
  }
`;

const MinContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #0c6ac1;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    width: 100%;
    border: none;
    border-radius: 0;
    transition: 0.8s all ease-in-out;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Title = styled.label`
  font-weight: 500;
  font-size: 18px;
  color: #000;
  opacity: 0.8;
  padding: 1rem 0;
`;

const InputField = styled.input`
  padding: 1rem;
  font-size: 17px;
  opacity: 0.9;
  font-weight: lighter;
  border-radius: 5px;
  border: 1px solid #0c6ac1;
  &:hover {
    border: 1px solid #023958;
  }
`;

const FormGroup1 = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    transition: 0.8s all ease-in-out;
  }
`;

const FG = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputText = styled.textarea`
  padding: 1rem;
  font-size: 17px;
  opacity: 0.9;
  font-weight: lighter;
  border-radius: 5px;
  height: 100px;
  border: 1px solid #0c6ac1;
  &:hover {
    border: 1px solid #023958;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: center;
`;

const PostButton = styled.button`
  border: 1px solid transparent;
  padding: 1rem 2rem;
  background-color: #0c6ac1;
  color: #fff;
  cursor: pointer;
  margin-right: 1rem;
  &:hover {
    color: #0c6ac1;
    background-color: #fff;
    border: 1px solid #0c6ac1;
  }
`;

const CancelButton = styled.button`
  border: 1px solid red;
  padding: 1rem 2rem;
  background-color: #fff;
  color: red;
  cursor: pointer;
  margin-right: 1rem;
  &:hover {
    color: #fff;
    background-color: red;
    border: 1px solid #fff;
  }
`;

const PostaJob = () => {
  const { username } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const navigate = useNavigate();
  console.log(username);

  const cancel = () => {
    navigate(`/dashboard/${username}`);
  };
  const postJob = async () => {
    let skills_ = skills.split(",");
    let obj = {
      client: username,
      title,
      description,
      time,
      level,
      budget,
      skills: skills_,
    };
    let res = await axios.post(
      "https://young-cliffs-72209.herokuapp.com/post",
      obj
    );
    console.log(res);
    if (res.data === "success") {
      success();
      setTimeout(() => {
        navigate(`/dashboard/${username}`);
      }, 2000);
    } else {
      incorrect();
    }
  };
  const success = () => {
    toast("Job has been posted successfully!");
  };

  const incorrect = () => {
    toast("There was an error while posting the job!");
  };
  return (
    <div style={{ backgroundColor: "#effffd" }}>
      <Navbar username={username} mode={"buying"} />
      <Header username={username} mode={"buying"} />
      <Container>
        <Heading>Post a Job</Heading>
        <MinContainer>
          <FormGroup>
            <Title>Title Of Job</Title>
            <InputField
              type="text"
              required
              placeholder="e.g Python Script"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </FormGroup>
          <FormGroup1>
            {/* <FG>
              <Title>Price Type</Title>
              <InputField
                type="text"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g Fixed Partial"
              />
            </FG> */}
            <FG>
              <Title>Level</Title>
              <InputField
                type="text"
                onChange={(e) => setLevel(e.target.value)}
                required
                placeholder="e.g Expert"
                value={level}
              />
            </FG>
            <FG>
              <Title>Budget</Title>
              <InputField
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                placeholder="e.g $5.00"
              />
            </FG>
          </FormGroup1>
          <FormGroup>
            <Title>Description</Title>
            <InputText
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormGroup>
          <FormGroup>
            <Title>Skills (comma separated)</Title>
            <InputText
              required
              onChange={(e) => setSkills(e.target.value)}
              value={skills}
            />
          </FormGroup>
          <FormGroup>
            <Title>Time (days)</Title>
            <InputField
              type="text"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            {/* <Title>End Date</Title>
            <InputField type="datetime-local" required /> */}
          </FormGroup>
          <ButtonGroup>
            <PostButton onClick={postJob}>Post</PostButton>
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
            <CancelButton onClick={cancel}>Cancel</CancelButton>
          </ButtonGroup>
        </MinContainer>
      </Container>
      <Footer />
    </div>
  );
};

export default PostaJob;
