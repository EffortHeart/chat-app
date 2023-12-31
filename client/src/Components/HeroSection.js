import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../Styles/Button";
import { HiChevronDoubleRight } from "react-icons/hi";


const HeroSection = () => {
  return (
    <Wrapper className="hero-section" id="home">
      <div className="custom-container flex h-full items-center">
        <div className="flex">
          <div
            className="hero-section-data flex flex-col justify-start"
            data-aos="fade-right">
            <p>Welcome to</p>
            <h1 className="font-bold">
              Real time chat application for all your needs
            </h1>
            <p>
              Easy to use our chat app, Attractive and clean design, with many
              Features Dark & light, Recent Chat And many more.......
            </p>
            <div className="login-btn">
              <NavLink to="/auth">
                <Button
                  className="button hover:scale-105 text-white radius-round px-8 py-2"
                  data-aos="fade-left"
                >
                  Get Started
                  <HiChevronDoubleRight className="ml-2" />
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

        <div className="hero-section-image absolute w-full h-full">
            {/* <img src="https://chitchat-react.vercel.app/assets/images/landing/2.png" alt="bg" className="img-style" /> */}
          </div>

      {/* shapes code */}
      <div className="shapes">
      <div className="shape-1">
         <img width="250px" src="/images/shape-1.png" alt="" />
        </div>
        <div className="shape-2">
         <div style={{width: "800px"}}>
         <img width="800px" src="/images/shape-1.png" alt="" />
         </div>
        </div>
        <div className="shape-3">
         <div style={{width: "150px"}}>
         <img width="800px" src="/images/shape-3.png" alt="" />
         </div>
        </div>
        <div className="shape-4">
         <img width="43px" src="/images/shape-5.png" alt="" />
        </div>
        <div className="shape-5">
         <img width="43px" style={{zIndex: "2"}} src="/images/shape-6.png" alt="" />
        </div>
      </div>
    </Wrapper>
  );
};

export default HeroSection;

const Wrapper = styled.section`
  position: relative;
  padding-top: 140px;
  background: url("/images/2.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.bg2.secondary};
  overflow: hidden;

  .custom-container {
    position: relative;
    z-index: 1;
  }

  .hero-section-data {
    margin: 0 2rem;
    .highlight {
      color: #1c77ed;
    }
    h1 {
      font-size: calc(1.1rem + 28 * (100vw - 320px) / 1600);
      font-weight: 800;
      margin-bottom: 17px;
      line-height: 1.2;
      max-width: 680px;
    }
    p {
      font-size: calc(1.2 * (1rem + 3 * (100vw - 320px) / 1600));
      margin: 0 0;
      max-width: 750px;
      font-weight: 500;
      font-family: Roboto, sans-serif;
      line-height: 1.8;
      color: rgba(${({ theme }) => theme.colors.rgb.heading}, 0.5);
    }

    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      border-radius: 5px;
      background: ${({ theme }) => theme.colors.gradient};
      font-weight: 600;
      padding: 18px 30px;
      transition: 0.3s;
      box-shadow: 0 0 10px ${({ theme }) => theme.colors.boxShadow.primary};
      &:hover {
        scale: 1.01;
      }
    }
  }

  .hero-section-image {
    position: absolute;
    left: 0;
    top: 0;
    .img-style {
      position: absolute;
      right: 0;
      top: 0;
      vertical-align: middle;
      width: 50%;
      height: auto;
    }
  }

  .shapes {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    animation: zoom-fade 5s infinite linear;
    div {
      position: absolute;
    }
    .shape-1 {
      top: -10%;
      left: -3%;
      opacity: 0.1;
    }
    .shape-2 {
      top: 40%;
      right: 30%;
      opacity: 0.1;
    }
    .shape-3 {
      top: 70%;
      left: -3%;
      transform-origin: center;
      transform: rotate(20deg);
      opacity: 0.1;
    }
    .shape-4 {
      bottom: 0%;
      left: 20%;
      transition: all 0.5s;
      animation: balloonfly-02 12s infinite;
    }
    .shape-5 {
      bottom: 0%;
      right: 20%;
      transition: all 0.5s;
      animation: balloonfly-01 12s infinite;
    }
  }
  @keyframes zoom-fade {
    0% {
      transform: scale(1.02);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(1.02);
    }
  }

  @keyframes balloonfly-01 {
    0% {
      top: 40%;
      opacity: 0;
    }
    30% {
      transform: scale(1.5);
      opacity: 1;
    }
    100% {
      top: 15%;
      opacity: 0;
    }
  }

  @keyframes balloonfly-02 {
    0% {
      top: 40%;
      opacity: 0;
    }
    30% {
      transform: scale(1.5);
      opacity: 1;
    }
    100% {
      top: 10%;
      opacity: 0;
    }
  }

  @media (min-width: ${({ theme }) => theme.media.mobile}) {
    .login-btn {
      margin: 2.5rem 0;
    }
    .custom-container {
      padding: 0 5rem;
    }
    .button {
      font-size: 1rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    background-image: url("/images/1.png");
    padding: 0rem 0rem;
    .custom-container {
      padding: 0;
    }
    .login-btn {
      margin: 2.5rem auto;
    }
    .hero-section-data {
      margin-top: 85px;
      h1 {
        font-size: 2rem;
      }
      p {
        font-size: 1.5rem;
      }
      h1,
      p {
        text-align: center;
      }
    }
    .button {
      font-size: 1.2rem;
    }
    .hero-section-image {
      visibility: hidden;
    }
    .container {
      padding: 1rem;
    }
  }
`;
