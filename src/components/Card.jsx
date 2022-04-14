import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardData from "./CardData";
import axios from "axios";
const Container = styled.div`
  width: 80%;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: #42c2ff;
  border-radius: 10px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  opacity: 0.8;
  @media screen and (max-width: 768px) {
    border: none;
    margin-bottom: 0;
    border-shadow: none;
    width: 100%;
  }
`;

// const Heading = styled.h5`
//   text-align: left;
//   font-size: 1.2rem;
//   /* background-color: #0c6ac1; */
//   color: black;
//   padding: 1rem;
//   @media screen and (max-width: 768px) {
//     text-align: center;
//     transition: 0.3s all ease-in-out;
//   }
// `;

const Card = (props) => {
  const [jobs, setJobs] = useState([]);
  const [applied, setApplied] = useState([]);
  const [current, setCurrent] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (props.mode === "selling") {
        let res = await axios.get(
          `https://young-cliffs-72209.herokuapp.com/jobs/${props.username}`
        );
        setJobs(res.data);

        res = await axios.get(
          `https://young-cliffs-72209.herokuapp.com/pending/${props.username}`
        );
        setApplied(res.data);

        res = await axios.get(
          `https://young-cliffs-72209.herokuapp.com/current/${props.username}`
        );
        setCurrent(res.data);

        res = await axios.get(
          `https://young-cliffs-72209.herokuapp.com/delivered/${props.username}`
        );
        setDelivered(res.data);

        res = await axios.get(
          `https://young-cliffs-72209.herokuapp.com/completed/${props.username}`
        );
        setCompleted(res.data);
      } else if (props.mode === "buying") {
        let res = await axios.get(
          `https://young-cliffs-72209.herokuapp.com/applications/${props.username}`
        );
        setJobs(res.data);

        res = await axios.get(
          `https://young-cliffs-72209.herokuapp.com/clientCurrent/${props.username}`
        );
        setCurrent(res.data);

        res = await axios.get(
          `https://young-cliffs-72209.herokuapp.com/clientDelivered/${props.username}`
        );
        setDelivered(res.data);

        res = await axios.get(
          `https://young-cliffs-72209.herokuapp.com/clientCompleted/${props.username}`
        );
        setCompleted(res.data);
      }
    }
    fetchData();
  }, [props.username, props.mode]);
  return (
    <>
      {/* Available jobs */}
      <Container style={{ marginTop: 50 }}>
        {props.mode === "selling" ? (
          <h1 style={{ color: "black", padding: 10, textAlign: "center" }}>
            Available jobs
          </h1>
        ) : (
          <h1 style={{ color: "black", padding: 10, textAlign: "center" }}>
            Proposals
          </h1>
        )}
        {jobs.map((job, index) => {
          return (
            <CardData
              job={job}
              status={"available"}
              username={props.username}
              mode={props.mode}
              key={index}
            />
          );
        })}
      </Container>

      {/* Applied Jobs */}

      <Container style={{ marginTop: 50 }}>
        {props.mode === "selling" ? (
          <h1 style={{ color: "black", padding: 10, textAlign: "center" }}>
            Applied jobs
          </h1>
        ) : (
          <></>
        )}
        {props.mode === "selling"
          ? applied.map((apply, index) => {
              return (
                <CardData
                  job={apply}
                  username={props.username}
                  status={"applied"}
                  mode={props.mode}
                />
              );
            })
          : ""}
      </Container>

      {/* Current Jobs */}

      <Container style={{ marginTop: 50 }}>
        <h1 style={{ color: "black", padding: 10, textAlign: "center" }}>
          Current jobs
        </h1>
        {current.map((curr, index) => {
          return (
            <CardData
              job={curr}
              status={"current"}
              username={props.username}
              mode={props.mode}
            />
          );
        })}
      </Container>

      {/* Delivered Jobs */}

      <Container style={{ marginTop: 50 }}>
        <h1 style={{ color: "black", padding: 10, textAlign: "center" }}>
          Delivered jobs
        </h1>
        {delivered.map((deliver, index) => {
          return (
            <CardData
              job={deliver}
              status={"delivered"}
              username={props.username}
              mode={props.mode}
            />
          );
        })}
      </Container>

      {/* Completed Jobs */}

      <Container style={{ marginTop: 50 }}>
        <h1 style={{ color: "black", padding: 10, textAlign: "center" }}>
          Completed jobs
        </h1>
        {completed.map((comp, index) => {
          return (
            <CardData
              job={comp}
              status={"completed"}
              username={props.username}
              mode={props.mode}
            />
          );
        })}
      </Container>
    </>
  );
};

export default Card;
