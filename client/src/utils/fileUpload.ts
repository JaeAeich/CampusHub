import axios from 'axios';

const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const preset_key = import.meta.env.VITE_PRESET_KEY;

function handleFile(event) {
  return new Promise((resolve, reject) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset_key);

      axios
        .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        .then((res) => resolve(res.data.secure_url))
        .catch((err) => reject(err));
    }
  });
}

export default handleFile;
