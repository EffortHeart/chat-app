import React, { useEffect, useState, Fragment } from "react";
import { GoUnverified, GoVerified, GoMailRead, GoMail } from "react-icons/go";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { getMySelf } from "../Redux/Reducer/User/user.action";
import { userVerification, signOut } from "../Redux/Reducer/Auth/auth.action";

const Verification = () => {
  const [status, setStatus] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(
    "Your Email is not Verified. We have sent a verification Mail to your Account. Please Check you Spam or Junk Folder. "
  );
  const [userData, setUserData] = useState({
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function closeModal() {
    setUserData({
      email: "",
    });
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    if (localStorage.ETalkUser) {
      dispatch(getMySelf());

      // dispatch(fetchChats());
    }
    // eslint-disable-next-line
  }, [localStorage]);
  const user = useSelector((globalState) => globalState.user.userDetails);
  const result = useSelector((globalState) => globalState.auth.message);

  useEffect(() => {
    if (status) {
      navigate("/");
    }
  }, [status]);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (user) {
      setStatus(user.is_verified);
      // console.log(user.email);
      // dispatch(userVerification(user));
    }
  }, [user]);

  useEffect(() => {
    if (result) {
      setMessage(result);
    }
  }, [result]);

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
    <Wrapper>
      <div className="m-4 p-4 h-full flex flex-col items-center justify-center">
        {status ? (
          <>
            <div className="flex flex-col items-center justify-center w-2/4 ">
              <GoMailRead className="mail-icon" color="#8af859" />
              <p className="my-2">Your Email is Verified Now.</p>
            </div>
            <h1></h1>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center w-3/4">
              <GoMail className="mail-icon" color="#faab07" />
              <h1>Verify Your Email</h1>
              <p className="my-2 px-2 mx-auto ">{message}</p>
              <p className="my-2 font-bold px-2 mx-auto">OR</p>
              {/* <p className="text-2xl text-gray-900 dark:text-white my-2 px-2 mx-auto align-middle">
                Verification Link
              </p> */}
              <div className="flex">
                <button
                  className="text-2xl cursor-pointer mx-auto"
                  onClick={() => dispatch(signOut())}
                >
                  Home
                </button>
                <button
                  className="text-2xl cursor-pointer mx-auto"
                  onClick={() => openModal()}
                >
                  Resend
                </button>
              </div>
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
                          className="text-lg text-center font-medium leading-6 "
                        >
                          Resend Verification Mail
                        </Dialog.Title>

                        {/* Resend verification mail  */}

                        <div className="mt-4">
                          <div>
                            <div className="mb-6">
                              <label
                                htmlFor="base-input"
                                className="block mb-2 text-sm font-medium"
                              >
                                Enter your Email
                              </label>
                              <input
                                type="email"
                                id="base-input"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
      </div>
    </Wrapper>
  );
};

export default Verification;

const Wrapper = styled.section`
  color: ${({ theme }) => theme.colors.heading};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 100vw;

  .mail-icon {
    font-size: 20rem;
  }
  button {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.heading};
    margin: 0.5rem;
    padding: 0.6rem 2rem;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.cyan};
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: translateY(-5px);
    }
  }
  h1 {
    text-align: center;
    font-size: 2.4rem;
    font-weight: bold;
    margin: 15px auto;
    line-height: 1.2;
    max-width: 680px;
  }
  p {
    text-align: center;
    font-size: 1rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 850px;
    line-height: 27px;
    color: ${({ theme }) => theme.colors.heading};
  }
`;
