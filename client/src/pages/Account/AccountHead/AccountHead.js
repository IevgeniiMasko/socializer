import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";

//Components
import Photo from "../../../components/Photo/Photo";
import UploadImgModal from "../../../components/Modal/UploadImgModal/UploadImgModal";
import CoverPhotoModal from "../../../components/Modal/CoverPhotoModal/CoverPhotoModal";

//data
import { accountNavItems } from "../../../data/accountNavItems";
import userPhotoDefault from "../../../data/static/userphoto_default.jpeg";
import bgpicture from "../../../data/static/bg.jpeg";

//hooks
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

//store
import { currentUserSelector } from "../../../store/currentUser/selectors";
import { clearCurrentUser } from "../../../store/currentUser/actions";
import { authUserIdSelector } from "../../../store/auth/selectors";
import { getCurrentUser } from "../../../store/currentUser/thunk";

//styles
import "./styles.scss";

const AccountHead = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [navElement, setNavElement] = useState("posts");
  const [uploadImgModal, setUploadImgModal] = useState("");
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { currentUserId } = useParams();
  const authUserId = useSelector(authUserIdSelector);
  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getCurrentUser(currentUserId, axiosPrivate, setIsLoading));

    return () => {
      dispatch(clearCurrentUser());
    };
  }, [currentUserId]);

  const handleNavClick = (e) => {
    setNavElement(e.target.dataset.name);
  };

  const handlePhotoClick = () => {
    setUploadImgModal("show");
  };

  return (
    <div className="account">
      <div className="container">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            <div className="account-head">
              <div className="account-head__body">
                <div className="account-head__cover-photo">
                  <img src={bgpicture} alt="cover-photo" />
                </div>

                <div className="account-head__main">
                  <Photo
                    className="account-head__photo"
                    applyRound={true}
                    onClick={handlePhotoClick}
                    photo={
                      currentUser?.photo ? currentUser?.photo : userPhotoDefault
                    }
                  />

                  <div className="account-head__short-info">
                    <p className="account-head__name">
                      {" "}
                      {currentUser.firstname} {currentUser.lastname}
                    </p>
                    <p className="account-head__friends-number">
                      <span>295</span> friends
                    </p>
                  </div>
                </div>
              </div>

              <nav className="account-head__nav">
                <ul className="account-head__nav-list">
                  {Object.entries(accountNavItems).map(([key, value]) => {
                    return (
                      <li key={key}>
                        <Link
                          to={value.link}
                          onClick={handleNavClick}
                          data-name={value.backName}
                          className={
                            navElement === value.backName
                              ? "account-head__nav-element_active"
                              : ""
                          }
                        >
                          {value.clientName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {authUserId === currentUserId ? (
              <UploadImgModal
                uploadImgModal={uploadImgModal}
                setUploadImgModal={setUploadImgModal}
              />
            ) : (
              <CoverPhotoModal
                uploadImgModal={uploadImgModal}
                setUploadImgModal={setUploadImgModal}
              />
            )}

            <Outlet />
          </>
        )}
      </div>
    </div>
  );
};

export default AccountHead;
