// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("./cloudinaryConfig");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "hospital_certificates", // Folder name in Cloudinary
//     resource_type: "auto", // Automatically detect file type
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hospital_certificates",
    format: async (req, file) => "pdf", // Change if needed
    public_id: (req, file) => `cert_${Date.now()}`
  },
});

const upload = multer({ storage });

module.exports = upload;
