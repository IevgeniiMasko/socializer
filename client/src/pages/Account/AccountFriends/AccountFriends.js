import React, { useEffect, useState } from "react";
import PeopleCard from "../../../components/PeopleCard/PeopleCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import "./styles.scss";

const AccountFriends = () => {
  const [follower, setFollower] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/account/followers").then((res) => {
      setFollower([...res.data]);
    });
  }, []);

  const followHandler = async (personId) => {
    const res = await axiosPrivate.post(`/account/user/${personId}/follow`);
    setFollower((prevState) => {
      const newState = prevState.map((person) => {
        if (person._id === personId) person.followers = res.data.followers;
        return person;
      });
      return newState;
    });
  };

  return (
    <div className="followers">
      <div className="followers__body">
        {follower.map((person) => {
          return (
            <PeopleCard
              key={person._id}
              person={person}
              onClick={followHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AccountFriends;
