import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`
  width: 80%;
  height: auto;
  min-height: 80%;
  background-color: #fff;
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
  font-size: 1.1rem;
  /* background-color: #0c6ac1; */
  color: black;
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

const JobName = styled.h6`
  font-size: 1.1rem;
  padding: 1rem;
`;

const ClientName = styled.h6`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-weight: lighter;
  span {
    padding: 0 0 0 4.5rem;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const Budget = styled.p`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-weight: lighter;
  span {
    padding: 0 0 0 7rem;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const NumberofDays = styled.p`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-weight: lighter;
  span {
    padding: 0 0 0 1rem;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const SubmitTask = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #0c6ac1;
  padding: 1rem;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const LabelName = styled.label`
  font-size: 1rem;
  font-weight: lighter;
  padding: 1rem 0;
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: center;
`;

const TaskButton = styled.button`
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

const TaskCancel = styled.button`
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

const JobSubmitPage = (props) => {
    const {username, id} = useParams();
    const [user, setUser] = useState({})
    const [app, setApp] = useState({});
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState();
    const navigate = useNavigate();

    useEffect(async ()=>{
        let res = await axios.get(`http://localhost:4000/getApplication/${id}`);
        setApp(res.data);

        res = await axios.get(`http://localhost:4000/user/${username}`);
        setUser(res.data)
        console.log(user)
    }, [])

    const cancel = () => {
        navigate(`/dashboard/${user.username}`);
    }

    const success = () => {
      toast("Successfull!")
    }
  
    const incorrect = () => {
      toast("There was an error while performing the task!")
    }

    const submit = async () => {
      if(user.mode == "selling"){
        let obj = {}
        obj["id"] = id;
        obj["delivery_description"] = desc;
        obj["file"] = file;
        obj["status"] = "delivered"
        let res = await axios.post(`https://young-cliffs-72209.herokuapp.com/submission`, obj);
        if(res.data == "success"){
          success();
          setTimeout(()=>{props.closeModal(false);
            navigate(`/dashboard/${user.username}`)}, 2000)
        }else{
          incorrect();
        }
      }else{
        console.log(id)
        let res = await axios.put(`https://young-cliffs-72209.herokuapp.com/changeToCompleted/${id}`)
        console.log(res.data)
        console.log("delivery accepted")
        navigate(`/dashboard/${user.username}`)
      }
    }
  return (
      <>
      <Navbar username={user.username}
        mode = {user.mode}
        firstname = {user.first}
      />
      <Header 
        username = {user.username}
        mode = {user.mode}
      />
    <Container>
      <Heading>Submit Job Task</Heading>
      <MinContainer>
        <JobName>{app.title}</JobName>
        <ClientName>
          {
            user.mode == "selling" ? "Client: " : "Freelancer: "
          }
          {
            user.mode == "selling" ? <span>{app.client}</span> : <span>{app.freelancer}</span>
          }
        </ClientName>
        <Budget>
          Budget:<span>${app.budget}</span>
        </Budget>
        <NumberofDays>
          Number of Days Left:<span>{app.time} days</span>
        </NumberofDays>
        <SubmitTask>
          <Group>
            <LabelName style={{fontWeight:"bold"}}>{user.mode == "selling" ? "Describe your delivery" : "Description of delivery"}</LabelName>
            <InputText 
            value={desc}
            placeholder={app.delivery_description}
            disabled={user.mode != "selling"}
            onChange={(e) => setDesc(e.target.value)}
            />
          </Group>
          <Group>
            <LabelName>{user.mode == "selling" ? "Attachment" : "Deliverable"}</LabelName>
            <InputField type="file"
            disabled={user.mode != "selling"}
            onChange={(e) => setFile(e.target.value)}
            />
          </Group>
          <ButtonGroup>
            <TaskButton onClick={submit}>{user.mode == "selling" ? "Submit Task" : "Accept delivery"}</TaskButton>
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
background='#EE0022'
/>
            {
              user.mode == "selling" ? 
            <TaskCancel onClick={cancel}>Cancel</TaskCancel>:
            <></>
            }
          </ButtonGroup>
        </SubmitTask>
      </MinContainer>
    </Container>
    <Footer />
    </>
  );
};

export default JobSubmitPage;