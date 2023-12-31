import React, { useState, Fragment, useEffect } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { uploadProfilePicture } from "../../Redux/Reducer/ProfileImage/profileImage.action";
import { getMySelf } from "../../Redux/Reducer/User/user.action";
import { fetchChats } from "../../Redux/Reducer/Chat/chat.action";
import { getAllChats } from "../../Redux/Reducer/Message/message.action";
import { toast, ToastContainer } from "react-toastify";

function ImageEdit() {
  const user = useSelector((globalState) => globalState.user.userDetails);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePath, setImagePath] = useState("");

  const dispatch = useDispatch();
  function closeModal() {
    setSelectedImage(null);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const uploadImage = async () => {
    if (selectedImage === null) {
      toast.warn("Please Select One Image", {
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
    setLoading(true);
    await dispatch(uploadProfilePicture(selectedImage));
    toast.success("Profile Picture Updated Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setLoading(false);
    closeModal();
    await dispatch(getMySelf());
    await dispatch(fetchChats());
    await dispatch(getAllChats());
  };

  const imgHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      const imageURL = URL.createObjectURL(file);
      setImagePath(imageURL);
      setSelectedImage(file);

      // console.log();
    } else {
      setSelectedImage(null);
      setIsOpen(false);
      return;
    }
  };

  // useEffect(() => {
  // console.log(selectedImage);
  // }, [selectedImage]);

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
      <div className="relative">
        <div className="user-profile-img rounded-full overflow-hidden">
          <img src={user.pic} alt="profile" />
        </div>
        <div className="profile-user rounded-full">
          <div
            className="profile-photo-edit p-2 rounded-full"
            onClick={openModal}
          >
            <MdPhotoCamera className="icon text-2xl" />
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
                  <Dialog.Panel className="dialog-panel w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center font-medium leading-6 text-gray-900"
                    >
                      Update Profile
                    </Dialog.Title>

                    <div>
                      {selectedImage ? (
                        <>
                          {/* <p>Image Uploaded</p> */}
                          <img
                            src={imagePath}
                            className="w-1/2 h-1/2 mx-auto"
                          />
                        </>
                      ) : (
                        <>
                          <input
                            id="profile-img-file-input"
                            type="file"
                            name="image"
                            className="profile-img-file-input hidden"
                            accept="image/*"
                            onChange={(e) => {
                              imgHandler(e);
                            }}
                          />
                          <label
                            htmlFor="profile-img-file-input"
                            className="profile-photo-edit mt-2"
                          >
                            <div className="border-dashed border-2 border-sky-500 w-full h-48 full flex justify-center items-center">
                              <h5 className="text-black">Choose a file</h5>
                            </div>
                          </label>
                        </>
                      )}
                    </div>

                    <div className="flex">
                      <div className="mt-4">
                        <button
                          type="button"
                          className="close-btn inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-cyan-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="mt-4">
                        {loading ? (
                          <button
                            type="button"
                            className="disabled: close-btn inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-cyan-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            // onClick={uploadImage}
                          >
                            uploading...
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="close-btn inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-cyan-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={uploadImage}
                          >
                            upload
                          </button>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default ImageEdit;
