import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdPerson } from "react-icons/io";
import { BsPencil } from "react-icons/bs";
import { Button } from "../../Styles/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getMySelf,
  updateUserProfile,
} from "../../Redux/Reducer/User/user.action";
import { fetchChats } from "../../Redux/Reducer/Chat/chat.action";
import { ToastContainer, toast } from "react-toastify";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((globalState) => globalState.user.userDetails);
  let [isOpen, setIsOpen] = useState(false);
  const [updateProfileData, setUpdateProfileData] = useState({
    name: user.name,
    about: user.about,
  });

  function closeModal() {
    setIsOpen(false);
    setUpdateProfileData((prev) => ({
      name: user.name,
      about: user.about,
    }));
  }

  function openModal() {
    setIsOpen(true);
  }

  // Onchange of the input field of name and about
  const handleChange = (e) => {
    setUpdateProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // dispatch an ction for profile update
  const handleUpdateProfile = async () => {
    if (
      user.name === updateProfileData.name &&
      user.about === updateProfileData.about
    ) {
      toast.warn("Please Change Name Or About", {
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
    // alert(updateProfileData.name + "\n Abut : " + updateProfileData.about);

    await dispatch(updateUserProfile(updateProfileData));
    toast.success("Profile Updated Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    await dispatch(getMySelf());
    await dispatch(fetchChats());
    setIsOpen(false);
  };

  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <div className="mx-auto w-full max-w-md rounded-2xl py-2">
        <div className="flex w-full justify-between items-center">
          <div className="flex justify-between items-center">
            <IoMdPerson className="mb-4 mr-4" />
            <span>Profile Edit</span>
          </div>
          <div className="cursor-pointer" onClick={openModal}>
            <BsPencil className="mb-4" />
          </div>
        </div>
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
                <Dialog.Panel className="dialog-panel w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Profile Edit
                  </Dialog.Title>

                  <div className="mb-6">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="base-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. john Doe"
                      name="name"
                      value={updateProfileData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      About
                    </label>
                    <input
                      type="text"
                      id="base-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. Hey there! I am using E-Talk"
                      name="about"
                      value={updateProfileData.about}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    className="button bg-green-600 hover:bg-green-500 active:bg-green-700 text-white radius-round h-11 px-8 py-2 w-full"
                    onClick={() => handleUpdateProfile()}
                  >
                    Update Profile
                  </Button>
                  {/* </form> */}

                  <div></div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="close-btn inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-cyan-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      close
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

export default ProfileEdit;
