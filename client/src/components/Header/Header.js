import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

//Components
import Icon from "../Icon/Icon";

//Hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

//store
import { logoutUser } from "../../store/auth/actions";

//styles
import "./styles.scss";

const Header = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    axiosPrivate.post("/auth/logout").then((res) => {
      dispatch(logoutUser());
    });
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          <Icon unicon={Unicons.UilBoltAlt} />
          <span className="logo__name">Socializer</span>
        </div>
        <div className="search">
          <Icon unicon={Unicons.UilSearch} className="search__icon" />
          <input
            type="text"
            name="search"
            className="search__input"
            placeholder="Start typing to search..."
          ></input>
        </div>
        <div className="header-right">
          <Icon unicon={Unicons.UilBell} />
          <Icon unicon={Unicons.UilCommentAlt} />
          <Icon
            unicon={Unicons.UilSignout}
            // className="header-right_rotate"
            clickHandler={clickHandler}
          />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
