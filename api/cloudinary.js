const cloudinary = require("cloudinary").v2;

module.exports = {
  meta: {
    name: "Cloudinary Uploader",
    version: "1.0.0",
    description: "Upload videos/images to Cloudinary",
    author: "Rakib Adil",
    method: "post",
    path: "/cloud?url=",
    category: "uploader"
  },

  onStart: async function({ req, res }) {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Cloudinary Config (safe here)
    cloudinary.config({
      cloud_name: "dq9pwrrhy",
      api_key: "596214271551612",
      api_secret: "a0TTwqmT_MCn85dAhdW7R2yyet8"
    });

    try {
      const result = await cloudinary.uploader.upload(url, {
        resource_type: "auto"
      });

      return res.json({
        status: true,
        url: result.secure_url,
        format: result.format,
        author: "Rakib Adil",
        message: "Upload successful"
      });

    } catch (error) {
      return res.status(500).json({
        status: false,
        error: "Cloudinary upload failed",
        details: error.message
      });
    }
  }
};
