import React, { useState } from "react";
import { CgClose, CgMenu } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import styled from "styled-components";
import { Button } from "../Styles/Button";
import Toggler from "./Toggler";

function Nav() {
  const [menuIcon, setMenuIcon] = useState(false);

  return (
    <Navbar>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists flex items-center">
          <li>
            <Link
              to="home"
              className="navbar-link "
              activeClass="active"
              smooth={true}
              duration={500}
              onClick={() => setMenuIcon(false)}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="features"
              activeClass="active"
              smooth={true}
              offset={-50}
              duration={500}
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              Features
            </Link>
          </li>

          <li>
            <Link
              to="team"
              activeClass="active"
              smooth={true}
              offset={-50}
              duration={500}
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              Team
            </Link>
          </li>

          <li>
            <Link
              to="contact"
              activeClass="active"
              smooth={true}
              offset={-50}
              duration={500}
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
            >
              Contact
            </Link>
          </li>

          <li>
            <NavLink to="/auth" className="navbar-link">
              <Button className="button">Login</Button>
            </NavLink>
          </li>

          <li>
            <NavLink to="/auth/signup" className="navbar-link">
              <Button className="button">signup</Button>
            </NavLink>
          </li>

          <li>
            <div className="navbar-link mode-toggler">
              <Toggler setMenuIcon={setMenuIcon} />
            </div>
          </li>
        </ul>

        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
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

        <div className="mobile-navbar-btn ml-10">
          <Toggler className="mobile-nav-icon" />
        </div>
        
      </div>
    </Navbar>
  );
}

const Navbar = styled.nav`
  .navbar-lists {
    gap: 2rem;
    .navbar-link {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 1.2rem;
      line-height: 1.5rem;
      color: ${({ theme }) => theme.colors.white};
      padding: 0.5rem 0rem;
      cursor: pointer;
      text-decoration: none;
      font-weight: 500;
      text-transform: uppercase;
      transition: color 0.3s linear;
      &:link,
      &:visited {
        font-size: 1rem;
      }
      &:hover,
      &:active {
        transition: color 0.3s linear;
        border-bottom: 2px solid ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.white};
      }
     

      .button {
        font-size: 1.1rem;
        width: 100px;
        border-radius: 20px;
        color: ${({ theme }) => theme.colors.white};
        border: solid 2px ${({ theme }) => theme.colors.white};

        &:hover {
          color: ${({ theme }) => theme.colors.white};
          border: solid 2px ${({ theme }) => theme.colors.white};
        }
      }
    }
    .navbar-link.mode-toggler{
        font-size: 2rem;
      }
  }

  .navbar-lists li {
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7) {
      .navbar-link {
        &:hover {
          border: none;
        }
      }
    }
    &:nth-child(7){
      font-size: 1.5rem;
    }
  }

  .mobile-navbar-btn {
    display: none;
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

  @media (max-width: 980px) {
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 9999;
      font-size: 3.2rem;
      border: ${({ theme }) => theme.colors.heading};
      .mobile-nav-icon {
        color: ${({ theme }) => theme.colors.heading};
      }
    }
    .active .mobile-nav-icon {
      display: none;
      color: ${({ theme }) => theme.colors.heading};
      z-index: 9999;
    }
    .active .close-outline {
      display: flex;
    }
    .navbar-lists {
      width: 100vw;
      position: absolute;
      top: 100px;
      right: 0;
      background-color: ${({ theme }) => theme.colors.bg2.primary};
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
     
      /* transform-origin: top; */
      .button{
        width: 150px !important;
        font-size: 2rem !important;
        padding: 0 !important;
        &:hover {
          color: ${({ theme }) => theme.colors.cyan} !important;
          border: solid 2px ${({ theme }) => theme.colors.cyan} !important;
        }
      }
    }
    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      transform-origin: right;
      width: 100vw;

      .navbar-link {
        font-size: 2.2rem;
        color: ${({ theme }) => theme.colors.heading};
        &:hover{
        color: ${({ theme }) => theme.colors.cyan} !important;
        border-bottom: none !important;
      }
      }
      .mode-toggler {
        display: none;
      }
    }
  }
`;

export default Nav;
