import cloudinary from "../config/cloudinary.js";

const uploadImage = async (filestr, fileName, folderPath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions

  const options = {
    overwrite: true,
    unique_filename: true,
    delivery_type: "upload",
    access_mode: "public",
    folder: `Socializer/${folderPath}`,
    public_id: fileName,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(filestr, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImage;
