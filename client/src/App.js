import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import AuthPage from "./Pages/AuthPage";
// import HomePage from "./Pages/HomePage";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle/GlobalStyle";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./Components/Loading";
import Team from "./Components/Team";
import Contact from "./Components/Contact";
import Features from "./Components/Features";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { getMySelf } from "./Redux/Reducer/User/user.action";
import { fetchChats } from "./Redux/Reducer/Chat/chat.action";
import Verification from "./Components/Verification";
import Verify from "./Components/Verify";

import AOS from "aos";
import "aos/dist/aos.css";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import ErrorPage from "./Components/ErrorPage";
const HomePage = React.lazy(() => import("./Pages/HomePage"));

AOS.init({
  once: true,
  duration: 2000,
  offset: 100,
});

// const socket = io.connect("http://localhost:4000");

function App() {
  const [loading, setloading] = useState(true);
  // const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const darkThemeEnabled = useSelector(
    (state) => state.themeReducer.darkThemeEnabled
  );
  // const user = useSelector((globalState) => globalState.user.userDetails);

  const ThemeColor = useSelector((state) => state.setColorReducer.themeColor);
  const rgb = ThemeColor.split(")")[0].split("(")[1];

  const lightTheme = {
    colors: {
      heading: "rgb(24 24 29)",
      heading2: "rgb(255, 255, 255)",
      white: "#fff",
      black: " #212529",
      cyan: "#1ca9fe",
      green: "#4eac6d",
      danger: "#ff4e2b",
      light: "#223645",
      primaryRgb: `${ThemeColor}`,

      text: {
        primary: "#000000",
        secondary: "rgba(29 ,29, 29, .8)",
      },

      rgb: {
        primary: `${rgb}`,
        secondary: "78,172,109",
        cyan: "28,157,234",
        heading: "0,0,0",
      },

      bg: {
        primary: "#fff",
        secondary: "#eff7fe",
      },
      bg2: {
        primary: "#fff",
        secondary: "rgba(28,157,234,.05)",
      },

      btn: {
        primary: `${rgb}`,
        secondary: "22 163 74",
        danger: "255, 78, 43",
        light: "#f6f6f9",
      },
      border2: {
        primary: "#00000026",
      },
      boxShadow: {
        primary: "rgba(28, 157, 234, 0.2)",
      },

      hr: "#ffffff",
      border: "181, 181, 181",
      img_border: "255, 255, 255",
      gradient: "linear-gradient(145deg,#1ca9fe,#1c6ee9);",
    },
    media: {
      mobile: "800px",
      tab: "998px",
    },
  };
  const darkTheme = {
    colors: {
      heading: "rgb(255, 255, 255)",
      heading2: "rgb(24 24 29)",
      white: "#ffffff",
      black: "#000000",
      cyan: "#1ca9fe",
      green: "#4eac6d",
      danger: "#ff4e2b",
      light: "#223645",
      primaryRgb: `${ThemeColor}`,

      text: {
        primary: "#212529",
        secondary: "#8f9198",
      },

      rgb: {
        primary: `${rgb}`,
        secondary: "78,172,109",
        cyan: "28,157,234",
        heading: "255,255,255",
      },

      bg: {
        black: "#000000",
        primary: "#262626",
        secondary: "#2e2e2e",
      },
      border2: {
        primary: "#FFFFFF26",
      },

      bg2: {
        primary: "#0c1631",
        secondary: "#0e1b38",
      },
      boxShadow: {
        primary: "rgba(1, 201 ,245, 0.4)",
      },

      btn: {
        primary: `${rgb}`,
        secondary: "22 163 74",
        danger: "255, 78, 43",
        light: "#25262c",
      },

      hr: "#ffffff",
      border: "65, 66, 72",
      img_border: "31, 41, 55",
      gradient: "linear-gradient(145deg,#1ca9fe,#1c6ee9);",
    },
    media: {
      mobile: "800px",
      tab: "998px",
    },
  };

  const getUserData = async () => {
    await dispatch(getMySelf());
    await dispatch(fetchChats());
  };

  useEffect(() => {
    if (localStorage.ETalkUser) {
      getUserData();
      setloading(false);
    } else {
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [localStorage]);

  // useEffect(() => {
  //   if (user) {
  //     setStatus(user.is_verified);
  //   }
  //   if (status !== true) {
  //     navigate("/verification");
  //   }
  // }, [user]);

  return (
    <ThemeProvider theme={darkThemeEnabled ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div className="App w-screen">
        {loading ? (
          <Loading />
        ) : (
          <Suspense
            fallback={
              <>
                <Loading />
              </>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/verify-email/:token" element={<Verify />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/features" element={<Features />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<AuthPage />}>
                <Route path="" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
