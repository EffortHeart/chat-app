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
import Spinner from "../../Styles/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { inviteNewUser } from "../../Redux/Reducer/User/user.action";

const Invite = () => {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [email, setEmail] = useState("");
  const [invitingInfo, setInvitingInfo] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const sendInvite = async () => {
    try {
      setLoading1(true);
      if (!email) {
        toast.error("Please Enter Friend's Email", {
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

      await dispatch(inviteNewUser(email));
      setLoading1(false);
      toast.success("Invitation Sent Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail("");
      setIsOpen(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
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
    <>
      <div onClick={() => openModal()}>
        {/* <BiGroup className="icon text-2xl cursor-pointer" /> */}
        Invite
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
                    Inviting Your Friends
                  </Dialog.Title>

                  {/* create group form */}

                  <div className="mt-4">
                    <div>
                      <div className="mb-6">
                        <label
                          htmlFor="base-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="base-input"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="e.g. My Group"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                      onClick={() => sendInvite()}
                    >
                      {loading1 ? (
                        <>
                          Inviting...
                          {/* <Loading1 />{" "} */}
                        </>
                      ) : (
                        <> Invite</>
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

export default Invite;
