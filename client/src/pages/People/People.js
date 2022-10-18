import React, { useEffect, useState } from "react";
import PeopleCard from "../../components/PeopleCard/PeopleCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import "./styles.scss";

const People = () => {
  const [people, setPeople] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/account/users").then((res) => {
      setPeople([...res.data]);
    });
  }, []);

  const followHandler = async (personId) => {
    const res = await axiosPrivate.post(`/account/user/${personId}/follow`);
    setPeople((prevState) => {
      const newState = prevState.map((person) => {
        if (person._id === personId) person.followers = res.data.followers;
        return person;
      });
      return newState;
    });
  };

  return (
    <div className="people">
      <div className="container">
        <div className="people__body">
          {people.map((person) => {
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
    </div>
  );
};

export default People;
