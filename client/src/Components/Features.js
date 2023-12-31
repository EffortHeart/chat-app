import React from "react";
import styled from "styled-components";
import { featuresImg } from "../config.js/data";

const Features = () => {
  return (
    <Wrapper className="features-section" id="features">
      <div className="custom-container">
        <div className="flex items-start justify-center">
          <div className="section-header text-center">
            <h4 data-aos="fade-up" data-aos-delay="200">
              App Features
            </h4>
            <h2 data-aos="fade-up" data-aos-delay="400" className="capitalize">
              We provide Best feature for app Design and coding
            </h2>
          </div>
        </div>

        <div className="features-list" data-aos="fade-up" data-aos-delay="600">
          <ul>
            {featuresImg.map((item) => (
              <li key={item.id}>
                <div className="features-box">
                  <div className="features-box-icon">
                    <div>
                      <img src={item.icon} alt="" loading="lazy" />
                    </div>
                  </div>
                  <div className="features-box-content">
                    <h3>{item.name}</h3>
                    <p>{item.content}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fillOpacity="1"
            d="M0,0L48,32C96,64,192,128,288,133.3C384,139,480,85,576,64C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
    </Wrapper>
  );
};

export default Features;

const Wrapper = styled.section`
  position: relative;
  padding: 5rem 0;
  background-image: url("/images/pattern-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${({ theme }) => theme.colors.bg2.secondary};

  .svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    svg {
      position: absolute;
      bottom: 0%;
      left: 0%;
      fill: ${({ theme }) => theme.colors.bg2.primary};
      transform: rotate(180deg);
    }
  }

  .custom-container {
    position: relative;
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
    z-index: 20;

    .section-header {
      margin: 0 50px;
      h2 {
        font-size: calc(1rem + 20 * (100vw - 320px) / 1600);
        font-weight: 700;
        color: ${({ theme }) => theme.colors.heading};
        margin: 25px 0;
      }
    }

    .features-list {
      text-align: center;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
          position: relative;
          margin: 0px 20px 40px;
        }
      }
    }

    .features-box {
      background: ${({ theme }) => theme.colors.bg2.primary};
      border-width: 1px 1px 1px 1px;
      border-color: ${({ theme }) => theme.colors.border2.primary};
      border-radius: 10px;
      text-align: center;
      padding: 30px;
      transition: all 0.5s;
      &:hover {
        box-shadow: 0px 0px 24px
          ${({ theme }) => theme.colors.boxShadow.primary};
        transform: scale(1.05);
      }

      .features-box-icon {
        div {
          display: flex;
          justify-content: center;
          width: 120px;
          margin: 0 auto;
          height: 120px;
          align-items: center;
          border-radius: 50%;
          img {
            max-width: 100%;
            height: auto;
          }
        }
      }
      .features-box-content {
        color: ${({ theme }) => theme.colors.heading};
        h3 {
          font-weight: 600;
        }
      }
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
  @media screen and (min-width: 992px) {
    .features-list {
      margin: 75px 0;
    }
    .features-box-content {
      h3 {
        font-size: 1.5rem;
      }
    }
    .section-header {
      h2 {
        width: 34rem;
      }
    }
    .features-list li {
      width: calc(30% - 20px);
    }
    .features-list li:nth-child(2),
    li:nth-child(5) {
      bottom: 50px;
      position: relative;
    }
  }
  @media only screen and (max-width: 992px) {
    .section-header {
      h2 {
        width: auto;
      }
    }
    .features-list {
      margin: 25px 0;
    }
    .features-list li:nth-child(2),
    li:nth-child(5) {
      position: relative;
      bottom: 0;
    }
  }
  @media only screen and (min-width: 522px) and (max-width: 992px) {
    .features-box-content {
      h3 {
        font-size: 1.2rem;
      }
      p {
        font-size: 0.8rem;
      }
    }
    .features-list li {
      width: 200px;
    }
  }
  @media only screen and (max-width: 521px) {
    .features-box-content {
      h3 {
        font-size: 1.5rem;
      }
      p {
        font-size: 1rem;
      }
    }
    .features-box-content {
      h3 {
        font-size: 1.1rem;
      }
      p {
        font-size: 0.8rem;
      }
    }
    .section-header {
      h2 {
        width: auto;
      }
    }
    .features-list li {
      width: 260px;
    }
    .features-list li:nth-child(2),
    li:nth-child(5) {
      position: relative;
      bottom: 0;
    }
  }
`;
