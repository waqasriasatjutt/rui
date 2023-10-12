import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "../../components";
import DotsLoader from "../../components/atoms/DotsLoader";
import SelectInput from "../../components/atoms/SelectInput";
import Modal from "../../components/molecules/Modal";
import api from "../../services/api";
import { useDropzone } from "react-dropzone";
import { AiFillCloseCircle } from "react-icons/ai";
const AddProofs = ({ editingRecord, onCancelForm, modalTitle }) => {
  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;
  const { isLoading } = useSelector((state) => state.orders);
  const [isLoader, setIsLoader] = useState(false);
  let initialValues = {
    order_number: editingRecord?.order_number,
    name: user?.username,
    comment_by: "Staff",
    type: null,
    comment: "",
  };
  const [files, setFiles] = useState([]);
  const onDrop = (acceptedFiles) => {
    setFiles([
      ...files,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  };
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
  });
  const RemoveImage = (idx) => {
    setFiles((olditem) => olditem.filter((val, index) => index !== idx));
  };
  const [payload, setPayload] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };
  const [file, setFile] = useState(null);
  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
    }
  };
  const handleUpload = async () => {
    if(payload?.type==='proof'&& files.length>1){
      toast.error("Only one file will be uploaded for proof")
      return
    }
    const formData = new FormData();
    files?.forEach((file) => {
      formData.append("files", file);
    });
    // formData.append('file', file);
    formData.append("type", payload.type);
    formData.append("comment", payload.comment);
    formData.append("name", payload.name);
    formData.append("order_number", payload.order_number);
    formData.append("comment_by", payload.comment_by);
    setIsLoader(true);
    try {
      const res = await api.post("/api/upload", formData, {
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
  const typeOption = [
    { label: "Proof", value: "proof" },
    { label: "Production", value: "production" },
    { label: "Supporting", value: "supporting" },
  ];
  return (
    <>
      <Modal
        isUpdate={!editingRecord}
        title={modalTitle}
        onCancelModal={onCancelForm}
        onSubmit={handleUpload}
        isLoading={isLoading}
        onClick={onCancelForm}
      >
        {isLoader ? <DotsLoader /> : null}
        <form>
          <div className="grid grid-cols-2 gap-x-2">
            <div className="!mb-3">
              <Input
                placeholder={"Comment"}
                className="border p-1.5 w-full"
                onChange={(e) => handleInputChange(e)}
                value={payload?.comment}
                name="comment"
              />
            </div>
            <div className="!mb-3">
              <SelectInput
                className={
                  "h-[38px] bg-white border border-gray-200 float-right rounded-[0.2rem] focus:outline-none w-full px-2"
                }
                onChange={(e) =>
                  setPayload({ ...payload, type: e.target.value })
                }
                options={typeOption}
                value={payload.type}
                valueProp="value"
                labelProp={"label"}
                placeholder="Select Image Type"
              />
            </div>
          </div>

          {/* <div className="flex flex-col justify-center items-center w-full h-full">
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
          {/* <Button variant="btn_submit" onClick={handleUpload} text="Save" /> 
        </>
      )}
    </div> */}

          <div className="w-full !ml-2 h-full">
            <div
              className={`w-full flex justify-center border-2 border-gray-300 border-dashed rounded-md !p-2 hover:border-gray-400 focus:outline-none ${
                isDragActive ? "bg-gray-100" : "bg-white"
              }`}
              {...getRootProps()}
            >
              <label
                className={`flex justify-center w-full ${
                  files?.length > 0 ? "h-[80px]" : "h-[280px]"
                } px-4 transition appearance-none cursor-pointer`}
              >
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
                    Drop files to Attach, or{" "}
                    <span className="text-blue-600 underline" onClick={open}>
                      browse
                    </span>
                  </span>
                </span>
                <input {...getInputProps()} />
              </label>
            </div>
            <div className="flex flex-wrap justify-center">
              {files?.length > 0
                ? files?.map((path, index) => {
                    console.log("imageeeiddd", path);
                    return (
                      <>
                        <img
                          src={path.preview}
                          className="m-2 max-h-[180px] max-w-[180px] text-center rounded-md cursor-pointer"
                          style={{ backgroundColor: "white" }}
                          alt="img"
                          key={index}
                          // onLoad={(e) => {!checkImageDiamension({width:e.target.naturalWidth,height:e.target.naturalHeight})&&setWrongSize([...wrongSize,index])}}
                        />
                        <AiFillCloseCircle onClick={() => RemoveImage(index)} />
                      </>
                    );
                  })
                : null}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddProofs;
