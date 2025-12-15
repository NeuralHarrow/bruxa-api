
const axios = require('axios');
const FormData = require('form-data');

const PORT = process.env.PORT || 3000;
const IMGBB_API_KEY = '9c8c59b5c6e0c5e814c1bf70dcd8935b';

module.exports = {
   meta : {
    name: "imgbb",
    version: "1.0.0",
    description: "Upload images to imgbb and get a url",
    author: "Rakib Adil",
    method: "get",
    category: "Imgbb",
    path: "/upload?url="
  },

  onStart: async function ({ req, res }) {
    
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing ?url=' });
  };

  try {
    const imgResponse = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 15000
    });

    const base64Image = Buffer.from(imgResponse.data).toString('base64');

    const form = new FormData();
    form.append('key', IMGBB_API_KEY);
    form.append('image', base64Image);

    const response = await axios.post(
      'https://api.imgbb.com/1/upload',
      form,
      { headers: form.getHeaders() }
    );

    const data = response.data.data;

    res.json({
      status: true,
      image: data.url,
      display_url: data.display_url,
      thumb: data.thumb?.url,
      delete_url: data.delete_url,
      author: "Rakib Adil"
    });

  } catch (err) {
    console.error("ImgBB Error:", err.message);

    res.status(500).json({
      status: false,
      error: 'Upload failed',
      message: err.message
    });
  };
}
};
