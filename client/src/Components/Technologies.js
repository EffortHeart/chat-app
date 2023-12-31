import React from "react";
import styled from "styled-components";
import { technologiesImg } from "../config.js/data";


const Technologies = () => {
  return (
    <Wrapper className="technologies-section" id="technologies">
      <div className="custom-container">
        <div
          className="flex items-start justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="section-header text-center">
            <h5>POWERFUL</h5>
            <h2 className="capitalize">Techonolgies Used</h2>
          </div>
        </div>

        <div className="technologies-list">
          <ul>
            {technologiesImg.map((item, index) => (
              <li
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
                key={item.id}
              >
                <div className="flex flex-col justify-center items-center p-8">
                  <img src={item.src} alt="tech-img" />
                  <h5 className="mt-5">{item.name}</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
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

export default Technologies;

const Wrapper = styled.section`
  position: relative;
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.bg2.primary};
  /* overflow: hidden; */

  .custom-container {
    position: relative;
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
    z-index: 20;

    .section-header {
      margin: 0 0 25px;
      h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.heading};
        margin: 25px 0;
      }
    }

    .technologies-list {
      text-align: center;
      margin: 25px 0;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
          div {
            background-color: ${({ theme }) => theme.colors.bg2.secondary};
            border-width: 1px 1px 1px 1px;
            border-color: ${({ theme }) => theme.colors.border2.primary};
            width: 10rem;
            height: 10rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 15px 50px;
            border-radius: 10px;
            transition: all 0.5s;
            &:hover {
              box-shadow: 0px 4px 24px
                ${({ theme }) => theme.colors.boxShadow.primary};
              transform: scale(1.1);
            }
          }
          img {
            max-width: 100%;
            height: auto;
          }
        }
      }
    }
  }

  .shapes {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    animation: Zoom-fade 5s infinite linear;
    z-index: 1;
    div {
      position: absolute;
    }
    .shape-1 {
      top: -10%;
      left: -3%;
      opacity: 0.1;
    }
    .shape-2 {
      top: -15%;
      right: 16%;
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

  @media only screen and (min-width: 1680px) {
    .custom-container {
      max-width: 1450px;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
  }
`;
