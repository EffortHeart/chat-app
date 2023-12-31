import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "./Profile";
import Favourite from "./Favourite";
import Contacts from "./Contacts";
import Setting from "./Setting";
import Default from "./Default";

import { toggleTab } from "../Redux/Reducer/Tab/tabAction";
import { useDispatch, useSelector } from "react-redux";
import {
  createChat,
  fetchChats,
  fetchUser,
  fetchUserClear,
} from "../Redux/Reducer/Chat/chat.action";
import { toast } from "react-toastify";

const ChatMenu = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const tabIndex = useSelector((state) => state.tabReducer);
  const result = useSelector((globalState) => globalState.chat.newUser);
  const user = useSelector((globalState) => globalState.user.userDetails);
  const UserLoading = useSelector((globalState)=> globalState.chat.isUserLoading);
  const [showResult, setShowResult] = useState(false)
  const chat = useSelector((globalState) => globalState.chat.chats);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);

  };

  useEffect(() => {
    setSearchResult(result);
  }, [result]);

  const handleClick = () => {
    if (!search) {
      toast.warning("Please Enter valid Email or Name", {
        autoClose: 1000,
      });
      return;
    }
    setShowResult(true)
    dispatch(fetchUser(search));
  };

  const createNewChat = async (item) => {

    const UserExist = chat.some((elem)=> elem.users[1]._id === item._id)
  
    if(UserExist){
      toast.error("contact already exist", {
        autoClose: 1000,
      });
      return
    }
    else{
      toast.success("contact successfully added", {
        autoClose: 1000,
      });
    }
    
    await dispatch(createChat(item._id));
    await dispatch(fetchChats());
    await dispatch(toggleTab(3));
  };

  useEffect(() => {
   if(tabIndex !== 4 || !search){
    setSearch("")
    dispatch(fetchUserClear())
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex, search])
  

  return (
    <>
      <Wrapper className="chat-menu-section ">
        <div className="tab-content">
          <div className={tabIndex === 1 ? "tab-pane active" : "tab-pane "}>
            <Profile 
             pic={
                   user.pic
                  }
                  name = {
                    user.name
                  }
                  email = {
                  user.email
                  }
                  about ={
                  user.about
                  }
                  contact ={
                  user.contact
                  }
             />
          </div>
          <div className={tabIndex === 2 ? "tab-pane active" : "tab-pane "}>
            <Favourite />
          </div>
          <div
            className={
              tabIndex === 3 || tabIndex === 0 ? "tab-pane active" : "tab-pane"
            }
          >
            <Default />
          </div>
          <div className={tabIndex === 4 ? "tab-pane active" : "tab-pane "}>
            <Contacts
              search={search}
              handleChange={handleChange}
              handleClick={handleClick}
              searchResult={searchResult}
              createNewChat={createNewChat}
              UserLoading = {UserLoading}
              showResult={showResult}
            />
          </div>
          <div className={tabIndex === 5 ? "tab-pane active" : "tab-pane "}>
            <Setting />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  position: relative;
  max-width: 20rem;
  height: 100vh;
  min-width: 20rem;
  z-index: 9;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  border-right: 1px solid rgba(${({ theme }) => theme.colors.border}, 0.3);
  animation: fadeInLeft 1s;
  /* overflow-x: hidden;
  overflow-y: scroll; */
  .tab-pane {
    display: none;
  }
  .tab-pane.active {
    display: block;
  }
  .chat-menu {
    padding: 1rem 1rem;
    background-color: ${({ theme }) => theme.colors.bg.primary};
    border-bottom: 1px solid rgba(${({ theme }) => theme.colors.border});
    input {
      color: ${({ theme }) => theme.colors.heading};
      background-color: ${({ theme }) => theme.colors.bg.primary};
      border-bottom: 1px solid ${({ theme }) => theme.colors.heading};
      &:hover {
        background-color: ${({ theme }) => theme.colors.bg.primary};
      }
    }
    .icon {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.heading};
      &:hover{
        color: ${({ theme }) => theme.colors.primaryRgb};
      }
    }
    .search-icon {
      background-color: ${({ theme }) => theme.colors.bg.primary};
      /* background-color: rgb(241, 245, 249); */
      &:hover {
        background-color: ${({ theme }) => theme.colors.bg.primary};
        /* background-color: rgb(226, 232, 240); */
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 1.5rem 0;
    margin-top: 60px;
    position: relative;
    max-width: 100vw;
    min-width: 100vw;
    .chat-menu {
      padding: 2rem 1.5rem;
      .icon {
        font-size: 2rem;
      }
    }
    input {
      font-size: 1.5rem;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.bg.primary};
      &:hover {
        background-color: ${({ theme }) => theme.colors.bg.primary};
      }
    }
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1.5rem;
    }
  }
`;

export default ChatMenu;
