import React, { useState } from "react";
import { Modal } from "flowbite";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { create_order, get_order_status } from "../redux/ordersSlice";

const UploadFile = () => {
  const dispatch = useDispatch();
  let initialValues = {
    name: "",
  };
  const [payload, setPayload] = useState(initialValues);
  const [successMessage, setSuccessMessage] = useState(""); // Step 1: State for success message

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    address1: "",
    address2: "",
    suburb: "",
    postcode: "",
    state: "",
  });

  const handleFileUpload = (files) => {
    console.log("🚀 ~ file: UploadFile.jsx:29 ~ handleFileUpload ~ files:", files)
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
            quantity: 1,
            file,
          });
          setUploadedFiles(updatedFiles);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(!userDetails.name){
    //   return toast.error("Customer name is required")
    // }

    // Create a payload based on the user details
    // const payload = {
    //     email: userDetails.email,
    //     name: userDetails.name,
    //     // address1: userDetails.address1,
    //     // address2: userDetails.address2,
    //     // suburb: userDetails.suburb,
    //     // postcode: userDetails.postcode,
    //     // state: userDetails.state,
    // };

    try {
      const res = await dispatch(create_order(userDetails));
      if (res.payload.status === 201) {
        // setPayload(initialValues)
        // toast.success("Order created");
        setSuccessMessage("Order created successfully");
        // Step 3: Refresh the page
        window.location.reload();

      }
    } catch (error) {
      toast.error("Order couldn't be created");
    }
  };

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();
  //
  //   // Create a payload based on the user details
  //   const payload = {
  //     email: userDetails.email,
  //     name: userDetails.name,
  //     address1: userDetails.address1,
  //     address2: userDetails.address2,
  //     suburb: userDetails.suburb,
  //     postcode: userDetails.postcode,
  //     state: userDetails.state,
  //   };
  //
  //   try {
  //     // Send a POST request to your API endpoint
  //     const response = await axios.post('http://54.153.143.131:3000/api/orders', payload);
  //
  //     // Check the response and handle success or errors
  //     console.log('Response:', response.data);
  //   } catch (error) {
  //     // Handle errors, e.g., display an error message
  //     console.error('Error:', error);
  //   }
  // };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleQuantityChange = (index, value) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].quantity = value;
    setUploadedFiles(updatedFiles);
  };

  const handleUserDetailsChange = (field, value) => {
    setUserDetails({
      ...userDetails,
      [field]: value,
    });
  };

  return (
    <>
      <div className="flex flex-nowrap max-w-[100vw] h-[100vh]">
        {/* <Sidebar /> */}
        <div className="mx-2 w-[calc(100vw-220px)] ml-[220px]">
          <div className="p-[21.5px] border-b border-[#d5d5d5] !overflow-y-hidden fixed top-0 bg-white w-[calc(100vw-220px)]">
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-bold uppercase">Upload File</h1>
            </div>
          </div>
          <section className="flex items-center justify-center text-center pt-[76px]">
            <div className="container p-5">
              <div className="w-full text-center mb-5">
                <button
                  data-modal-target="defaultModal"
                  data-modal-toggle="defaultModal"
                  class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Upload Files
                </button>
              </div>

              <div
                class="fixed top-0 left-0 right-0 z-[999] hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div class="relative w-full max-w-2xl max-h-full">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex text-white bg-blue-700 items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-white dark:text-white">
                        Files Uploaded
                      </h3>
                      <button
                        type="button"
                        class="text-white bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal"
                      >
                        <svg
                          class="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span class="sr-only">Close modal</span>
                      </button>
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
                              <span className="text-blue-600 underline">
                                browse
                              </span>
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
                    </div>
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        data-modal-hide="defaultModal"
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold underline mb-6">
                  Uploaded Files
                </h2>
                <ul className="list-disc">
                  {uploadedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex w-full my-5 justify-around pb-4 border-solid border-b-2 border-teal-600"
                    >
                      <img
                        src={URL.createObjectURL(file.file)}
                        alt="Uploaded"
                        className="h-[150px] w-[150px]"
                      />
                      {file.name} | Dimensions: {file.dimensions} | Size:{" "}
                      {file.size} bytes
                      <input
                        type="number"
                        value={file.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        className="bg-gray-50 h-max w-max mx-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <h2 className="text-3xl font-bold underline mb-4">
                User Information
              </h2>

              <form onSubmit={handleSubmit}>
                <div class="mb-6 flex flex-col items-center">
                  <div className="w-2/4 mb-4">
                    <label
                      for="email"
                      class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={userDetails.email}
                      onChange={(e) =>
                        handleUserDetailsChange("email", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="w-2/4 mb-4">
                    <label
                      for="name"
                      class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={userDetails.name}
                      onChange={(e) =>
                        handleUserDetailsChange("name", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="w-2/4 mb-4">
                    <label
                      for="address1"
                      class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address 1
                    </label>
                    <input
                      type="text"
                      id="address1"
                      value={userDetails.address1}
                      onChange={(e) =>
                        handleUserDetailsChange("address1", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="w-2/4 mb-4">
                    <label
                      for="address2"
                      class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address 2
                    </label>
                    <input
                      type="text"
                      id="address2"
                      value={userDetails.address2}
                      onChange={(e) =>
                        handleUserDetailsChange("address2", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="w-2/4 mb-4">
                    <label
                      for="suburb"
                      class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Suburb
                    </label>
                    <input
                      type="text"
                      id="suburb"
                      value={userDetails.suburb}
                      onChange={(e) =>
                        handleUserDetailsChange("suburb", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="w-2/4 mb-4">
                    <label
                      for="postcode"
                      class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      PostCode
                    </label>
                    <input
                      type="number"
                      id="postcode"
                      value={userDetails.postcode}
                      onChange={(e) =>
                        handleUserDetailsChange("postcode", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="w-2/4 mb-4">
                    <label
                      for="state"
                      class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={userDetails.state}
                      onChange={(e) =>
                        handleUserDetailsChange("state", e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default UploadFile;
