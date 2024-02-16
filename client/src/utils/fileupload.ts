import axios, { AxiosResponse } from 'axios';
import { ChangeEvent } from 'react';

const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const preset_key = import.meta.env.VITE_PRESET_KEY;
function handleFile(event: ChangeEvent<HTMLInputElement>) {
  if (event.target.files) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res: AxiosResponse) => res.data.secure_url);
  }
  return '/noImage.png';
}
export default handleFile;
