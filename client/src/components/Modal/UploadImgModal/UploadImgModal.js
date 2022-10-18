import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

//hooks
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

//store
import { updateUser } from "../../../store/auth/actions";
import { addCurrentUser } from "../../../store/currentUser/actions";
import { currentUserSelector } from "../../../store/currentUser/selectors";

//styles
import "./styles.scss";

const UploadImgModal = ({ uploadImgModal, setUploadImgModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { currentUserId } = useParams();
  const currentUser = useSelector(currentUserSelector);
  const [previewSource, setPreviewSource] = useState(currentUser.photo);
  const dispatch = useDispatch();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    setIsLoading(true);
    setPreviewSource("");
    try {
      const res = await axiosPrivate.put(
        `/account/user/${currentUserId}/photo`,
        JSON.stringify({ data: base64EncodedImage, fileName })
      );
      setIsLoading(false);
      dispatch(addCurrentUser({ user: res.data }));
      dispatch(updateUser({ user: res.data }));
      localStorage.authUser = JSON.stringify(res.data);
      setUploadImgModal("");
    } catch (error) {
      console.error(error);
    }
  };

  const closeModalHandler = () => {
    setUploadImgModal("");
  };

  return (
    <div className={`upload-img ${uploadImgModal}`}>
      <h1 className="upload-img__title">Upload your photo</h1>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value=""
        ></input>
        <button type="submit" className="upload-img__submit">
          Submit
        </button>
      </form>
      {isLoading ? (
        <ClipLoader color={"#36d7b7"} loading={true} size={50} />
      ) : (
        previewSource && (
          <div className="upload-img__body">
            <img src={previewSource} alt="chosen" />
          </div>
        )
      )}
      <div className="upload-img__close" onClick={closeModalHandler}>
        x
      </div>
    </div>
  );
};

export default UploadImgModal;
