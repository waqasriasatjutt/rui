import React, { useState } from "react";
import { Button } from "../../components";
import DotsLoader from "../../components/atoms/DotsLoader";
import api from "../../services/api";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [isLoader, setIsLoader]=useState(false)
  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
    }
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'type');
    formData.append('comment', 'comment');
    formData.append('name', 'Faaiz');
    formData.append('order_number', 'order_number');
    formData.append('comment_by', 'comment_by');
    setIsLoader(true)
    try {
      await api.post('/api/upload', formData,{headers: {
        'Content-Type': 'multipart/form-data',
      },});
      setIsLoader(false)
      alert('File uploaded successfully');
    } catch (error) {
      setIsLoader(false)
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {isLoader?<DotsLoader/>:null}
      <input type="file" accept="image/*" onChange={onFileChange} name="file" />
      {file && (
        <>
          <img
            src={URL.createObjectURL(file)}
            alt="Selected"
            style={{
              maxWidth: "100%",
              maxHeight: "250px",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Button variant="btn_submit" onClick={handleUpload} text="Save" />
        </>
      )}
    </div>
  );
}

export default ImageUploader;
