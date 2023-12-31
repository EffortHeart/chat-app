import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BiGroup } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// import Loading1 from "../Loading1";
// import Loading1 from "../Loading1";
import {
  createGroupChat,
  fetchChats,
  fetchUser,
  fetchUserClear,
} from "../../Redux/Reducer/Chat/chat.action";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import Spinner from "../../Styles/Spinner";


const Group = () => {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading1, setLoading1] = useState(false);

  const result = useSelector((globalState) => globalState.chat.newUser);
  const loading = useSelector((globalState) => globalState.chat.isUserLoading);

  function closeModal() {
    setGroupChatName("");
    setSearch("");
    setSelectedUser([]);
    setSearchResult([]);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addUserTogroup = (userToAdd, index) => {
    const userExist = selectedUser.some((item) => item._id === userToAdd._id);
    if (userExist) {
      toast.warn(`${userToAdd.name} already added`, {
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
      setSelectedUser([...selectedUser, userToAdd]);
    }
  };
  // console.log(selectedUser);

  const deleteSelectedUser = (deleteUser) => {
    setSelectedUser(selectedUser.filter((sel) => sel._id !== deleteUser._id));
    setSearchResult(result.splice(0, 0, deleteUser));
  };

  const handleCreateNewGroupChat = async () => {
    let groupInfo;
    groupInfo = {
      name: groupChatName,
      users: JSON.stringify(selectedUser.map((user) => user._id)),
    };
    if (!groupInfo.name || JSON.parse(groupInfo.users).length < 2) {
      toast.warn("Please provide Group Name and at least 2 users", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setLoading1(true);
    await dispatch(createGroupChat(groupInfo));
    await dispatch(fetchChats());
    setLoading1(false);
    await closeModal();
    toast.success("Group Created Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setGroupChatName("");
    setSearch("");
    setSelectedUser([]);
    setSearchResult([]);

    // setSearchResult([])
    // setSearch
  };

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  //   console.log(search);
  //   if (!search) {
  //     dispatch(fetchUserClear());
  //     return;
  //   }
  //   dispatch(fetchUser(search));
  // };

  useEffect(() => {
    // console.log(selectedUser);
    setSearchResult(result);
  }, [result]);

  useEffect(() => {
    if (!search) {
      dispatch(fetchUserClear());
      return;
    }
    dispatch(fetchUser(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <div className="group-icon rounded-full p-2 " onClick={() => openModal()}>
        <BiGroup className="icon text-2xl cursor-pointer" />
      </div>
      {/* <ToastContainer /> */}
      <Transition className="box" appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="dialog-box relative z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="dialog-wrapper fixed inset-0 overflow-y-auto">
            <div className="dialog-container flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog-panel w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Create New Group
                  </Dialog.Title>

                  {/* create group form */}

                  <div className="mt-4">
                    <div>
                      <div className="mb-6">
                        <label
                          htmlFor="base-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Group Name
                        </label>
                        <input
                          type="text"
                          id="base-input"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="e.g. My Group"
                          value={groupChatName}
                          onChange={(e) => setGroupChatName(e.target.value)}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="base-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Search User
                        </label>
                        <input
                          type="text"
                          id="base-input"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Add User e.g. John , Jane"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* selected user render means render Badge */}
                        <div className="my-4">
                          {selectedUser.length !== 0 ? (
                            selectedUser.map((item, index) => (
                              <li key={index} className="inline-flex flex-wrap">
                                <span
                                  id="badge-dismiss-default"
                                  className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                                >
                                  {item.name}
                                  <button
                                    type="button"
                                    className="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                                    data-dismiss-target="#badge-dismiss-default"
                                    aria-label="Remove"
                                    onClick={() => deleteSelectedUser(item)}
                                  >
                                    <svg
                                      aria-hidden="true"
                                      className="w-3.5 h-3.5"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                    <span className="sr-only">
                                      Remove badge
                                    </span>
                                  </button>
                                </span>
                              </li>
                            ))
                          ) : (
                            <></>
                          )}
                        </div>

                        {/* searched user render */}
                        <div className="user-list my-4 overflow-y-scroll">
                          <div className="h-full">
                            {loading && search ? (
                              <>
                                <Spinner />
                              </>
                            ) : (
                              <>
                                {searchResult.length !== 0 ? (
                                  searchResult.map((item, index) => (
                                    <li className="px-2 py-2 " key={item._id}>
                                      <div className="search-user-box relative flex justify-between items-center">
                                        <div className="profile absolute left-0 ">
                                          <img
                                            className="w-12 h-12 rounded-full"
                                            src={searchResult[index].pic}
                                            alt="pic"
                                          />
                                        </div>

                                        <div className="details w-3/4">
                                          <h2 className="md:w-32 w-full m-0 text-base">
                                            {item.name}
                                          </h2>
                                        </div>

                                        <div
                                          className="user-add flex justify-center items-center cursor-pointer rounded-full p-2"
                                          onClick={() =>
                                            addUserTogroup(item, index)
                                          }
                                        >
                                          <AiOutlinePlus />
                                        </div>
                                      </div>
                                    </li>
                                  ))
                                ) : (
                                  <>
                                    <div
                                      className={
                                        search === "" &&
                                        searchResult.length === 0
                                          ? "hidden"
                                          : "text-center"
                                      }
                                    >
                                      <span className="text-gray-500">
                                        No Contact Found
                                      </span>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer flex justify-end mt-3">
                    <button
                      type="button"
                      className="close-btn mr-4 inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-cyan-500  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn bg-cyan-500 rounded px-4"
                      // disabled
                      onClick={() => handleCreateNewGroupChat()}
                    >
                      {loading1 ? (
                        <>
                          creating...
                          {/* <Loading1 />{" "} */}
                        </>
                      ) : (
                        <> Create Group</>
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Group;
