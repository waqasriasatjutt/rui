import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "../../components";
import Modal from "../../components/molecules/Modal";
import { create_order } from "../../redux/ordersSlice";

const OrderForm = ({ editingRecord, onCancelForm, modalTitle }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  let initialValues = {
    orderNumber:"",
    customer_name: "",
    created_by:user?.username,
  };

  const [payload, setPayload]=useState(initialValues)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };
  const handleCreateOrder=async()=>{
    if(!payload.customer_name){
      return toast.error("Customer name is required")
    }
    try {
      const res = await dispatch(
        create_order(payload)
      );
      if (res.payload.status === 201) {
        // toast.success("Order created");
        onCancelForm();
      } else {
        // toast.success("Role couldn't be created");
        
      }
    } catch (error) {
      toast.error("Order couldn't be created");
    }
  }
  return (
    <>
      <Modal
        isUpdate={!!editingRecord}
        title={modalTitle}
        onCancelModal={onCancelForm}
        onSubmit={handleCreateOrder}
        isLoading={isLoading}
        onClick={onCancelForm}
      >
        <form>
          <div className="!mb-3">
          <Input
            placeholder={"Order Number"}
            className="border p-1.5 w-full"
            onChange={(e) => handleInputChange(e)}
            value={payload?.orderNumber}
            name="orderNumber"
            readOnly
            disabled
            
          />
          </div>
          <div className="!mb-3">
          <Input
            placeholder={"Customer Name"}
            className="border p-1.5 w-full"
            onChange={(e) => handleInputChange(e)}
            value={payload?.customer_name}
            name="customer_name"
          />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default OrderForm;
