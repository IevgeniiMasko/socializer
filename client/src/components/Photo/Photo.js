import React from "react";

//default photo
import defaultPhoto from "../../data/static/userphoto_default.jpeg";

//styles
import "./styles.scss";

const Photo = ({ className, photo, applyRound = false, onClick }) => {
  return (
    <div className={`photo ${className}`} onClick={onClick}>
      {applyRound ? (
        <div className="photo-sub">
          {/* <img src="../../images/usersPhoto/IevgeniiMasko.jpeg" alt="Photo" /> */}
          <img src={photo ? photo : defaultPhoto} alt="Photo" />
        </div>
      ) : (
        // <img src="../../images/usersPhoto/IevgeniiMasko.jpeg" alt="Photo" />
        <img src={photo ? photo : defaultPhoto} alt="Photo" />
      )}
    </div>
  );
};

export default Photo;
