import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const uploadCloud = (cloudOptions) => {
  const { fieldname, destFolder, transformation } = cloudOptions;

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: (req, file) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const { _id } = req.user;
      const imageName =
        destFolder === "avatars" ? `${_id}` : `${_id}_${timestamp}`;

      return {
        folder: destFolder,
        public_id: imageName,
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: transformation,
        overwrite: true,
      };
    },
  });

  const fileFilter = (req, file, cd) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cd(null, true);
    } else {
      cd({ message: "Unsupported file format. Must be jpeg, png, jpg" }, false);
    }
  };

  const imageUpload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter,
  });

  return imageUpload.single(fieldname);
};

export default uploadCloud;
