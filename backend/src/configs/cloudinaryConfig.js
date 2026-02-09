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

// Basic runtime check to help debug signature issues
if (!process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_CLOUD_NAME) {
  console.warn(
    "Cloudinary is not fully configured. Make sure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are set in your environment. Invalid or missing secrets will cause signature errors when generating private URLs."
  );
}

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes", // The name of the folder in Cloudinary
    resource_type: "raw",
    allowed_formats: ["pdf", "doc", "docx"], // Allowed file formats
    // Preserve file extension/format so Cloudinary can serve correct Content-Type
    // and show a preview for PDFs. We set `format` and include the extension
    // in the public_id so the stored resource keeps its file type.
    format: (req, file) => {
      const parts = file.originalname.split(".");
      return parts.length > 1 ? parts.pop().toLowerCase() : undefined;
    },
    type: "authenticated",
    // A function to generate a unique public_id for each file
    public_id: (req, file) => {
      // Include the original extension in the public_id so Cloudinary preserves it
      const parts = file.originalname.split(".");
      const ext = parts.length > 1 ? parts.pop().toLowerCase() : "";
      const fileName = parts.join(".");
      return `${req.user.id}-${fileName}-${Date.now()}${ext ? "." + ext : ""}`;
    },
  },
});

// Create the Multer upload instance for resumes
const upload = multer({ storage: storage });

// Configure Multer for company logos
const logoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "company_logos", // The name of the folder in Cloudinary
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    format: async (req, file) => {
      const parts = file.originalname.split(".");
      return parts.length > 1 ? parts.pop().toLowerCase() : "jpg";
    },
    public_id: (req, file) => {
      const parts = file.originalname.split(".");
      const ext = parts.length > 1 ? parts.pop().toLowerCase() : "jpg";
      const fileName = parts.join(".");
      return `${req.user.id}-${fileName}-${Date.now()}`;
    },
  },
});

const uploadLogo = multer({ storage: logoStorage });

export { cloudinary, uploadLogo };
export default upload;
