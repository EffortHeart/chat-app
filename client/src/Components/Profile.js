import React from "react";
import styled from "styled-components";
// import { MdOutlineEmail } from "react-icons/md";
// import { FcAbout, FcContacts } from "react-icons/fc";
import { AiFillContacts, AiFillInfoCircle, AiTwotoneMail } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const Profile = (props) => {
 
  // console.log(user);
  return (
    <Wrapper className="profile-tab dynamic-sidebar">
      <div className="relative chat-menu flex flex-wrap items-center justify-between w-full ">
        <div>
          <h2>Profile</h2>
          <p>Personal Information</p>
        </div>
        <div className="icon p-1 flex items-start h-full justify-start cursor-pointer">
              <div
                className="p-1 bg-white text-black rounded-full"
                onClick={props.closeModal}
              >
                <RxCross2 />
              </div>
        </div>
      </div>
      <div className="user-details overflow-y-scroll ">
        <div className="details p-4 h-full">
          <div className="intro flex items-center flex-col py-3">
            <div className="user-profile-img rounded-full overflow-hidden">
              <img src={props.pic} alt={props.name} />
            </div>
            <div className="user-name py-4 text-center w-full">
              <h5 className="text-xl font-medium">{props.name}</h5>
            </div>
          </div>
          <div className="intro mt-3 flex items-start flex-col p-4 rounded">
            <div className="flex justify-between w-full mt-2">
              <div className="grid place-items-center text-gray-500 text-3xl">
                <AiFillInfoCircle className="icon" />
              </div>
              <div className="w-4/5">
                <span className="text-gray-500">About</span>
                <p className="w-full break-words">{props.about}</p>
              </div>
            </div>
            {/* contact */}
            <div className="flex justify-between w-full mt-2">
              <div className="grid place-items-center text-gray-500 text-3xl">
                <AiFillContacts className="icon" />
              </div>
              <div className="w-4/5">
                <span className="text-gray-500">Mobile</span>
                <p className="w-full break-words">{props.contact}</p>
              </div>
            </div>

            <div className="flex justify-between w-full mt-2">
              <div className="grid place-items-center text-gray-500 text-3xl">
                <AiTwotoneMail className="icon" />
              </div>
              <div className="w-4/5">
                <span className="text-gray-500">Email Address</span>
                <p className="w-full break-words">{props.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  animation: fadeInLeft 1s;

  .chat-menu{
    .icon{
      display: none;
    }
  }
  .user-details{
    height: calc(100vh - 200px)
  }
  .user-profile-img {
    width: 150px;
    height: 150px;
    img {
      min-width: 100%;
    }
  }
  .intro {
    border-bottom: 1px solid rgba(${({ theme }) => theme.colors.border});
    background-color: ${({ theme }) => theme.colors.bg.primary};

    .icon{
      color: ${({ theme }) => theme.colors.primaryRgb}
    }
  }
  @media (max-width: 500px) {
    .details {
      margin: 10px 40px 0px 40px;
      padding: 0;
    }
    p{
      font-size: 1rem;
    }
    .intro {
      padding: 1rem 0rem;
    }
  }
  @media (min-width: 500px) and (max-width: ${({ theme }) => theme.media.mobile}) {
    .details {
      margin: 10px 50px 0px 50px;
    }
    p{
      font-size: 1rem;
    }
    .intro {
      padding: 1rem 0rem;
    }
  }
`;

