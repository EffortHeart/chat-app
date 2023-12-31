import React from "react";
import styled from "styled-components";

const Favourite = () => {
  return (
    <Wrapper className="favourite-tab dynamic-sidebar">
      <div className="relative chat-menu flex flex-wrap items-center justify-between w-full ">
        <div>
          <h2>Favourites</h2>
        </div>
        <div className="icon text-right"></div>
      </div>
      <div className="details">
        <p className="text-center">This Feature will be available Soon</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  animation: fadeInLeft 1s;
`;

export default Favourite;
