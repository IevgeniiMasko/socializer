import React from "react";
import { Outlet } from "react-router-dom";

//Components
import Menu from "./SideComponent/Menu/Menu";

//styles
import "./styles.scss";

const SideComponents = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};

export default SideComponents;
