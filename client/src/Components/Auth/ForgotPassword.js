import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  clearAuthStore,
  forgotPassword,
} from "../../Redux/Reducer/Auth/auth.action";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
  });
  const [message, setMessage] = useState("");

  const result = useSelector((globalState) => globalState.auth.message);
  const status = useSelector((globalState) => globalState.auth.success);

  useEffect(() => {
    if (result) {
      setMessage(result);
      if (!status) {
        toast.error(result, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Password Reset Link sent Successfully", {
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
    }
  }, [result]);
  //   on change of the email field
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendPasswordResetLink = () => {
    if (userData.email === null || userData.email === "") {
      toast.warn("please enter a valid email", {
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
    // dispatch action htmlFor password reset link
    dispatch(forgotPassword(userData));
  };

  // Redirecting to forgot password PAge
  const NavigateToForgotPasswordPage = () => {
    dispatch(clearAuthStore());
    // navigate("/forgot-password");
    setMessage("");
  };

  // Redirecting to Home PAge
  const NavigateToHomePage = () => {
    dispatch(clearAuthStore());
    navigate("/");
  };

  return (
    <>
      <ToastContainer
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
      />
      <section className="bg-lightblue-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* Here we have to add a navabar component */}

          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forogt Password
            </h2>
            {/* <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#"> */}
            {message ? (
              <>
                <p className="text-gray-500 text-center">{message}</p>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={NavigateToHomePage}
                >
                  Home
                </button>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={NavigateToForgotPasswordPage}
                >
                  Resend Password Reset Link
                </button>
              </>
            ) : (
              <>
                <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. janedoe@gmail.com"
                      required=""
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={sendPasswordResetLink}
                  >
                    Reset Link
                  </button>
                </div>
              </>
            )}

            {/* </form> */}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
