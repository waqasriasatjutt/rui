import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "../../components";
import DotsLoader from "../../components/atoms/DotsLoader";
import Modal from "../../components/molecules/Modal";
import api from "../../services/api";

const AddItems = ({ editingRecord, onCancelForm, modalTitle, refreshData }) => {
  const [isLoader, setIsLoader]=useState(false)
  const { isLoading } = useSelector((state) => state.orders);

  let initialValues = {
    order_number:editingRecord?.order_number,
    title:'',
    size: "",
    qty:0,
    price:0
  };

  const [payload, setPayload]=useState(initialValues)
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
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', payload.title);
    formData.append('size', payload.size);
    formData.append('qty', payload.qty);
    formData.append('price', payload.price);
    formData.append('order_number', payload.order_number);
    setIsLoader(true)
    try {
      const res=await api.post('/api/add_items', formData,{headers: {
        'Content-Type': 'multipart/form-data',
      },});
      if(res.status===200){
        
        toast.success('Item created successfully');
        refreshData()
        onCancelForm()
      }else{
        toast.error(`Item couldn't be created`);
      }
      setIsLoader(false)
    } catch (error) {
      setIsLoader(false)
      console.error('Error uploading file:', error);
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
        onClick={onCancelForm}
      >
        {isLoader?<DotsLoader/>:null}
        <form>
          <div className="grid grid-cols-2 gap-x-2">
          <div className="!mb-3">
          <Input
            placeholder={"Item Name"}
            className="border p-1.5 w-full"
            onChange={(e) => handleInputChange(e)}
            value={payload?.title}
            name="title"
            label={"Item Name"}
          />
          </div>
          <div className="!mb-3">
          <Input
            placeholder={"Size"}
            className="border p-1.5 w-full"
            onChange={(e) => handleInputChange(e)}
            value={payload?.size}
            name="size"
            label={'Size'}
          />
          </div>
          <div className="!mb-3">
          <Input
            placeholder={"Quantity"}
            className="border p-1.5 w-full"
            onChange={(e) => handleInputChange(e)}
            value={payload?.qty}
            name="qty"
            label={'Quantity'}
          />
          </div>
          <div className="!mb-3">
          <Input
            placeholder={"Price"}
            className="border p-1.5 w-full"
            onChange={(e) => handleInputChange(e)}
            value={payload?.price}
            name="price"
            label={'Price'}
          />
          </div>
          
          </div>
          
          <div className="flex flex-col justify-center items-center w-full h-full">
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
          {/* <Button variant="btn_submit" onClick={handleUpload} text="Save" /> */}
        </>
      )}
    </div>
        </form>
      </Modal>
    </>
  );
};

export default AddItems;
