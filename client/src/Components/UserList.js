import React from "react";
import styled from "styled-components";
import { getSender, getSenderPic } from "../HelperFunction/chat.Helper";

import moment from "moment";
import Highlighter from "react-highlight-words";

const UserList = ({ searchOpen, query , chatList, chat, loggedUser, result, setSelectedChat }) => {
  
  const userChatShow = () => {
    document
      .getElementById("user-chat")
      .classList.add("user-chat-show", "fadeInRight");
    document.getElementById("user-chat").classList.remove("fadeInRight2");
  };

  return (
    // <Wrapper>
    <Wrapper>
      <ul className="chat-main h-full overflow-x-hidden overflow-y-scroll">
        {chatList.length !== 0 ? (
          <div className="mb-4" onClick={() => userChatShow()}>
            {chatList
              .filter((item) => {
                return query.toLowerCase() === "" || searchOpen === false
                  ? item
                  : (!item.isGroupChat
                      ? getSender(loggedUser, item.users)
                      : item.chatName
                    )
                      .toLowerCase()
                      .includes(query.toLowerCase());
              })
              .map((item, index) => (
                <li
                  onClick={() => setSelectedChat(item)}
                  key={item._id}
                  id="chat-box-wrapper"
                  className={
                    result === item
                      ? "chat-box-wrapper active px-5 py-2"
                      : "chat-box-wrapper px-5 py-2"
                  }
                >
                  <div className="chat-box flex items-center cursor-pointer">
                    <div className="profile">
                      <img
                        className=" w-12 h-12 rounded-full"
                        // src={chat[index].users[0].pic}
                        src={
                          !item.isGroupChat
                            ? getSenderPic(loggedUser, item.users)
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6wQvepXb0gM_Ft1QUOs6UyYJjPOmA-gq5Yw&usqp=CAU"
                        }
                        alt="user_logo"
                      />
                    </div>
                    <div className="details w-3/4">
                      <Highlighter
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={
                          !item.isGroupChat
                            ? getSender(loggedUser, item.users)
                            : item.chatName
                        }
                        className="inline-block md:w-36 w-full m-0 truncate text-base"
                      >
                        {!item.isGroupChat
                          ? getSender(loggedUser, item.users)
                          : item.chatName}
                      </Highlighter>
                      <p className=" text-xs truncate whitespace-nowrap overflow-hidden">
                        <span className="text-xs">
                          {item.latestMessage != null
                            ? `${
                                item.latestMessage.sender.name ===
                                loggedUser.name
                                  ? "You"
                                  : item.latestMessage.sender.name
                              }:`
                            : ""}
                        </span>
                        <span className="text-xs truncate">
                          {" "}
                          {item.latestMessage != null
                            ? item.latestMessage.content
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div className="data-status h-full avatar-group">
                      {chat[index].isGroupChat ? (
                        <div className="flex -space-x-4">
                          <img
                            className="w-8 h-8 border-2 bg-white  rounded-full  hover:z-10"
                            src={chat[index].users[0].pic}
                            alt=""
                          />
                          <img
                            className="w-8 h-8 border-2 bg-white  rounded-full  hover:z-10"
                            src={chat[index].users[1].pic}
                            alt=""
                          />
                          <img
                            className="w-8 h-8 border-2 bg-white  rounded-full  hover:z-10"
                            src={chat[index].users[2].pic}
                            alt=""
                          />
                          {chat[index].users.length > 3 ? (
                            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600">
                              {`+${chat[index].users.length - 3}`}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}

                      <p>
                        {item.latestMessage
                          ? moment(item.latestMessage.createdAt).format(
                              "DD/MM/YY"
                            )
                          : ""}
                      </p>

                      {item.status === "seen" ? (
                        <span className="status text-green-400">
                          {item.status}
                        </span>
                      ) : (
                        <span className="status text-red-500">
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </div>
        ) : (
          <div className="my-4">
            <p className="text-lg text-gray-400 w-full first-letter: mx-auto">
              {" "}
              No Chat availabe
            </p>
          </div>
        )}
      </ul>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  position: relative;

  mark {
    background-color: ${({ theme }) => theme.colors.primaryRgb};
  }
  .chat-main {
    height: calc(100vh - 90px);
    background-color: ${({ theme }) => theme.colors.bg.primary};
    li.active {
      background-color: rgba(${({ theme }) => theme.colors.rgb.primary}, 0.12);
      border-left: 4px solid ${({ theme }) => theme.colors.primaryRgb};
      transition: all 0.3s ease;
    }
    .chat-box-wrapper {
      &:nth-child(1) {
        border-top: none;
      }
      border-top: 1px solid ${({ theme }) => theme.colors.border2.primary};
    }
    .chat-box {
      position: relative;
      h2 {
        overflow: hidden;
        margin: 0;
        padding-top: 8px;
        white-space: nowrap;
      }
      p,
      span {
        font-weight: 600;
        margin: 0;
        padding-top: 8px;
      }
      .profile {
        position: absolute;
        left: 0;
        width: 50px;
        height: 50px;
      }
      .details {
        padding: 12px 12px 12px 60px;
        p {
          overflow: hidden;
          color: ${({ theme }) => theme.colors.text.secondary};
        }
      }
      .avatar-group {
        img {
          border-color: rgb(${({ theme }) => theme.colors.img_border});
        }
      }
      .data-status {
        position: absolute;
        right: 0;
        text-align: right;
        padding: 12px 0px 12px 0px;
        h2,
        p {
          color: ${({ theme }) => theme.colors.text.secondary};
        }
        h2,
        p,
        span {
          font-size: calc(11px + (12 - 11) * ((100vw - 320px) / (1920 - 320)));
        }
        .status {
          padding-top: 8px;
          padding-bottom: 0px;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    position: relative;
    max-width: 100vw;
    min-width: 100vw;
    .chat-main {
      width: 100vw;
      height: calc(100vh - 186px);
      li {
        padding: 20px 20px 20px 20px;
        h2 {
          font-size: 1.5rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default UserList;
