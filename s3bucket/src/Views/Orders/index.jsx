import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaCommentDots, FaCopy, FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input } from "../../components";
import SelectInput from "../../components/atoms/SelectInput";
import { get_orders, get_order_status } from "../../redux/ordersSlice";
import api from "../../services/api";
import AddProofs from "./AddProofs";
import OrderForm from "./AddUpdateForm";
import { BiSolidImageAdd } from "react-icons/bi";
import DotsLoader from "../../components/atoms/DotsLoader";
const OrderList = () => {
  const { orders, orderStatus, isLoading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isProof, setIsProof] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isLoader, setIsLoader]=useState(false)
  const paymentOption = [
    { label: "Not Paid", value: "not_paid" },
    { label: "Refunded", value: "refunded" },
    { label: "Partial Payment", value: "partial_payment" },
    { label: "Paid", value: "paid" },
    { label: "Over Payment", value: "over_payment" },
  ];
  // Sample order data
  useEffect(() => {
    dispatch(get_orders());
    dispatch(get_order_status());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelFormHandler = () => {
    setEditingRecord(null);
    setIsEditing(false);
    setIsProof(false);
  };

  // pending for future implementation
  const openFormHandler = (record) => () => {
    setEditingRecord(record);
    setIsEditing(true);
  };
  const openProofFormHandler = (record) => () => {
    setEditingRecord(record);
    setIsProof(true);
  };
  const handleCopyUrlClick = (orderNumber) => {
    const urlToCopy = `${process.env.REACT_APP_FRONTEND_URL}/public/orders/comments/${orderNumber}`;

    // Create a temporary textarea element to copy the URL
    const textArea = document.createElement("textarea");
    textArea.value = urlToCopy;
    document.body.appendChild(textArea);

    // Select the URL text and copy it to the clipboard
    textArea.select();
    document.execCommand("copy");

    // Clean up by removing the temporary textarea
    document.body.removeChild(textArea);

    // Display a notification or perform any other action as needed
    toast.success(`URL copied to clipboard: ${urlToCopy}`);
  };
  const handleChangeStatus = async ({ status_id, order_number }) => {
    setIsLoader(true)
    try {
      const res = await api.post(`/api/update_status`, {
        status_id,
        order_number,
      });
      console.log("🚀 ~ file: index.jsx:62 ~ handleChangeStatus ~ res:", res);

      if (res.status === 200) {
        toast.success("Order status update successfully");
        dispatch(get_orders());
      } else {
        toast.error("Order status couldn't be updated");
      }
      setIsLoader(false)
    } catch (error) {
      console.log(
        "🚀 ~ file: index.jsx:65 ~ handleChangeStatus ~ error:",
        error
      );
      setIsLoader(false)
      toast.error("Order status couldn't be updated");
    }
  };
  const handleChangePaymentStatus = async ({
    payment_status,
    order_number,
  }) => {
    setIsLoader(true)
    try {
      const res = await api.post(`/api/update_payment_status`, {
        payment_status,
        order_number,
      });
      console.log("🚀 ~ file: index.jsx:62 ~ handleChangeStatus ~ res:", res);

      if (res.status === 200) {
        toast.success("Payment status update successfully");
        dispatch(get_orders());
      } else {
        toast.error("Payment status couldn't be updated");
      }
      setIsLoader(false)
    } catch (error) {
      console.log(
        "🚀 ~ file: index.jsx:65 ~ handleChangeStatus ~ error:",
        error
      );
      setIsLoader(false)
      toast.error("Payment status couldn't be updated");
    }
  };
  console.log("🚀 ~ file: index.jsx:55 ~ handleCopyUrlClick ~ process.env.REACT_APP_FRONTEND_URL:", process.env.REACT_APP_FRONTEND_URL)

  return (
    <div className="p-4">
      {isLoading || isLoader?<DotsLoader/>:null}
      {isEditing && (
        <OrderForm
          editingRecord={editingRecord}
          modalTitle="Add Roles"
          onCancelForm={cancelFormHandler}
        />
      )}
      {isProof && (
        <AddProofs
          editingRecord={editingRecord}
          modalTitle="Add Proofs"
          onCancelForm={cancelFormHandler}
        />
      )}
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Order List</h1>
        <div className="flex flex-row items-center space-x-2">
          <Input
            placeholder={"Order Number"}
            className="border p-1.5"
            onChange={(e) => setOrderNumber(e.target.value)}
            value={orderNumber}
          />
          <Button
            variant="btn_submit"
            text="Create Order"
            onClick={openFormHandler(0)}
          />
        </div>
      </div>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Order number</th>
            <th className="text-left">Customer Name</th>
            <th className="text-left">Created by</th>
            <th className="text-left">Created at</th>
            <th className="text-left">Status</th>
            <th className="text-left">Payment</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-blue-600 cursor-pointer hover:underline" onClick={()=>navigate(`/orders/order_detail/${order.order_number}`)}>{order.order_number}</td>
              <td className="border px-4 py-2">{order.customer_name}</td>
              <td className="border px-4 py-2">{order.created_by}</td>
              <td className="border px-4 py-2">
                {dayjs(order.created_at).format("ddd, MMM D, YYYY h:mm A")}
              </td>
              <td className="border px-4 py-2">
                <SelectInput
                  className={
                    "h-[31px] bg-white borde border-gray-300 float-right rounded-[0.2rem] focus:outline-none"
                  }
                  onChange={(e) =>
                    handleChangeStatus({
                      status_id: e.target.value,
                      order_number: order?.order_number,
                    })
                  }
                  options={orderStatus}
                  value={order?.order_status}
                  valueProp="id"
                  labelProp={"name"}
                />
              </td>
              <td className="border px-4 py-2">
                <SelectInput
                  className={
                    "h-[31px] bg-white borde border-gray-300 float-right rounded-[0.2rem] focus:outline-none"
                  }
                  onChange={(e) =>
                    handleChangePaymentStatus({
                      payment_status: e.target.value,
                      order_number: order?.order_number,
                    })
                  }
                  options={paymentOption}
                  value={order?.payment_status ? order?.payment_status : null}
                  valueProp="value"
                  labelProp={"label"}
                />
              </td>
              <td className="border px-4 py-2">
                <div className="flex flex-row justify-between items-center">
                  <FaCommentDots
                    className="cursor-pointer hover:text-primary-100"
                    onClick={() =>
                      navigate(`/orders/comments/${order.order_number}`)
                    }
                  />
                  <FaCopy
                    onClick={() => handleCopyUrlClick(order.order_number)}
                    title="Copy"
                    className="cursor-pointer hover:text-primary-100"
                  />
                  <BiSolidImageAdd
                    size={20}
                    onClick={openProofFormHandler(order)}
                    title="Add Proof"
                    className="cursor-pointer hover:text-primary-100"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
