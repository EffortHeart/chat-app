import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrapper className="flex items-center justify-center loader">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </Wrapper>
  );
};

export default Spinner;

const Wrapper = styled.div`
   width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    div {
      width: 8rem;
      height: 8rem;
      color: ${({ theme }) => theme.colors.primaryRgb};
    }
`
