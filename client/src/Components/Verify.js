import React, { useEffect, useState, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { verifyEmailLink } from "../Redux/Reducer/Auth/auth.action";
import { GoUnverified, GoVerified, GoMailRead, GoMail } from "react-icons/go";
import { getMySelf } from "../Redux/Reducer/User/user.action";
import { Dialog, Transition } from "@headlessui/react";
import { userVerification } from "../Redux/Reducer/Auth/auth.action";
import styled from "styled-components";

const Verify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [userToken, setUserToken] = useState(null);
  const [status, setStatus] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("We are verifying your Email...");
  const [userData, setUserData] = useState({
    email: "",
  });
  const result = useSelector((globalState) => globalState.auth.message);
  const success = useSelector((globalState) => globalState.auth.success);
  // const user = useSelector((globalState) => globalState.user.userDetails);
  useEffect(() => {
    setUserToken(token);
    dispatch(verifyEmailLink(userToken));
    setMessage(result);
    dispatch(getMySelf());
    // if(user){

    //   setStatus(user.is_verified);
    // }
  }, [userToken]);
  // useEffect(() => {
  //   if (user) {
  //     setStatus(user.is_verified);
  //     // setStatus(true);
  //     // console.log(user.email);
  //     // dispatch(userVerification(user));
  //   }
  // }, [user]);
  useEffect(() => {
    if (success) {
      setStatus(success);
      // setStatus(true);
      // console.log(user.email);
      // dispatch(userVerification(user));
    }
  }, [success]);

  useEffect(() => {
    if (status) {
      navigate("/");
    }
  }, [status]);
  useEffect(() => {
    if (result) {
      setMessage(result);
    }
  }, [result]);
  function closeModal() {
    setUserData({
      email: "",
    });
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const startChatting = () => {
    navigate("/");
  };

  // const resendLink = () => {
  //   navigate("/verification");
  // };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendMail = () => {
    if (userData.email === null || userData.email === "") {
      alert("please enter a valid email");
      return;
    }
    // alert(userData.email);
    dispatch(userVerification(userData));
    // const infoMessage = `A verification mail is resend to your email ${userData.email} . Kindly Check your Spam or Junk Folder.`;

    setIsOpen(false);
    setUserData({
      email: "",
    });
  };

  return (
    <>
      <Wrapper className=" flex flex-col items-center justify-center">
        {status ? (
          <>
            <div className="flex flex-col items-center justify-center w-3/4">
              <GoMailRead className="w-2/4 h-2/4 red" color="#8af859" />

              <p className="text-2xl text-gray-900 dark:text-white my-2 px-2 mx-auto align-middle">
                {/* {message} */}
                your Email is verified.
              </p>
              {/* <p className="text-2xl text-gray-900 dark:text-white my-2 px-2 mx-auto align-middle">
                OR
              </p> */}
              {/* <p className="text-2xl text-gray-900 dark:text-white my-2 px-2 mx-auto align-middle">
                Verification Link
              </p> */}
              <div className=" w-2/4 flex item-center justify-center">
                <button
                  className=" cursor-pointer bg-blue-500 my-2 px-3 rounded-lg py-3 mx-auto align-middle"
                  onClick={() => startChatting()}
                >
                  <span className=" text-2xl text-white">Start Chatting</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center w-3/4">
              <GoMailRead className="w-2/4 h-2/4 red" color="#faab07" />

              <p className="text-2xl text-gray-900 dark:text-white my-2 px-2 mx-auto align-middle">
                {message}
              </p>
              {/* <p className="text-2xl text-gray-900 dark:text-white my-2 px-2 mx-auto align-middle">
                OR
              </p> */}
              {/* <p className="text-2xl text-gray-900 dark:text-white my-2 px-2 mx-auto align-middle">
                Verification Link
              </p> */}
              <button
                className="cursor-pointer bg-blue-500 my-2 px-3 rounded-lg py-3 mx-auto align-middle"
                onClick={() => openModal()}
              >
                <span className="text-2xl text-white">
                  Verification Link Resend
                </span>
              </button>
            </div>
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
                          Resend Verification Mail
                        </Dialog.Title>

                        {/* Resend verification mail  */}

                        <div className="mt-4">
                          <div>
                            <div className="mb-6">
                              <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Enter your Email
                              </label>
                              <input
                                type="email"
                                id="base-input"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="e.g. test@gmail.com"
                                value={userData.email}
                                name="email"
                                onChange={handleChange}
                              />
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
                            onClick={() => sendMail()}
                          >
                            Send
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Verify;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  h1,
  p {
    color: ${({ theme }) => theme.colors.heading};
  }
`;
