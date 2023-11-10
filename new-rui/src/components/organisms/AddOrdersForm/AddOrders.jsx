import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "../..";
import TextField from '@mui/material/TextField';
import DotsLoader from "../../atoms/DotsLoader";
import api from "../../../services/api";
import Form from "../../molecules/Form";
import { Link } from "react-router-dom";
const AddOrders = ({ editingRecord, onCancelForm, modalTitle }) => {
  const dispatch = useDispatch();
  const { isLoading, uploadTypes } = useSelector((state) => state.orders);
  const [isLoader, setIsLoader] = useState(false);
  let initialValues = {
    email: "",
    name: "",
    address1: "",
    address2: "",
    suburb: "",
    postCode: "",
    state: "",
  };
  if (editingRecord) {
    const { id, name, email, address1, address2, suburb, postCode, state } =
      editingRecord;
    initialValues = {
      id,
      name,
      email,
      address1,
      address2,
      suburb,
      postCode,
      state,
    };
  }
  const [uploadedFiles, setUploadedFiles] = useState(
    editingRecord ? editingRecord.files : []
  );
  console.log(
    "🚀 ~ file: AddOrders.jsx:23 ~ AddOders ~ uploadedFiles:",
    uploadedFiles
  );

  const [payload, setPayload] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const pixelsToCm = (pixels, dpi) => {
    const inches = pixels / dpi;
    const centimeters = inches * 2.54;
    return centimeters;
  };

  const handleUpload = async () => {
    if (payload?.type_name === "Proof" && uploadedFiles.length > 1) {
      toast.error("Only one file will be uploaded for proof");
      return;
    }
    const formData = new FormData();
    uploadedFiles?.forEach((file) => {
      formData.append("files", file?.file);
      formData.append(`${file?.name}-size`, file?.size);
      formData.append(`${file?.name}-qty`, file?.qty);
    });
    // formData.append('file', file);
    formData.append("email", payload.email);
    formData.append("address2", payload.address2);
    formData.append("name", payload.name);
    formData.append("address1", payload.address1);
    formData.append("suburb", payload.suburb);
    formData.append("postCode", payload.postCode);
    formData.append("state", payload.state);
    setIsLoader(true);
    try {
      const res = await api.post("/api/orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast.success("File uploaded successfully");
        setPayload(initialValues); // Reset the form to its initial values
        setUploadedFiles([]); // Clear the uploaded files
      } else {
        toast.error(`File couldn't be uploaded`);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      console.error("Error uploading file:", error);
      
    }
  };
  const handleQuantityChange = (index, value) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].qty = value;
    setUploadedFiles(updatedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };
  const handleFileUpload = (files) => {
    const updatedFiles = [...uploadedFiles];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const dimensions = `${img.width}x${img.height}`;
          const size = file.size;
          updatedFiles.push({
            name: file.name,
            dimensions,
            size,
            qty: 1,
            file,
          });
          setUploadedFiles(updatedFiles);
        };
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <Form
        isUpdate={!editingRecord}
        title={modalTitle}
        onCancelModal={onCancelForm}
        onSubmit={handleUpload}
        isLoading={isLoading}
        onClick={() => {
          
          onCancelForm();
        }}
        hideSubmit={!!editingRecord?.id}
      >
        {isLoader ? <DotsLoader /> : null}
        <form>
          <div className="flex items-center justify-between flex-col-reverse md:flex-row my-3 space-y-2 " >

          <h2 className="text-3xl font-bold underline mb-4  text-center md:text-start ">
            User Information
          </h2>
          <div>
            <p className=" font-semibold " >Have an account? <Link to="/"><span className="text-blue-600" >Login</span></Link>  </p>
          </div>
          </div>
          <div className="md:flex md:justify-between md:space-x-10 px-4 ">
          <div className="md:w-full md:grid md:col-auto h-max md:sticky md:top-5 ">
            <div className="w-full mb-4 col-span-4 ">
            
              <TextField label="Email"
                disabled={!!editingRecord?.id}
                type="email"
                name="email"
                value={payload.email}
                onChange={(e) => handleInputChange(e)}
                className="bg-white w-full "              />
            </div>
            <div className="w-full mb-4 col-span-4   ">
              
              <TextField
              label="Name"
                disabled={!!editingRecord?.id}
                type="text"
                name="name"
                value={payload.name}
                onChange={(e) => handleInputChange(e)}
                className="bg-white w-full"              />
            </div>
            <div className="w-full mb-4 col-span-4">
             
              <TextField label=" Address 1"
                disabled={!!editingRecord?.id}
                type="text"
                name="address1"
                value={payload.address1}
                onChange={(e) => handleInputChange(e)}
                className="bg-white w-full"              />
            </div>
            <div className="w-full mb-4 col-span-4">
             
              <TextField label="Address 2 "
                disabled={!!editingRecord?.id}
                type="text"
                name="address2"
                value={payload.address2}
                onChange={(e) => handleInputChange(e)}
                className="bg-white w-full"              />
            </div>
            <div className="w-full mb-4 col-span-1 flex md:justify-start items-center ">
             
              <TextField label="suburb"
                disabled={!!editingRecord?.id}
                type="text"
                name="suburb"
                value={payload.suburb}
                onChange={(e) => handleInputChange(e)}
                className="bg-white md:w-[95%] w-full" 
              />
            </div>
            <div className="w-full mb-4 col-span-1 flex md:justify-center items-center ">
             
              <TextField label="PostCode"
                disabled={!!editingRecord?.id}
                type="number"
                name="postCode"
                value={payload.postCode}
                onChange={(e) => handleInputChange(e)}
                className="bg-white md:w-[95%] w-full"             />
            </div>
            <div className="w-full mb-4 col-span-2 flex md:justify-end items-center  ">
              
              <TextField label="State"
                disabled={!!editingRecord?.id}
                type="text"
                name="state"
                value={payload.state}
                onChange={(e) => handleInputChange(e)}
                className="bg-white md:w-[95%] w-full"              />
            </div>
          </div>
          <div className="w-full m-auto  text-center my-5">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="max-w-xl mx-auto"
            >
              <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium text-gray-600">
                    Drop files to Attach, or
                    <span className="text-blue-600 underline">browse</span>
                  </span>
                </span>
                <input
                  type="file"
                  name="file_upload"
                  hidden
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </label>
            </div>
            <div>
              <ul className="list-disc   ">
                {uploadedFiles?.map((file, index) => (
                  <li  
                    key={index}
                    className="flex w-full items-center my-5 justify-around pb-4 border-solid border-b-2 border-teal-600"
                  >
                    

                    
                    <img
                      src={
                        payload?.id ? file?.url : URL.createObjectURL(file.file)
                      }
                      alt="Uploaded"
                      className="h-[150px] w-[150px]"
                      />
                    

                    {file.name} | Size:{" "}
    {file.size
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : 'N/A'}
    | Dimensions: {file.dimensions ? (
      `${pixelsToCm(file.dimensions.split('x')[0], 96).toFixed(2)} cm x ${pixelsToCm(file.dimensions.split('x')[1], 96).toFixed(2)} cm`
    ) : 'N/A'}
                    
                     
                    <div className=" mb-4">
                 
                    <TextField
                    label="QTY"
                      type="number"
                      value={file.qty}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      className=""
                    />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
        </form>
      </Form>
      

     
    </>
  );
};

export default AddOrders;
