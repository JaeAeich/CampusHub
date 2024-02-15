import axios, { AxiosResponse } from 'axios';
import React, { useState, ChangeEvent } from 'react';

interface UploadFileProps {
  preset_key: string;
  cloud_name: string;
}

function UploadFile(props: UploadFileProps) {
  const { preset_key, cloud_name } = props;
  const [image, setImage] = useState<File | undefined>();

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res: AxiosResponse) => console.log(res.data.secure_url))
      .catch((err: Error) => console.log(err));
  }
}
export default UploadFile