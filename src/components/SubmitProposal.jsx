import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ButtonSkill from "./ButtonSkill";
import Navbar from "./Navbar";
import Header from './Header'
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Title = styled.h5`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 2rem 0 1rem 6rem;
  font-size: 1.2rem;
  color: black;
  font-weight: 600;
`;

const JobDetails = styled.div`
  width: 80%;
  min-height: 350px;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 2fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border: 1px solid #0c6ac1;
  border-radius: 5px;
  margin: auto;
  background-color: #7393B3;
  @media screen and (max-width: 768px) {
    border-top: 1px solid #0c6ac1;
    border-bottom: 1px solid #0c6ac1;
    border-radius: 0px;
    width: 100%;
    transition: 0.8s all ease-in-out;
    grid-template-rows: 0.5fr 3fr 1fr;
  }
`;
const Heading = styled.div`
  border-bottom: 1px solid #0c6ac1;
  p {
    margin: 1.5rem 0 1rem 4rem;
    font-size: 1.2rem;
    color: #000;
    font-weight: bold;
  }
`;
const JobInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border-bottom: 1px solid #0c6ac1;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
const JobDesc = styled.div`
  border-right: 1px solid #0c6ac1;
  @media screen and (max-width: 768px) {
    border: none;
  }
`;
const JobName = styled.div`
  margin: 1rem 0 1rem 4rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
const Divi = styled.div`
  display: flex;
  margin: 0 4rem;
  align-items: center;
  align-content: center;
`;
const Category = styled.p`
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.1);
  color: darkgrey;
  padding: 0.2rem 0.5rem;
`;
const Posted = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin-left: 2rem;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
const Desc = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 4rem;
  opacity: 0.8;
`;

const JobType = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.5rem 2.5rem 0 2.5rem;
  @media screen and (max-width: 768px) {
    margin: 1rem 0 0 4rem;
  }
