import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Input } from "../../components";
import DotsLoader from "../../components/atoms/DotsLoader";
import { create_order_status, get_order_status } from "../../redux/ordersSlice";

const OrderStatusList = () => {
  const { orderStatus, isLoading} = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  let initialValues = {
    name: "",
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
    if(!payload?.name){
return toast.error("Name is required")
    }
    try {
      const res = await dispatch(
        create_order_status(payload)
      );
      if (res.payload.status === 201) {
        setPayload(initialValues)
        // toast.success("Order created");
      }
    } catch (error) {
      toast.error("Order couldn't be created");
    }
  }

  // Sample order data
  useEffect(() => {
    dispatch(get_order_status());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-4">
      {isLoading?<DotsLoader/>:null}
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Order Status List</h1>
        <div className="flex flex-row items-center space-x-2">
          <Input
            placeholder={"Name"}
            className="border p-1.5"
            onChange={(e) => handleInputChange(e)}
            value={payload.name}
            name="name"
          />
          <Button
            variant="btn_submit"
            text="Create Status"
            onClick={handleCreateOrder}
          />
        </div>
      </div>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Sr.</th>
            <th className="text-left">Status</th>
            <th className="text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {orderStatus.map((order, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index+1}</td>
              <td className="border px-4 py-2">{order.name}</td>
              <td className="border px-4 py-2">
                {dayjs(order.createdAt).format("ddd, MMM D, YYYY h:mm A")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderStatusList;
