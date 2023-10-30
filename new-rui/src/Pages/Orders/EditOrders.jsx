import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "../../components";
import DotsLoader from "../../components/atoms/DotsLoader";
import SelectInput from "../../components/atoms/SelectInput";
import Modal from "../../components/molecules/Modal";
import api from "../../services/api";
import { reset } from "../../redux/ordersSlice";
const EditOrders = ({ editingRecord, onCancelForm, modalTitle }) => {
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
    "🚀 ~ file: EditOrders.jsx:23 ~ AddOders ~ uploadedFiles:",
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
  const handleFormReset = () => {
    dispatch(reset()); // Dispatch the reset action to reset the form state
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
        onCancelForm();
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
      <Modal
        isUpdate={!editingRecord}
        title={modalTitle}
        onCancelModal={onCancelForm}
        onSubmit={handleUpload}
        isLoading={isLoading}
        onClick={() => {
          handleFormReset(); // Reset the form state before closing
          onCancelForm();
        }}
        hideSubmit={!!editingRecord?.id}
      >
        {isLoader ? <DotsLoader /> : null}
        <form>
          <h2 className="text-3xl font-bold underline mb-4">
            User Information
          </h2>
          <div className="grid grid-cols-3 gap-x-2">
            <div className="w-full mb-4">
              <label
                for="email"
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                disabled={!!editingRecord?.id}
                type="email"
                name="email"
                value={payload.email}
                onChange={(e) => handleInputChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full mb-4">
              <label
                for="name"
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                disabled={!!editingRecord?.id}
                type="text"
                name="name"
                value={payload.name}
                onChange={(e) => handleInputChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full mb-4">
              <label
                for="address1"
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                Address 1
              </label>
              <input
                disabled={!!editingRecord?.id}
                type="text"
                name="address1"
                value={payload.address1}
                onChange={(e) => handleInputChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full mb-4">
              <label
                for="address2"
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                Address 2
              </label>
              <input
                disabled={!!editingRecord?.id}
                type="text"
                name="address2"
                value={payload.address2}
                onChange={(e) => handleInputChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full mb-4">
              <label
                for="suburb"
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                Suburb
              </label>
              <input
                disabled={!!editingRecord?.id}
                type="text"
                name="suburb"
                value={payload.suburb}
                onChange={(e) => handleInputChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full mb-4">
              <label
                for="postCode"
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                PostCode
              </label>
              <input
                disabled={!!editingRecord?.id}
                type="number"
                name="postCode"
                value={payload.postCode}
                onChange={(e) => handleInputChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="w-full mb-4">
              <label
                for="state"
                class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                State
              </label>
              <input
                disabled={!!editingRecord?.id}
                type="text"
                name="state"
                value={payload.state}
                onChange={(e) => handleInputChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full m-auto text-center my-5">
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
              <ul className="list-disc">
                {uploadedFiles?.map((file, index) => (
                  <li
                    key={index}
                    className="flex w-full my-5 justify-around pb-4 border-solid border-b-2 border-teal-600"
                  >
                    <img
                      src={
                        payload?.id ? file?.url : URL.createObjectURL(file.file)
                      }
                      alt="Uploaded"
                      className="h-[150px] w-[150px]"
                    />
                    {file.name} | Dimensions: {file.dimensions} | Size:{" "}
                    {file.size ? file.size : file?.filesize} bytes
                    <input
                      type="number"
                      value={file.qty}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      className="bg-gray-50 h-max w-max mx-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditOrders;
