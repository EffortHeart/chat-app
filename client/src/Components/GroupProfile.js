import moment from "moment";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

// import { getSender, getSenderPic } from "../HelperFunction/chat.Helper";
import {
  removeUserFromGroup,
} from "../Redux/Reducer/Chat/chat.action";

const GroupProfile = (props) => {
  const dispatch = useDispatch();
  const {
    groupId,
    closeModal,
    groupPic,
    groupName,
    groupCreatedAt,
    groupUsers,
    groupAdmin,
  } = props;
  // console.log(props.sender);
  // console.log(props.loggedUser)
  const [query, setQuary] = useState("");


  const loggedUser = useSelector((globalState) => globalState.user.userDetails);
  // console.log(loggedUser);
  // console.log(groupUsers);
  // console.log(groupAdmin);

  // console.log(groupId);
  const searchUser = (e) => {
    setQuary(e.target.value);
  };

  const removeFromGroup = async (user) => {
    // console.log(user);
    const { id } = user;
    if (groupUsers.length >= 4) {
      const data = {
        chatId: groupId,
        userId: id,
      };
      if (loggedUser) {
        if (loggedUser._id === groupAdmin.id) {
          await dispatch(removeUserFromGroup(data));
          toast.success(`${user.name} deleted Successfully`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.warn("your are not admin. Please Ask Admin", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } else {
      toast.warn("group must have at least 3 Members", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Wrapper>
      <div className="group-profile h-full w-full">
        <div>
          {/* {props.sender ? ( */}
          <>
            <div className="group-container">
              <div className="group-details">
                <div className="relative chat-menu flex flex-wrap items-center justify-between w-full ">
                  <div className="title">
                    <h2>Profile</h2>
                  </div>
                  <div className="icon p-1 flex items-start h-full justify-start cursor-pointer">
                    <div
                      className="p-1 bg-white text-black rounded-full"
                      onClick={closeModal}
                    >
                      <RxCross2 />
                    </div>
                  </div>
                </div>

                <div className="profile py-4 flex flex-col justify-center items-center">
                  <div className="profile-img rounded-full overflow-hidden">
                    <img src={groupPic} alt="group-pic" />
                  </div>

                  <div className="profile-details">
                    <div className="title pt-4 text-center w-full">
                      <h5 className="text-3xl font-medium capitalize">
                        {groupName}
                      </h5>
                    </div>

                    <div className="detatils">
                      <div className="pt-4 w-full">
                        <p className=" text-center text-lg  text-gray-400">
                          Created At
                        </p>
                      </div>
                      <div className="w-full">
                        <span className="text-lg">
                          {moment(groupCreatedAt).format("DD-MM-YY , hh:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Participants w-full h-full">
                <div className="title">
                  <h3 className=" text-lg font-medium">
                    {" "}
                    {`${groupUsers.length} Participants`}{" "}
                  </h3>
                </div>

                <div className="search-field w-full">
                  <div className="search-input flex justify-center items-center ">
                    <input className="w-full" onChange={(e) => searchUser(e)} />
                    <BiSearch className="icon" size={20} />
                  </div>
                </div>

                <div className="participants-list w-full my-4 overflow-y-scroll">
                  {groupUsers
                    .filter((item) => {
                      return query.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(query.toLowerCase());
                    })
                    .map((item, index) => (
                      <li key={index} className="chat-box-wrapper px-5 py-2">
                        <div className="chat-box flex items-center cursor-pointer">
                          <div className="profile">
                            <img
                              src={item.pic}
                              className="w-12 h-12 rounded-full"
                              alt=""
                            />
                          </div>
                          <div className="details w-10/12">
                            <span className="inline-block md:w-32 w-full m-0 truncate text-base font-bold capitalize">
                              {item.name}
                            </span>
                            <p className="text-xs truncate whitespace-nowrap overflow-hidden">
                              {item.about}
                            </p>
                          </div>
                          <div className="data-status h-full">
                            {item.name === groupAdmin.name ? (
                              <>
                                <span className="text-xs">Admin</span>
                              </>
                            ) : 
                            <>
                              {
                                groupAdmin.id === loggedUser._id ? <>
                                <span
                                  className="text-xs cursor-pointer"
                                  onClick={() => removeFromGroup(item)}
                                >
                                  Remove
                                </span>
                              </>
                              : <></>
                              }
                            </>
                            }
                          </div>
                        </div>
                      </li>
                    ))}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </Wrapper>
  );
};

export default GroupProfile;

const Wrapper = styled.div`
  .group-profile {
    .group-container {
      .group-details {
        margin-top: 2rem;
        .chat-menu {
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .profile {
          border-bottom: 1px solid #ffffff26;
          .profile-img {
            margin: 10px 50px 0px 50px;
            width: 150px;
            height: 150px;
            img {
              min-width: 100%;
            }
          }
          .profile-details {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      }
      .Participants {
        position: relative;
        .title {
          margin-top: 2rem;
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .search-field {
          padding-left: 1rem;
          padding-right: 1rem;
          .search-input {
            position: relative;
            background-color: ${({ theme }) => theme.colors.bg.secondary};

            input {
              padding: 0.5rem 1rem;
              border-bottom: 1px solid ${({ theme }) => theme.colors.white};
            }
            input:focus {
              outline: none;
              border-bottom: 1px solid ${({ theme }) => theme.colors.primaryRgb};
              background-color: ${({ theme }) =>
                theme.colors.bg.primary} !important;
            }
            .icon {
              position: absolute;
              right: 1rem;
              color: ${({ theme }) => theme.colors.heading};
            }
          }
        }
      }

      .participants-list {
        height: calc(100vh - 400px);

        .chat-box-wrapper {
          border-top: 1px solid #ffffff26;
          &:nth-child(1) {
            border-top: none;
          }
          .chat-box {
            position: relative;
            .profile {
              position: absolute;
              left: 0;
              width: 50px;
              height: 50px;
            }
            .details {
              padding: 12px 12px 12px 60px;
            }

            .data-status {
              position: absolute;
              right: 0;
              text-align: right;
              padding: 12px 0px 12px 0px;
            }
          }
        }
      }
    }
  }
`;
