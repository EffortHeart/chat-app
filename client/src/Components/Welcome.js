import React from "react";
import Contact from "./Contact";
import Features from "./Features";
import Team from "./Team";
import Footer from "./Footer";

import Header from "./Header";
import HeroSection from "./HeroSection";
import Technologies from "./Technologies";
import ScrollToTopButton from "./ScrollToTopButton";
import styled from "styled-components";



const Welcome = () => {
   
  return (
    <Wrapper>
        <Header />
        <HeroSection />
        <Features  />
        <Technologies/>
        <Team />
        <Contact />
        <ScrollToTopButton />
        <Footer />
    </Wrapper>
  );
};

export default Welcome;

const Wrapper = styled.section`
.top-btn{
   background-color: #3180fc; 
   color: white;
   width: 4rem;
   height: 4rem;
   font-size: 2.4rem;
    padding: 0.25rem;
}
`

