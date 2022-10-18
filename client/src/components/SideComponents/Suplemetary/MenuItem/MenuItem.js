import React from "react";
import { Link } from "react-router-dom";

//Components
import Icon from "../../../Icon/Icon";

//styles
import "./styles.scss";

const MenuItem = ({ unicon, name, link }) => {
  return (
    <Link to={link} className="item-menu">
      <Icon className="item-menu__icon" unicon={unicon} />
      <p className="item-menu__name">{name}</p>
    </Link>
  );
};

export default MenuItem;
