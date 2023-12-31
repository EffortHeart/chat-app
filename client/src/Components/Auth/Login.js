import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import { NavLink } from "react-router-dom";
import Toggler from "../Toggler";
import { ToastContainer } from "react-toastify";

const Login = () => {
  return (
    <Wrapper className="login-page-bg">
      <ToastContainer />
      <div className="toggle-icon">
        <Toggler />
      </div>
      <div className="relative h-full flex justify-center items-center">
        <div className="h-full py-6">
          <div className="px-8 flex flex-col justify-center items-center">
            <div className="logo" style={{ width: "auto" }}>
              <img src="/images/logo.png" alt="E-Talk logo" />
            </div>
            <LoginForm />
            <div className="mt-6 text-center">
              <p>
                <span>Don't have an account yet? </span>
                <NavLink
                  className="text-green-500 font-bold  hover:underline"
                  to="/auth/signup"
                >
                  Sign up
                </NavLink>
              </p>
              <p>© {new Date().getFullYear()} E-Talk created with ❤️ </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  .logo {
    img {
      height: 50px;
    }
  }
  .toggle-icon {
    position: absolute;
    top: 10px;
    right: 0;
    margin-right: 20px;
    display: flex;
    width: 100vw;
    font-size: 2rem;
    justify-content: flex-end;
  }

  .auth-page-content {
    border-radius: 16px;
    margin: 24px 0;
    background-color: ${({ theme }) => theme.colors.bg.primary};
    a {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
    input {
      background-color: ${({ theme }) => theme.colors.btn.light};
      border-color: ${({ theme }) => theme.colors.border};
      &:focus {
        background-color: ${({ theme }) => theme.colors.btn.light};
        outline-color: ${({ theme }) => theme.colors.btn.light};
        border-color: ${({ theme }) => theme.colors.border};
      }
    }
    p,
    label {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
  .signin-other-title {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      left: 0;
      right: 0;
      top: 15px;
    }
    .title {
      display: inline-block;
      position: relative;
      z-index: 9;
      padding: 2px 16px;
    }
  }
`;

export default Login;