`;
const Level = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  span {
    margin-bottom: 0.2rem;
  }
`;
const Hour = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;
const Length = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;
const SkillAndExpert = styled.div`
  background-color: #7393B3;
  display: flex;
  flex-direction: column;
  justify-items: center;
  p {
    margin: 1rem 0 0 4rem;
    font-size: 1.1rem;
    font-weight: bold;
    @media screen and (max-width: 768px) {
      margin: 2rem 0 0 4rem;
    }
  }
`;
const SkillDiv = styled.div`
  background-color: #7393B3;
  display: flex;
  margin: 0.2rem 4rem 2rem 4rem;
  overflow-x: scroll;
`;
const SubmitProp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr 1fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 80%;
  min-height: 400px;
  height: auto;
  margin: 2rem auto 0 auto;
  border: 1px solid #0c6ac1;
  border-radius: 5px;
  background-color: #7393B3;
  @media screen and (max-width: 768px) {
    border-radius: 0px;
    width: 100%;
    transition: 0.8s all ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const HourRate = styled.div`
  border-bottom: 1px solid #0c6ac1;
  display: flex;
  align-items: center;
  p {
    margin-left: 3rem;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      margin: 0.5rem 3rem;
    }
  }
`;

const InputField = styled.input`
  border-radius: 8px;
  margin-left: 3rem;
  height: 25px;
  text-align: right;
  padding-right: 0.5rem;
  background-color: transparent;
  &:hover {
    border: 1px solid #0c6ac1;
  }
  @media screen and (max-width: 768px) {
    margin: 0.5rem 3rem;
  }
`;
const CoverLetter = styled.div`
  border-bottom: 1px solid #0c6ac1;
  margin: 1rem 0;
  p {
    margin-left: 2rem;
    font-size: 14px;
    color: #222222;
  }
`;
const InputCover = styled.textarea`
  margin: 1rem 2rem;
  padding: 1rem;
  min-height: 75px;
  width: 80%;
  border-radius: 12px;
  @media screen and (max-width: 768px) {
    margin: 1rem 1rem;
  }
`;
const Attachments = styled.div`
  border-bottom: 1px solid #0c6ac1;
  margin: 1rem 0;
  p {
    margin-left: 2rem;
    font-size: 14px;
    color: #222222;
  }
`;

const InputAttach = styled.input`
  margin: 1rem 2rem;
`;
const GroupButton = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 2rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const SubmitButton = styled.button`
  border: 1px solid #0c6ca1;
  border-radius: 160px;
  background-color: #0c6ca1;
  color: #ecf7fc;
  padding: 0.5rem 1rem;
  text-align: center;
  margin: 0rem 2rem 0.5rem 0;
  font-size: 15px;
  width: 160px;
  cursor: pointer;
  &:hover {
    border: 1px solid #0c6ca1;
    background-color: #ecf7fc;
    color: #0c6ca1;
  }
`;
const CancelButton = styled.button`
  border: 1px solid red;
  border-radius: 160px;
  background-color: #fff;
  color: red;
  padding: 0.5rem 1rem;
  text-align: center;
  margin: 0rem 2rem 0.5rem 0;
  font-size: 15px;
  width: 160px;
  cursor: pointer;
  &:hover {
    border: 1px solid red;
    background-color: red;
    color: #fff;
  }
`;

const SubmitProposal = () => {
  const navigate = useNavigate()
  const {username, id} = useParams();
  const [mode, setMode] = useState("");
  const [budget, setBudget] = useState("");
  const [time, setTime] = useState("");
  const [cover, setCover] = useState("");
  let [job, setJob] = useState({})

  const submitProposal = async () => {
    job["freelancer"] = username
    job["delivery"] = time
    job["budget"] = budget
    job["cover"] = cover
    let application = job
    let id = application["_id"]
    delete application["_id"]
    application["job_id"] = id
    console.log(application)
    console.log(job)
    let res = await axios.post(`https://young-cliffs-72209.herokuapp.com/apply`, application);
    if (res.data == "success") {
      success();
      setTimeout(()=>{
      navigate(`/dashboard/${username}`)}, 2000)
    }else{
      incorrect();
    }
  }
  useEffect(async ()=>{
    let res = await axios.get(`https://young-cliffs-72209.herokuapp.com/user/${username}`)
    setMode(res.data.mode)
    res = await axios.get(`https://young-cliffs-72209.herokuapp.com/job/${id}`)
    setJob(res.data)
  }, [mode, job])

  const success = () => {
    toast("Proposal submitted successfully!")
  }

  const incorrect = () => {
    toast("Unfortunately, failed to submit proposal!")
  }
  return (
    <div style={{backgroundColor:"#28282B"}}>
      <Navbar 
      username={username}
      mode={mode}
      />
      <Header username={username}/>
      <JobDetails>
        <Heading>
          <p>Job Details</p>
        </Heading>
        <JobInfo>
          <JobDesc>
          <Title>{job.title}</Title>
            <Divi>
              <Category>{job.category}</Category>
              <Posted>Posted {job.date}</Posted>
            </Divi>
            <Desc>
              {job.description}
            </Desc>
          </JobDesc>
          <JobType>
            <Level>
              <span>{job.level}</span>
            </Level>
            <Hour>
              <p>Budget: {job.budget}</p>
            </Hour>
            <Length>
            
            </Length>
          </JobType>
        </JobInfo>
        <SkillAndExpert>
          <p>Skill And Expertise</p>
          <SkillDiv>
            {
              job.skills ? 
              job.skills.map((skill, index)=>{
                return(
                  <ButtonSkill skill={skill}/>
                )
              })
              :<></>
            }
          </SkillDiv>
        </SkillAndExpert>
      </JobDetails>
      <SubmitProp>
        <HourRate>
          <p>Your Budget:</p>
          <InputField placeholder="$5.00"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </HourRate>
        <CoverLetter>
          <p>Cover Letter</p>
          <InputCover rows="5" cols="100" required 
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </CoverLetter>
        {/* <Attachments>
          <p>Attachments</p>
          <InputAttach type="file" />
        </Attachments> */}
        <GroupButton>
          <SubmitButton onClick={submitProposal}>Submit Proposal</SubmitButton>
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
          <CancelButton>Cancel</CancelButton>
        </GroupButton>
      </SubmitProp>
    </div>
  );
};

export default SubmitProposal;
