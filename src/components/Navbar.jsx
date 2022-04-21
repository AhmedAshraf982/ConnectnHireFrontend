import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as LinkR, useNavigate } from "react-router-dom";
import { Link as LinkS } from "react-scroll";
import { FaBars, FaUser } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import MessageDropDown from "./MessageDropDown";
import NotificationDropDown from "./NotificationDropDown";
import axios from "axios";
import logo from "./logo.png";

const Nav = styled.nav`
  height: 80px;
  background-color: #effffd;
  justify-content: space-between;
  display: flex;
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
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 1rem;
  max-width: 100px;
  position: relative;
  @media screen and (max-width: 960px) {
    height: 60px;
    transition: 0.8s all ease;
    max-width: 1100px;
  }
`;

const Logo = styled.img`
  margin-left: 2rem;
  cursor: pointer;
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 20%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.ul`
  display: flex;
<<<<<<< HEAD
  align-items: center;
  justify-content: center;
  margin-top: 30px;
=======
  align-items: center !importantß; ß
  margin-right: -22px;
>>>>>>> d2ac9b9e1f1ccf7bfac6bd59e0a36f21da430139
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
  color: #42c2ff;
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
  justify-content: flex-end;
  align-items: center;
  margin-right: 1.5rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  outline: none;
  background-color: #effffd;
  font-size: 16px;
  color: #42c2ff;
  padding: 10px 22px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #42c2ff;
    color: #effffd;
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
  background-color: #7393b3;
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
  const navigate = useNavigate();
  const [dropshow, setDropShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [read, setRead] = useState("");
  const [notiRead, setNotiRead] = useState("");

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        `https://young-cliffs-72209.herokuapp.com/unreadMsg/${props.username}`
      );
      setRead(response.data);
      response = await axios.get(
        `https://young-cliffs-72209.herokuapp.com/unreadNotification/${props.username}`
      );
      setNotiRead(response.data);
    }
    fetchData();
  }, [props.username]);

  const changeMode = async () => {
    let res = await axios.put(
      `https://young-cliffs-72209.herokuapp.com/changeMode/${props.username}`
    );
    if (res.data === "success") {
      navigate(`/dashboard/${props.username}`, { replace: true });
    }
  };

  const FindJob = async () => {
    console.log("find job");
    if (props.mode === "buying") {
      let res = await axios.put(
        `https://young-cliffs-72209.herokuapp.com/changeMode/${props.username}`
      );
      console.log(res.data)
      if (res.data === "success") {
        navigate(`/dashboard/${props.username}`, { replace: true });
      }
    }
  };

  const about = () => {
    navigate(`/About/${props.username}`);
  };

  const PostJob = () => {
    navigate(`/postJob/${props.username}`);
  };

  const settings = () => {
    navigate(`/settings/${props.username}`);
  };
  const logout = () => {
    setDropShow(!dropshow);
    navigate(`/`);
  };
  const markNotificationsRead = () => {
    let response = axios.put(
      `https://young-cliffs-72209.herokuapp.com/markNotificationsRead/${props.username}`
    );
  };
  return (
    <>
      <Nav
        onClick={() => {
          setShowMessage(false);
          setShowNotifications(false);
        }}
      >
        <NavbarContainer>
          <Logo src={logo} alt="logo" />
          <MobileIcon onClick={props.toggle}>
            <FaBars color="#42c2ff" />
          </MobileIcon>
<<<<<<< HEAD
        </NavbarContainer>
        <NavMenu>
          <NavItem>
            <NavLinks onClick={FindJob}>Find Job</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks onClick={PostJob}>Post Job</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              onClick={() => {
                setShowMessage(!showMessage);
                setShowNotifications(showNotifications);
              }}
            >
              Message
              {read === "unread" ? <Dot /> : ""}
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessage(showMessage);
                markNotificationsRead();
              }}
            >
              Notifications
              {notiRead === "unread" ? <Dot /> : ""}
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks onClick={about}>About Us</NavLinks>
          </NavItem>
        </NavMenu>

        <div>
=======
          <NavMenu>
          <NavItem>
              <NavLinks onClick={()=>{navigate('/')}}>Home</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={FindJob}>Find Job</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={PostJob}>Post Job</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                onClick={() => {
                  setShowMessage(!showMessage);
                  setShowNotifications(showNotifications);
                }}
              >
                Message
                {read == "unread" ? <Dot /> : ""}
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMessage(showMessage);
                  markNotificationsRead();
                }}
              >
                Notifications
                {notiRead === "unread" ? <Dot /> : ""}
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={about}>About Us</NavLinks>
            </NavItem>
          </NavMenu>
>>>>>>> d2ac9b9e1f1ccf7bfac6bd59e0a36f21da430139
          <NavButton>
            {!props.username ? (
              <>
                <Button
                  onClick={() => {
                    props.closeLoginModal(true);
                  }}
                >
                  <FaUser color="#42c2ff" />
                </Button>
                {/* <Button
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
                </Button> */}
              </>
            ) : (
              <Button
                onClick={
                  changeMode}
              >
                {props.mode === "buying"
                  ? "Turn to a freelancer"
                  : "Turn to a client"}
              </Button>
            )}

            {props.username && (
              <ImageIcon
                src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
                onClick={() => {
                  setDropShow(!dropshow);
                  setShowNotifications(false);
                  setShowMessage(false);
                }}
              />
            )}
          </NavButton>
        </div>
        {dropshow && (
          <DropDown>
            <UserName>{props.firstname}</UserName>
            <ListMenu>
              <List onClick={settings}>
                <SettingLogo>
                  <AiFillSetting />
                </SettingLogo>
                Settings
              </List>
              <List onClick={logout}>
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
      <NotificationDropDown
        showNotifications={showNotifications}
        username={props.username}
      />
    </>
  );
};

export default Navbar;
