import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as LinkR, useNavigate } from "react-router-dom";
import { Link as LinkS } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import MessageDropDown from "./MessageDropDown";
import NotificationDropDown from './NotificationDropDown'
import axios from 'axios';
import logo from './logo.png'

const Nav = styled.nav`
  height: 80px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0px 15px 10px -15px #0c6ca1;
  @media screen and (max-width: 960px) {
    height: 60px;
    transition: 0.8s all ease;
  }
`;
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 1.5rem;
  max-width: 1100px;
  position: relative;
  @media screen and (max-width: 960px) {
    height: 60px;
    transition: 0.8s all ease;
  }
`;

const Logo = styled.img`
  display: flex;
  justify-self: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
  text-decoration: none;
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  margin-top: 12px;
  margin-right: -22px;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  height: 80px;
  text-decoration: none !important;
`;

const NavLinks = styled(LinkS)`
  color: #0c6ca1;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  font-size: 1.1rem;
  text-decoration: none !important;
  cursor: pointer;
  &:hover {
    color: #023958;
    transform: scaleX(1.5);
    transform: scaleY(1.2);
    transition: 0.1s all ease-in-out;
  }
  /* &:active {
    border-bottom: 1px solid #023958;
  } */
`;

const NavButton = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  outline: none;
  background-color: #fff;
  font-size: 16px;
  color: #0c6ca1;
  margin-left: 1rem;
  padding: 10px 22px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #0c6ca1;
    color: #fff;
  }
`;

const ImageIcon = styled.img`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-left: 1rem;
  cursor: pointer;
`;

const DropDown = styled.div`
  position: absolute;
  top: 4rem;
  right: 10rem;
  background-color: #7393B3;
  border-radius: 5px;
  border: 2px solid #0c6ca1;
  width: auto;
  min-width: 100px;
`;

const UserName = styled.h3`
  text-align: center;
  font-size: 1rem;
  margin: 1rem 0 0.5rem 0;
  border-bottom: 2px solid #023958;
  color: black;
`;

const ListMenu = styled.ul`
  list-style: none;
  margin: 0 1rem;
`;

const List = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  font-size: 1.1rem;
  color: black;
`;

const SettingLogo = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

const LogOutLogo = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

const Dot = styled.p`
  height: 15px;
  width: 15px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  margin-left: 10px;
`;

const Navbar = (props) => {
  const navigate = useNavigate()
  const [dropshow, setDropShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [read, setRead] = useState("");
  const [notiRead, setNotiRead] = useState("");

  useEffect(async ()=>{
    let response = await axios.get(`https://young-cliffs-72209.herokuapp.com/unreadMsg/${props.username}`)
    setRead(response.data)
    response = await axios.get(`https://young-cliffs-72209.herokuapp.com/unreadNotification/${props.username}`);
    setNotiRead(response.data);
  })

  const changeMode = async () => {
    let res = await axios.put(`https://young-cliffs-72209.herokuapp.com/changeMode/${props.username}`)
    if(res.data == "success"){
      navigate(`/dashboard/${props.username}`)
    }
  }

  const FindJob = async () =>{
    console.log("find job")
    if(props.mode == "buying"){
      let res = await axios.put(`https://young-cliffs-72209.herokuapp.com/changeMode/${props.username}`)
      if(res.data == "success"){
        navigate(`/dashboard/${props.username}`)
      }
    }
  }

  const about = () => {
    navigate(`/About/${props.username}`)
  }

  const PostJob = () => {
    navigate(`/postJob/${props.username}`)
  }

  const settings = () => {
    navigate(`/settings/${props.username}`)
  }
  const logout = () => {
    setDropShow(!dropshow);
    navigate(`/`)
  }
  const markNotificationsRead = () =>{
    let response = axios.put(`https://young-cliffs-72209.herokuapp.com/markNotificationsRead/${props.username}`);
  }
  return (
    <>
      <Nav onClick={() => {setShowMessage(false)
      setShowNotifications(false)  
    }
    }>
        <NavbarContainer>
          <Logo src={logo} alt="logo" />
          <MobileIcon onClick={props.toggle}>
            <FaBars color="#aef5ff" />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks onClick={FindJob} >Find Job</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={PostJob} >Post Job</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={() => {setShowMessage(!showMessage)
              setShowNotifications(showNotifications)
              }}>
                 Message
                {read=="unread" ? <Dot /> : ""}
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={() => {setShowNotifications(!showNotifications)
              setShowMessage(showMessage)
              markNotificationsRead()
              }}>
                Notifications
                {notiRead=="unread" ? <Dot /> : ""}
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={about}>
              About Us
              </NavLinks>
            </NavItem>
          </NavMenu>
          <NavButton>
            {
              !props.username ?
              
              <>
              <Button
              onClick={() => {
                props.closeLoginModal(true);
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                props.closeSignupModal(true);
              }}
            >
              Sign Up
            </Button>
            </>
              
            :
            <Button
              onClick={() => {
                changeMode();
              }}
            >
              {props.mode == "buying" ? "Turn to a freelancer" : "Turn to a client"}
            </Button>
            }
            
            {
              props.username &&  <ImageIcon
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
              onClick={() => {
                setDropShow(!dropshow);
                setShowNotifications(false);
                setShowMessage(false);
              }}
            />
            }
          </NavButton>
        </NavbarContainer>
        {dropshow && (
          <DropDown>
          <UserName>{props.firstname}</UserName>
          <ListMenu>
            <List  onClick={settings}>
              <SettingLogo>
                <AiFillSetting />
              </SettingLogo>
              Settings
            </List>
            <List  onClick={logout}>
              <LogOutLogo>
                <BiLogOut />
              </LogOutLogo>
              LogOut
            </List>
          </ListMenu>
        </DropDown>
        )}
      </Nav>
      <MessageDropDown showMessage={showMessage} username={props.username} />
      <NotificationDropDown showNotifications={showNotifications} username={props.username} />
    </>
  );
};

export default Navbar;
