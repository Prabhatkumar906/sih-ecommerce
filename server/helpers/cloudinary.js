const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "",
  api_key: " ",
  api_secret: " ",
});

const storage = new multer.memoryStorage();
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "products", // Cloudinary folder where files will be stored
//     allowedFormats: ["jpg", "jpeg", "png"], // Optional: restrict to specific file types
//     public_id: (req, file) => file.originalname, // Optional: use the file's original name as public ID
//   },
// });

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };