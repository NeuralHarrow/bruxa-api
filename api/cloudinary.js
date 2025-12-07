const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dq9pwrrhy",
  api_key: "596214271551612",
  api_secret: "a0TTwqmT_MCn85dAhdW7R2yyet8"
});

const meta = {
  name: "cloudinary-uploader",
  version: "1.0.0",
  description: "Upload videos or images to Cloudinary and get a secure URL",
  author: "Rakib Adil",
  method: "post",
  category: "uploader",
  path: "/cloud?url="
};

async function onStart({ req, res }) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: false, error: "URL parameter is required" });
  }

  try {
    const result = await cloudinary.uploader.upload(url, { resource_type: "auto" });

    return res.status(200).json({
      status: true,
      url: result.secure_url,
      format: result.format,
      message: "Upload successful",
      author: "Rakib Adil"
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ status: false, message: "Upload failed", error: error.message });
  }
}

// This is the Vercel wrapper
export default async function handler(req, res) {
  await onStart({ req, res });
}

// optional export for loader
module.exports = { meta, onStart };
