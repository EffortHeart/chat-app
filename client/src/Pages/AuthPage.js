import React from "react";
import { Outlet } from "react-router-dom";
import DefaultLayoutHoc from "../Layout/DefaultLayout";

const AuthPage = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default DefaultLayoutHoc(AuthPage);
