import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Searchbar from "./Searchbar";
import UserList from "./UserList";
import {
  clearSelectChatAction,
  selectChatAction,
} from "../Redux/Reducer/Chat/chat.action";
import { getAllChats } from "../Redux/Reducer/Message/message.action";
import { useSelector, useDispatch } from "react-redux";

import Group from "./modal/Group";

const Default = () => {
  const [query, setQuary] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const dispatch = useDispatch();

  const [selectedChat, setSelectedChat] = useState();
  const [chatList, setchatList] = useState([]);

  const chat = useSelector((globalState) => globalState.chat.chats);
  const loggedUser = useSelector((globalState) => globalState.user.userDetails);
  const result = useSelector((globalState) => globalState.chat.selectedChat);

  useEffect(() => {
    setchatList(chat);
  }, [chat]);

  useEffect(() => {
    // dispatch(clearSelectChatAction());
    // if (selectedChat ? dispatch(getAllChats(selectedChat._id)) : "")

    dispatch(selectChatAction(selectedChat));
    // console.log(selectedChat);

    dispatch(getAllChats(selectedChat));

    // alert(selectedChat._id)
  }, [selectedChat]);


  return (
    <Wrapper className="default dynamic-sidebar">
      <div className="chat-menu flex flex-wrap items-center justify-between w-full  ">
        {searchOpen ? (
          <> </>
        ) : (
          <>
            <div>
              <h1 className=" text-2xl m-0">Chat</h1>
              <p className=" text-gray-400 mb-0">Start New Conversation</p>
            </div>
          </>
        )}

        <div
          className={
            searchOpen
              ? "flex justify-center items-center w-full"
              : "flex justify-center items-center"
          }
        >
          <Searchbar
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            setQuary={setQuary}
          />
          <Group />
        </div>
      </div>

      {/* User list  */}
      <UserList
        query={query}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        chatList={chatList}
        chat={chat}
        loggedUser={loggedUser}
        result={result}
        setSelectedChat={setSelectedChat}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  animation: fadeInLeft 1s;
  .group-icon {
    &:hover {
      background-color: ${({ theme }) => theme.colors.bg.secondary};
      color: ${({ theme }) => theme.colors.primaryRgb};
    }
  }
`;
export default Default;
