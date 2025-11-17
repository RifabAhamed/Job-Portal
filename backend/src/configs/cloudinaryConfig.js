import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes", // The name of the folder in Cloudinary
    resource_type: "auto",
    // allowed_formats: ["pdf"], // Allowed file formats
    type: "authenticated",
    // A function to generate a unique public_id for each file
    public_id: (req, file) => {
      // You can include the user's ID or a timestamp for uniqueness
      const fileName = file.originalname.split(".").slice(0, -1).join(".");
      return `${req.user.id}-${fileName}-${Date.now()}`;
    },
  },
});

// Create the Multer upload instance
const upload = multer({ storage: storage });
export { cloudinary };
export default upload;
