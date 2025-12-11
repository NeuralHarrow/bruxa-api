const cloudinary = require("cloudinary").v2;

// Cloudinary config (use your actual keys)
cloudinary.config({
  cloud_name: "dq9pwrrhy",
  api_key: "596214271551612",
  api_secret: "a0TTwqmT_MCn85dAhdW7R2yyet8"
});

module.exports = {
  meta: {
    name: "cloud-upload",
    description: "Upload a video/image to Cloudinary from a URL",
    author: "Rakib Adil",
    category: "cloudinary",
    path: "/cloudinary?url=",    // POST /api/cloud/upload?url=<link>
    method: "post"
  },

  onStart: async ({ req, res }) => {
    try {
      const { url } = req.query;

      if (!url) {
        return res.json({
          status: false,
          message: "URL is required"
        });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(url, { resource_type: "auto" });

      res.json({
        status: true,
        url: result.secure_url,
        format: result.format,
        public_id: result.public_id,
        message: "Upload successful"
      });

    } catch (err) {
      console.log(err);
      res.json({
        status: false,
        message: "Failed to upload"
      });
    }
  }
};
