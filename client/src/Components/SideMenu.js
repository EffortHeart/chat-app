import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting, AiOutlineStar } from "react-icons/ai";
import { RiContactsLine } from "react-icons/ri";
import { BsChatSquareDots } from "react-icons/bs";
import { CgClose, CgMenu } from "react-icons/cg";
import Toggler from "./Toggler";


import { IoLogOutOutline } from "react-icons/io5";


// redux
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../Redux/Reducer/Auth/auth.action";
import { toggleTab } from "../Redux/Reducer/Tab/tabAction";


const SideMenu = () => {
  const [menuIcon, setMenuIcon] = useState();

  const tabIndex = useSelector((state)=> state.tabReducer);

  const activeTab = (index) => {
    dispatch(toggleTab(index))
  };

  const sideIconsList = [
    {
      id: 1,
      icon: CgProfile,
      title: "Profile",
    },
    {
      id: 2,
      icon: AiOutlineStar,
      title: "Favourite",
    },
    {
      id: 3,
      icon: BsChatSquareDots,
      title: "Chats",
    },
    {
      id: 4,
      icon: RiContactsLine,
      title: "Contacts",
    },
    {
      id: 5,
      icon: AiOutlineSetting,
      title: "Setting",

    },
  ];
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());

  };


  return (
    <Wrapper>
     
      <div
        className={
          menuIcon
            ? " side-menu active flex justify-between"
            : " side-menu flex justify-between"
        }
      >
        <div className=" mobile-navbar overflow-y-auto">
          <div className="sideMenu-brand-logo mb-5">
            <NavLink to="/" className="logo">
              <span>
                <img src="images/logo2.png" alt="logo" />
              </span>
            </NavLink>
          </div>
          <div className="mobile-sideMenu-btn justify-center items-center">
            <CgMenu
              name="menu-outline"
              className="mobile-nav-icon"
              onClick={() => setMenuIcon(true)}
            />
            <CgClose
              name="close-outline"
              className="mobile-nav-icon close-outline"
              onClick={() => setMenuIcon(false)}
            />
          </div>
        </div>

        <div className="side-menu-bar overflow-y-auto">
          <div className="sideMenu-brand-box mb-5">
            <NavLink to="/" className="logo">
              <span>
                <img src="images/logo2.png" alt="logo" />
              </span>
            </NavLink>
          </div>
          <div className="side-menu-list">
            <ul className="flex flex-col justify-between gap-4">
              {sideIconsList.map((items, index) => (
                <li

                  key={index}
                  className="side-menu-item"
                  title={items.title}
                  onClick={() => activeTab(index+1)}
                >

                  <div to={items.title} className={index === 2 && tabIndex === 0 ? "nav-link active" : (tabIndex === (index + 1) ? "nav-link active" : "nav-link")} onClick={() => setMenuIcon(false)}>

                    <items.icon className="icon" />
                  </div>
                </li>

              ))}

              {/* Theme mode */}
              <li className="side-menu-item" title="Theme Mode">
                <div className="nav-link">
                  <Toggler />
                </div>
              </li>

              {/* logout */}
              <li
                className="side-menu-item"
                title="Logout"
                onClick={handleLogout}
              >
                <div to="/" className="nav-link">
                  <IoLogOutOutline className="icon" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .side-menu {
    max-width: 100px;
    height: 100vh;
    min-width: 100px;
    flex-direction: column;
    border-right: 1px solid rgba(${({ theme }) => theme.colors.border});
    background-color: ${({ theme }) => theme.colors.bg.primary};
    animation: fadeInLeft 1s ease-in-out;
  }
  .side-menu-bar {
    height: 100%;
  }
  .sideMenu-brand-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    .logo {
      img {
        vertical-align: middle;
        height: 50px;
      }
    }
  }
  .side-menu-list {
    .side-menu-item {
      margin: 7px auto;
      cursor: pointer;
      .nav-link.active {
        background-color: ${({ theme }) => theme.colors.btn.light};
        color: ${({ theme }) => theme.colors.primaryRgb};
      }
      .nav-link {
        display: block;
        text-align: center;
        height: 56px;
        line-height: 56px;
        font-size: 2rem;
        margin: 0 auto;
        width: 56px;
        color: ${({ theme }) => theme.colors.text.secondary};
        border-radius: 8px;
        &:hover {
          color: ${({ theme }) => theme.colors.primaryRgb};
        }
        .icon {
          display: inline;
        }
        .profile-user {
          border: 3px solid ${({ theme }) => theme.colors.primaryRgb};
        }
      }
    }
  }
  .mobile-navbar {
    display: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  .mobile-sideMenu-btn {
    background-color: transparent;
    cursor: pointer;
    border: none;
  }
  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }
  .close-outline {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .side-menu {
      position: absolute;
      top: 0;
      left: 0;
      max-height: 80px;
      max-width: 100vw;
      min-height: 80px;
      z-index: 30;
    }
    .side-menu-list {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      ul {
        height: 80%;
        .nav-link {
          font-size: 3rem !important;
        }
      }
    }
    .side-menu-bar {
      background-color: ${({ theme }) => theme.colors.bg.primary};
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      transition: all 0.1s linear;
      z-index: 20;
      max-width: 100px;
      box-shadow: 0px 0px 10px rgb(0 0 0);
      height: 100vh;
      min-width: 100px;
    }
    .sideMenu-brand-box {
      display: none;
    }
    //mobile-navbar
    .sideMenu-brand-logo {
      display: inline;
      height: auto;
      .logo {
        img {
          vertical-align: middle;
          height: 50px;
        }
      }
    }
    .active .side-menu-bar {
      transform: translateX(0%);
      transform-origin: left;
      transition: all 0.1s linear;
    }
    .mobile-navbar {
      position: relative;
      width: 100vw;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 3.2rem;
      z-index: 10;
    }
    .mobile-sideMenu-btn {
      display: inline-block;
      z-index: 20;
      border: ${({ theme }) => theme.colors.heading};
      .mobile-nav-icon {
        font-size: 4.2rem;
        color: ${({ theme }) => theme.colors.heading};
      }
    }
    .active .mobile-navbar .mobile-nav-icon {
      display: none;
      font-size: 4.2rem;
      color: ${({ theme }) => theme.colors.heading};
      z-index: 20;
    }
    .active .mobile-navbar .close-outline {
      display: inline-block;
    }
  }
`;

export default SideMenu;
