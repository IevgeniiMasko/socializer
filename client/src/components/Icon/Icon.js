import React from "react";

//styles
import "./styles.scss";

const Icon = ({ className = "", unicon: Unicon, clickHandler }) => {
  return (
    <div className={`unicon ${className}`} onClick={clickHandler}>
      <Unicon />
    </div>
  );
};

export default Icon;
