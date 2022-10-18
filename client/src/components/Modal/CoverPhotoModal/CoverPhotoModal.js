import React from "react";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../../store/currentUser/selectors";

import "./styles.scss";

const CoverPhotoModal = ({ uploadImgModal, setUploadImgModal }) => {
  const closeModalHandler = () => {
    setUploadImgModal("");
  };

  const currentUser = useSelector(currentUserSelector);
  return (
    <div className={`cover-photo ${uploadImgModal}`}>
      <h1 className="cover-photo__title">Photo</h1>
      <div className="cover-photo__body">
        <img src={currentUser.photo} />
      </div>
      <div className="cover-photo__close" onClick={closeModalHandler}>
        x
      </div>
    </div>
  );
};

export default CoverPhotoModal;
