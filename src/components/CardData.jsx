import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  height: auto;
  min-height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  background-color: #b8fff9;
  border-top: 1px solid rgba(0, 0, 50, 0.2);
  cursor: pointer;
  &:hover {
    background-color: #b8fff1;
  }
`;

const Title = styled.h5`
  margin: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    margin: 0.5rem 2rem;
  }
`;

const Description = styled.p`
  margin: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  span {
    margin-left: 2px;
    color: green;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 2rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 0.5rem 2rem;
    align-items: flex-start;
  }
`;

const PriceType = styled.p`
  margin-right: 0.5rem;
  font-weight: 600;
  opacity: 0.5;
  font-size: 0.9rem;
`;
const Level = styled.p`
  margin-right: 0.5rem;
  color: black;
  opacity: 0.8;
  font-size: 0.9rem;
`;
const Budget = styled.p`

    color: black;
  margin-right: 0.5rem;
  opacity: 0.8;
  font-size: 0.9rem;
`;
const PostedTime = styled.p`
  
    color: black;
  margin-right: 0.5rem;
  opacity: 0.8;
  font-size: 0.9rem;
`;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   margin: 1rem 2rem;
//   @media screen and (max-width: 950px) {
//     overflow-x: scroll;
//     padding: 10px;
//   }
// `;

// const Skill = styled.h4``;

// const Category = styled.h4``;

const ReadMore = ({ children }) => {
  const text = children;

  const [isShow, setIsShow] = useState(true);
  let result;
  if (text) {
    result = isShow ? text.slice(0, 400) : text;
  }

  const toggleisShow = () => {
    setIsShow(!isShow);
  };

  return (
    <Description>
      {result}
      <span onClick={toggleisShow}>
        {isShow ? (result === text ? "" : "more") : "less"}
      </span>
    </Description>
  );
};

const CardData = (props) => {
  const navigate = useNavigate();
  const navigateToJob = () => {
    if (props.status === "current" && props.mode === "selling") {
      navigate(`/submitJob/${props.username}/${props.job._id}`, {
        replace: true,
      });
    } else if (props.status === "available") {
      if (props.mode === "selling") {
        navigate(`/job/${props.username}/${props.job._id}`, {
          replace: true,
        });
      } else {
        navigate(`/application/${props.username}/${props.job._id}`, {
          replace: true,
        });
      }
    } else if (props.status === "delivered" && props.mode === "buying") {
      navigate(`/viewSubmission/${props.username}/${props.job._id}`, {
        replace: true,
      });
    }
  };
  return (
    <>
      <Card onClick={navigateToJob}>
        <Title>
          {props.mode === "selling" ? props.job.client : props.job.freelancer}
        </Title>
        <Title>{props.job.title}</Title>
        <List>
          <PriceType>Fixed-price</PriceType>
          <Level>{props.job.level}</Level>
          <Budget>Est.Budget: {props.job.budget}</Budget>
          <PostedTime>Posted 8 hours ago</PostedTime>
        </List>
        <ReadMore style={{ color: "#0c6ca1", marginBottom:"10" }}>
          {props.status === "delivered"
            ? props.job.delivery_description
            : props.mode === "selling"
            ? props.job.description
            : props.job.cover}
        </ReadMore>
      </Card>
    </>
  );
};

export default CardData;
