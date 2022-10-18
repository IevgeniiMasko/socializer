import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authUserIdSelector } from "../../store/auth/selectors";
import Photo from "../Photo/Photo";

import "./styles.scss";

const PeopleCard = ({ person, onClick: followHandler }) => {
  const authUserId = useSelector(authUserIdSelector);
  const authUserFollow = person.followers.includes(authUserId);

  return (
    <div className="people-card">
      <div className="people-card__head"></div>
      <div className="people-card__body">
        <div className="people-card__user">
          <Photo
            className="people-card__photo"
            photo={person.photo}
            applyRound={true}
          />
          <p className="people-card__user-info">{`${person.firstname} ${person.lastname}`}</p>
        </div>
        <button
          type="button"
          className={`people-card__follow ${
            authUserFollow && "people-card__unfollow"
          }`}
          onClick={() => followHandler(person._id)}
        >
          {authUserFollow ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default PeopleCard;
