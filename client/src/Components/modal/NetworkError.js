import React from 'react';
import {Detector} from "react-detect-offline"
import styled from 'styled-components';

const NetworkError = (props) => {
  
//   const Refresh = () =>{
//     window.location.reload();
//   }
  return (
   <>
    <Detector
        render = {({online})=>(
            online ? props.children :
            <Wrapper>
              <div className='container bg-black w-screen h-screen  p-10'>
                <div className='wrapper flex flex-col justify-center items-center w-full h-full p-5'>
                <div className="title text-center">
                    <h1>Whoops!</h1>
                </div>
                <div className="description text-center mt-5">
                    <p className=' text-lg text-center'>There seems to be a connection with your network connection</p>
                </div>
                {/* <div className="btn text-center cursor-pointer" onClick={()=>Refresh()}>
                    <span className='text-xl'>Try Again</span>
                </div> */}
                </div>
              </div>
             </Wrapper>
        )}
    />
   </>
  )
}

export default NetworkError;

const Wrapper = styled.div`
.container{
    background-color: ${({ theme }) => theme.colors.bg.primary};
}
.wrapper{
    background-color: ${({ theme }) => theme.colors.bg.secondary};
    box-shadow: 0 0 20px rgba(0,0,0,0.1)
}
.title.h1{
    color: ${({ theme }) => theme.colors.heading};
}
`