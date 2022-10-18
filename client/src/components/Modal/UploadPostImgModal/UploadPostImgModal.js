import React from "react";

//styles
import "./styles.scss";

const UploadPostImgModal = ({
  uploadImgModal,
  setUploadImgModal,
  setFileName,
  previewSource,
  setPreviewSource,
}) => {
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

  const handleConfirm = (e) => {
    e.preventDefault();
    setUploadImgModal("");
  };

  const closeModalHandler = () => {
    setUploadImgModal("");
    setPreviewSource();
    setFileName("");
  };

  return (
    <div className={`upload-post-img ${uploadImgModal}`}>
      <h1 className="upload-post-img__title">Upload your photo</h1>
      <form onSubmit={handleConfirm}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value=""
        ></input>
        <button type="submit" className="upload-post-img__submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <div className="upload-post-img__body">
          <img src={previewSource} alt="chosen" />
        </div>
      )}
      <div className="upload-post-img__close" onClick={closeModalHandler}>
        x
      </div>
    </div>
  );
};

export default UploadPostImgModal;
