import axios, { AxiosResponse } from 'axios';
import { ChangeEvent } from 'react';

const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const api_key = import.meta.env.VITE_PRESET_KEY;

function handleFile(event: ChangeEvent<HTMLInputElement>): Promise<string> {
  return new Promise((resolve) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');
      formData.append('api_key', api_key);
      axios
        .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res: AxiosResponse) => resolve(res.data.secure_url))
        .catch(() => resolve('/noImage.png'));
    } else {
      resolve('/noImage.png');
    }
  });
}

export default handleFile;
