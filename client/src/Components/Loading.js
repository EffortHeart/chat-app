import React from 'react'
import styled from 'styled-components';

const Loading = () => {
  return (
    <Wrapper className='flex flex-col justify-center items-center'>
        <img src="./images/loading.gif" alt="" />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  h1 {
    font-size: 5rem;
    margin-bottom: 1rem
  }
  img {
    width: 8rem;
    margin-bottom: 2rem
  }
 
`;

export default Loading