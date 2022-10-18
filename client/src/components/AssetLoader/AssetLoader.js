import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Unicons from "@iconscout/react-unicons";
import jwt_decode from "jwt-decode";

//Components
import Photo from "../Photo/Photo";
import Icon from "../Icon/Icon";
import UploadPostImgModal from "../Modal/UploadPostImgModal/UploadPostImgModal";

//data
import userPhotoDefault from "../../data/static/userphoto_default.jpeg";

//hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

//store
import { addOnePost } from "../../store/post/actions";
import { authUserSelector } from "../../store/auth/selectors";
import { currentUserSelector } from "../../store/currentUser/selectors";

//styles
import "./styles.scss";
import { useParams } from "react-router-dom";

const AssetLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadImgModal, setUploadImgModal] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [fileName, setFileName] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const { currentUserId } = useParams();
  const currentUser = useSelector(currentUserSelector);
  const user = useSelector(authUserSelector);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axiosPrivate
      .post(
        `/post/post/create`,
        JSON.stringify({
          content,
          userId: currentUserId ? currentUserId : user._id,
          data: previewSource,
          imgName: fileName,
        })
      )
      .then((res) => {
        const { data } = res;
        dispatch(addOnePost({ data }));
      });
    setContent("");
    setFileName("");
  };

  const handlePhotoClick = () => {
    setUploadImgModal("show");
  };

  const handleImgClose = () => {
    setPreviewSource();
    setFileName("");
  };

  const placeholder =
    !currentUserId || currentUser._id === user._id
      ? `What's on your mind, ${user.firstname}?`
      : `Write post to ${currentUser.firstname}`;

  return (
    <div className="asset-loader">
      <form className="asset-loader__form" onSubmit={onFormSubmit}>
        <div className="asset-loader__body">
          <Photo
            className="asset-loader__photo"
            photo={user?.photo ? user?.photo : userPhotoDefault}
          />
          <input
            ref={inputRef}
            className="asset-loader__input"
            type="text"
            value={content}
            name="thoughts"
            placeholder={placeholder}
            onChange={(e) => setContent(e.target.value)}
            autoComplete="off"
          ></input>
          <div className="asset-loader__asset" onClick={handlePhotoClick}>
            <Icon unicon={Unicons.UilCamera} />
          </div>
        </div>
      </form>
      {fileName && (
        <div className="asset-loader__img">
          {fileName}
          <span className="asset-loader__img_remove" onClick={handleImgClose}>
            x
          </span>
        </div>
      )}
      <UploadPostImgModal
        uploadImgModal={uploadImgModal}
        setUploadImgModal={setUploadImgModal}
        setFileName={setFileName}
        previewSource={previewSource}
        setPreviewSource={setPreviewSource}
      />
    </div>
  );
};

export default AssetLoader;
