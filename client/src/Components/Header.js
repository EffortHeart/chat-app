import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from './Nav';

const Header = () => {
  const [header, setHeader] = useState(false);
  const changeBackground = () =>{
    if(window.scrollY >= 80){
      setHeader(true);
    }
    else{
      setHeader(false)
    }
  }

  window.addEventListener('scroll', changeBackground);

  return (
    <MainHeader className='w-full flex items-center' >
    <div className={header ? "header active flex justify-between items-center w-full" : "header flex justify-between items-center w-full"}>
    <NavLink to="/">
        <div className='hero-section-logo flex justify-center items-center'>
        <img src="./images/logo.png" alt="E-Talk logo"  loading='lazy' className='logo'/>
        </div>
    </NavLink>
    <Nav/>

    </div>
    </MainHeader>
  )
}

const MainHeader = styled.header`
  position: fixed;
  z-index: 99;
  transition: 0.5s;
  .header{
    padding: 0 1.5rem;
    height: 100px;
  }

  .header.active{
    background-color: ${({ theme }) => theme.colors.bg2.primary};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.boxShadow.primary};

    .navbar-lists .navbar-link{
      color: ${({ theme }) => theme.colors.heading};
      &:hover,
        &:active {
          border-bottom: 2px solid ${({ theme }) => theme.colors.cyan};;
          color: ${({ theme }) => theme.colors.cyan};
        }
        .button{
             color: ${({ theme }) => theme.colors.heading};
            border: solid 2px  ${({ theme }) => theme.colors.heading};
            &:hover{
                color: ${({ theme }) => theme.colors.cyan};
            border: solid 2px  ${({ theme }) => theme.colors.cyan};
            }
        }
    }
  }

  .hero-section-logo{
    width: 100%
  }
  .logo {
    height: 4rem;
  }

  @media (max-width: 1138px) {
   .header{
    .navbar-lists .navbar-link{
      color: ${({ theme }) => theme.colors.heading};
      .button{
        color: ${({ theme }) => theme.colors.heading};
        border-color: ${({ theme }) => theme.colors.heading};
      }

    }
    background-color: ${({ theme }) => theme.colors.bg2.primary};
   }
  }
 
`;

export default Header